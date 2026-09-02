import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, LayoutDashboard, Zap, ShieldCheck } from "lucide-react";

export default function Home() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col overflow-x-hidden selection:bg-teal-200">
      
      {/* Navbar */}
      <header className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => nav("/")}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-teal-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="4" />
              <path d="M12 3v-2" />
              <path d="M12 23v-2" />
              <path d="M3 12h-2" />
              <path d="M23 12h-2" />
            </svg>
          </div>
          <span className="text-2xl font-extrabold tracking-tighter text-slate-900">
            Smart<span className="text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-teal-400">Queue</span>
            <span className="text-teal-500">.</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => nav("/user/login")} className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors bg-transparent border-none outline-none">Log in</button>
          <button onClick={() => nav("/admin/login")} className="text-sm font-semibold bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-slate-800 transition-all shadow-md">Admin Portal</button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section - Split Layout */}
        <section className="relative px-6 py-20 lg:py-32 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-teal-50 via-slate-50 to-slate-50 -z-10"></div>
          
          <div className="flex-1 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-bold tracking-wide uppercase mb-8 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              Next-Gen Queue Management
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-slate-900">
              Stop waiting in line. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-400">Start living your life.</span>
            </h1>
            
            <p className="text-lg text-slate-600 mb-10 max-w-xl leading-relaxed">
              SmartQueue digitizes the waiting experience. Join lines remotely, track your position in real-time, and arrive exactly when it's your turn to be served. No apps to download.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <button onClick={() => nav("/user/register")} className="group flex items-center gap-2 bg-teal-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-teal-500 transition-all shadow-xl shadow-teal-500/30 hover:-translate-y-0.5">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => nav("/admin/register")} className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-semibold text-lg hover:bg-slate-50 transition-all hover:-translate-y-0.5 shadow-sm">
                Setup Workplace
              </button>
            </div>
          </div>

          <div className="flex-1 w-full relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-transparent blur-3xl rounded-full -z-10"></div>
            <img 
              src="/hero_illustration.jpg" 
              alt="SmartQueue 3D Illustration" 
              className="w-full max-w-lg mx-auto rounded-3xl shadow-2xl shadow-slate-200/50 border border-white bg-white/50 backdrop-blur-sm p-2 animate-[pulse_4s_ease-in-out_infinite]"
            />
          </div>
        </section>

        {/* Features Bento Box Style */}
        <section className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Everything you need. <span className="text-slate-400">Nothing you don't.</span></h2>
              <p className="text-slate-600 text-lg max-w-2xl">Manage lines efficiently and keep your visitors happy with our powerful, minimalist toolset.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-teal-600 shadow-sm mb-6 border border-slate-100 group-hover:scale-110 transition-transform">
                  <LayoutDashboard className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Join Remotely</h3>
                <p className="text-slate-600 leading-relaxed">Users can select a workplace and pull a digital token directly from their browser. No clunky app installations required.</p>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-amber-500 shadow-sm mb-6 border border-slate-100 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Live Tracking</h3>
                <p className="text-slate-600 leading-relaxed">Real-time WebSocket updates show exactly who is being served right now, so users never miss their turn or wait unnecessarily.</p>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-500 shadow-sm mb-6 border border-slate-100 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Admin Control</h3>
                <p className="text-slate-600 leading-relaxed">Create sessions, call the next token automatically, and view live queue analytics with a single click from the secure dashboard.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="4" />
                <path d="M12 3v-2" />
                <path d="M12 23v-2" />
                <path d="M3 12h-2" />
                <path d="M23 12h-2" />
              </svg>
            </div>
            <span className="text-xl font-extrabold tracking-tighter text-white">
              Smart<span className="text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-teal-400">Queue</span>
              <span className="text-teal-500">.</span>
            </span>
            <span className="border-l border-slate-700 pl-4 ml-2 text-sm text-slate-500">© {new Date().getFullYear()}</span>
          </div>
          <div className="flex gap-8 text-sm font-medium">
            <span className="cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
            <span className="cursor-pointer hover:text-white transition-colors">Terms of Service</span>
            <span className="cursor-pointer hover:text-white transition-colors">Contact Support</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
