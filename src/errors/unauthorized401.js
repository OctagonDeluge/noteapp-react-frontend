import React from "react";
import {Group} from "@mantine/core";
import {Link} from "react-router-dom";

function Unauthorized401() {
    return (
        <div>
            <Group direction={"column"} position="center">
                <h1>Пользователь не авторизован</h1>
                <Link to={"/login"}>
                    На страницу входа
                </Link>
            </Group>
        </div>
    )
}

export default Unauthorized401;