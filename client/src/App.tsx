import { useState, useEffect } from "react";
import { Note as noteModel } from "./model/note";
import { reqRoute } from "./utils/apiRoutes";
import Note from "./components/Note";

//import api files
import * as notesApi from "./api/notesApi";

function App() {
  const [notes, setNotes] = useState<noteModel[]>([]);

  useEffect(() => {
    async function getAllNotes() {
      try {
        const notes = await notesApi.fetchNotes();
        // .then((res) => res.json())
        // .then((notes) => setNotes(notes));
        setNotes(notes);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }

    getAllNotes();
  }, []);

  return (
    <div>
      {notes.map((note, id) => (
        <Note note={note} key={id} />
      ))}
    </div>
  );
}

export default App;
