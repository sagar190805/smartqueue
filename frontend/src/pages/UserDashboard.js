import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import toast from "react-hot-toast";
import { getWorkplaces, joinQueue, leaveQueue, getCurrentToken, getPeopleAhead, isSessionActive } from "../services/api";

const card = { background:"#0f1629", border:"1px solid #1e2d4a", borderRadius:14, padding:"18px 20px" };
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
      webSocketFactory: () => new SockJS("https://smartqueue-production-7fa9.up.railway.app/ws"),
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
    <div style={{ minHeight:"100vh", background:"#0a0e1a" }}>
      {/* Topbar */}
      <div style={{ background:"#0f1629", borderBottom:"1px solid #1e2d4a", padding:"14px 24px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", alignItems:"center", gap:9 }}>
          <div style={{ width:32, height:32, borderRadius:8, background:"linear-gradient(135deg,#6366f1,#8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🎯</div>
          <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:17, color:"#fff" }}>SmartQueue</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:13, color:"#64748b" }}>{user.name || user.email}</span>
          <button onClick={() => { localStorage.removeItem("user"); nav("/"); }}
            style={{ padding:"6px 13px", borderRadius:7, border:"none", background:"#3f1f1f", color:"#f87171", cursor:"pointer", fontSize:13 }}>Logout</button>
        </div>
      </div>

      <div style={{ maxWidth:860, margin:"0 auto", padding:"28px 20px" }}>
        <h1 style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:24, color:"#fff", marginBottom:4 }}>My Queue</h1>
        <p style={{ color:"#64748b", marginBottom:24, fontSize:14 }}>Select a workplace and join the queue digitally.</p>

        {/* Workplace selector */}
        <div style={{ marginBottom:24 }}>
          <div style={lbl}>Select Workplace</div>
          <select value={wp?.id||""} onChange={e => { const w=workplaces.find(x=>x.id===e.target.value); setWp(w); setMyToken(null); setJoined(false); }}
            style={{ padding:"9px 12px", background:"#1e2d4a", border:"1px solid #2d3f5e", borderRadius:9, color:"#e2e8f0", fontSize:14, outline:"none", minWidth:280 }}>
            {workplaces.length===0 && <option>No workplaces available</option>}
            {workplaces.map(w => <option key={w.id} value={w.id}>{w.name} ({w.type})</option>)}
          </select>
        </div>

        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:12, marginBottom:20 }}>
          {[
            ["Session", <span style={{ fontSize:13, fontWeight:600, color: active?"#22c55e":"#ef4444" }}>{active?"● Active":"● Inactive"}</span>],
            ["Now Serving", <span style={{ fontSize:30, fontWeight:700, color:"#fff", fontFamily:"'Space Grotesk',sans-serif" }}>{current}</span>],
            ["My Token",    <span style={{ fontSize:30, fontWeight:700, color:"#a78bfa", fontFamily:"'Space Grotesk',sans-serif" }}>{myToken ?? "—"}</span>],
            ["People Ahead",<span style={{ fontSize:30, fontWeight:700, color:"#f59e0b", fontFamily:"'Space Grotesk',sans-serif" }}>{joined ? ahead : "—"}</span>],
            ["Est. Wait",   <span style={{ fontSize:20, fontWeight:700, color:"#38bdf8", fontFamily:"'Space Grotesk',sans-serif" }}>{joined ? `~${ahead*2}m` : "—"}</span>],
          ].map(([label, val]) => (
            <div key={label} style={card}><div style={lbl}>{label}</div>{val}</div>
          ))}
        </div>

        {/* Your turn banner */}
        {isTurn && (
          <div style={{ background:"linear-gradient(135deg,#064e3b,#065f46)", border:"1px solid #059669", borderRadius:12, padding:"16px 20px", marginBottom:18, display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ fontSize:26 }}>🎉</span>
            <div>
              <div style={{ fontWeight:700, color:"#34d399", fontSize:15 }}>It's your turn!</div>
              <div style={{ color:"#6ee7b7", fontSize:13 }}>Please proceed to the counter now.</div>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
          {!joined ? (
            <button onClick={handleJoin} disabled={loading||!active||!wp}
              style={{ padding:"11px 28px", borderRadius:9, border:"none", fontSize:14, fontWeight:600, cursor:"pointer",
                background: active ? "linear-gradient(135deg,#6366f1,#4f46e5)" : "#1e2d4a",
                color: active ? "#fff" : "#475569", opacity: loading ? .7 : 1 }}>
              {loading ? "Joining…" : active ? "🎫 Join Queue" : "Session Not Active"}
            </button>
          ) : (
            <button onClick={handleLeave} disabled={loading}
              style={{ padding:"11px 28px", borderRadius:9, border:"none", fontSize:14, fontWeight:600, cursor:"pointer", background:"#3f1f1f", color:"#f87171", opacity:loading?.7:1 }}>
              {loading ? "Leaving…" : "Leave Queue"}
            </button>
          )}
        </div>

        {/* Progress bar */}
        {joined && myToken && (
          <div style={{ ...card, marginTop:20 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ fontSize:12, color:"#64748b" }}>Queue Progress</span>
              <span style={{ fontSize:12, color:"#94a3b8" }}>Token {current} of {myToken}</span>
            </div>
            <div style={{ background:"#1e2d4a", borderRadius:6, height:8, overflow:"hidden" }}>
              <div style={{ height:"100%", borderRadius:6, background:"linear-gradient(90deg,#6366f1,#22c55e)", width:`${Math.min(100,(current/myToken)*100)}%`, transition:"width .5s ease" }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
