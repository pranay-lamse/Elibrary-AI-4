import React from "react";
import { NavLink } from "react-router-dom";

function Hello(props) {
    console.log("Hello" + { props });
    return (
        <div>
            <h1>Hello world</h1>
            <NavLink to="/app" replace>
                go back;
            </NavLink>
        </div>
    );
}

export default Hello;
