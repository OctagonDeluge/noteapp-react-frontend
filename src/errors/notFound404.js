import React from "react";
import {Group} from "@mantine/core";
import {Link} from "react-router-dom";

function NotFound404() {
    return (
        <div>
            <Group direction="column" position="center">
                <h1>Пусто</h1>
                <Link to={"/login"}>
                    На страницу входа
                </Link>
            </Group>
        </div>
    )
}

export default NotFound404;