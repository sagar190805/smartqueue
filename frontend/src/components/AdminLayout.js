import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AdminLayout({ children, title }) {
  const nav = useNavigate();
  const loc = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const logout = () => { localStorage.removeItem("user"); nav("/"); };
  const links = [
    ["/admin","📊","Dashboard"],
    ["/admin/workplaces","🏢","Workplaces"],
    ["/admin/sessions","📋","Sessions"],
  ];
  return (
    <div style={{display:"flex",minHeight:"100vh",background:"#0a0e1a"}}>
      {/* Sidebar */}
      <div style={{width:210,background:"#0f1629",borderRight:"1px solid #1e2d4a",display:"flex",flexDirection:"column",flexShrink:0}}>
        <div style={{padding:"22px 18px 18px",borderBottom:"1px solid #1e2d4a"}}>
          <div style={{width:38,height:38,borderRadius:10,background:"linear-gradient(135deg,#6366f1,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,marginBottom:8}}>🎯</div>
          <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:16,color:"#fff"}}>SmartQueue</div>
          <div style={{fontSize:11,color:"#64748b",textTransform:"uppercase",letterSpacing:1}}>Admin Panel</div>
        </div>
        <div style={{padding:"14px 10px",flex:1}}>
          <div style={{fontSize:10,color:"#475569",textTransform:"uppercase",letterSpacing:1.5,padding:"0 8px",marginBottom:8}}>Navigation</div>
          {links.map(([path,icon,label])=>{
            const active = loc.pathname===path;
            return (
              <div key={path} onClick={()=>nav(path)} style={{display:"flex",alignItems:"center",gap:9,padding:"9px 10px",borderRadius:8,cursor:"pointer",marginBottom:2,fontSize:14,color:active?"#fff":"#94a3b8",background:active?"linear-gradient(135deg,#6366f1,#4f46e5)":"transparent",fontWeight:active?600:400}}>
                <span>{icon}</span><span>{label}</span>
              </div>
            );
          })}
        </div>
        <div style={{padding:"14px 18px",borderTop:"1px solid #1e2d4a",fontSize:12,color:"#475569",wordBreak:"break-all"}}>{user.email}</div>
      </div>
      {/* Main */}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div style={{height:58,background:"#0f1629",borderBottom:"1px solid #1e2d4a",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 24px",flexShrink:0}}>
          <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:19,color:"#fff"}}>{title}</div>
          <button onClick={logout} style={{padding:"6px 14px",borderRadius:8,border:"none",background:"#3f1f1f",color:"#f87171",fontSize:13,cursor:"pointer"}}>Logout</button>
        </div>
        <div style={{flex:1,padding:24,overflowY:"auto"}}>{children}</div>
      </div>
    </div>
  );
}
