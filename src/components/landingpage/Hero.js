import React from "react";
import foxImg from "../../assets/fox.png"

export const Hero = () => {
    return (
        <div className=" flex flex-col items-center justify-start py-28 px-16 box-border gap-[80px] text-center">
                <div className="w-[768px] flex flex-col items-center justify-start gap-[24px]">
                    <b className="leading-[120%] text-h3">Master the game with SSBM Fundamentals comprehensive tutorials</b>
                    <p className="text-paragraph">Unlock your full potential in Super Smash Bros. Melee</p>
                </div>
            <img src={foxImg} />
        </div>
    );
};