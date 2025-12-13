"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  FileText,
  Briefcase,
  Wrench,
  ShoppingCart,
  Mail,
  Menu,
  X
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Products", path: "/admin/products", icon: Package },
  { name: "Orders", path: "/admin/orders", icon: ShoppingCart },
  { name: "Blog", path: "/admin/blog", icon: FileText },
  { name: "Projects", path: "/admin/projects", icon: Briefcase },
  { name: "Services", path: "/admin/services", icon: Wrench },
  { name: "Messages", path: "/admin/contact-messages", icon: Mail },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-50 bg-cyan-500 hover:bg-cyan-600 text-white p-3 rounded-full shadow-lg transition-all"
        aria-label="Toggle Menu"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop & Mobile */}
      <aside className={`
        w-64 bg-slate-800 border-r border-slate-700 min-h-[calc(100vh-73px)]
        lg:block
        ${isMobileMenuOpen ? 'fixed inset-y-0 left-0 z-50 top-[73px]' : 'hidden'}
      `}>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.path === "/admin" ? pathname === "/admin" : pathname?.startsWith(item.path) ?? false;

            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                  ? "bg-cyan-500 text-white"
                  : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
