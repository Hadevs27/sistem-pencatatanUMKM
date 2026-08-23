"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, User, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = (await res.json()) as any;

      if (!res.ok) {
        throw new Error(data.error || "Login gagal");
      }

      router.push("/");
      router.refresh(); // Refresh to ensure middleware catches session
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full relative">
      
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/login-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />
      
      {/* Mobile Dark Overlay for better contrast */}
      <div 
        className="absolute inset-0 z-0 md:hidden" 
        style={{ backgroundColor: "rgba(15, 23, 42, 0.4)" }} 
      />

      {/* Content Layer */}
      <div className="relative z-10 w-full flex flex-col md:flex-row min-h-screen">
        
        {/* Left Space - Allows background text/image to show on tablet/desktop */}
        <div className="hidden md:flex md:w-1/2 lg:w-[55%] xl:w-[60%]"></div>

        {/* Right Side - Login Form Container */}
        <div className="w-full md:w-1/2 lg:w-[45%] xl:w-[40%] flex items-center justify-center p-4 sm:p-8 md:p-10 lg:p-12">
          
          {/* The Login Card */}
          <div className="bg-surface w-full max-w-[420px] sm:max-w-[460px] rounded-3xl sm:rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-border mx-auto flex flex-col justify-center animate-in fade-in zoom-in duration-500">
            
            <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
              <div className="mb-4 sm:mb-5">
                {/* Store Icon */}
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 sm:w-12 sm:h-12">
                  <path d="M4 7V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V7M4 7L5 3H19L20 7M4 7C4 8.65685 5.34315 10 7 10C8.65685 10 10 8.65685 10 7M20 7C20 8.65685 18.6569 10 17 10C15.3431 10 14 8.65685 14 7M10 7C10 8.65685 11.3431 10 13 10C14.6569 10 16 8.65685 16 7M10 7C10 5.34315 11.3431 4 13 4M14 7H16" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 21V16C9 15.4477 9.44772 15 10 15H14C14.5523 15 15 15.4477 15 16V21" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">Selamat Datang</h2>
              <p className="text-text-secondary mt-1.5 sm:mt-2 text-xs sm:text-sm">Masuk ke akun Anda untuk melanjutkan</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
              {error && (
                <div className="bg-danger-light text-danger p-3 sm:p-4 rounded-xl text-xs sm:text-sm font-medium text-center">
                  {error}
                </div>
              )}
              
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-[11px] sm:text-xs font-bold text-text-secondary uppercase tracking-wider">Username</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none">
                    <User className="h-4 w-4 sm:h-5 sm:w-5 text-text-muted transition-colors" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm text-text-primary placeholder-text-muted"
                    placeholder="Masukkan username"
                  />
                </div>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-[11px] sm:text-xs font-bold text-text-secondary uppercase tracking-wider">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-text-muted transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-3.5 bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm text-text-primary placeholder-text-muted"
                    placeholder="•••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 sm:pr-4 flex items-center text-text-muted hover:text-text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} className="sm:w-5 sm:h-5" /> : <Eye size={16} className="sm:w-5 sm:h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center pt-1 sm:pt-2 pb-2 sm:pb-3">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 sm:h-4.5 sm:w-4.5 rounded border-border text-primary focus:ring-primary bg-surface cursor-pointer transition-all"
                />
                <label htmlFor="remember-me" className="ml-2 block text-xs sm:text-sm font-medium text-text-secondary cursor-pointer">
                  Ingat saya
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={cn(
                  "w-full bg-primary hover:bg-primary-hover text-surface py-3 sm:py-4 px-4 rounded-xl font-bold transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-md hover:shadow-lg active:scale-[0.98]",
                  loading && "opacity-70 cursor-not-allowed active:scale-100"
                )}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  "Masuk Sekarang"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
