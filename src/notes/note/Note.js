import React, {useEffect, useContext} from "react";
import {ScrollArea, Text, Title, Container, useMantineTheme, UnstyledButton, createStyles} from "@mantine/core";
import "./Note.css";
import axios from "axios";
import {NoteContext} from "../noteContext";

const useStyles = createStyles((theme) => ({
    note: {
        height: 60,
        '&:hover': {
            backgroundColor: theme.fn.rgba('#cd19e1', 0.4),
        }
    }
}));

function Note() {
    const {classes} = useStyles();
    const theme = useMantineTheme();
    const {setNote} = useContext(NoteContext);
    const {notes, setNotes} = useContext(NoteContext);

    useEffect(() => {
        axios.get('/notes').then(
            res => {
                setNotes(res.data);
            })
    });

    return (
        <Container style={{width: 400, marginLeft: 0, paddingLeft: 0, paddingRight: 0}}>
            <Container style={{height: '20%', background: theme.fn.rgba('#696767', 0.4)}}>
                <Title>Все заметки</Title>
                <Text>Кол-во заметок</Text>
            </Container>
            <UnstyledButton style={{height: '5%'}} onClick={() => {
                setNote({
                    caption: "",
                    content: ""
                })
            }}>
                <div style={{
                    width: 400,
                    height: '100%',
                    background: theme.fn.rgba('#590c0c', 0.4)
                }}>
                    Добавить запись
                </div>
            </UnstyledButton>
            <ScrollArea style={{height: '75%'}} offsetScrollbars scrollbarSize={8}>
                {notes.map((data) => (
                    <Container className={classes.note} key={data.id} style={{cursor: "pointer"}} onClick={() => {
                        setNote({
                            id: data.id,
                            caption: data.caption,
                            content: data.content
                        })
                    }}>
                        <Title order={4}>{data.caption}</Title>
                        <Text>{data.content}</Text>
                    </Container>
                ))}
            </ScrollArea>
        </Container>
    )
}

export default Note;