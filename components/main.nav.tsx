"use client";
import React from 'react'
import { usePathname, useRouter } from "next/navigation";
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Category } from '@/types';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Menu } from 'lucide-react';
import {Button} from "@/components/ui/button"
interface MainNavProps {
    data: Category[]
}
const MainNav: React.FC<MainNavProps> = ({
    data
}) => {
    const pathname = usePathname();
    const router = useRouter();
    const routes = (data.length > 0) ? data.map((route: Category)=> ({
        href: `/category/${route.id}`,
        label: route.name,
        active: pathname === `/category/${route.id}`
    })) : [];
  return (
    <nav className='md:mx-6 flex items-center space-x-4 lg:space-x-6'>
        {
            (routes.length > 0) ? routes.map((route: any) => (
                <Link
                key={route.href}
                href={route.href}
                className={cn(
                    "hidden md:block text-sm font-medium transition-colors hover:text-black dark:hover:text-green-500",
                    route.active ? "text-teal-500" : "dark:text-neutral-200 text-neutral-500"
                )}
                >{route.label}</Link>
            )) : <span className={cn(
                "hidden md:block text-sm font-medium transition-colors hover:text-black dark:hover:text-green-500"
            )}>No categories</span>
        }
         <DropdownMenu>
      <DropdownMenuTrigger asChild >
        <Button variant="outline" className="md:hidden ml-2">
            <Menu className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
            {(routes.length > 0) ? routes.map((route) => (
            <DropdownMenuItem 
            key={route.href} 
            onClick={() => { router.push(route.href) }}
            className={cn("text-sm font-medium transition-colors hover:text-black  dark:hover:text-green-500",
            route.active ? "text-teal-500" : "dark:text-neutral-200 text-neutral-500"
            )}
            >
                {route.label}
            </DropdownMenuItem>
            )) : <DropdownMenuItem className={cn("text-sm font-medium transition-colors hover:text-black  dark:hover:text-green-500"
            )}>No categories</DropdownMenuItem>}
        </DropdownMenuGroup>
       </DropdownMenuContent>
       </DropdownMenu>
    </nav>
  )
}

export default MainNav