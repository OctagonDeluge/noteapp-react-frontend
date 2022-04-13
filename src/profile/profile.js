import React, {useContext} from "react";
import {Navbar, Avatar, Center, Anchor, Group, createStyles, Text} from '@mantine/core'
import {Link} from "react-router-dom";
import axios from "axios";
import {UserContext} from "../authorization/userContext";

const useStyles = createStyles((theme) => {
    return {
        link: {
            fontSize: 22,
            marginLeft: 20,
            fontFamily: 'Montserrat, serif',
            color: theme.fn.rgba('rgb(255,255,255)', 1),
            textDecoration: "unset",
            '&:hover': {
                textDecoration: "underline"
            },
        },
    };
})

function Profile() {
    const {classes} = useStyles();
    const {setAuth} = useContext(UserContext);

    return (
        <Navbar
            width={{base: 330}}
            styles={{root: {backgroundColor: '#564256'}}}
        >
            <Navbar.Section>
                <Center style={{width: 330, height: 200}}>
                    <Avatar
                        src={null}
                        alt="no image here"
                        color="indigo"
                        size={150}
                        radius={100}
                    />
                </Center>
            </Navbar.Section>
            <Navbar.Section>
                <Center style={{width: 330, height: 20}}>
                    <Text size='xl' color='white'>{sessionStorage.getItem("user")}</Text>
                </Center>
            </Navbar.Section>
            <Navbar.Section>
                <Group
                    direction="column"
                    style={{marginTop: 50}}
                >
                    <Anchor component={Link} to="/notes" className={classes.link}>
                        Заметки
                    </Anchor>
                    <Anchor component={Link} to="/calendar" className={classes.link}>
                        Календарь
                    </Anchor>
                    <Link to={"/login"} className={classes.link} onClick={() => {
                        axios.post("/logout").then(res => {
                            setAuth(false);
                            console.log(res.data);
                            sessionStorage.clear();
                        })
                    }}>
                        Выход
                    </Link>

                </Group>
            </Navbar.Section>
        </Navbar>
    );
}

export default Profile;