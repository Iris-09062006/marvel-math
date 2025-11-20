'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { BookOpen, LogOut, Upload } from 'lucide-react'
import { createClient } from '../utils/supabase/client'
import { useEffect, useState } from 'react'

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.email) {
        const email = user.email.toLowerCase()
        // Logic kiểm tra: Nếu email chứa chữ 'teacher', 'admin' hoặc 'gv' -> Là Giáo viên
        if (email.includes('teacher') || email.includes('admin') || email.includes('gv')) {
          setIsAdmin(true)
        }
      }
    }
    checkUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  // --- HÀM XỬ LÝ KHI BẤM LOGO ---
  const handleLogoClick = () => {
    router.push('/dashboard/student')
    router.refresh() // Refresh để đảm bảo dữ liệu mới nhất được tải về
  }

  const menuItems = [
    { name: 'Kho bài học', href: '/dashboard/student', icon: BookOpen },
  ]

  if (isAdmin) {
    menuItems.push({ name: 'Đăng bài (GV)', href: '/dashboard/teacher', icon: Upload })
  }

  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-slate-200 flex flex-col shadow-xl z-50 hidden md:flex">
      
      {/* --- LOGO (Có tương tác click) --- */}
      <div 
        onClick={handleLogoClick}
        className="p-8 border-b border-slate-100 flex items-center gap-3 hover:bg-slate-50 transition-colors group cursor-pointer"
        title="Về trang chủ Dashboard"
      >
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-blue-300 shadow-lg group-hover:scale-110 transition-transform">
          M
        </div>
        <div>
            <span className="block text-xl font-extrabold text-slate-800 leading-none">Marvel</span>
            <span className="text-xs text-blue-600 font-bold tracking-wider">MATH</span>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 font-bold text-sm ${
                isActive
                  ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon size={20} className={isActive ? "text-blue-600" : "text-slate-400"} />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Footer Logout */}
      <div className="p-4 border-t border-slate-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all font-bold text-sm group"
        >
          <LogOut size={20} className="group-hover:scale-110 transition-transform" />
          Đăng xuất
        </button>
      </div>
    </div>
  )
}