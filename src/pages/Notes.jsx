import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import {
  fetchNotesApi,
  createNoteApi,
  deleteNoteApi,
} from "../services/noteService";

export default function Notes() {
  const { token, logout } = useAuth();
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const data = await fetchNotesApi(token);
    setNotes(data);
  };

  const addNote = async (title, content) => {
    await createNoteApi(token, { title, content });
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await deleteNoteApi(token, id);
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <h2>Your Notes</h2>
      <button onClick={logout}>Logout</button>
      <NoteForm onAdd={addNote} />
      <NoteList notes={notes} onDelete={deleteNote} />
    </div>
  );
}