import React, {useRef, useState} from "react"
import Note from "./note/note";
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
    const inputRef = useRef();
    return (
        <div className="main">
            <Profile/>
            <NoteContext.Provider value={{note, notes, setNote, setNotes, inputRef}}>
                <Note/>
                <TextRedactor/>
            </NoteContext.Provider>
        </div>
    )
}

export default Notes;