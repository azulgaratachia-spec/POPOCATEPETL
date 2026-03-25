"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Truck,
  Users,
  TrendingUp,
  Settings,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/inventory", label: "Inventario", icon: Package },
  { href: "/procurement", label: "Compras", icon: ShoppingCart },
  { href: "/logistics", label: "Logística", icon: Truck },
  { href: "/suppliers", label: "Proveedores", icon: Users },
  { href: "/forecasting", label: "Pronósticos", icon: TrendingUp },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] bg-secondary flex flex-col border-r border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary">SCM Connect</h1>
            <p className="text-xs text-text-secondary">Supply Chain</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-4 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-primary/10 text-primary border-l-4 border-primary"
                      : "text-text-secondary hover:bg-surface hover:text-text-primary"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-3 border-t border-border">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-text-secondary hover:bg-surface hover:text-text-primary transition-all duration-200">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Configuración</span>
        </button>
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-text-secondary hover:bg-surface hover:text-text-primary transition-all duration-200">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}
