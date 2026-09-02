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
    <div style={{display:"flex",minHeight:"100vh",background:"#f8fafc"}}>
      <div style={{width:220, background:"#ffffff", borderRight:"1px solid #e2e8f0", display:"flex",flexDirection:"column",flexShrink:0, zIndex:10}}>
        <div style={{padding:"22px 18px 18px",borderBottom:"1px solid #e2e8f0"}}>
          <div style={{width:38,height:38,borderRadius:10,background:"linear-gradient(135deg,#0d9488,#14b8a6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,marginBottom:8,boxShadow:"0 2px 4px rgba(13,148,136,0.2)",color:"#fff"}}>🎯</div>
          <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:18,color:"#0f172a"}}>SmartQueue</div>
          <div style={{fontSize:11,color:"#64748b",textTransform:"uppercase",letterSpacing:1}}>Admin Panel</div>
        </div>
        <div style={{padding:"14px 10px",flex:1}}>
          <div style={{fontSize:10,color:"#94a3b8",textTransform:"uppercase",letterSpacing:1.5,padding:"0 8px",marginBottom:8}}>Navigation</div>
          {links.map(([path,icon,label])=>{
            const active = loc.pathname===path;
            return (
              <div key={path} onClick={()=>nav(path)} style={{display:"flex",alignItems:"center",gap:9,padding:"9px 10px",borderRadius:8,cursor:"pointer",marginBottom:2,fontSize:14,color:active?"#0d9488":"#475569",background:active?"#f0fdfa":"transparent", border:active?"1px solid #ccfbf1":"1px solid transparent", fontWeight:active?600:400, transition:"all 0.2s ease"}}>
                <span>{icon}</span><span>{label}</span>
              </div>
            );
          })}
        </div>
        <div style={{padding:"14px 18px",borderTop:"1px solid #e2e8f0",fontSize:12,color:"#64748b",wordBreak:"break-all"}}>{user.email}</div>
      </div>
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"}}>
        <div style={{height:60, background:"#ffffff", borderBottom:"1px solid #e2e8f0", display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 24px",flexShrink:0, zIndex:5}}>
          <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:20,color:"#0f172a"}}>{title}</div>
          <button onClick={logout} className="btn-secondary" style={{padding:"6px 16px",fontSize:13}}>Logout</button>
        </div>
        <div style={{flex:1,padding:24,overflowY:"auto", zIndex:1}}>{children}</div>
      </div>
    </div>
  );
}
