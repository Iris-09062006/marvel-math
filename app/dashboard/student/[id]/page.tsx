import { createClient } from '../../../../utils/supabase/server'
import Link from 'next/link'
import { ArrowLeft, Calendar, Share2, ThumbsUp } from 'lucide-react'
import VideoPlayer from '../../../../components/videoPlayer' // Component Video không có màn che
import VideoSidebar from '../../../../components/VideoSideBar' // Component Sidebar mới (Ghi chú + Pháo hoa)

export default async function VideoPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params
  const supabase = await createClient()

  // 1. Lấy bài học hiện tại
  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', id)
    .single()

  // 2. Lấy danh sách bài học để gửi vào Sidebar
  // Logic: Nếu bài này thuộc 1 khóa, lấy các bài cùng khóa. Nếu không, lấy bài mới nhất.
  let otherLessons = []
  
  if (lesson?.course_id) {
    // Lấy bài cùng khóa học để tạo thành Playlist chuẩn
    const { data } = await supabase
      .from('lessons')
      .select('*')
      .eq('course_id', lesson.course_id)
      .order('created_at', { ascending: true }) 
    otherLessons = data || []
  } else {
    // Lấy ngẫu nhiên bài khác nếu không có khóa
    const { data } = await supabase
      .from('lessons')
      .select('*')
      .neq('id', id)
      .limit(10)
    otherLessons = data || []
  }

  if (!lesson) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f0f0f] text-slate-400">
        <p className="mb-4">Không tìm thấy bài học.</p>
        <Link href="/dashboard/student" className="text-blue-500 hover:underline">
            Quay lại Dashboard
        </Link>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white font-sans">
      
      {/* --- NAVBAR (Thanh điều hướng trên cùng) --- */}
      <div className="border-b border-white/10 px-4 py-3 bg-[#121212] sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
            <Link href="/dashboard/student" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium group">
                <div className="p-1.5 rounded-full bg-white/10 group-hover:bg-white/20 transition">
                    <ArrowLeft size={16} /> 
                </div>
                Quay lại kho bài giảng
            </Link>
            <div className="text-sm font-bold text-gray-500 tracking-widest hidden sm:block">
                MARVEL MATH <span className="text-blue-500">CLASS</span>
            </div>
        </div>
      </div>

      {/* --- NỘI DUNG CHÍNH --- */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-6">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* CỘT TRÁI: VIDEO PLAYER (Chiếm 2/3 màn hình) */}
              <div className="lg:col-span-2">
                {/* Khung Video */}
                <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
                    <VideoPlayer videoId={lesson.video_id} />
                </div>
                
                {/* Thông tin bài học */}
                <div className="mt-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">{lesson.title}</h1>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                        {/* Info Tác giả */}
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-blue-900/20">
                                M
                            </div>
                            <div>
                                <p className="font-bold text-white text-base">Marvel math</p>
                                <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                                    <Calendar size={12} />
                                    <span>Đăng ngày {new Date(lesson.created_at).toLocaleDateString('vi-VN')}</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Nút Thích/Chia sẻ (Giả lập) */}
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 bg-[#222] hover:bg-[#333] px-5 py-2.5 rounded-full text-sm font-medium transition active:scale-95 border border-white/5">
                                <ThumbsUp size={18} className="text-gray-300" /> 
                                <span className="hidden sm:inline text-gray-300">Thích</span>
                            </button>
                            <button className="flex items-center gap-2 bg-[#222] hover:bg-[#333] px-5 py-2.5 rounded-full text-sm font-medium transition active:scale-95 border border-white/5">
                                <Share2 size={18} className="text-gray-300" /> 
                                <span className="hidden sm:inline text-gray-300">Chia sẻ</span>
                            </button>
                        </div>
                    </div>

                    {/* Mô tả bài học */}
                    <div className="mt-6 bg-[#1a1a1a] p-6 rounded-2xl text-sm text-gray-300 leading-relaxed border border-white/5 hover:bg-[#222] transition-colors cursor-default shadow-inner">
                        <p className="mb-3 font-bold text-white text-base border-b border-white/5 pb-2 inline-block">
                            Nội dung bài học:
                        </p>
                        <p>
                            Chào mừng các bạn đến với bài giảng <strong>{lesson.title}</strong>. 
                            Đây là tài liệu học tập độc quyền dành cho lớp Toán thầy Vincent.
                            <br/><br/>
                            Hãy sử dụng <strong>Tab Ghi chú</strong> bên cạnh để lưu lại các công thức quan trọng nhé!
                        </p>
                    </div>
                </div>
              </div>

              {/* CỘT PHẢI: SIDEBAR THÔNG MINH (Ghi chú + Playlist + Pháo hoa) */}
              <div className="lg:col-span-1">
                 {/* Truyền ID bài đang xem và danh sách bài học vào Sidebar */}
                 <VideoSidebar currentId={id} lessons={otherLessons} />
              </div>

           </div>
      </div>
    </div>
  )
}