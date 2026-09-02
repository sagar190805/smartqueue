import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();
  return (
    <div style={{ minHeight:"100vh", background:"#f8fafc", color:"#0f172a", display:"flex", flexDirection:"column", alignItems:"center", padding:20, fontFamily:"Inter,sans-serif" }}>
      
      <div style={{ width:"100%", maxWidth:1000, display:"flex", justifyContent:"space-between", alignItems:"center", padding:"20px 0" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:38, height:38, borderRadius:10, background:"linear-gradient(135deg,#0d9488,#14b8a6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, color:"#fff" }}>🎯</div>
          <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:22 }}>SmartQueue</span>
        </div>
      </div>

      <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", textAlign:"center", maxWidth:800, marginTop:40 }}>
        <div style={{ display:"inline-block", padding:"6px 14px", background:"#f0fdfa", color:"#0d9488", borderRadius:20, fontSize:12, fontWeight:600, letterSpacing:1, textTransform:"uppercase", marginBottom:24, border:"1px solid #ccfbf1" }}>
          Next-Gen Queue Management
        </div>
        <h1 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(40px, 6vw, 64px)", fontWeight:800, lineHeight:1.1, marginBottom:24 }}>
          No more waiting in <br />
          <span className="text-teal">physical lines.</span>
        </h1>
        <p style={{ fontSize:"clamp(16px, 2vw, 20px)", color:"#475569", marginBottom:40, maxWidth:600, lineHeight:1.5 }}>
          SmartQueue lets you join lines digitally, track your position in real-time, and only show up when it's your turn. Perfect for hospitals, banks, and offices.
        </p>

        <div style={{ display:"flex", gap:20, flexWrap:"wrap", justifyContent:"center" }}>
          <div className="card" style={{ padding:32, width:300, textAlign:"left" }}>
            <div style={{ fontSize:32, marginBottom:16 }}>🧑‍💻</div>
            <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:20, marginBottom:8 }}>For Users</h3>
            <p style={{ color:"#64748b", fontSize:14, marginBottom:24, lineHeight:1.5 }}>Join queues remotely and track your wait time live.</p>
            <button onClick={() => nav("/user/login")} className="btn-primary" style={{ padding:"12px 24px", fontSize:15, width:"100%" }}>User Login ➔</button>
          </div>
          
          <div className="card" style={{ padding:32, width:300, textAlign:"left" }}>
            <div style={{ fontSize:32, marginBottom:16 }}>🏢</div>
            <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:20, marginBottom:8 }}>For Admins</h3>
            <p style={{ color:"#64748b", fontSize:14, marginBottom:24, lineHeight:1.5 }}>Manage workplaces, start sessions, and call tokens.</p>
            <button onClick={() => nav("/admin/login")} className="btn-secondary" style={{ padding:"12px 24px", fontSize:15, width:"100%" }}>Admin Portal ➔</button>
          </div>
        </div>
      </div>
    </div>
  );
}
