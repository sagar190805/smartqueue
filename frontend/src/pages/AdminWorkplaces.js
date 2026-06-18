import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import AdminLayout from "../components/AdminLayout";
import {
  getWorkplacesByAdmin,
  addWorkplace,
  deleteWorkplace,
} from "../services/api";

const TYPES = [
  "Hospital",
  "Bank",
  "Government Office",
  "Clinic",
  "University",
  "Other",
];

const inp = {
  padding: "9px 11px",
  background: "#1e2d4a",
  border: "1px solid #2d3f5e",
  borderRadius: 8,
  color: "#e2e8f0",
  fontSize: 13,
  outline: "none",
  fontFamily: "Inter,sans-serif",
  width: "100%",
};

export default function AdminWorkplaces() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [wps, setWps] = useState([]);
  const [form, setForm] = useState({
    name: "",
    type: "Hospital",
    location: "",
  });
  const [loading, setLoading] = useState(false);

  const load = useCallback(() => {
    getWorkplacesByAdmin(user.id)
      .then((r) => setWps(r.data))
      .catch(() => {});
  }, [user.id]);

  useEffect(() => {
    if (user.id) {
      load();
    }
  }, [user.id, load]);

  const handleAdd = async () => {
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }

    setLoading(true);

    try {
      await addWorkplace({
        ...form,
        adminId: user.id,
      });

      toast.success("Workplace added!");

      setForm({
        name: "",
        type: "Hospital",
        location: "",
      });

      load();
    } catch (e) {
      toast.error(e.response?.data || "Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteWorkplace(id);
      toast.success("Deleted");
      load();
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <AdminLayout title="Workplaces">
      {/* Add form */}
      <div
        style={{
          background: "#0f1629",
          border: "1px solid #1e2d4a",
          borderRadius: 14,
          padding: 20,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: 15,
            color: "#fff",
            marginBottom: 16,
            fontFamily: "'Space Grotesk',sans-serif",
          }}
        >
          Add New Workplace
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr auto",
            gap: 10,
            alignItems: "end",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                color: "#64748b",
                marginBottom: 4,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Name *
            </div>

            <input
              style={inp}
              placeholder="e.g. City Hospital"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />
          </div>

          <div>
            <div
              style={{
                fontSize: 11,
                color: "#64748b",
                marginBottom: 4,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Type
            </div>

            <select
              style={inp}
              value={form.type}
              onChange={(e) =>
                setForm({
                  ...form,
                  type: e.target.value,
                })
              }
            >
              {TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <div
              style={{
                fontSize: 11,
                color: "#64748b",
                marginBottom: 4,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Location
            </div>

            <input
              style={inp}
              placeholder="e.g. Mumbai"
              value={form.location}
              onChange={(e) =>
                setForm({
                  ...form,
                  location: e.target.value,
                })
              }
            />
          </div>

          <button
            onClick={handleAdd}
            disabled={loading}
            style={{
              padding: "9px 18px",
              borderRadius: 8,
              border: "none",
              background: "linear-gradient(135deg,#6366f1,#4f46e5)",
              color: "#fff",
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {loading ? "..." : "+ Add"}
          </button>
        </div>
      </div>

      {/* List */}
      <div
        style={{
          background: "#0f1629",
          border: "1px solid #1e2d4a",
          borderRadius: 14,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "14px 20px",
            borderBottom: "1px solid #1e2d4a",
            fontWeight: 700,
            fontSize: 15,
            color: "#fff",
            fontFamily: "'Space Grotesk',sans-serif",
          }}
        >
          Your Workplaces ({wps.length})
        </div>

        {wps.length === 0 ? (
          <div
            style={{
              padding: 40,
              textAlign: "center",
              color: "#475569",
              fontSize: 14,
            }}
          >
            No workplaces yet. Add one above.
          </div>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                {["Name", "Type", "Location", ""].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "9px 18px",
                      textAlign: "left",
                      fontSize: 10,
                      color: "#475569",
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      borderBottom: "1px solid #1e2d4a",
                      fontWeight: 400,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {wps.map((w) => (
                <tr
                  key={w.id}
                  style={{
                    borderBottom: "1px solid #0a0e1a",
                  }}
                >
                  <td
                    style={{
                      padding: "12px 18px",
                      color: "#e2e8f0",
                      fontWeight: 500,
                    }}
                  >
                    {w.name}
                  </td>

                  <td style={{ padding: "12px 18px" }}>
                    <span
                      style={{
                        padding: "2px 9px",
                        borderRadius: 10,
                        background: "#1e2d4a",
                        color: "#818cf8",
                        fontSize: 11,
                      }}
                    >
                      {w.type}
                    </span>
                  </td>

                  <td
                    style={{
                      padding: "12px 18px",
                      color: "#64748b",
                      fontSize: 13,
                    }}
                  >
                    {w.location || "—"}
                  </td>

                  <td style={{ padding: "12px 18px" }}>
                    <button
                      onClick={() => handleDelete(w.id)}
                      style={{
                        padding: "4px 11px",
                        borderRadius: 7,
                        border: "none",
                        background: "#3f1f1f",
                        color: "#f87171",
                        fontSize: 11,
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
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