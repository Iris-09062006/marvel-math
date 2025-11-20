import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Đảm bảo file này đã tồn tại (xem Bước 2)

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marvel Math",
  description: "Nền tảng học toán trực tuyến",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}