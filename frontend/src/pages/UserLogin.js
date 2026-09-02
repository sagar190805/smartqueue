import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../services/api";

const S = {
  wrap: { minHeight:"100vh", background:"#f8fafc", display:"flex", alignItems:"center", justifyContent:"center", padding:20 },
  card: { width:380, padding:"32px 28px", borderRadius:16 },
  logo: { display:"flex", alignItems:"center", gap:8, marginBottom:24, cursor:"pointer" },
  icon: (a="#0d9488") => ({ width:30, height:30, borderRadius:8, background:`linear-gradient(135deg,${a},#0f766e)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, color:"#fff" }),
  title: { fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:24, color:"#0f172a", marginBottom:24, textAlign:"center" },
  label: { display:"block", fontSize:11, color:"#475569", marginBottom:4, textTransform:"uppercase", letterSpacing:.5, fontWeight:600 },
  input: { width:"100%", padding:"12px", borderRadius:8, fontSize:14, marginBottom:16, fontFamily:"Inter,sans-serif" },
  btn: (a="#0d9488") => ({ width:"100%", padding:"12px", borderRadius:8, fontSize:14, fontWeight:600, cursor:"pointer", marginTop:4 }),
  foot: { textAlign:"center", marginTop:16, fontSize:13, color:"#64748b" },
  link: (a="#0d9488") => ({ color:a, cursor:"pointer", fontWeight:500 }),
};

export function AuthPage({ title, accent="#0d9488", children }) {
  const nav = useNavigate();
  return (
    <div style={S.wrap}>
      <div className="card" style={S.card}>
        <div style={{...S.logo, justifyContent:"center"}} onClick={() => nav("/")}>
          <div style={S.icon(accent)}>🎯</div>
          <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:22, color:"#0f172a" }}>SmartQueue</span>
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
      <input className="input-field" style={S.input} type={type} value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => e.key==="Enter" && onEnter && onEnter()} />
    </div>
  );
}

export function Btn({ children, onClick, loading, accent="primary" }) {
  return (
    <button className={`btn-${accent}`} style={{...S.btn(), opacity: loading ? .7 : 1 }}
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
      <Btn onClick={handle} loading={loading} accent="primary">Login</Btn>
      <div style={S.foot}>No account? <span style={S.link("#0d9488")} onClick={()=>nav("/user/register")}>Register</span></div>
    </AuthPage>
  );
}
