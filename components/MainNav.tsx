"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useParams ,usePathname} from "next/navigation"
import { LayoutDashboard ,Presentation ,PackageOpen ,Scaling , Palette,Shirt,WalletCards, Settings} from 'lucide-react';

const MainNav = ({className,...props}:React.HTMLAttributes<HTMLElement>) => {
    const pathname = usePathname()
    const params = useParams()
    const size = 15
    
    const routes = [
        {
            icon:<LayoutDashboard size={size} />,
            href: `/${params.storeId}`,
            label : 'Dashboard',
            active : pathname === `/${params.storeId}`
        },
        {
            icon:<Presentation size={size} />,
            href: `/${params.storeId}/billboards`,
            label : 'Billboards',
            active : pathname === `/${params.storeId}/billboards`
        },
        {
            icon:<PackageOpen size={size} />,
            href: `/${params.storeId}/categories`,
            label : 'Categories',
            active : pathname === `/${params.storeId}/categories`
        },
        {
            icon:<Scaling size={size} />,
            href: `/${params.storeId}/sizes`,
            label : 'Sizes',
            active : pathname === `/${params.storeId}/sizes`
        },
        {
            icon:<Palette size={size} />,
            href: `/${params.storeId}/colors`,
            label : 'Colors',
            active : pathname === `/${params.storeId}/colors`
        },
        {
            icon:<Shirt size={size} />,
            href: `/${params.storeId}/products`,
            label : 'Products',
            active : pathname === `/${params.storeId}/products`
        },
        {
            icon:<WalletCards size={size} />,
            href: `/${params.storeId}/orders`,
            label : 'Orders',
            active : pathname === `/${params.storeId}/orders`
        },
        {
            icon:<Settings size={size} />,
            href: `/${params.storeId}/settings`,
            label : 'Settings',
            active : pathname === `/${params.storeId}/settings`
        }
    ]


    return (
        <nav className={cn("flex items-center space-x-4 lg:space-x-6",className)}>
            {routes.map((route)=>(
                <Link 
                    key={route.href}
                    href={route.href} 
                    className={cn("text-sm group flex items-center justify-center gap-x-1 font-medium transition-colors hover:text-primary",
                    route.active ? "text-primary dark:text-white" :"text-muted-foreground"
                    )}
                >
                    <div className={cn(`group-hover:translate-y-[-10%] transition`,
                    route.active && "translate-y-[-10%] " 
                    )}>
                        {route.icon}
                    </div>
                    <div>
                        {route.label}
                    </div>
                </Link>
            ))}
        </nav>
    )
}

export default MainNav