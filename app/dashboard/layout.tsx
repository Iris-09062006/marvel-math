import Sidebar from '../../components/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar cố định bên trái */}
      <Sidebar />

      {/* Nội dung chính bên phải (đẩy sang phải 64 unit để không bị che) */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 transition-all duration-300">
        {children}
      </main>
    </div>
  )
}