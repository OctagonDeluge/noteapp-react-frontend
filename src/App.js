import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignIn from "./authorization/signIn";
import Notes from "./notes/notes";
import Schedule from "./calendar/schedule";
import SignUp from "./authorization/signUp";
import NotFound404 from "./errors/notFound404";
import Unauthorized401 from "./errors/unauthorized401";
import {NotificationsProvider} from "@mantine/notifications";
import React, {useState} from "react";
import {UserContext} from "./authorization/userContext";

function App() {
    const [isAuth, setAuth] = useState(sessionStorage.getItem("authorized"));
    return (
        <NotificationsProvider>
            <UserContext.Provider value={{isAuth, setAuth}}>
                <BrowserRouter>
                    {
                        isAuth ?
                            <Routes>
                                <Route path="/notes" element={<Notes/>}/>
                                <Route path="/calendar" element={<Schedule/>}/>
                                <Route path="/login" element={<SignIn/>}/>
                                <Route path="/registration" element={<SignUp/>}/>
                                <Route path="*" element={<NotFound404/>}/>
                            </Routes>
                            :
                            <Routes>
                                <Route path="/login" element={<SignIn/>}/>
                                <Route path="/registration" element={<SignUp/>}/>
                                <Route path="*" element={<Unauthorized401/>}/>
                            </Routes>
                    }
                </BrowserRouter>
            </UserContext.Provider>
        </NotificationsProvider>
    )
}

export default App;