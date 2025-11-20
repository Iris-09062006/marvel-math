'use client'

import YouTube, { YouTubeProps } from 'react-youtube'

export default function VideoPlayer({ videoId }: { videoId: string }) {
  
  // Hàm xử lý khi video chạy hết: Ép chạy lại ngay lập tức
  const handleVideoEnd: YouTubeProps['onEnd'] = (event) => {
    event.target.playVideo();
  }

  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      rel: 0,             
      modestbranding: 1,  
      iv_load_policy: 3,  
      controls: 1,        
      
      // --- CẤU HÌNH LẶP LẠI (LOOP) ---
      loop: 1,            // Bật chế độ lặp
      playlist: videoId,  // BẮT BUỘC: Phải đặt playlist là chính ID của video này thì loop mới hoạt động
    },
  }

  return (
    <div className="relative w-full h-full bg-black rounded-xl overflow-hidden">
      <YouTube
        videoId={videoId}
        opts={opts}
        onEnd={handleVideoEnd} // Sự kiện dự phòng: Hết video -> Tự bấm Play lại
        className="w-full h-full"
        iframeClassName="w-full h-full"
      />
    </div>
  )
}