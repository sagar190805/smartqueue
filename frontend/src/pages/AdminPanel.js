import React, { useEffect, useState, useCallback } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import toast from "react-hot-toast";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import AdminLayout from "../components/AdminLayout";
import { getWorkplacesByAdmin, startSession, nextToken, closeSession, getQueueMembers, getCurrentToken, getSessionDetails, getAnalytics } from "../services/api";

export default function AdminPanel() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [workplaces, setWorkplaces] = useState([]);
  const [wp, setWp]               = useState(null);
  const [session, setSession]     = useState(null);
  const [queue, setQueue]         = useState([]);
  const [current, setCurrent]     = useState(0);
  const [analytics, setAnalytics] = useState(null);
  const [sessionName, setSessionName] = useState("");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading]     = useState(false);

  useEffect(() => {
    if (!user.id) return;
    getWorkplacesByAdmin(user.id).then(r => { setWorkplaces(r.data); if (r.data.length > 0) setWp(r.data[0]); }).catch(() => {});
  }, [user.id]);

  const refresh = useCallback(async () => {
    if (!wp) return;
    try {
      const [sess, q, cur, anl] = await Promise.all([getSessionDetails(wp.id), getQueueMembers(wp.id), getCurrentToken(wp.id), getAnalytics(wp.id)]);
      setSession(sess.data); setQueue(q.data || []); setCurrent(cur.data); setAnalytics(anl.data);
      setChartData(prev => {
        const t = new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"});
        return [...prev, { time:t, waiting:q.data?.length||0, served:cur.data }].slice(-20);
      });
    } catch {}
  }, [wp]);

  useEffect(() => {
    if (!wp) return;
    refresh();
    const poll = setInterval(refresh, 5000);
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      onConnect: () => client.subscribe(`/topic/queue/${wp.id}`, () => refresh()),
      reconnectDelay: 3000,
    });
    client.activate();
    return () => { clearInterval(poll); client.deactivate(); };
  }, [wp, refresh]);

  const handleStart = async () => {
    if (!sessionName.trim()) { toast.error("Enter a session name"); return; }
    setLoading(true);
    try { await startSession(wp.id, sessionName.trim()); toast.success("Session started!"); refresh(); setSessionName(""); }
    catch (e) { toast.error(e.response?.data || "Failed"); }
    finally { setLoading(false); }
  };

  const handleNext = async () => {
    try { await nextToken(wp.id); toast.success("Called next token!"); refresh(); }
    catch (e) { toast.error(e.response?.data || "Failed"); }
  };

  const handleClose = async () => {
    try { await closeSession(wp.id); toast.success("Session closed"); refresh(); }
    catch (e) { toast.error(e.response?.data || "Failed"); }
  };

  const tt = { contentStyle:{background:"#ffffff",border:"1px solid #cbd5e1",borderRadius:8,color:"#0f172a",boxShadow:"0 4px 6px -1px rgba(0,0,0,0.1)"} };

  return (
    <AdminLayout title="Dashboard">
      
      <div style={{ marginBottom:20 }}>
        <select value={wp?.id||""} onChange={e=>{setWp(workplaces.find(x=>x.id===e.target.value));setChartData([]);}}
          className="input-field"
          style={{padding:"8px 12px",borderRadius:9,fontSize:14,minWidth:250}}>
          {workplaces.length===0 && <option>No workplaces — add one first</option>}
          {workplaces.map(w=><option key={w.id} value={w.id}>{w.name} ({w.type})</option>)}
        </select>
      </div>

      
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12,marginBottom:18}}>
        {[
          ["🎫","Now Serving",current,"#0ea5e9"],
          ["⏳","Waiting",queue.length,"#4f46e5"],
          ["✅","Total Served",analytics?.totalServed??0,"#10b981"],
          ["⏱️","Avg Wait",analytics?`${Math.round(analytics.avgWaitSeconds)}s`:"0s","#f59e0b"],
          ["📋","Session",session?.sessionName||"None","#8b5cf6"],
        ].map(([icon,label,val,color])=>(
          <div key={label} className="card" style={{padding:"20px", borderRadius:14}}>
            <div style={{fontSize:22,marginBottom:8}}>{icon}</div>
            <div style={{fontSize:typeof val==="number"?28:16,fontWeight:700,color,fontFamily:"'Space Grotesk',sans-serif",marginBottom:3}}>{val}</div>
            <div style={{fontSize:10,color:"#64748b",textTransform:"uppercase",letterSpacing:.8}}>{label}</div>
          </div>
        ))}
      </div>

      
      <div className="card" style={{marginBottom:18,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12, padding:"20px", borderRadius:14}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{width:10,height:10,borderRadius:"50%",background:session?.active?"#10b981":"#ef4444",display:"inline-block"}}/>
          <span style={{fontWeight:600,color:"#0f172a",fontSize:15}}>{session?.active?`Active: "${session.sessionName}"`:"No active session"}</span>
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
          {!session?.active ? (
            <>
              <input placeholder="Session name (e.g. Morning)" value={sessionName} onChange={e=>setSessionName(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&handleStart()}
                className="input-field"
                style={{padding:"8px 11px",borderRadius:8,fontSize:13,width:210}}/>
              <button onClick={handleStart} disabled={loading} className="btn-primary"
                style={{padding:"8px 16px",fontSize:13}}>
                {loading?"Starting…":"▶ Start Session"}
              </button>
            </>
          ) : (
            <>
              <button onClick={handleNext} className="btn-primary" style={{padding:"8px 16px",fontSize:13}}>🔔 Call Next</button>
              <button onClick={handleClose} className="btn-danger" style={{padding:"8px 16px",fontSize:13}}>■ Close</button>
            </>
          )}
        </div>
      </div>

      
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:18}}>
        <div className="card" style={{padding:"20px", borderRadius:14}}>
          <div style={{fontWeight:600,color:"#0f172a",marginBottom:3}}>Live Queue Size</div>
          <div style={{fontSize:11,color:"#64748b",marginBottom:14}}>Updates every 5 seconds</div>
          <ResponsiveContainer width="100%" height={170}>
            <AreaChart data={chartData} margin={{top:5,right:5,bottom:5,left:-20}}>
              <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0d9488" stopOpacity={.2}/><stop offset="95%" stopColor="#0d9488" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0"/>
              <XAxis dataKey="time" tick={{fill:"#64748b",fontSize:9}}/>
              <YAxis tick={{fill:"#64748b",fontSize:9}} allowDecimals={false}/>
              <Tooltip {...tt}/>
              <Area type="monotone" dataKey="waiting" stroke="#0d9488" fill="url(#g1)" strokeWidth={3} name="Waiting"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="card" style={{padding:"20px", borderRadius:14}}>
          <div style={{fontWeight:600,color:"#0f172a",marginBottom:3}}>Served vs Waiting</div>
          <div style={{fontSize:11,color:"#64748b",marginBottom:14}}>Last 10 data points</div>
          <ResponsiveContainer width="100%" height={170}>
            <BarChart data={chartData.slice(-10)} margin={{top:5,right:5,bottom:5,left:-20}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0"/>
              <XAxis dataKey="time" tick={{fill:"#64748b",fontSize:9}}/>
              <YAxis tick={{fill:"#64748b",fontSize:9}} allowDecimals={false}/>
              <Tooltip {...tt}/>
              <Legend wrapperStyle={{fontSize:11,color:"#475569"}}/>
              <Bar dataKey="served" fill="#0ea5e9" name="Served" radius={[4,4,0,0]}/>
              <Bar dataKey="waiting" fill="#4f46e5" name="Waiting" radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      
      <div className="card" style={{padding:"20px", borderRadius:14}}>
        <div style={{fontWeight:600,color:"#0f172a",marginBottom:16,fontSize:15}}>Queue ({queue.length} waiting)</div>
        {queue.length===0 ? (
          <div style={{color:"#64748b",fontSize:14,textAlign:"center",padding:"30px 0"}}>
            {session?.active ? "Queue is empty — waiting for users to join" : "Start a session to see the queue"}
          </div>
        ) : (
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr>{["Position","Name","Email","Status"].map(h=>(
                <th key={h} style={{padding:"9px 14px",textAlign:"left",fontSize:10,color:"#64748b",textTransform:"uppercase",letterSpacing:1,borderBottom:"1px solid #e2e8f0",fontWeight:500}}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {queue.map((m,i)=>(
                <tr key={m.userId} style={{borderBottom:"1px solid #f1f5f9"}}>
                  <td style={{padding:"11px 14px"}}>
                    <span style={{width:26,height:26,borderRadius:"50%",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:600,color:i===0?"#fff":"#475569",background:i===0?"#0d9488":"#f1f5f9"}}>{i+1}</span>
                  </td>
                  <td style={{padding:"11px 14px",color:"#0f172a",fontSize:13,fontWeight:500}}>{m.name}</td>
                  <td style={{padding:"11px 14px",color:"#64748b",fontSize:12}}>{m.email}</td>
                  <td style={{padding:"11px 14px"}}>
                    <span style={{padding:"4px 10px",borderRadius:12,fontSize:11,fontWeight:600,background:i===0?"#ccfbf1":"#f1f5f9",color:i===0?"#0d9488":"#64748b"}}>{i===0?"Next Up":"Waiting"}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}
