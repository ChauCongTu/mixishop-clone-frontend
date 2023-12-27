import './globals.css'
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/providers/auth';
import 'react-markdown-editor-lite/lib/index.css';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MixiShop - Thời Trang và Đồ Lưu Niệm Chất Lượng',
  description: 'MixiShop cung cấp thời trang và đồ lưu niệm độc đáo, chất lượng cao. Khám phá bộ sưu tập đa dạng, đặt hàng ngay hôm nay.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>

      <html lang="en">
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </html>
    </AuthProvider>
  )
}
