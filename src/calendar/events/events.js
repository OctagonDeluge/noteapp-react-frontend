import React, {useContext, useState} from "react";
import {Center, Container, createStyles, ScrollArea, Text} from "@mantine/core";
import {EventContext} from "../eventContext";
import axios from "axios";
import {showNotification} from "@mantine/notifications";

const months = {
    0: 'Январь',
    1: 'Февраль',
    2: 'Март',
    3: 'Апрель',
    4: 'Май',
    5: 'Июнь',
    6: 'Июль',
    7: 'Август',
    8: 'Сентябрь',
    9: 'Октябрь',
    10: 'Ноябрь',
    11: 'Декабрь'
}

const days = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'
]

const useStyles = createStyles((theme) => ({
    container: {
        marginLeft: 0,
        paddingLeft: 0,
        paddingRight: 0,
        height: 870,
        width: 400,
        background: theme.fn.rgba('rgba(146,14,183,0.63)', 0.4),
    },
    dateHeader: {
        fontFamily: 'Arial',
        fontSize: 32,
        color: theme.fn.rgba('rgb(255,255,255)', 0.9),
        marginLeft: 40,
    },
    dateContainer: {
        marginTop: 100,
        height: '15%',
        width: 350,
    },
    eventInput: {
        border: 0,
        outline: 0,
        borderBottom: "solid",
        background: 0,
        padding: 0,
        fontSize: 18,
        borderBottomColor: "black",
        borderBottomWidth: 1,
        color: "black",
        width: "90%",
    },
    eventButton: {
        backgroundColor: theme.fn.rgba('#540080a3', 0.4),
        outline: 0,
        border: 0,
        borderRadius: 5,
        height: 25,
        width: 25,
        marginLeft: 5,
        cursor: "pointer",
    },
    deleteButton: {
        backgroundColor: theme.fn.rgba('rgba(126,34,79,0.62)', 0.7),
        outline: 0,
        border: 0,
        borderRadius: 5,
        cursor: "pointer",
        height: 30,
        width: 150,
        marginTop: 20,
    },
    eventStyle: {
        height: 40,
        borderBottom: "solid",
        borderBottomWidth: 3,
        borderBottomColor: "black",
        backgroundColor: theme.fn.rgba('rgba(145,133,133,0)', 0.4),
    }
}));

function Events() {
    const {classes} = useStyles();
    const {events, setEvents} = useContext(EventContext)
    const {dateHeader} = useContext(EventContext);
    const {value} = useContext(EventContext);
    const {schedules, setSchedules} = useContext(EventContext);
    const [event, setEvent] = useState("");

    const clearEvents = () => {
        axios.delete('/calendar/' + Date.parse(value.toString()))
            .then(res => {
                console.log(schedules);
                let temp = [...schedules];
                const index = temp.indexOf(Date.parse(value.toString()));
                temp.splice(index,1);
                console.log(temp);
                setSchedules(temp);
                setEvents([]);
            })
    }

    const addEvent = () => {
        axios.post('/calendar', {
            headers: { 'Content-Type': 'application/json' }
        }, {
            params: {
                date: Date.parse(value.toString()),
                content: event.toString()
            }
        })
            .then(res => {
            setEvents([...events, res.data]);
            if(!schedules.includes(Date.parse(value.toString()))) {
                setSchedules([...schedules, Date.parse(value.toString())]);
            }
            setEvent("");
            })
            .catch(res => {
                showNotification({
                    title: "Failed to save event",
                    message: "Can't save empty event",
                    color: "red"
                })
            })
    }

    return (
        <div className={classes.container}>
            <Container className={classes.dateContainer}>
                <Text className={classes.dateHeader}>
                    {days[dateHeader.getDay()]}
                </Text>
                <Text className={classes.dateHeader}>
                    {months[dateHeader.getMonth()] + ' ' + dateHeader.getDate()}
                </Text>
            </Container>
            <input type="text" className={classes.eventInput} value={event} onChange={(e) => setEvent(e.target.value)}/>
            <button className={classes.eventButton} onClick={addEvent}>+</button>
            <ScrollArea style={{height: '50%', width: 400, marginTop: 20}}
                        offsetScrollbars scrollbarSize={8}>
                {events.map((event) => (
                    <Container key={event.id} className={classes.eventStyle}>
                        <Center style={{height: 40}} inline>
                            <Text>
                                {event.content}
                            </Text>
                        </Center>
                    </Container>
                ))}
            </ScrollArea>
            <Center>
                <button className={classes.deleteButton} onClick={clearEvents}>Очистить дату</button>
            </Center>
        </div>
    )
}

export default Events;
