'use client'

import { createClient } from '../../../utils/supabase/client'
import { useEffect, useState } from 'react'
import { UploadCloud, Trash2, PlusCircle, FolderPlus, LayoutList, Loader2 } from 'lucide-react'

type Course = { id: string; title: string }
type Lesson = { id: string; title: string; video_id: string; youtube_url: string; course_id: string }

export default function TeacherPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  
  // Form tạo khóa học
  const [newCourseTitle, setNewCourseTitle] = useState('')
  
  // Form đăng bài
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  const supabase = createClient()

  // Tải dữ liệu
  const fetchData = async () => {
    const { data: coursesData } = await supabase.from('courses').select('*').order('created_at', { ascending: false })
    const { data: lessonsData } = await supabase.from('lessons').select('*').order('created_at', { ascending: false })
    
    if (coursesData) setCourses(coursesData)
    if (lessonsData) setLessons(lessonsData)
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [])

  // 1. TẠO KHÓA HỌC MỚI
  const handleCreateCourse = async () => {
    if (!newCourseTitle) return alert("Nhập tên khóa học")
    const { error } = await supabase.from('courses').insert({ title: newCourseTitle })
    if (error) alert(error.message)
    else {
      alert("Tạo khóa học thành công!")
      setNewCourseTitle('')
      fetchData()
    }
  }

  // 2. ĐĂNG BÀI HỌC MỚI
  const handleUpload = async () => {
    if (!title || !url || !selectedCourse) return alert("Vui lòng nhập đủ thông tin và chọn khóa học")
    setIsUploading(true)
    
    const { data: { user } } = await supabase.auth.getUser()
    const videoId = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/)?.[2]

    if (!videoId || videoId.length !== 11) {
      setIsUploading(false)
      return alert("Link YouTube lỗi")
    }

    const { error } = await supabase.from('lessons').insert({
      title,
      youtube_url: url,
      video_id: videoId,
      author_id: user?.id,
      course_id: selectedCourse // Lưu ID khóa học
    })

    setIsUploading(false)
    if (error) alert(error.message)
    else {
        alert('Đăng bài thành công!')
        setTitle(''); setUrl('');
        fetchData()
    }
  }

  const handleDeleteLesson = async (id: string) => {
    if (confirm("Xóa bài này?")) {
      await supabase.from('lessons').delete().eq('id', id)
      fetchData()
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- CỘT TRÁI: TẠO KHÓA HỌC --- */}
        <div className="lg:col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-slate-200 h-fit">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <FolderPlus className="text-blue-600" /> Tạo Khóa Học
            </h2>
            <div className="space-y-3">
                <input 
                    value={newCourseTitle}
                    onChange={e => setNewCourseTitle(e.target.value)}
                    placeholder="VD: Hình học 11"
                    className="w-full p-3 rounded-xl bg-slate-50 border outline-none focus:border-blue-500"
                />
                <button onClick={handleCreateCourse} className="w-full bg-blue-100 text-blue-700 font-bold py-3 rounded-xl hover:bg-blue-200 transition">
                    + Thêm Khóa Mới
                </button>
            </div>

            <div className="mt-8">
                <h3 className="font-bold text-slate-500 text-sm mb-3 uppercase">Danh sách khóa hiện có</h3>
                <ul className="space-y-2">
                    {courses.map(c => (
                        <li key={c.id} className="p-2 bg-slate-50 rounded-lg text-sm font-medium text-slate-700 border border-slate-100">
                            📚 {c.title}
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        {/* --- CỘT PHẢI: ĐĂNG BÀI GIẢNG --- */}
        <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mb-8">
                <h2 className="text-xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
                    <UploadCloud /> Đăng bài giảng video
                </h2>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">Chọn khóa học</label>
                            <select 
                                value={selectedCourse}
                                onChange={e => setSelectedCourse(e.target.value)}
                                className="w-full p-3 rounded-xl bg-slate-50 border outline-none focus:border-indigo-500"
                            >
                                <option value="">-- Chọn khóa học --</option>
                                {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">Link YouTube</label>
                            <input value={url} onChange={e => setUrl(e.target.value)} className="w-full p-3 rounded-xl bg-slate-50 border outline-none focus:border-indigo-500" placeholder="https://..." />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Tên bài giảng</label>
                        <input value={title} onChange={e => setTitle(e.target.value)} className="w-full p-3 rounded-xl bg-slate-50 border outline-none focus:border-indigo-500" placeholder="VD: Bài 1 - Khái niệm..." />
                    </div>
                    <button onClick={handleUpload} disabled={isUploading} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition flex items-center justify-center gap-2">
                        {isUploading ? <Loader2 className="animate-spin" /> : <PlusCircle />} Đăng Bài Ngay
                    </button>
                </div>
            </div>

            {/* Danh sách bài đã đăng */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 bg-slate-50 border-b border-slate-100 font-bold text-slate-700 flex items-center gap-2">
                    <LayoutList size={18}/> Tất cả bài giảng ({lessons.length})
                </div>
                <div className="max-h-[500px] overflow-y-auto">
                    {lessons.map(l => (
                        <div key={l.id} className="p-4 border-b border-slate-50 flex justify-between items-center hover:bg-slate-50">
                            <div className="flex items-center gap-3">
                                <img src={`https://img.youtube.com/vi/${l.video_id}/default.jpg`} className="w-16 h-12 object-cover rounded-md bg-slate-200" />
                                <div>
                                    <p className="font-bold text-slate-800 text-sm">{l.title}</p>
                                    <p className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full w-fit mt-1">
                                        {courses.find(c => c.id === l.course_id)?.title || 'Chưa phân loại'}
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => handleDeleteLesson(l.id)} className="text-slate-300 hover:text-red-500"><Trash2 size={18} /></button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}