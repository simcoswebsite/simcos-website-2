"use client";

import Link from "next/link"
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils"
import { Category } from "@/types";

interface MainNavProps {
  data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({
  data
}) => {
  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  return (
    <nav
      className="mx-6 flex items-center space-x-4 lg:space-x-6"
    >
      {/* {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-[#EBD6B7]',
            route.active ? 'text-black' : 'text-white'
          )}
        >
          {route.label}
      </Link>
      ))} */}
      <Link
          // key={route.href}
          href="/menu"
          className={cn(
            'text-sm font-medium transition-colors hover:text-[#EBD6B7] text-white'
          )}
        >
          Menu
      </Link>
      <Link
          // key={route.href}
          href="/login"
          className={cn(
            'text-sm font-medium transition-colors hover:text-[#EBD6B7] text-white'
          )}
        >
          Login
      </Link>
      <Link
          // key={route.href}
          href="/signup"
          className={cn(
            'text-sm font-medium transition-colors hover:text-[#EBD6B7] text-white'
          )}
        >
          Signup
      </Link>
    </nav>
  )
};

export default MainNav;