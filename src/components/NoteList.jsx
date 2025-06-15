import { useEffect, useState, useContext } from "react";
import { getNotes, deleteNote } from "../services/noteService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function NoteList() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getNotes(token).then(setNotes);
  }, [token]);

  const handleDelete = async (id) => {
    await deleteNote(id, token);
    setNotes(notes.filter((note) => note._id !== id));
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Your Notes</h2>
      <button onClick={() => navigate("/notes/new")}>New Note</button>
      <button onClick={logout}>Logout</button>

      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", marginTop: "10px", width: "100%" }}
      />

      {filteredNotes.map((note) => (
        <div key={note._id} style={{display:"flex",justifyContent:"space-between", border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <button onClick={() => handleDelete(note._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
