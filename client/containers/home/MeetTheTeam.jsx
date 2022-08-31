import React, { useState } from "react";
import { useScrollValue } from "/lib/useScrollValue";
import s from "/sass/home/home.module.css";

const InitialOffset = 4200,
    TwentyEightHundredOffset = -500,
    TwentyFiveHundredOffset = -500,
    NineteenHundredOffset = -500,
    SixteenHundredOffset = -500,
    TwelveHundredOffSet = -100,
    OneThousandOffSet = -700,
    EightHundredOffSet = -550,
    SixHundredOffSet = -650,
    FourHundredOffSet = -220;

export default function MeetTheTeam({ ScrollPercent }) {
    const [scrollSpeed, setScrollSpeed] = React.useState(-55);
    let calculatedOffsetY = useScrollValue(
        ScrollPercent,
        scrollSpeed,
        InitialOffset,
        TwentyEightHundredOffset,
        TwentyFiveHundredOffset,
        NineteenHundredOffset,
        SixteenHundredOffset,
        TwelveHundredOffSet,
        OneThousandOffSet,
        EightHundredOffSet,
        SixHundredOffSet,
        FourHundredOffSet
    );

    React.useEffect(() => {
        if (window?.innerWidth <= 1200) setScrollSpeed(-28);
        if (window?.innerWidth <= 600) setScrollSpeed(-22);
    }, []);

    return (
        <div className={s.meetTheTeam_zone} style={{ top: `calc(${calculatedOffsetY}px)` }}>
            <div className={s.meetTheTeam_container}>
                <div className={s.meetTheTeam_text}>
                    <div className={s.meetTheTeam_heading}>MEET THE TEAM</div>
                </div>

                <div className={s.meetTheTeam_paragraphContainer}>
                    <p>
                        Our Coconut Crabs have teamed up to build the best next-gen strategy RPG
                        with a greater purpose. Cunning, Rambunctious, Awesome, and Brilliant
                        (CRAB), meet the cast:
                    </p>
                </div>
                <div className={s.meetTheTeam_members}>
                    <div className={s.meetTheTeam_members_wrapper}>
                        <div className={s.meetTheTeam_members_card}>
                            <img src="/img/home/team/card.png" />
                            <div className={s.meetTheTeam_members_card_container}>
                                <div className={s.meetTheTeam_members_card_top}>
                                    <div className={s.meetTheTeam_members_card_top_avatar}>
                                        <img src="/img/home/team/Bernice.png" />
                                    </div>
                                </div>
                                <div className={s.meetTheTeam_members_card_bottom}>
                                    <div className={s.meetTheTeam_members_card_bottom_name}>
                                        LONG
                                    </div>
                                    <div className={s.meetTheTeam_members_card_bottom_position}>
                                        Founder
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={s.meetTheTeam_members_card}>
                            <img src="/img/home/team/card.png" />
                            <div className={s.meetTheTeam_members_card_container}>
                                <div className={s.meetTheTeam_members_card_top}>
                                    <div className={s.meetTheTeam_members_card_top_avatar}>
                                        <img src="/img/home/team/Bernice.png" />
                                    </div>
                                </div>
                                <div className={s.meetTheTeam_members_card_bottom}>
                                    <div className={s.meetTheTeam_members_card_bottom_name}>
                                        DANIELE
                                    </div>
                                    <div className={s.meetTheTeam_members_card_bottom_position}>
                                        Game Artist & Design
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={s.meetTheTeam_members_card}>
                            <img src="/img/home/team/card.png" />
                            <div className={s.meetTheTeam_members_card_container}>
                                <div className={s.meetTheTeam_members_card_top}>
                                    <div className={s.meetTheTeam_members_card_top_avatar}>
                                        <img src="/img/home/team/Bernice.png" />
                                    </div>
                                </div>
                                <div className={s.meetTheTeam_members_card_bottom}>
                                    <div className={s.meetTheTeam_members_card_bottom_name}>
                                        BERNICE
                                    </div>
                                    <div className={s.meetTheTeam_members_card_bottom_position}>
                                        Marketing & Community
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={s.meetTheTeam_members_card}>
                            <img src="/img/home/team/card.png" />
                            <div className={s.meetTheTeam_members_card_container}>
                                <div className={s.meetTheTeam_members_card_top}>
                                    <div className={s.meetTheTeam_members_card_top_avatar}>
                                        <img src="/img/home/team/Bernice.png" />
                                    </div>
                                </div>
                                <div className={s.meetTheTeam_members_card_bottom}>
                                    <div className={s.meetTheTeam_members_card_bottom_name}>
                                        MOMO
                                    </div>
                                    <div className={s.meetTheTeam_members_card_bottom_position}>
                                        Visual Design
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={s.meetTheTeam_members_card}>
                            <img src="/img/home/team/card.png" />
                            <div className={s.meetTheTeam_members_card_container}>
                                <div className={s.meetTheTeam_members_card_top}>
                                    <div className={s.meetTheTeam_members_card_top_avatar}>
                                        {/* <img src="/img/home/team/Bernice.png" /> */}
                                    </div>
                                </div>
                                <div className={s.meetTheTeam_members_card_bottom}>
                                    <div className={s.meetTheTeam_members_card_bottom_name}>
                                        QUAN
                                    </div>
                                    <div className={s.meetTheTeam_members_card_bottom_position}>
                                        Developer
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={s.meetTheTeam_members_card}>
                            <img src="/img/home/team/card.png" />
                            <div className={s.meetTheTeam_members_card_container}>
                                <div className={s.meetTheTeam_members_card_top}>
                                    <div className={s.meetTheTeam_members_card_top_avatar}>
                                        <img src="/img/home/team/Bernice.png" />
                                    </div>
                                </div>
                                <div className={s.meetTheTeam_members_card_bottom}>
                                    <div className={s.meetTheTeam_members_card_bottom_name}>
                                        LAURA
                                    </div>
                                    <div className={s.meetTheTeam_members_card_bottom_position}>
                                        Communications
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={s.meetTheTeam_members_card}>
                            <img src="/img/home/team/card.png" />
                            <div className={s.meetTheTeam_members_card_container}>
                                <div className={s.meetTheTeam_members_card_top}>
                                    <div className={s.meetTheTeam_members_card_top_avatar}>
                                        <img src="/img/home/team/Bernice.png" />
                                    </div>
                                </div>
                                <div className={s.meetTheTeam_members_card_bottom}>
                                    <div className={s.meetTheTeam_members_card_bottom_name}>
                                        ISAAC
                                    </div>
                                    <div className={s.meetTheTeam_members_card_bottom_position}>
                                        Security
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
