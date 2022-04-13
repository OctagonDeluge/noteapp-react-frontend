import {Container, createStyles, TextInput, Textarea, Center} from "@mantine/core"
import {useContext} from "react";
import {NoteContext} from "../noteContext";
import axios from "axios";
import {showNotification} from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
    container: {
        marginLeft: 0,
        paddingLeft: 0,
        paddingRight: 0,
        height: 870,
        width: 1000,
        backgroundColor: theme.fn.rgba('rgb(241,229,229)', 1),
    },
    toolBox: {
        width: 800,
        height: 100,
    },
    buttons: {
        outline: 0,
        border: 0,
        cursor: "pointer",
        borderRadius: 5,
        width: 100,
        height: 40,
        backgroundColor: theme.fn.rgba('#f1ffc4', 1),
        '&:hover': {
            backgroundColor: theme.fn.rgba('#9f6451', 0.4),
        },
        marginLeft: 20,
        marginTop: 30
    },
    inputs: {
        width: 860,
        borderRadius: 5
    }
}));

function TextRedactor() {
    const {classes} = useStyles();
    const {note, setNote} = useContext(NoteContext);
    const {notes, setNotes} = useContext(NoteContext);
    const {inputRef} = useContext(NoteContext);

    const sendPostOrPutReq = () => {
        if (note.id !== undefined) {
            axios.put('/notes/' + note.id, note)
                .then((res) => {
                    let temp = [...notes];
                    let index = temp.findIndex(el => el.id === note.id);
                    temp[index] = note;
                    setNotes(temp);
                })
                .catch(res => {
                    showNotification({
                        title: 'Failed to save note',
                        message: 'Empty title or content fields',
                        color: "red"
                    })
                })
        } else {
            axios.post('/notes/', note)
                .then((res) => {
                    setNote(res.data);
                    setNotes([...notes, res.data]);
                })
                .catch(res => {
                    showNotification({
                        title: 'Failed to save note',
                        message: 'Empty title or content fields',
                        color: "red"
                    })
                })
        }
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setNote({...note, [e.target.name]: value})
    }

    const deleteNote = (id) => {
        axios.delete('/notes/' + id)
            .then((response) => {
                console.log(response);
                let temp = [...notes];
                let index = temp.findIndex(el => el.id === id);
                temp.splice(index,1);
                setNotes(temp);
                setNote({
                    caption: "",
                    content: ""
                })
            })
            .catch(res => {
                showNotification({
                    title: 'Failed to delete note',
                    message: 'No note was selected',
                    color: "red"
                })
            });
    }

    return (
        <Container className={classes.container}>
            <Container className={classes.toolBox}>

                <Center style={{height: 100}}>
                    <button className={classes.buttons} onClick={() => {
                        sendPostOrPutReq();
                    }}>
                        Сохранить
                    </button>

                    <button className={classes.buttons} onClick={() => {
                        deleteNote(note.id);
                    }}>
                        Удалить
                    </button>
                </Center>

            </Container>
            <Container style={{ height: 700, borderRadius: 5, width: 860}}>
                <Center style={{paddingTop: 30}}>
                    <TextInput
                        className={classes.inputs}
                        ref={inputRef}
                        placeholder="Заголовок"
                        required
                        name="caption"
                        value={note.caption}
                        onChange={(e) => handleChange(e)}
                    />
                </Center>
                <Center style={{paddingTop: 10}}>
                    <Textarea
                        className={classes.inputs}
                        minRows={26}
                        placeholder="Заметка"
                        required
                        name="content"
                        value={note.content}
                        onChange={(e) => handleChange(e)}
                    />
                </Center>
            </Container>
        </Container>
    )
}

export default TextRedactor;