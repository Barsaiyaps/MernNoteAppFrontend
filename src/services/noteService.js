import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const getNotes = (token) =>
  axios.get(`${API}/api/notes`, { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.data);

export const createNote = (note, token) =>
  axios.post(`${API}/api/notes`, note, { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.data);

export const deleteNote = (id, token) =>
  axios.delete(`${API}/api/notes/${id}`, { headers: { Authorization: `Bearer ${token}` } });
/*************  ✨ Windsurf Command ⭐  *************/
/*******  1e75e73a-3357-46d6-ad3d-fe54d903ba3b  *******//**

 * Deletes a note by its id

 * @param {string} token - The JWT token for authentication

 * @param {string} id - The id of the note to delete
 */
