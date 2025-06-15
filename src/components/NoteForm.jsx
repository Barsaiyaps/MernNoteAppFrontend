import { useState, useContext } from "react";
import { createNote } from "../services/noteService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function NoteForm() {
  const [form, setForm] = useState({ title: "", content: "" });
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNote(form, token);
    navigate("/notes");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Note</h2>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" />
      <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" />
      <button type="submit">Save</button>
    </form>
  );
}
