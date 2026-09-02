import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminLayout from "../components/AdminLayout";
import { getWorkplacesByAdmin, addWorkplace, deleteWorkplace } from "../services/api";

const TYPES = ["Hospital","Bank","Government Office","Clinic","University","Other"];

export default function AdminWorkplaces() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [wps, setWps]   = useState([]);
  const [form, setForm] = useState({ name:"", type:"Hospital", location:"" });
  const [loading, setLoading] = useState(false);

  const load = () => getWorkplacesByAdmin(user.id).then(r => setWps(r.data)).catch(() => {});
  
  useEffect(() => { if (user.id) load(); }, [user.id]);

  const handleAdd = async () => {
    if (!form.name.trim()) { toast.error("Name is required"); return; }
    setLoading(true);
    try { await addWorkplace({ ...form, adminId: user.id }); toast.success("Workplace added!"); setForm({ name:"", type:"Hospital", location:"" }); load(); }
    catch (e) { toast.error(e.response?.data || "Failed"); }
    finally { setLoading(false); }
  };

  const handleDelete = async id => {
    try { await deleteWorkplace(id); toast.success("Deleted"); load(); }
    catch { toast.error("Failed to delete"); }
  };

  return (
    <AdminLayout title="Workplaces">
      
      <div className="card" style={{ padding:20, marginBottom:20 }}>
        <div style={{ fontWeight:700, fontSize:18, marginBottom:16, fontFamily:"'Space Grotesk',sans-serif", color:"#0f172a" }}>Add New Workplace</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr auto", gap:10, alignItems:"end" }}>
          <div>
            <div style={{ fontSize:11, color:"#475569", marginBottom:4, textTransform:"uppercase", letterSpacing:.5, fontWeight:600 }}>Name *</div>
            <input className="input-field" style={{width:"100%"}} placeholder="e.g. City Hospital" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          </div>
          <div>
            <div style={{ fontSize:11, color:"#475569", marginBottom:4, textTransform:"uppercase", letterSpacing:.5, fontWeight:600 }}>Type</div>
            <select className="input-field" style={{width:"100%"}} value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
              {TYPES.map(t=><option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <div style={{ fontSize:11, color:"#475569", marginBottom:4, textTransform:"uppercase", letterSpacing:.5, fontWeight:600 }}>Location</div>
            <input className="input-field" style={{width:"100%"}} placeholder="e.g. Mumbai" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} />
          </div>
          <button className="btn-primary" onClick={handleAdd} disabled={loading}
            style={{ padding:"10px 20px", fontWeight:600, fontSize:13, whiteSpace:"nowrap" }}>
            {loading ? "…" : "+ Add"}
          </button>
        </div>
      </div>

      
      <div className="card" style={{ overflow:"hidden" }}>
        <div style={{ padding:"18px 20px", borderBottom:"1px solid #e2e8f0", fontWeight:700, fontSize:16, color:"#0f172a", fontFamily:"'Space Grotesk',sans-serif" }}>
          Your Workplaces ({wps.length})
        </div>
        {wps.length === 0 ? (
          <div style={{ padding:40, textAlign:"center", color:"#64748b", fontSize:14 }}>No workplaces yet. Add one above.</div>
        ) : (
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr>{["Name","Type","Location",""].map(h=>(
                <th key={h} style={{ padding:"12px 20px", textAlign:"left", fontSize:11, color:"#64748b", textTransform:"uppercase", letterSpacing:1, borderBottom:"1px solid #e2e8f0", fontWeight:500 }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {wps.map(w=>(
                <tr key={w.id} style={{ borderBottom:"1px solid #f1f5f9" }}>
                  <td style={{ padding:"14px 20px", color:"#0f172a", fontWeight:500 }}>{w.name}</td>
                  <td style={{ padding:"14px 20px" }}><span style={{ padding:"4px 10px", borderRadius:10, background:"#e0f2fe", color:"#0369a1", fontSize:11, fontWeight:500 }}>{w.type}</span></td>
                  <td style={{ padding:"14px 20px", color:"#475569", fontSize:13 }}>{w.location||"—"}</td>
                  <td style={{ padding:"14px 20px", textAlign:"right" }}>
                    <button className="btn-danger" onClick={()=>handleDelete(w.id)} style={{ padding:"6px 12px", fontSize:11, fontWeight:600 }}>Delete</button>
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
