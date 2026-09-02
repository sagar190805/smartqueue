import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();
  return (
    <div style={{ minHeight:"100vh", background:"#f8fafc", color:"#0f172a", fontFamily:"Inter,sans-serif", display:"flex", flexDirection:"column", overflowX:"hidden" }}>
      
      <header className="animate-fade-in-up" style={{ padding:"20px 40px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid #e2e8f0", background:"rgba(255,255,255,0.9)", backdropFilter:"blur(8px)", position:"sticky", top:0, zIndex:50 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:38, height:38, borderRadius:10, background:"linear-gradient(135deg,#0d9488,#14b8a6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, color:"#fff", boxShadow:"0 2px 4px rgba(13,148,136,0.2)" }}>🎯</div>
          <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:22 }}>SmartQueue</span>
        </div>
        <div style={{ display:"flex", gap:16 }}>
          <button onClick={() => nav("/user/login")} style={{ padding:"10px 20px", fontSize:14, fontWeight:600, color:"#475569", background:"transparent", border:"none", cursor:"pointer" }}>User Login</button>
          <button onClick={() => nav("/admin/login")} className="btn-primary" style={{ padding:"10px 20px", fontSize:14 }}>Admin Portal</button>
        </div>
      </header>

      <main style={{ flex:1 }}>
        {/* Hero Section */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"80px 20px", background:"#ffffff", borderBottom:"1px solid #e2e8f0" }}>
          <div style={{ maxWidth:1100, width:"100%", display:"flex", flexWrap:"wrap", gap:60, alignItems:"center" }}>
            
            <div className="animate-fade-in-up delay-400" style={{ flex:"1 1 400px", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <img 
                src="/hero_illustration.jpg" 
                alt="SmartQueue 3D Illustration" 
                style={{ width:"100%", maxWidth: 500, height:"auto", objectFit:"contain", filter:"drop-shadow(0 20px 25px rgba(0,0,0,0.1))" }} 
                className="animate-float"
              />
            </div>

            <div style={{ flex:"1 1 400px" }}>
              <div className="animate-fade-in-up" style={{ display:"inline-block", padding:"6px 14px", background:"#f0fdfa", color:"#0d9488", borderRadius:20, fontSize:12, fontWeight:600, letterSpacing:1, textTransform:"uppercase", marginBottom:24, border:"1px solid #ccfbf1" }}>
                Next-Gen Queue Management
              </div>
              <h1 className="animate-fade-in-up delay-100" style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(40px, 5vw, 56px)", fontWeight:800, lineHeight:1.1, marginBottom:24, color:"#0f172a" }}>
                Say goodbye to <br/>
                <span className="text-teal">waiting in line.</span>
              </h1>
              <p className="animate-fade-in-up delay-200" style={{ fontSize:18, color:"#475569", marginBottom:40, lineHeight:1.6 }}>
                SmartQueue digitizes the waiting experience. Join lines remotely, track your position in real-time, and arrive exactly when it's your turn. Perfect for modern clinics, offices, and service centers.
              </p>
              <div className="animate-fade-in-up delay-300" style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
                <button onClick={() => nav("/user/register")} className="btn-primary" style={{ padding:"14px 28px", fontSize:16, boxShadow:"0 4px 6px -1px rgba(13,148,136,0.2)" }}>Get Started for Free</button>
                <button onClick={() => nav("/admin/register")} className="btn-secondary" style={{ padding:"14px 28px", fontSize:16, border:"1px solid #cbd5e1", background:"#fff" }}>Setup Workplace</button>
              </div>
            </div>

          </div>
        </div>

        {/* Features Section */}
        <div style={{ padding:"80px 20px", display:"flex", justifyContent:"center" }}>
          <div style={{ maxWidth:1100, width:"100%" }}>
            <div className="animate-fade-in-up" style={{ textAlign:"center", marginBottom:60 }}>
              <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:32, fontWeight:700, color:"#0f172a", marginBottom:16 }}>How SmartQueue Works</h2>
              <p style={{ color:"#64748b", fontSize:18, maxWidth:600, margin:"0 auto" }}>Everything you need to manage lines efficiently and keep your visitors happy.</p>
            </div>
            
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:30 }}>
              {[
                ["📱","Join Remotely","Users can select a workplace and pull a digital token from their phone."],
                ["⏱️","Live Tracking","Real-time WebSocket updates show exactly who is being served right now."],
                ["📊","Admin Control","Create sessions, call the next token, and view live queue analytics easily."]
              ].map(([emoji, title, desc], i) => (
                <div key={title} className={`card animate-fade-in-up delay-${(i+1)*100}`} style={{ padding:40, transition:"transform 0.2s, box-shadow 0.2s", cursor:"default" }} onMouseOver={e=>{e.currentTarget.style.transform="translateY(-5px)"; e.currentTarget.style.boxShadow="0 10px 15px -3px rgba(0,0,0,0.1)";}} onMouseOut={e=>{e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)";}}>
                  <div style={{ fontSize:40, marginBottom:20, background:"#f0fdfa", width:70, height:70, borderRadius:16, display:"flex", alignItems:"center", justifyContent:"center" }}>{emoji}</div>
                  <h3 style={{ fontSize:20, fontWeight:700, color:"#0f172a", marginBottom:12, fontFamily:"'Space Grotesk',sans-serif" }}>{title}</h3>
                  <p style={{ color:"#64748b", lineHeight:1.6 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ background:"#ffffff", borderTop:"1px solid #e2e8f0", padding:"40px 20px", display:"flex", justifyContent:"center", marginTop:"auto" }}>
        <div style={{ maxWidth:1100, width:"100%", display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", gap:20 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:28, height:28, borderRadius:6, background:"linear-gradient(135deg,#0d9488,#14b8a6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, color:"#fff" }}>🎯</div>
            <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:18, color:"#0f172a" }}>SmartQueue</span>
            <span style={{ color:"#94a3b8", marginLeft:8 }}>© {new Date().getFullYear()} All rights reserved.</span>
          </div>
          <div style={{ display:"flex", gap:24, color:"#64748b", fontSize:14 }}>
            <span style={{cursor:"pointer"}}>Privacy Policy</span>
            <span style={{cursor:"pointer"}}>Terms of Service</span>
            <span style={{cursor:"pointer"}}>Contact</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
