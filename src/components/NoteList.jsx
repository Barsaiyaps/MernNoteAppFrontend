import { useEffect, useState, useContext } from "react";
import { getNotes, deleteNote } from "../services/noteService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function NoteList() {
  const [notes, setNotes] = useState([]);
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getNotes(token).then(setNotes);
  }, [token]);

  const handleDelete = async (id) => {
    await deleteNote(id, token);
    setNotes(notes.filter((note) => note._id !== id));
  };

  return (
    <div>
      <h2>Your Notes</h2>
      <button onClick={() => navigate("/notes/new")}>New Note</button>
      <button onClick={logout}>Logout</button>
      {notes.map((note) => (
        <div key={note._id} style={{display:"flex", justifyContent:"space-between"}}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <button onClick={() => handleDelete(note._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
