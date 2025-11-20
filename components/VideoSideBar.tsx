'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { PlayCircle, CheckCircle, Edit3, List, Save } from 'lucide-react'
import confetti from 'canvas-confetti'

type VideoSidebarProps = {
  currentId: string
  lessons: any[]
}

export default function VideoSidebar({ currentId, lessons }: VideoSidebarProps) {
  const [activeTab, setActiveTab] = useState<'playlist' | 'notes'>('playlist')
  const [note, setNote] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)

  // Load ghi chú từ localStorage (giả lập lưu ghi chú)
  useEffect(() => {
    const savedNote = localStorage.getItem(`note_${currentId}`)
    if (savedNote) setNote(savedNote)
    
    const savedStatus = localStorage.getItem(`completed_${currentId}`)
    if (savedStatus) setIsCompleted(true)
  }, [currentId])

  const handleSaveNote = () => {
    localStorage.setItem(`note_${currentId}`, note)
    alert('Đã lưu ghi chú vào máy của bạn!')
  }

  const handleComplete = () => {
    if (!isCompleted) {
      setIsCompleted(true)
      localStorage.setItem(`completed_${currentId}`, 'true')
      // Bắn pháo hoa
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563eb', '#4f46e5', '#ec4899', '#fbbf24']
      })
    }
  }

  return (
    <div className="bg-[#121212] border border-white/10 rounded-xl overflow-hidden flex flex-col h-fit lg:sticky lg:top-4 shadow-xl">
      
      {/* --- TABS --- */}
      <div className="flex border-b border-white/10 bg-[#1a1a1a]">
        <button 
          onClick={() => setActiveTab('playlist')}
          className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'playlist' ? 'text-blue-500 border-b-2 border-blue-500 bg-white/5' : 'text-gray-400 hover:text-white'
          }`}
        >
          <List size={16} /> Danh sách bài
        </button>
        <button 
          onClick={() => setActiveTab('notes')}
          className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'notes' ? 'text-blue-500 border-b-2 border-blue-500 bg-white/5' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Edit3 size={16} /> Ghi chú
        </button>
      </div>

      {/* --- NỘI DUNG TAB --- */}
      <div className="h-[600px] flex flex-col">
        
        {/* TAB 1: PLAYLIST */}
        {activeTab === 'playlist' && (
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
             {/* Nút Hoàn thành bài học */}
             <div className="mb-4 px-2">
                <button 
                  onClick={handleComplete}
                  disabled={isCompleted}
                  className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    isCompleted 
                      ? 'bg-green-500/20 text-green-400 cursor-default' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20'
                  }`}
                >
                  {isCompleted ? <><CheckCircle size={18}/> Đã hoàn thành</> : '🎉 Hoàn thành bài học'}
                </button>
             </div>

             <div className="space-y-1">
                {lessons.map((item, index) => {
                  const isActive = item.id === currentId
                  return (
                    <Link href={`/dashboard/student/${item.id}`} key={item.id} className={`p-3 flex gap-3 rounded-lg transition-colors group ${isActive ? 'bg-blue-900/20 border border-blue-500/30' : 'hover:bg-white/5 border border-transparent'}`}>
                        <span className={`text-sm w-6 pt-1 text-center font-mono ${isActive ? 'text-blue-400' : 'text-gray-600'}`}>{index + 1}</span>
                        <div className="flex-1">
                            <h4 className={`text-sm font-medium line-clamp-2 mb-1 ${isActive ? 'text-blue-300' : 'text-gray-300 group-hover:text-white'}`}>
                                {item.title}
                            </h4>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-gray-500 bg-white/10 px-1.5 py-0.5 rounded">Video</span>
                                {isActive && <span className="text-[10px] text-blue-400 flex items-center gap-1"><PlayCircle size={10} /> Đang phát</span>}
                            </div>
                        </div>
                    </Link>
                  )
                })}
             </div>
          </div>
        )}

        {/* TAB 2: GHI CHÚ */}
        {activeTab === 'notes' && (
          <div className="flex-1 flex flex-col p-4 bg-[#1a1a1a]">
             <p className="text-gray-400 text-xs mb-3">Ghi lại những kiến thức quan trọng trong bài học này. (Lưu trên trình duyệt)</p>
             <textarea 
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="flex-1 w-full bg-[#121212] border border-white/10 rounded-xl p-4 text-sm text-gray-200 focus:outline-none focus:border-blue-500 resize-none"
                placeholder="Ví dụ: Công thức đạo hàm của sin(x) là..."
             />
             <button 
                onClick={handleSaveNote}
                className="mt-3 w-full bg-white/10 hover:bg-white/20 text-white py-2.5 rounded-lg font-medium text-sm transition flex items-center justify-center gap-2"
             >
                <Save size={16} /> Lưu ghi chú
             </button>
          </div>
        )}

      </div>
    </div>
  )
}