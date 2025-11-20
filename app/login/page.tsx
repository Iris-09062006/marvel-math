'use client'

import { createClient } from '../../utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import { Lock, Mail, ArrowRight, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert('Đăng nhập thất bại: ' + error.message)
      setLoading(false)
      return
    }

    // --- PHÂN QUYỀN TẠI ĐÂY ---
    // Logic: Kiểm tra email hoặc metadata để điều hướng
    if (data.user) {
        // Ví dụ: Nếu email chứa chữ 'teacher' hoặc là email cụ thể của bạn
        const isTeacher = email.includes('teacher') || email === 'admin@gmail.com'; 
        
        if (isTeacher) {
            router.push('/dashboard/teacher') // Chuyển hướng sang trang giáo viên
        } else {
            router.push('/dashboard/student') // Chuyển hướng sang trang học sinh
        }
        router.refresh()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] p-4">
      <div className="bg-white w-full max-w-[900px] h-auto md:h-[550px] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white">
        
        {/* Cột trái: Hình ảnh trang trí (Cho đẹp như yêu cầu) */}
        <div className="hidden md:flex w-1/2 bg-blue-600 relative flex-col justify-center p-12 text-white">
            <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-4">Math Master</h2>
                <p className="text-blue-100 text-lg leading-relaxed">
                    Nền tảng học toán trực tuyến dành riêng cho học sinh của thầy Vincent.
                </p>
            </div>
            {/* Hình tròn trang trí */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500 rounded-full opacity-50 blur-2xl"></div>
        </div>

        {/* Cột phải: Form đăng nhập */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
            <div className="mb-8 text-center md:text-left">
                <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Đăng Nhập</h1>
                <p className="text-slate-500">Nhập tài khoản được cấp để vào lớp học</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
                <div className="relative group">
                    <Mail className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input 
                        required
                        type="email" 
                        placeholder="Email (Ví dụ: hs1@mathmaster.com)"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-slate-700"
                    />
                </div>

                <div className="relative group">
                    <Lock className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input 
                        required
                        type="password" 
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-slate-700"
                    />
                </div>

                <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-blue-600/30 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                >
                    {loading ? <Loader2 className="animate-spin" /> : (
                        <>
                            Vào lớp học <ArrowRight size={20} />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-8 text-center text-sm text-slate-400">
                Bạn chưa có tài khoản? <br/>
                <span className="text-slate-500 font-medium">Vui lòng liên hệ Thầy giáo để được cấp.</span>
            </div>
        </div>
      </div>
    </div>
  )
}