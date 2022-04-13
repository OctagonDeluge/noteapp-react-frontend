import React, {useContext, useEffect, useState} from "react";
import {Calendar, isSameDate} from "@mantine/dates";
import {useMantineTheme} from "@mantine/core";
import 'dayjs/locale/ru';
import axios from "axios";
import {EventContext} from "../eventContext";

function EventDates() {
    const {value, setValue} = useContext(EventContext);
    const {schedules, setSchedules} = useContext(EventContext);
    const {setDateHeader} = useContext(EventContext);
    const {setEvents} = useContext(EventContext);
    const [month, onMonthChange] = useState(new Date());
    const dates = [];
    const inputFormat = schedules.map((schedule)=> (
       dates.push(new Date(schedule))
    ));

    const theme = useMantineTheme();

    const getEvents = (e) => {
        setEvents([]);
        axios.get('/calendar/' + Date.parse(e.toString()))
            .then(res => {
                setEvents(res.data)
        }).catch(err =>  console.log(err.message), setEvents([]));
    }

    const getSchedules = (e) => {
        axios.get('/calendar', {params : {
                beginOfMonth: Date.parse((new Date(e.getFullYear(), e.getMonth(), 1)).toString()),
                endOfMonth: Date.parse((new Date(e.getFullYear(), e.getMonth() + 1, 0)).toString())
        }})
            .then(res => {
            setSchedules(res.data);
            })
    }

    const handleMonthChange = (e) => {
        onMonthChange(e);
        setSchedules([]);
        getSchedules(e);
    }

    const handleDayChange = (e) => {
        setValue(e);
        getEvents(e);
        setDateHeader(e);
    }

    useEffect(() => {
        getSchedules(month);
        getEvents(month);
    }, []);

    return (
        <div>
            <Calendar
                value={value}
                month={month}
                onMonthChange={(e)=>handleMonthChange(e)}
                onChange={(e) => handleDayChange(e)}
                dayStyle={(date) =>
                    dates.some(data => isSameDate(data, date)) ? {
                    backgroundColor: theme.colors.violet[3], color: "black" } : null
                }
                fullWidth
                inputformat={inputFormat}
                size='xl'
                locale='ru'
                styles={(theme) => ({
                    cell: {
                        border: `1px solid ${
                            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                        }`,
                    },
                    day: { borderRadius: 0, height: 80, fontSize: theme.fontSizes.lg },
                    weekday: { fontSize: theme.fontSizes.lg },
                    weekdayCell: {
                        fontSize: theme.fontSizes.xl,
                        backgroundColor:
                            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
                        border: `1px solid ${
                            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                        }`,
                        height: 80,
                    },
                })}
            />
        </div>
    )
}

export default EventDates;