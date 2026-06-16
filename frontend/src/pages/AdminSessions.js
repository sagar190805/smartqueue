import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { getWorkplacesByAdmin, getAllSessions } from "../services/api";

export default function AdminSessions() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [wps, setWps]         = useState([]);
  const [wp, setWp]           = useState(null);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    if (!user.id) return;
    getWorkplacesByAdmin(user.id).then(r => { setWps(r.data); if (r.data.length > 0) setWp(r.data[0]); }).catch(() => {});
  }, [user.id]);

  useEffect(() => {
    if (!wp) return;
    getAllSessions(wp.id).then(r => setSessions(r.data)).catch(() => {});
  }, [wp]);

  return (
    <AdminLayout title="Sessions">
      <div style={{ marginBottom:20 }}>
        <div style={{ fontSize:11, color:"#64748b", textTransform:"uppercase", letterSpacing:1, marginBottom:5 }}>Workplace</div>
        <select value={wp?.id||""} onChange={e=>setWp(wps.find(w=>w.id===e.target.value))}
          style={{ padding:"8px 12px", background:"#1e2d4a", border:"1px solid #2d3f5e", borderRadius:9, color:"#e2e8f0", fontSize:14, outline:"none", minWidth:240 }}>
          {wps.map(w=><option key={w.id} value={w.id}>{w.name} ({w.type})</option>)}
        </select>
      </div>
      <div style={{ background:"#0f1629", border:"1px solid #1e2d4a", borderRadius:14, overflow:"hidden" }}>
        <div style={{ padding:"14px 20px", borderBottom:"1px solid #1e2d4a", fontWeight:700, fontSize:15, color:"#fff", fontFamily:"'Space Grotesk',sans-serif" }}>
          Session History ({sessions.length})
        </div>
        {sessions.length===0 ? (
          <div style={{ padding:40, textAlign:"center", color:"#475569", fontSize:14 }}>No sessions found for this workplace.</div>
        ) : (
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr>{["Session Name","Status","Tokens Served","Total Joined","Created At"].map(h=>(
                <th key={h} style={{ padding:"9px 18px", textAlign:"left", fontSize:10, color:"#475569", textTransform:"uppercase", letterSpacing:1, borderBottom:"1px solid #1e2d4a", fontWeight:400 }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {sessions.map(s=>(
                <tr key={s.id} style={{ borderBottom:"1px solid #0a0e1a" }}>
                  <td style={{ padding:"12px 18px", color:"#e2e8f0", fontWeight:500 }}>{s.sessionName}</td>
                  <td style={{ padding:"12px 18px" }}>
                    <span style={{ padding:"2px 9px", borderRadius:10, fontSize:11, fontWeight:600, background:s.active?"#064e3b":"#1e2d4a", color:s.active?"#34d399":"#64748b" }}>
                      {s.active?"● Active":"Closed"}
                    </span>
                  </td>
                  <td style={{ padding:"12px 18px", color:"#fff", fontWeight:600 }}>{s.currentToken}</td>
                  <td style={{ padding:"12px 18px", color:"#94a3b8" }}>{s.totalTokens}</td>
                  <td style={{ padding:"12px 18px", color:"#475569", fontSize:12 }}>{new Date(s.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}
