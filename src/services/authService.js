import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const signup = (form) => axios.post(`${API}/api/auth/signup`, form).then((res) => res.data);
export const login = (form) => axios.post(`${API}/api/auth/login`, form).then((res) => res.data);
