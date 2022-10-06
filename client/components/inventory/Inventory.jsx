import React from "react";
import s from "/sass/inventory/index.module.css";
import Nav from "./Nav";

export default function Inventory() {
    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <Nav />
            </div>
        </div>
    );
}
