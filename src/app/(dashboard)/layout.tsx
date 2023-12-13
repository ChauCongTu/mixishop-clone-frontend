
import { AuthProvider } from '@/providers/auth'


export const metadata = {
    title: 'MixiShop - Thời Trang và Đồ Lưu Niệm Chất Lượng',
    description: 'MixiShop cung cấp thời trang và đồ lưu niệm độc đáo, chất lượng cao. Khám phá bộ sưu tập đa dạng, đặt hàng ngay hôm nay.',
}

export default function DashboardLayouts({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
        </>
    )
}
