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
        <div style={{ fontSize:11, color:"#475569", textTransform:"uppercase", letterSpacing:1, marginBottom:5, fontWeight:600 }}>Workplace</div>
        <select className="input-field" value={wp?.id||""} onChange={e=>setWp(wps.find(w=>w.id===e.target.value))}
          style={{ padding:"10px 12px", minWidth:240 }}>
          {wps.map(w=><option key={w.id} value={w.id}>{w.name} ({w.type})</option>)}
        </select>
      </div>
      <div className="card" style={{ overflow:"hidden" }}>
        <div style={{ padding:"18px 20px", borderBottom:"1px solid #e2e8f0", fontWeight:700, fontSize:16, color:"#0f172a", fontFamily:"'Space Grotesk',sans-serif" }}>
          Session History ({sessions.length})
        </div>
        {sessions.length===0 ? (
          <div style={{ padding:40, textAlign:"center", color:"#64748b", fontSize:14 }}>No sessions found for this workplace.</div>
        ) : (
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr>{["Session Name","Status","Tokens Served","Total Joined","Created At"].map(h=>(
                <th key={h} style={{ padding:"12px 20px", textAlign:"left", fontSize:11, color:"#64748b", textTransform:"uppercase", letterSpacing:1, borderBottom:"1px solid #e2e8f0", fontWeight:500 }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {sessions.map(s=>(
                <tr key={s.id} style={{ borderBottom:"1px solid #f1f5f9" }}>
                  <td style={{ padding:"14px 20px", color:"#0f172a", fontWeight:500 }}>{s.sessionName}</td>
                  <td style={{ padding:"14px 20px" }}>
                    <span style={{ padding:"4px 10px", borderRadius:10, fontSize:11, fontWeight:600, background:s.active?"#dcfce7":"#f1f5f9", color:s.active?"#15803d":"#64748b" }}>
                      {s.active?"● Active":"Closed"}
                    </span>
                  </td>
                  <td className="text-teal" style={{ padding:"14px 20px", fontWeight:700 }}>{s.currentToken}</td>
                  <td style={{ padding:"14px 20px", color:"#475569" }}>{s.totalTokens}</td>
                  <td style={{ padding:"14px 20px", color:"#64748b", fontSize:12 }}>{new Date(s.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}
