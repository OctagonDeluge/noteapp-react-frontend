import React, {useState} from "react"
import Note from "./note/Note";
import Profile from "../profile/profile"
import TextRedactor from "./editor/textRedactor"
import {NoteContext} from "./noteContext";
import './notes.css';

function Notes() {
    const [note, setNote] = useState({
        caption: "",
        content: ""
    });
    const [notes, setNotes] = useState([]);
    return (
        <div className="main">
            <Profile/>
            <NoteContext.Provider value={{note, notes, setNote, setNotes}}>
                <Note/>
                <TextRedactor/>
            </NoteContext.Provider>
        </div>
    )
}

export default Notes;