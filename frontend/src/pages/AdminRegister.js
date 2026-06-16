import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {registerAdmin} from "../services/api";
import {AuthPage,Field,Btn} from "./UserLogin";
export default function AdminRegister(){
  const [f,setF]=useState({name:"",email:"",password:""});
  const [loading,setLoading]=useState(false);
  const nav=useNavigate();
  const handle=async()=>{
    setLoading(true);
    try{const res=await registerAdmin(f);localStorage.setItem("user",JSON.stringify(res.data));toast.success("Admin account created!");nav("/admin");}
    catch(e){toast.error(e.response?.data||"Registration failed");}
    finally{setLoading(false);}
  };
  return(<AuthPage title="Admin Registration" accent="#8b5cf6"><Field label="Name" value={f.name} onChange={v=>setF({...f,name:v})}/><Field label="Email" type="email" value={f.email} onChange={v=>setF({...f,email:v})}/><Field label="Password" type="password" value={f.password} onChange={v=>setF({...f,password:v})} onEnter={handle}/><Btn onClick={handle} loading={loading} accent="linear-gradient(135deg,#8b5cf6,#6d28d9)">Create Admin Account</Btn></AuthPage>);
}
