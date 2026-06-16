import React, { useEffect, useState, useCallback } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import toast from "react-hot-toast";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import AdminLayout from "../components/AdminLayout";
import { getWorkplacesByAdmin, startSession, nextToken, closeSession, getQueueMembers, getCurrentToken, getSessionDetails, getAnalytics } from "../services/api";

const card = { background:"#0f1629", border:"1px solid #1e2d4a", borderRadius:14, padding:"20px" };

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

  const tt = { contentStyle:{background:"#0f1629",border:"1px solid #1e2d4a",borderRadius:8,color:"#e2e8f0"} };

  return (
    <AdminLayout title="Dashboard">
      {/* Workplace selector */}
      <div style={{ marginBottom:20 }}>
        <select value={wp?.id||""} onChange={e=>{setWp(workplaces.find(x=>x.id===e.target.value));setChartData([]);}}
          style={{padding:"8px 12px",background:"#1e2d4a",border:"1px solid #2d3f5e",borderRadius:9,color:"#e2e8f0",fontSize:14,outline:"none"}}>
          {workplaces.length===0 && <option>No workplaces — add one first</option>}
          {workplaces.map(w=><option key={w.id} value={w.id}>{w.name} ({w.type})</option>)}
        </select>
      </div>

      {/* Stat cards */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12,marginBottom:18}}>
        {[
          ["🎫","Now Serving",current,"#6366f1"],
          ["⏳","Waiting",queue.length,"#f59e0b"],
          ["✅","Total Served",analytics?.totalServed??0,"#22c55e"],
          ["⏱️","Avg Wait",analytics?`${Math.round(analytics.avgWaitSeconds)}s`:"0s","#38bdf8"],
          ["📋","Session",session?.sessionName||"None","#a78bfa"],
        ].map(([icon,label,val,color])=>(
          <div key={label} style={card}>
            <div style={{fontSize:22,marginBottom:8}}>{icon}</div>
            <div style={{fontSize:typeof val==="number"?28:16,fontWeight:700,color,fontFamily:"'Space Grotesk',sans-serif",marginBottom:3}}>{val}</div>
            <div style={{fontSize:10,color:"#64748b",textTransform:"uppercase",letterSpacing:.8}}>{label}</div>
          </div>
        ))}
      </div>

      {/* Session controls */}
      <div style={{...card,marginBottom:18,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{width:9,height:9,borderRadius:"50%",background:session?.active?"#22c55e":"#ef4444",display:"inline-block"}}/>
          <span style={{fontWeight:600,color:"#e2e8f0",fontSize:15}}>{session?.active?`Active: "${session.sessionName}"`:"No active session"}</span>
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
          {!session?.active ? (
            <>
              <input placeholder="Session name (e.g. Morning)" value={sessionName} onChange={e=>setSessionName(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&handleStart()}
                style={{padding:"8px 11px",background:"#1e2d4a",border:"1px solid #2d3f5e",borderRadius:8,color:"#e2e8f0",fontSize:13,outline:"none",width:210,fontFamily:"Inter,sans-serif"}}/>
              <button onClick={handleStart} disabled={loading}
                style={{padding:"8px 16px",borderRadius:8,border:"none",background:"linear-gradient(135deg,#6366f1,#4f46e5)",color:"#fff",fontSize:13,fontWeight:600,cursor:"pointer"}}>
                {loading?"Starting…":"▶ Start Session"}
              </button>
            </>
          ) : (
            <>
              <button onClick={handleNext} style={{padding:"8px 16px",borderRadius:8,border:"none",background:"linear-gradient(135deg,#f59e0b,#d97706)",color:"#fff",fontSize:13,fontWeight:600,cursor:"pointer"}}>🔔 Call Next</button>
              <button onClick={handleClose} style={{padding:"8px 16px",borderRadius:8,border:"none",background:"#3f1f1f",color:"#f87171",fontSize:13,cursor:"pointer"}}>■ Close</button>
            </>
          )}
        </div>
      </div>

      {/* Charts */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:18}}>
        <div style={card}>
          <div style={{fontWeight:600,color:"#e2e8f0",marginBottom:3}}>Live Queue Size</div>
          <div style={{fontSize:11,color:"#475569",marginBottom:14}}>Updates every 5 seconds</div>
          <ResponsiveContainer width="100%" height={170}>
            <AreaChart data={chartData} margin={{top:5,right:5,bottom:5,left:-20}}>
              <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={.4}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2d4a"/>
              <XAxis dataKey="time" tick={{fill:"#475569",fontSize:9}}/>
              <YAxis tick={{fill:"#475569",fontSize:9}} allowDecimals={false}/>
              <Tooltip {...tt}/>
              <Area type="monotone" dataKey="waiting" stroke="#6366f1" fill="url(#g1)" strokeWidth={2} name="Waiting"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div style={card}>
          <div style={{fontWeight:600,color:"#e2e8f0",marginBottom:3}}>Served vs Waiting</div>
          <div style={{fontSize:11,color:"#475569",marginBottom:14}}>Last 10 data points</div>
          <ResponsiveContainer width="100%" height={170}>
            <BarChart data={chartData.slice(-10)} margin={{top:5,right:5,bottom:5,left:-20}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2d4a"/>
              <XAxis dataKey="time" tick={{fill:"#475569",fontSize:9}}/>
              <YAxis tick={{fill:"#475569",fontSize:9}} allowDecimals={false}/>
              <Tooltip {...tt}/>
              <Legend wrapperStyle={{fontSize:11,color:"#64748b"}}/>
              <Bar dataKey="served" fill="#22c55e" name="Served" radius={[3,3,0,0]}/>
              <Bar dataKey="waiting" fill="#6366f1" name="Waiting" radius={[3,3,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Queue table with real names */}
      <div style={{...card}}>
        <div style={{fontWeight:600,color:"#e2e8f0",marginBottom:16,fontSize:15}}>Queue ({queue.length} waiting)</div>
        {queue.length===0 ? (
          <div style={{color:"#475569",fontSize:14,textAlign:"center",padding:"30px 0"}}>
            {session?.active ? "Queue is empty — waiting for users to join" : "Start a session to see the queue"}
          </div>
        ) : (
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr>{["Position","Name","Email","Status"].map(h=>(
                <th key={h} style={{padding:"9px 14px",textAlign:"left",fontSize:10,color:"#475569",textTransform:"uppercase",letterSpacing:1,borderBottom:"1px solid #1e2d4a",fontWeight:400}}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {queue.map((m,i)=>(
                <tr key={m.userId} style={{borderBottom:"1px solid #0a0e1a"}}>
                  <td style={{padding:"11px 14px"}}>
                    <span style={{width:26,height:26,borderRadius:"50%",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:600,color:"#fff",background:i===0?"linear-gradient(135deg,#6366f1,#4f46e5)":"#1e2d4a"}}>{i+1}</span>
                  </td>
                  <td style={{padding:"11px 14px",color:"#e2e8f0",fontSize:13,fontWeight:500}}>{m.name}</td>
                  <td style={{padding:"11px 14px",color:"#64748b",fontSize:12}}>{m.email}</td>
                  <td style={{padding:"11px 14px"}}>
                    <span style={{padding:"2px 10px",borderRadius:12,fontSize:11,fontWeight:600,background:i===0?"#064e3b":"#1e2d4a",color:i===0?"#34d399":"#64748b"}}>{i===0?"Next Up":"Waiting"}</span>
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
