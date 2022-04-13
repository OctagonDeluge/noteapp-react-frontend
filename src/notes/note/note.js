import React, {useEffect, useContext} from "react";
import {ScrollArea, Text, Title, Container, useMantineTheme, createStyles} from "@mantine/core";
import "./note.css";
import axios from "axios";
import {NoteContext} from "../noteContext";

const useStyles = createStyles((theme) => ({
    note: {
        height: 130,
        '&:hover': {
            backgroundColor: theme.fn.rgba('#e8d5e8', 1),
        },
        width: 368,
        float: "left"
    },
    button: {
        outline: 0,
        border: 0,
        cursor: "pointer",
        background: theme.fn.rgba('rgb(241,232,232)', 1),
        '&:hover': {
            background: theme.fn.rgba('#947386', 1),
        },
        width: 400,
        height: '5%',
        fontSize: 16
    }
}));

function Note() {
    const {classes} = useStyles();
    const theme = useMantineTheme();
    const {setNote} = useContext(NoteContext);
    const {notes, setNotes} = useContext(NoteContext);
    const {inputRef} = useContext(NoteContext);

    useEffect(() => {
        axios.get('/notes').then(
            res => {
                setNotes(res.data);
            })
    }, []);

    return (
        <Container style={{width: 400, marginLeft: 0, paddingLeft: 0, paddingRight: 0}}>
            <Container style={{height: '20%', background: theme.fn.rgba('#bf9aca', 1)}}>
                <Title style={{paddingTop: 20}}>Все заметки</Title>
                <Text style={{paddingTop: 80, color: theme.fn.rgba('rgba(23,22,22,0.66)', 0.71)}}>
                    Всего заметок: {notes.length}
                </Text>
            </Container>
            <button className={classes.button} onClick={() => {
                inputRef.current.select();
                setNote({
                    caption: "",
                    content: ""
                })
            }}>
                Добавить запись
            </button>
            <ScrollArea style={{height: '75%'}} offsetScrollbars scrollbarSize={8} scrollHideDelay={500}>
                {notes.map((data) => (
                    <Container className={classes.note} key={data.id} style={{cursor: "pointer"}} onClick={() => {
                        setNote({
                            id: data.id,
                            caption: data.caption,
                            content: data.content
                        })

                    }}>
                        <Text lineClamp={1} weight={700} size='lg'>{data.caption}</Text>
                        <Text lineClamp={5} >{data.content}</Text>
                    </Container>
                ))}
            </ScrollArea>
        </Container>
    )
}

export default Note;