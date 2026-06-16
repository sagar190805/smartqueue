import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../services/api";

const S = {
  wrap: { minHeight:"100vh", background:"#0a0e1a", display:"flex", alignItems:"center", justifyContent:"center", padding:20 },
  card: { width:360, background:"#0f1629", border:"1px solid #1e2d4a", borderRadius:16, padding:"32px 28px" },
  logo: { display:"flex", alignItems:"center", gap:8, marginBottom:24, cursor:"pointer" },
  icon: (a="#6366f1") => ({ width:30, height:30, borderRadius:8, background:`linear-gradient(135deg,${a},#8b5cf6)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15 }),
  title: { fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:22, color:"#fff", marginBottom:20 },
  label: { display:"block", fontSize:11, color:"#64748b", marginBottom:4, textTransform:"uppercase", letterSpacing:.5 },
  input: { width:"100%", padding:"10px 12px", background:"#1e2d4a", border:"1px solid #2d3f5e", borderRadius:8, color:"#e2e8f0", fontSize:14, outline:"none", marginBottom:14, fontFamily:"Inter,sans-serif" },
  btn: (a="linear-gradient(135deg,#6366f1,#4f46e5)") => ({ width:"100%", padding:11, borderRadius:8, border:"none", background:a, color:"#fff", fontSize:14, fontWeight:600, cursor:"pointer", marginTop:4 }),
  foot: { textAlign:"center", marginTop:14, fontSize:13, color:"#64748b" },
  link: (a="#6366f1") => ({ color:a, cursor:"pointer" }),
};

export function AuthPage({ title, accent="#6366f1", children }) {
  const nav = useNavigate();
  return (
    <div style={S.wrap}>
      <div style={S.card}>
        <div style={S.logo} onClick={() => nav("/")}>
          <div style={S.icon(accent)}>🎯</div>
          <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:"#fff" }}>SmartQueue</span>
        </div>
        <div style={S.title}>{title}</div>
        {children}
      </div>
    </div>
  );
}

export function Field({ label, type="text", value, onChange, onEnter }) {
  return (
    <div>
      <label style={S.label}>{label}</label>
      <input style={S.input} type={type} value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => e.key==="Enter" && onEnter && onEnter()} />
    </div>
  );
}

export function Btn({ children, onClick, loading, accent }) {
  return (
    <button style={{ ...S.btn(accent), opacity: loading ? .7 : 1 }}
      onClick={onClick} disabled={loading}>
      {loading ? "Please wait…" : children}
    </button>
  );
}

export default function UserLogin() {
  const [f, setF] = useState({ email:"", password:"" });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const handle = async () => {
    setLoading(true);
    try {
      const res = await loginUser(f);
      localStorage.setItem("user", JSON.stringify(res.data));
      toast.success("Welcome back!");
      nav("/user");
    } catch(e) { toast.error(e.response?.data || "Login failed"); }
    finally { setLoading(false); }
  };
  return (
    <AuthPage title="User Login">
      <Field label="Email" type="email" value={f.email} onChange={v=>setF({...f,email:v})} />
      <Field label="Password" type="password" value={f.password} onChange={v=>setF({...f,password:v})} onEnter={handle} />
      <Btn onClick={handle} loading={loading}>Login</Btn>
      <div style={S.foot}>No account? <span style={S.link()} onClick={()=>nav("/user/register")}>Register</span></div>
    </AuthPage>
  );
}
