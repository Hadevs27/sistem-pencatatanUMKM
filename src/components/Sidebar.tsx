"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  Wallet, 
  Receipt, 
  FileText, 
  Users,
  LogOut,
  QrCode,
  Banknote
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "MENU UTAMA",
    allowedRoles: ["Admin", "Staff"],
    items: [
      { name: "Dashboard", href: "/", icon: LayoutDashboard },
    ]
  },
  {
    title: "INVENTORI",
    allowedRoles: ["Admin"],
    items: [
      { name: "Bahan Baku", href: "/inventori/bahan-baku", icon: Package },
      { name: "Barang Masuk", href: "/inventori/barang-masuk", icon: ArrowDownToLine },
      { name: "Barang Keluar", href: "/inventori/barang-keluar", icon: ArrowUpFromLine },
    ]
  },
  {
    title: "PENJUALAN",
    allowedRoles: ["Admin", "Staff"],
    items: [
      { name: "Qris", href: "/penjualan/qris", icon: QrCode },
      { name: "Cash (Tunai)", href: "/penjualan/cash", icon: Banknote },
    ]
  },
  {
    title: "OPERASIONAL",
    allowedRoles: ["Admin", "Staff"],
    items: [
      { name: "Penghasilan", href: "/operasional/penghasilan", icon: Wallet },
      { name: "Pengeluaran", href: "/operasional/pengeluaran", icon: Receipt },
    ]
  },
  {
    title: "PENGATURAN",
    allowedRoles: ["Admin"],
    items: [
      { name: "Kelola Pengguna", href: "/pengguna", icon: Users },
    ]
  }
];

export default function Sidebar({ user, onNavigate }: { user?: any; onNavigate?: () => void }) {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      console.error(e);
    }
    window.location.href = "/login";
  };

  return (
    <>
      {/* Logo & Close Button (Mobile Only) */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-border flex-shrink-0">
        <span className="text-xl font-bold text-primary">NAMA UMKM</span>
        {onNavigate && (
          <button 
            className="md:hidden text-text-muted hover:text-text-primary focus:outline-none p-1"
            onClick={onNavigate}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {menuItems
          .filter(group => group.allowedRoles.includes(user?.role || "Admin"))
          .map((group, idx) => (
          <div key={idx}>
            {group.title && (
              <h3 className="px-3 text-xs font-semibold text-text-muted tracking-wider mb-2">
                {group.title}
              </h3>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => onNavigate?.()}
                    className={cn(
                      "flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary-light text-primary"
                        : "text-text-secondary hover:bg-gray-50 hover:text-text-primary"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 h-5 w-5 flex-shrink-0",
                        isActive ? "text-primary" : "text-text-muted"
                      )}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User Profile / Footer */}
      <div className="p-4 border-t border-border flex-shrink-0">
        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold flex-shrink-0">
            {user?.nama?.charAt(0) || "U"}
          </div>
          <div className="ml-3 flex-1 overflow-hidden">
            <p className="text-sm font-medium text-text-primary truncate">
              {user?.nama || "User"}
            </p>
            <p className="text-xs text-text-muted truncate">
              {user?.role || "Role"}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-danger hover:bg-danger-light rounded-md transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Keluar
        </button>
      </div>
    </>
  );
}
