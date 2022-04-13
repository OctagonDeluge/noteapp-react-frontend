import React from "react";
import {useForm} from "@mantine/form";
import {PasswordInput, TextInput, Group, Button, Container, useMantineTheme, Text} from "@mantine/core";
import {showNotification} from "@mantine/notifications";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom"

function SignUp() {
    const navigate = useNavigate();
    const theme = useMantineTheme();
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },

        validate: {
            email: (value) => (/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(value) ? null : 'Невалидный email'),
            password: (value) => (value.length < 6 ? "Пароль должен содежать не менее 6 символов" : null),
            confirmPassword: (value, values) => (value !== values.password ? "Пароли не совпадают" : null),
        },
    });

    const handleSubmit = (values) => {
        axios.post("/user", {
                email: values.email,
                password: values.password
            })
            .then(res => {
                form.reset();
                navigate("/login");
            })
            .catch(res => {
                showNotification({
                    title: 'Failed to sign up',
                    message: res.toString(),
                    color: "red"
                })
            })

    }

    return (
        <div>
            <Container style={{width: 500, height: "100%", background: theme.fn.rgba('#069d46', 1)}}>
                <form style={{paddingTop: 200}} onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput
                        required
                        label="Почта"
                        placeholder="your@email.com"
                        {...form.getInputProps('email')}
                    />

                    <PasswordInput
                        required
                        label="Пароль"
                        placeholder="Password"
                        {...form.getInputProps('password')}
                    />

                    <PasswordInput
                        required
                        mt="sm"
                        label="Повторите пароль"
                        placeholder="Confirm password"
                        {...form.getInputProps('confirmPassword')}
                    />

                    <Group position="center" mt="md" direction="column">
                        <Button style={{backgroundColor: theme.fn.rgba('#f5b700', 1), color: "black"}} type="submit">
                            Регистрация
                        </Button>
                        <Text style={{fontFamily: 'Greycliff CF, sans-serif'}}>
                            Уже есть аккаунт ?
                        </Text>
                        <Link to={"/login"} style={{
                            textDecoration: "unset",
                            color: "white",
                            fontFamily: 'Greycliff CF, sans-serif'
                        }}>
                            Войти в аккаунт
                        </Link>
                    </Group>
                </form>
            </Container>
        </div>
    )
}

export default SignUp;