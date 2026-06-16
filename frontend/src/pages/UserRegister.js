import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {registerUser} from "../services/api";
import {AuthPage,Field,Btn} from "./UserLogin";
export default function UserRegister(){
  const [f,setF]=useState({name:"",email:"",password:""});
  const [loading,setLoading]=useState(false);
  const nav=useNavigate();
  const handle=async()=>{
    setLoading(true);
    try{const res=await registerUser(f);localStorage.setItem("user",JSON.stringify(res.data));toast.success("Account created!");nav("/user");}
    catch(e){toast.error(e.response?.data||"Registration failed");}
    finally{setLoading(false);}
  };
  return(<AuthPage title="Create Account"><Field label="Name" value={f.name} onChange={v=>setF({...f,name:v})}/><Field label="Email" type="email" value={f.email} onChange={v=>setF({...f,email:v})}/><Field label="Password" type="password" value={f.password} onChange={v=>setF({...f,password:v})} onEnter={handle}/><Btn onClick={handle} loading={loading}>Register</Btn><div style={{textAlign:"center",marginTop:14,fontSize:13,color:"#64748b"}}>Have account? <span style={{color:"#6366f1",cursor:"pointer"}} onClick={()=>nav("/user/login")}>Login</span></div></AuthPage>);
}
