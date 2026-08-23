"use client";

import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

export default function TopBar({ user, onMenuClick }: { user?: any; onMenuClick?: () => void }) {
  const pathname = usePathname();
  
  // Create a simple breadcrumb based on pathname
  let pageTitle = "Dashboard";
  if (pathname.includes("/inventori/barang-masuk")) pageTitle = "Barang Masuk";
  else if (pathname.includes("/inventori/barang-keluar")) pageTitle = "Barang Keluar";
  else if (pathname.includes("/inventori/barang")) pageTitle = "Barang";
  else if (pathname.includes("/operasional/penghasilan")) pageTitle = "Penghasilan";
  else if (pathname.includes("/operasional/pengeluaran")) pageTitle = "Pengeluaran";
  else if (pathname.includes("/laporan")) pageTitle = "Laporan";
  else if (pathname.includes("/pengguna")) pageTitle = "Pengguna";

  return (
    <header 
      className="bg-surface h-16 border-b border-border flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0"
      style={{ zIndex: 10 }}
    >
      <div className="flex items-center">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 mr-2 text-text-muted hover:text-text-primary rounded-md focus:outline-none"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-semibold text-text-primary">{pageTitle}</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center text-sm bg-gray-50 px-3 py-1.5 rounded-full border border-border">
          <span className="font-medium text-text-primary">{user?.nama || "Administrator"}</span>
          <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary">
            {user?.role || "Admin"}
          </span>
        </div>
      </div>
    </header>
  );
}
