
import { AuthProvider } from '@/providers/auth'


export const metadata = {
    title: 'Đăng nhập | Mixi Shop',
    description: 'Trang đăng nhập của MixiShop.',
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
