import axios from "axios";
const api = axios.create({ baseURL: "http://localhost:8080/api" });
api.interceptors.request.use(c => {
  const u = JSON.parse(localStorage.getItem("user") || "null");
  if (u?.token) c.headers["Authorization"] = `Bearer ${u.token}`;
  return c;
});
api.interceptors.response.use(r => r, e => {
  if (e.response?.status === 401) { localStorage.removeItem("user"); window.location.href = "/"; }
  return Promise.reject(e);
});
export const registerUser   = d => api.post("/auth/register", d);
export const loginUser      = d => api.post("/auth/login", d);
export const registerAdmin  = d => api.post("/auth/admin/register", d);
export const loginAdmin     = d => api.post("/auth/admin/login", d);
export const getWorkplaces        = ()     => api.get("/workplaces");
export const getWorkplacesByAdmin = id     => api.get(`/workplaces/admin/${id}`);
export const addWorkplace         = d      => api.post("/workplaces", d);
export const deleteWorkplace      = id     => api.delete(`/workplaces/${id}`);
export const startSession    = (w,n)  => api.post(`/session/start/${w}/${n}`);
export const joinQueue       = (w,u)  => api.post(`/session/join/${w}/${u}`);
export const leaveQueue      = (w,u)  => api.delete(`/session/leave/${w}/${u}`);
export const nextToken       = w      => api.post(`/session/next/${w}`);
export const getCurrentToken = w      => api.get(`/session/current/${w}`);
export const getQueueMembers = w      => api.get(`/session/queue-members/${w}`);
export const isSessionActive = w      => api.get(`/session/active/${w}`);
export const closeSession    = w      => api.post(`/session/close/${w}`);
export const getPeopleAhead  = (w,u)  => api.get(`/session/ahead/${w}/${u}`);
export const getAllSessions   = w      => api.get(`/session/all/${w}`);
export const getSessionDetails= w     => api.get(`/session/details/${w}`);
export const getAnalytics    = w      => api.get(`/session/analytics/${w}`);
