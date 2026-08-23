"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

export default function DashboardShell({
  user,
  children,
}: {
  user: any;
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden relative">
      
      {/* Desktop Sidebar (hidden on mobile) */}
      <div 
        className="hidden md:flex h-screen w-64 flex-shrink-0 flex-col border-r border-border relative"
        style={{ backgroundColor: 'white', zIndex: 10 }}
      >
        <Sidebar user={user} />
      </div>

      {/* Mobile Sidebar (Fixed Overlay) */}
      <div 
        className="md:hidden fixed inset-0 flex transition-opacity duration-300"
        style={{
          zIndex: 60,
          pointerEvents: isSidebarOpen ? 'auto' : 'none',
          opacity: isSidebarOpen ? 1 : 0
        }}
      >
        {/* Dark Overlay Backdrop */}
        <div 
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setIsSidebarOpen(false)}
        />
        
        {/* Sidebar Panel sliding from left */}
        <div 
          className="relative w-64 h-screen flex flex-col shadow-2xl transition-transform duration-300 ease-in-out"
          style={{
            backgroundColor: 'white',
            transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)'
          }}
        >
          <Sidebar user={user} onNavigate={() => setIsSidebarOpen(false)} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative z-0">
        <TopBar 
          user={user} 
          onMenuClick={() => setIsSidebarOpen(true)} 
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative z-0">
          {children}
        </main>
      </div>
    </div>
  );
}
