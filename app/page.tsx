import Link from 'next/link'
import { ArrowRight, GraduationCap, PlayCircle, Users, LogIn } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-100 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* SỬA LỖI: Dùng thẻ Link bao quanh Logo */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
             <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200">
                M
             </div>
             <span className="text-xl font-extrabold tracking-tight">Marvel <span className="text-blue-600">Math</span></span>
          </Link>
          
          <div className="flex items-center gap-4">
             <Link href="/login" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-bold transition shadow-lg shadow-blue-200">
                <LogIn size={18} />
                Vào lớp học
             </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
           <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full font-bold text-sm mb-8 border border-blue-100">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              Nền tảng học toán trực tuyến số 1 Việt Nam
           </div>
           
           <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-tight">
              Chinh phục Toán học <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Dễ dàng hơn bao giờ hết</span>
           </h1>
           
           <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              Hệ thống bài giảng video chất lượng cao dành riêng cho học sinh của thầy Vincent. Đăng nhập để bắt đầu lộ trình học tập ngay hôm nay.
           </p>
           
           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition shadow-xl shadow-blue-200 flex items-center justify-center gap-2">
                 Đăng nhập ngay <ArrowRight size={20} />
              </Link>
              <button className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg transition flex items-center justify-center gap-2 cursor-not-allowed opacity-70">
                 <PlayCircle size={20} /> Xem video giới thiệu
              </button>
           </div>
        </div>
      </section>

      {/* --- FEATURES --- */}
      <section id="features" className="py-20 bg-slate-50">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                     <PlayCircle size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Video bài giảng 4K</h3>
                  <p className="text-slate-500">Hàng trăm video bài giảng sắc nét, âm thanh sống động giúp bạn tiếp thu kiến thức nhanh chóng.</p>
               </div>
               
               <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group">
                  <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                     <GraduationCap size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Lộ trình chuẩn BGD</h3>
                  <p className="text-slate-500">Nội dung bám sát sách giáo khoa và đề thi Đại học, được biên soạn bởi các thầy cô giáo giỏi.</p>
               </div>

               <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group">
                  <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600 mb-6 group-hover:scale-110 transition-transform">
                     <Users size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Hỗ trợ 1:1</h3>
                  <p className="text-slate-500">Đội ngũ trợ giảng luôn sẵn sàng giải đáp mọi thắc mắc của bạn trong quá trình học tập.</p>
               </div>
            </div>
         </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white py-12 border-t border-slate-100">
         <div className="max-w-7xl mx-auto px-6 text-center text-slate-400">
            <p>&copy; MARVEL MATH. Nền tảng học toán trực tuyến.</p>
         </div>
      </footer>
    </div>
  )
}