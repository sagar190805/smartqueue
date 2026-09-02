import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();
  return (
    <div style={{ minHeight:"100vh", background:"#f8fafc", color:"#0f172a", fontFamily:"Inter,sans-serif", display:"flex", flexDirection:"column" }}>
      
      <header style={{ padding:"24px 40px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid #e2e8f0", background:"#fff" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:38, height:38, borderRadius:10, background:"linear-gradient(135deg,#0d9488,#14b8a6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, color:"#fff", boxShadow:"0 2px 4px rgba(13,148,136,0.2)" }}>🎯</div>
          <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:22 }}>SmartQueue</span>
        </div>
        <div style={{ display:"flex", gap:16 }}>
          <button onClick={() => nav("/user/login")} style={{ padding:"10px 20px", fontSize:14, fontWeight:600, color:"#475569", background:"transparent", border:"none", cursor:"pointer" }}>User Login</button>
          <button onClick={() => nav("/admin/login")} className="btn-primary" style={{ padding:"10px 20px", fontSize:14 }}>Admin Portal</button>
        </div>
      </header>

      <main style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"60px 20px" }}>
        <div style={{ maxWidth:1100, width:"100%", display:"flex", flexWrap:"wrap", gap:60, alignItems:"center" }}>
          
          <div style={{ flex:"1 1 400px" }}>
            <div style={{ display:"inline-block", padding:"6px 14px", background:"#f0fdfa", color:"#0d9488", borderRadius:20, fontSize:12, fontWeight:600, letterSpacing:1, textTransform:"uppercase", marginBottom:24, border:"1px solid #ccfbf1" }}>
              Next-Gen Queue Management
            </div>
            <h1 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(40px, 5vw, 56px)", fontWeight:800, lineHeight:1.1, marginBottom:24, color:"#0f172a" }}>
              Say goodbye to <br/>
              <span className="text-teal">waiting in line.</span>
            </h1>
            <p style={{ fontSize:18, color:"#475569", marginBottom:40, lineHeight:1.6 }}>
              SmartQueue digitizes the waiting experience. Join lines remotely, track your position in real-time, and arrive exactly when it's your turn. Perfect for modern clinics, offices, and service centers.
            </p>
            <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
              <button onClick={() => nav("/user/register")} className="btn-primary" style={{ padding:"14px 28px", fontSize:16 }}>Get Started for Free</button>
              <button onClick={() => nav("/admin/register")} className="btn-secondary" style={{ padding:"14px 28px", fontSize:16, border:"1px solid #cbd5e1", background:"#fff" }}>Setup Workplace</button>
            </div>
          </div>

          <div style={{ flex:"1 1 400px", position:"relative", height: 460, display:"flex", alignItems:"center", justifyContent:"center" }}>
             <div style={{ position:"absolute", width:"100%", height:"100%", background:"radial-gradient(circle at center, #ccfbf1 0%, transparent 70%)", opacity:0.6, zIndex:0 }}></div>
             
             <div className="card" style={{ width: 340, padding: 24, zIndex:1, boxShadow:"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
                  <div style={{ fontWeight:700, fontSize:16, color:"#0f172a" }}>City Hospital</div>
                  <div style={{ fontSize:12, color:"#10b981", background:"#dcfce7", padding:"4px 8px", borderRadius:12, fontWeight:600 }}>● Live</div>
                </div>

                <div style={{ textAlign:"center", marginBottom:30 }}>
                  <div style={{ fontSize:13, color:"#64748b", textTransform:"uppercase", letterSpacing:1, marginBottom:8 }}>Now Serving</div>
                  <div className="text-teal" style={{ fontSize:56, fontWeight:800, fontFamily:"'Space Grotesk',sans-serif", lineHeight:1 }}>142</div>
                </div>

                <div>
                  <div style={{ fontSize:13, color:"#64748b", marginBottom:12, fontWeight:500 }}>Your Token</div>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:16, border:"1px solid #e2e8f0", borderRadius:12, background:"#f8fafc" }}>
                    <div style={{ fontSize:24, fontWeight:700, color:"#0f172a" }}>145</div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontSize:12, color:"#64748b" }}>Est. Wait</div>
                      <div style={{ fontSize:14, fontWeight:600, color:"#f59e0b" }}>~6 mins</div>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop:24, display:"flex", gap:12 }}>
                  <div style={{ flex:1, height:40, borderRadius:8, background:"#f1f5f9", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, color:"#475569", fontWeight:600 }}>Leave</div>
                  <div style={{ flex:2, height:40, borderRadius:8, background:"#0d9488", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, color:"#fff", fontWeight:600 }}>View Details</div>
                </div>
             </div>

             <div className="card" style={{ position:"absolute", width: 340, height: 320, right: 20, bottom: 40, zIndex:0, opacity:0.4, transform:"rotate(6deg)", filter:"blur(1px)" }}></div>
             <div className="card" style={{ position:"absolute", width: 340, height: 320, left: 20, top: 40, zIndex:0, opacity:0.4, transform:"rotate(-6deg)", filter:"blur(1px)" }}></div>
          </div>
        </div>
      </main>

    </div>
  );
}
