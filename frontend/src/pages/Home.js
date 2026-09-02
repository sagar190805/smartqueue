import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();
  return (
    <div style={{ minHeight:"100vh", background:"#f8fafc", color:"#0f172a", fontFamily:"Inter,sans-serif", overflowX:"hidden", display:"flex", flexDirection:"column" }}>
      
      <header className="animate-fade-in-up" style={{ padding:"20px 40px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid rgba(0,0,0,0.05)", background:"rgba(255,255,255,0.8)", backdropFilter:"blur(12px)", position:"sticky", top:0, zIndex:50 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#0d9488,#14b8a6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, color:"#fff", boxShadow:"0 2px 8px rgba(13,148,136,0.3)" }}>🎯</div>
          <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:800, fontSize:22, letterSpacing:"-0.5px" }}>SmartQueue</span>
        </div>
        <div style={{ display:"flex", gap:12 }}>
          <button onClick={() => nav("/user/login")} style={{ padding:"10px 20px", fontSize:14, fontWeight:600, color:"#475569", background:"transparent", border:"none", cursor:"pointer", transition:"color 0.2s" }} onMouseOver={e=>e.currentTarget.style.color="#0f172a"} onMouseOut={e=>e.currentTarget.style.color="#475569"}>Log in</button>
          <button onClick={() => nav("/admin/login")} className="btn-primary" style={{ padding:"10px 24px", fontSize:14, borderRadius:20, boxShadow:"0 4px 12px rgba(13,148,136,0.2)" }}>Admin Portal</button>
        </div>
      </header>

      <main style={{ flex:1 }}>
        <section style={{ padding:"100px 20px 0", textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", background:"radial-gradient(ellipse at top, #ffffff 0%, #f8fafc 100%)" }}>
          
          <div className="animate-fade-in-up" style={{ display:"inline-block", padding:"6px 16px", background:"#f0fdfa", color:"#0d9488", borderRadius:30, fontSize:13, fontWeight:600, letterSpacing:0.5, border:"1px solid #ccfbf1", marginBottom:32, boxShadow:"0 2px 10px rgba(204,251,241,0.5)" }}>
            ✨ Next-Generation Queue Management
          </div>
          
          <h1 className="animate-fade-in-up delay-100" style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(48px, 8vw, 72px)", fontWeight:800, lineHeight:1.05, letterSpacing:"-1.5px", color:"#0f172a", maxWidth:900, marginBottom:24 }}>
            Stop waiting in line. <br />
            <span style={{ background:"linear-gradient(135deg,#0d9488,#3b82f6)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Start living your life.</span>
          </h1>
          
          <p className="animate-fade-in-up delay-200" style={{ fontSize:"clamp(18px, 2vw, 20px)", color:"#64748b", maxWidth:650, lineHeight:1.6, marginBottom:48 }}>
            SmartQueue digitizes the waiting experience. Join lines remotely, track your position in real-time, and arrive exactly when it's your turn to be served.
          </p>
          
          <div className="animate-fade-in-up delay-300" style={{ display:"flex", gap:16, flexWrap:"wrap", justifyContent:"center" }}>
            <button onClick={() => nav("/user/register")} className="btn-primary" style={{ padding:"16px 32px", fontSize:16, borderRadius:30, boxShadow:"0 10px 25px -5px rgba(13,148,136,0.4), 0 8px 10px -6px rgba(13,148,136,0.1)", transition:"transform 0.2s, box-shadow 0.2s" }} onMouseOver={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseOut={e=>e.currentTarget.style.transform="translateY(0)"}>Get Started as User</button>
            <button onClick={() => nav("/admin/register")} className="btn-secondary" style={{ padding:"16px 32px", fontSize:16, borderRadius:30, border:"1px solid #e2e8f0", background:"#fff", boxShadow:"0 4px 6px -1px rgba(0,0,0,0.05)" }}>Setup a Workplace</button>
          </div>

          <div className="animate-fade-in-up delay-400" style={{ marginTop: 80, width:"100%", maxWidth:1000, position:"relative" }}>
            <div style={{ position:"absolute", top:"-20%", left:"10%", right:"10%", bottom:"10%", background:"linear-gradient(to bottom, transparent, #f8fafc)", zIndex:1, pointerEvents:"none" }}></div>
            <img 
              src="/hero_illustration.jpg" 
              alt="SmartQueue 3D Illustration" 
              style={{ width:"100%", height:"auto", objectFit:"contain", filter:"drop-shadow(0 25px 35px rgba(0,0,0,0.05))", borderRadius:24, border:"1px solid rgba(255,255,255,0.5)", background:"#fff" }} 
              className="animate-float"
            />
          </div>
        </section>

        <section style={{ padding:"120px 20px 80px", display:"flex", justifyContent:"center", background:"#ffffff", position:"relative", zIndex:2 }}>
          <div style={{ maxWidth:1100, width:"100%" }}>
            <div style={{ textAlign:"center", marginBottom:80 }}>
              <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(32px, 4vw, 40px)", fontWeight:800, color:"#0f172a", marginBottom:16, letterSpacing:"-0.5px" }}>How SmartQueue Works</h2>
              <p style={{ color:"#64748b", fontSize:20, maxWidth:600, margin:"0 auto", lineHeight:1.5 }}>Everything you need to manage lines efficiently and keep your visitors happy.</p>
            </div>
            
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:40 }}>
              {[
                ["📱","Join Remotely","Users can select a workplace and pull a digital token directly from their phone, no app required."],
                ["⏱️","Live Tracking","Real-time WebSocket updates show exactly who is being served right now, so users never miss their turn."],
                ["📊","Admin Control","Create sessions, call the next token automatically, and view live queue analytics with a single click."]
              ].map(([emoji, title, desc], i) => (
                <div key={title} style={{ padding:40, background:"#f8fafc", borderRadius:24, border:"1px solid #f1f5f9", transition:"all 0.3s ease" }} onMouseOver={e=>{e.currentTarget.style.transform="translateY(-8px)"; e.currentTarget.style.boxShadow="0 20px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.01)"; e.currentTarget.style.background="#ffffff"; e.currentTarget.style.borderColor="#e2e8f0";}} onMouseOut={e=>{e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; e.currentTarget.style.background="#f8fafc"; e.currentTarget.style.borderColor="#f1f5f9";}}>
                  <div style={{ fontSize:40, marginBottom:24, background:"#ffffff", width:72, height:72, borderRadius:20, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 6px -1px rgba(0,0,0,0.05)" }}>{emoji}</div>
                  <h3 style={{ fontSize:22, fontWeight:800, color:"#0f172a", marginBottom:12, fontFamily:"'Space Grotesk',sans-serif", letterSpacing:"-0.5px" }}>{title}</h3>
                  <p style={{ color:"#64748b", lineHeight:1.6, fontSize:15 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer style={{ background:"#0f172a", color:"#94a3b8", padding:"60px 20px 40px", display:"flex", justifyContent:"center", marginTop:"auto" }}>
        <div style={{ maxWidth:1100, width:"100%", display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", gap:20 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:32, height:32, borderRadius:8, background:"linear-gradient(135deg,#0d9488,#14b8a6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, color:"#fff" }}>🎯</div>
            <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:20, color:"#f8fafc" }}>SmartQueue</span>
            <span style={{ marginLeft:16, paddingLeft:16, borderLeft:"1px solid #334155", fontSize:14 }}>© {new Date().getFullYear()} All rights reserved.</span>
          </div>
          <div style={{ display:"flex", gap:32, fontSize:14, fontWeight:500 }}>
            <span style={{cursor:"pointer", transition:"color 0.2s"}} onMouseOver={e=>e.currentTarget.style.color="#fff"} onMouseOut={e=>e.currentTarget.style.color="#94a3b8"}>Privacy Policy</span>
            <span style={{cursor:"pointer", transition:"color 0.2s"}} onMouseOver={e=>e.currentTarget.style.color="#fff"} onMouseOut={e=>e.currentTarget.style.color="#94a3b8"}>Terms of Service</span>
            <span style={{cursor:"pointer", transition:"color 0.2s"}} onMouseOver={e=>e.currentTarget.style.color="#fff"} onMouseOut={e=>e.currentTarget.style.color="#94a3b8"}>Contact Support</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
