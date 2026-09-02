import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import toast from "react-hot-toast";
import { getWorkplaces, joinQueue, leaveQueue, getCurrentToken, getPeopleAhead, isSessionActive } from "../services/api";

const lbl  = { fontSize:11, color:"#64748b", textTransform:"uppercase", letterSpacing:1, marginBottom:5 };

export default function UserDashboard() {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [workplaces, setWorkplaces] = useState([]);
  const [wp, setWp]         = useState(null);
  const [myToken, setMyToken]   = useState(null);
  const [current, setCurrent]   = useState(0);
  const [ahead, setAhead]       = useState(0);
  const [active, setActive]     = useState(false);
  const [joined, setJoined]     = useState(false);
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
    getWorkplaces().then(r => { setWorkplaces(r.data); if (r.data.length > 0) setWp(r.data[0]); }).catch(() => {});
  }, []);

  const refresh = useCallback(async () => {
    if (!wp) return;
    try {
      const [tok, act] = await Promise.all([getCurrentToken(wp.id), isSessionActive(wp.id)]);
      setCurrent(tok.data); setActive(act.data);
      if (myToken !== null) {
        const a = await getPeopleAhead(wp.id, user.id);
        setAhead(Math.max(0, a.data));
      }
    } catch {}
  }, [wp, myToken, user.id]);

  useEffect(() => {
    if (!wp) return;
    refresh();
    const poll = setInterval(refresh, 4000);
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      onConnect: () => client.subscribe(`/topic/queue/${wp.id}`, m => {
        const d = JSON.parse(m.body);
        setCurrent(d.currentToken); setActive(d.active);
      }),
      reconnectDelay: 3000,
    });
    client.activate();
    return () => { clearInterval(poll); client.deactivate(); };
  }, [wp, refresh]);

  const handleJoin = async () => {
    if (!wp || !active) return;
    setLoading(true);
    try {
      const res = await joinQueue(wp.id, user.id);
      setMyToken(res.data); setJoined(true);
      toast.success(`Joined! Your token is #${res.data}`);
      refresh();
    } catch (e) { toast.error(e.response?.data || "Failed to join"); }
    finally { setLoading(false); }
  };

  const handleLeave = async () => {
    if (!wp) return;
    setLoading(true);
    try {
      await leaveQueue(wp.id, user.id);
      setMyToken(null); setJoined(false); setAhead(0);
      toast.success("Left the queue");
      refresh();
    } catch (e) { toast.error(e.response?.data || "Failed to leave"); }
    finally { setLoading(false); }
  };

  const isTurn = joined && myToken !== null && current >= myToken;

  return (
    <div style={{ minHeight:"100vh", background:"#f8fafc" }}>
      
      <div className="card" style={{ borderBottom:"1px solid #e2e8f0", borderTop:"none", borderLeft:"none", borderRight:"none", borderRadius:0, padding:"14px 24px", display:"flex", justifyContent:"space-between", alignItems:"center", zIndex:10, position:"relative", boxShadow:"none" }}>
        <div style={{ display:"flex", alignItems:"center", gap:9 }}>
          <div style={{ width:32, height:32, borderRadius:8, background:"linear-gradient(135deg,#0ea5e9,#0284c7)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, color:"#fff" }}>🎯</div>
          <span className="text-teal" style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:17 }}>SmartQueue</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:13, color:"#475569" }}>{user.name || user.email}</span>
          <button onClick={() => { localStorage.removeItem("user"); nav("/"); }} className="btn-secondary"
            style={{ padding:"6px 13px", borderRadius:7, cursor:"pointer", fontSize:13, fontWeight:600 }}>Logout</button>
        </div>
      </div>

      <div style={{ maxWidth:860, margin:"0 auto", padding:"28px 20px" }}>
        <h1 style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:28, marginBottom:4, color:"#0f172a" }}>My Queue</h1>
        <p style={{ color:"#64748b", marginBottom:24, fontSize:14 }}>Select a workplace and join the queue digitally.</p>

        
        <div style={{ marginBottom:24 }}>
          <div style={lbl}>Select Workplace</div>
          <select value={wp?.id||""} onChange={e => { const w=workplaces.find(x=>x.id===e.target.value); setWp(w); setMyToken(null); setJoined(false); }}
            className="input-field"
            style={{ padding:"9px 12px", borderRadius:9, fontSize:14, minWidth:280 }}>
            {workplaces.length===0 && <option>No workplaces available</option>}
            {workplaces.map(w => <option key={w.id} value={w.id}>{w.name} ({w.type})</option>)}
          </select>
        </div>

        
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:12, marginBottom:20 }}>
          {[
            ["Session", <span style={{ fontSize:13, fontWeight:600, color: active?"#10b981":"#ef4444" }}>{active?"● Active":"● Inactive"}</span>],
            ["Now Serving", <span className="text-teal" style={{ fontSize:30, fontWeight:700, fontFamily:"'Space Grotesk',sans-serif" }}>{current}</span>],
            ["My Token",    <span className="text-indigo" style={{ fontSize:30, fontWeight:700, fontFamily:"'Space Grotesk',sans-serif" }}>{myToken ?? "—"}</span>],
            ["People Ahead",<span style={{ fontSize:30, fontWeight:700, color:"#f59e0b", fontFamily:"'Space Grotesk',sans-serif" }}>{joined ? ahead : "—"}</span>],
            ["Est. Wait",   <span style={{ fontSize:20, fontWeight:700, color:"#64748b", fontFamily:"'Space Grotesk',sans-serif" }}>{joined ? `~${ahead*2}m` : "—"}</span>],
          ].map(([label, val]) => (
            <div key={label} className="card" style={{padding:"18px 20px", borderRadius:14}}><div style={lbl}>{label}</div>{val}</div>
          ))}
        </div>

        
        {isTurn && (
          <div className="card" style={{ border:"1px solid #0d9488", padding:"16px 20px", marginBottom:18, display:"flex", alignItems:"center", gap:12, background:"#f0fdfa" }}>
            <span style={{ fontSize:26 }}>🎉</span>
            <div>
              <div className="text-teal" style={{ fontWeight:700, fontSize:16 }}>It's your turn!</div>
              <div style={{ color:"#0f172a", fontSize:13 }}>Please proceed to the counter now.</div>
            </div>
          </div>
        )}

        
        <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
          {!joined ? (
            <button onClick={handleJoin} disabled={loading||!active||!wp}
              className={active ? "btn-primary" : "btn-secondary"}
              style={{ padding:"11px 28px", fontSize:14 }}>
              {loading ? "Joining…" : active ? "🎫 Join Queue" : "Session Not Active"}
            </button>
          ) : (
            <button onClick={handleLeave} disabled={loading} className="btn-danger"
              style={{ padding:"11px 28px", fontSize:14 }}>
              {loading ? "Leaving…" : "Leave Queue"}
            </button>
          )}
        </div>

        
        {joined && myToken && (
          <div className="card" style={{ padding:"18px 20px", borderRadius:14, marginTop:20 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ fontSize:12, color:"#64748b" }}>Queue Progress</span>
              <span style={{ fontSize:12, color:"#0f172a", fontWeight:500 }}>Token {current} of {myToken}</span>
            </div>
            <div style={{ background:"#f1f5f9", borderRadius:6, height:8, overflow:"hidden" }}>
              <div style={{ height:"100%", borderRadius:6, background:"linear-gradient(90deg,#0ea5e9,#4f46e5)", width:`${Math.min(100,(current/myToken)*100)}%`, transition:"width .5s ease" }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
