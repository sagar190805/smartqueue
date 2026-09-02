import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {loginAdmin} from "../services/api";
import {AuthPage,Field,Btn} from "./UserLogin";
export default function AdminLogin(){
  const [f,setF]=useState({email:"",password:""});
  const [loading,setLoading]=useState(false);
  const nav=useNavigate();
  const handle=async()=>{
    setLoading(true);
    try{const res=await loginAdmin(f);localStorage.setItem("user",JSON.stringify(res.data));toast.success("Welcome Admin!");nav("/admin");}
    catch(e){toast.error(e.response?.data||"Login failed");}
    finally{setLoading(false);}
  };
  return(<AuthPage title="Admin Login" accent="#4f46e5"><Field label="Email" type="email" value={f.email} onChange={v=>setF({...f,email:v})}/><Field label="Password" type="password" value={f.password} onChange={v=>setF({...f,password:v})} onEnter={handle}/><Btn onClick={handle} loading={loading} accent="primary">Login as Admin</Btn><div style={{textAlign:"center",marginTop:16,fontSize:13,color:"#64748b"}}>No account? <span style={{color:"#4f46e5",cursor:"pointer",fontWeight:500}} onClick={()=>nav("/admin/register")}>Register</span></div></AuthPage>);
}
