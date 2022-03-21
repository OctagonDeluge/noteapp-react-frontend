import {Container, createStyles, TextInput, Textarea, UnstyledButton} from "@mantine/core"
import {useContext} from "react";
import {NoteContext} from "../noteContext";
import axios from "axios";

const useStyles = createStyles((theme) => ({
    container: {
        marginLeft: 0,
        paddingLeft: 0,
        paddingRight: 0,
        height: 870,
        width: 1000,
        backgroundColor: theme.fn.rgba('rgb(255,0,0)', 0.4),
    },
    toolBox: {
        width: 800,
        height: 100,
        backgroundColor: theme.fn.rgba('#0000000C', 0.4),
    },
    buttons: {
        width: 100,
        height: 40,
        backgroundColor: theme.fn.rgba('rgba(54,232,255,0.78)', 0.4),
        '&:hover': {
            backgroundColor: theme.fn.rgba('#cd19e1', 0.4),
        }
    }
}));

function TextRedactor() {
    const {classes} = useStyles();
    const {note, setNote} = useContext(NoteContext);

    const sendPostOrPutReq = () => {
        if (note.id !== undefined) {
            axios.put('/notes/' + note.id, note)
                .then((res) => {
                    console.log(res);
                })
        } else {
            axios.post('/notes/', note)
                .then((res) => {
                    setNote(res.data);
                });
        }
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setNote({...note, [e.target.name]: value})
    }

    const deleteNote = (id) => {
        console.log(id);
        axios.delete('/notes/' + id)
            .then((response) => {
                console.log(response);
            });
    }

    return (
        <Container className={classes.container}>
            <Container className={classes.toolBox}>
                <UnstyledButton className={classes.buttons} onClick={() => {
                    deleteNote(note.id);
                }}>
                    удалить
                </UnstyledButton>
                <UnstyledButton className={classes.buttons} onClick={() => {
                    sendPostOrPutReq();
                }}>
                    Сохранить
                </UnstyledButton>
            </Container>
            <Container>
                <TextInput
                    placeholder="Заголовок"
                    required
                    name="caption"
                    value={note.caption}
                    onChange={(e) => handleChange(e)}
                />
                <Textarea
                    placeholder="Заметка"
                    required
                    name="content"
                    value={note.content}
                    onChange={(e) => handleChange(e)}
                />
            </Container>
        </Container>
    )
}

export default TextRedactor;