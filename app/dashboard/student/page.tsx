import { createClient } from '../../../utils/supabase/server'
import Link from 'next/link'
import { Book, Layers, PlayCircle, ChevronRight, Sparkles, Clock } from 'lucide-react'

export default async function StudentDashboard() {
  const supabase = await createClient() 

  // 1. Lấy danh sách khóa học (Sắp xếp theo ngày tạo)
  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: true })
  
  // 2. Lấy 4 bài giảng mới nhất (Bất kể khóa nào)
  // Lưu ý: Cú pháp select('*, courses(title)') để lấy kèm tên khóa học
  const { data: latestLessons } = await supabase
    .from('lessons')
    .select('*, courses(title)')
    .order('created_at', { ascending: false })
    .limit(4)
  
  // 3. Lấy thông tin user để chào hỏi
  const { data: { user } } = await supabase.auth.getUser()
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0]

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="mb-10 bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-50 blur-3xl"></div>
            <div className="relative z-10">
                <div className="flex items-center gap-2 text-blue-600 font-bold text-sm mb-2 uppercase tracking-wider">
                    <Sparkles size={16} /> Trung tâm MARVEL MATH
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-2">
                    Chào mừng trở lại, <span className="text-blue-600">{userName}</span> 👋
                </h1>
                <p className="text-slate-500 text-lg max-w-2xl">
                    Hôm nay bạn muốn chinh phục kiến thức nào? Chọn một khóa học bên dưới để bắt đầu nhé.
                </p>
            </div>
        </div>

        {/* --- PHẦN 1: DANH SÁCH KHÓA HỌC --- */}
        <div className="mb-12">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Layers className="text-blue-600" /> Các khóa học của bạn
            </h2>
            
            {(!courses || courses.length === 0) ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
                    <Book className="mx-auto text-slate-300 mb-3" size={48} />
                    <p className="text-slate-500">Chưa có khóa học nào được tạo.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map(course => (
                        <Link href={`/dashboard/student/course/${course.id}`} key={course.id} className="group h-full">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                                {/* Decoration Circle */}
                                <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out"></div>
                                
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                                        <Book className="text-white" size={28} />
                                    </div>
                                    
                                    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
                                        {course.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm mb-6 line-clamp-2">
                                        {course.description || "Lộ trình học tập bài bản dành cho học sinh."}
                                    </p>
                                    
                                    <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                                        <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">
                                            Course
                                        </span>
                                        <span className="flex items-center text-blue-600 font-bold text-sm group-hover:translate-x-1 transition-transform">
                                            Vào học ngay <ChevronRight size={16} className="ml-1" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>

        {/* --- PHẦN 2: BÀI GIẢNG MỚI NHẤT --- */}
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <PlayCircle className="text-indigo-600" /> Mới cập nhật
                </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {latestLessons?.map((lesson: any) => (
                    <Link href={`/dashboard/student/${lesson.id}`} key={lesson.id} className="group block">
                        <div className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            {/* Thumbnail */}
                            <div className="aspect-video relative bg-slate-900">
                                <img 
                                    src={`https://img.youtube.com/vi/${lesson.video_id}/mqdefault.jpg`} 
                                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
                                    alt={lesson.title}
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                                    <PlayCircle className="text-white drop-shadow-lg" size={32} />
                                </div>
                                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                                    Video
                                </span>
                            </div>
                            
                            {/* Content */}
                            <div className="p-4">
                                <h4 className="font-bold text-slate-800 text-sm line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                                    {lesson.title}
                                </h4>
                                <div className="flex items-center justify-between">
                                    <p className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 truncate max-w-[60%]">
                                        {lesson.courses?.title || 'Bài học'}
                                    </p>
                                    <div className="flex items-center text-[10px] text-slate-400">
                                        <Clock size={10} className="mr-1" />
                                        {new Date(lesson.created_at).toLocaleDateString('vi-VN')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
                {latestLessons?.length === 0 && <p className="text-slate-400 text-sm col-span-4 text-center">Chưa có bài giảng nào mới.</p>}
            </div>
        </div>

      </div>
    </div>
  )
}