import React from 'react';
import s from "/sass/anomura/anomura.module.css";
export default function LavaBanner({ Icon, Header, Text }) {
    return
    <div className={s.lava_banner}>
        <img className={s.banner_icon} src={Icon} alt="lava banner icon" />
        <h1 className={s.banner_header}>{Header}</h1>
        <p className={s.banner_text}>{Text}</p>
    </div>;
}
