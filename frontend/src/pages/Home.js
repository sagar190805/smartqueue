import React from "react";
import { useNavigate } from "react-router-dom";

const features = [
  ["⚡","Real-Time Updates","Live queue position via WebSocket — no refresh needed"],
  ["🎫","Digital Token","Join remotely, get a token, track your position from anywhere"],
  ["📊","Admin Dashboard","Start sessions, call next, view live analytics and charts"],
  ["🏢","Multi-Workplace","One admin manages multiple locations from one panel"],
  ["📈","Live Analytics","Avg wait time, tokens served, queue trends in real time"],
  ["🔒","Secure Auth","JWT tokens + BCrypt hashing — enterprise-grade security"],
];

export default function Home() {
  const nav = useNavigate();
  const btn = (bg,color,label,to) => (
    <button onClick={()=>nav(to)} style={{padding:"11px 26px",borderRadius:9,border:"none",background:bg,color,fontSize:14,fontWeight:500,cursor:"pointer"}}>{label}</button>
  );
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0a0e1a,#0f1629 50%,#0a0e1a)"}}>
      {/* Navbar */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"18px 48px",borderBottom:"1px solid #1e2d4a"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:36,height:36,borderRadius:9,background:"linear-gradient(135deg,#6366f1,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🎯</div>
          <span style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:20,color:"#fff"}}>SmartQueue</span>
        </div>
        <div style={{display:"flex",gap:10}}>
          {btn("#1e2d4a","#94a3b8","User Login","/user/login")}
          {btn("linear-gradient(135deg,#6366f1,#4f46e5)","#fff","Admin Login","/admin/login")}
        </div>
      </div>
      {/* Hero */}
      <div style={{textAlign:"center",padding:"80px 24px 60px"}}>
        <div style={{display:"inline-block",background:"#1e2d4a",color:"#818cf8",fontSize:13,padding:"5px 14px",borderRadius:20,marginBottom:22,fontWeight:500}}>Real-time Queue Management</div>
        <h1 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(34px,6vw,68px)",fontWeight:700,color:"#fff",lineHeight:1.1,marginBottom:20}}>
          Skip the Line.<br/>
          <span style={{background:"linear-gradient(135deg,#6366f1,#a78bfa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Join Digitally.</span>
        </h1>
        <p style={{fontSize:17,color:"#64748b",maxWidth:500,margin:"0 auto 36px",lineHeight:1.6}}>
          SmartQueue gives users a digital token and live position updates while admins control every queue in real time.
        </p>
        <div style={{display:"flex",justifyContent:"center",gap:12,flexWrap:"wrap"}}>
          {btn("linear-gradient(135deg,#6366f1,#4f46e5)","#fff","Get Started as User →","/user/register")}
          {btn("#1e2d4a","#94a3b8","Register as Admin","/admin/register")}
        </div>
      </div>
      {/* Features */}
      <div style={{maxWidth:1000,margin:"0 auto",padding:"0 24px 80px",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:16}}>
        {features.map(([icon,title,desc])=>(
          <div key={title} style={{background:"#0f1629",border:"1px solid #1e2d4a",borderRadius:14,padding:"22px 20px"}}>
            <div style={{fontSize:26,marginBottom:10}}>{icon}</div>
            <div style={{fontWeight:600,fontSize:15,color:"#e2e8f0",marginBottom:6}}>{title}</div>
            <div style={{fontSize:13,color:"#64748b",lineHeight:1.5}}>{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
