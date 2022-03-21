import React from "react";
import ReactDOM from 'react-dom';
import "./index.css"
import Notes from "./notes/notes";
import SignUp from "./authorization/signUp"
import Calendar from "./calendar/calendar";
import {BrowserRouter, Route, Routes} from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<SignUp/>} />
            <Route path="/notes" element={<Notes/>} />
            <Route path="/calendar" element={<Calendar/>} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
)
