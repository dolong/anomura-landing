import React, { useState, useEffect } from "react";
import s from "/sass/home/floating-bottom/index.module.css";
import Link from "next/link";

export default function FloatingBottom({ audioControl }) {
    return (
        <div className={`${s.bottom_zone}`}>
            <div className={s.bottom_mobileIcons}>
                <a href="https://discord.gg/anomuragame" target="_blank">
                    <img src="/img/home/follow_us/mobile discord.png" />
                </a>
                <a href="https://twitter.com/anomuragame" target="_blank">
                    <img src="/img/home/follow_us/mobile twitter.png" />
                </a>
                <a href="https://medium.com/@anomura" target="_blank">
                    <img src="/img/home/follow_us/mobile medium.png" />
                </a>
            </div>
        </div>
    );
}
