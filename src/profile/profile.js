import React from "react";
import {Navbar, Avatar, Center, Anchor, Group, createStyles, Text} from '@mantine/core'
import {Link} from "react-router-dom";

const useStyles = createStyles((theme) => {
    return {
        link: {
            fontSize: 22,
            marginLeft: 20,
            fontFamily: 'Montserrat, serif',
            color: theme.fn.rgba('rgb(255,255,255)', 1),
        },
    };
})

function Profile() {
    const {classes} = useStyles();
    return (
        <Navbar
            width={{base: 330}}
            styles={{root: {backgroundColor: '#2F2F2F'}}}
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
                    <Text size='xl' color='white'>www@Email</Text>
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
                    <Anchor href="#" className={classes.link}>
                        Выход
                    </Anchor>
                </Group>
            </Navbar.Section>
        </Navbar>
    );
}

export default Profile;