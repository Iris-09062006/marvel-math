import { createClient } from '../../../../../utils/supabase/server'
import Link from 'next/link'
import { ArrowLeft, PlayCircle } from 'lucide-react'

export default async function CourseDetailPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params
  const supabase = await createClient()

  // Lấy thông tin khóa học
  const { data: course } = await supabase.from('courses').select('*').eq('id', courseId).single()
  
  // Lấy bài học TRONG KHÓA ĐÓ
  const { data: lessons } = await supabase
    .from('lessons')
    .select('*')
    .eq('course_id', courseId)
    .order('created_at', { ascending: true }) // Bài cũ nhất (Bài 1) lên đầu

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/dashboard/student" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-6 font-medium">
            <ArrowLeft size={18} /> Quay lại danh sách khóa
        </Link>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mb-8">
            <h1 className="text-3xl font-bold text-blue-700 mb-2">{course?.title}</h1>
            <p className="text-slate-500">Danh sách bài giảng theo lộ trình</p>
        </div>

        <div className="space-y-3">
            {lessons?.map((lesson, index) => (
                <Link key={lesson.id} href={`/dashboard/student/${lesson.id}`} className="block group">
                    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all">
                        <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center font-bold text-blue-600 text-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            {index + 1}
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-slate-800 text-lg group-hover:text-blue-700">{lesson.title}</h3>
                            <p className="text-xs text-slate-400">Video bài giảng</p>
                        </div>
                        <PlayCircle className="text-slate-300 group-hover:text-blue-500" size={28} />
                    </div>
                </Link>
            ))}
            {lessons?.length === 0 && <div className="text-center py-10 text-slate-400">Giáo viên chưa đăng bài nào vào khóa này.</div>}
        </div>
      </div>
    </div>
  )
}