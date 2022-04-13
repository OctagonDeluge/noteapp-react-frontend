import React, {useState} from "react"
import Profile from "../profile/profile"
import "./schedule.css"
import "./calendar/eventDates"
import EventDates from "./calendar/eventDates";
import Events from "./events/events";
import {EventContext} from "./eventContext";

function Schedule() {
    const [events, setEvents] = useState([]);
    const [dateHeader, setDateHeader] = useState(new Date());
    const [value, setValue] = useState(new Date())
    const [schedules, setSchedules] = useState([]);
    return (
        <div className="main">
            <Profile />
            <EventContext.Provider value={{events, dateHeader,value,schedules, setEvents, setDateHeader, setValue, setSchedules}}>
                <Events />
                <EventDates />
            </EventContext.Provider>
        </div>
    )
}

export default Schedule;