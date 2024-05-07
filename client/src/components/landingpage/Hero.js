import React from "react";
import foxImg from "../../assets/fox.png"

export const Hero = () => {
    return (
        <div className=" flex flex-col items-center justify-start py-44 px-16 box-border gap-[80px] text-center">
                <div className="w-[768px] flex flex-col items-center justify-start gap-[24px]">
                    <b className="leading-[120%] text-h3">Master the game with SSBM Fundamentals comprehensive tutorials</b>
                    <p className="text-paragraph">Unlock your full potential in Super Smash Bros. Melee</p>
                </div>
            {/* <img src={foxImg} /> */}
            {/* <video className="w-[768px] h-[432px]" autoPlay loop muted>
                <source src="https://www.youtube.com/watch?v=K8L3Gd5fY6A" type="video/mp4" />
            </video> */}
            <iframe width="1300" height="750" src="https://www.youtube.com/embed/uZwFxWKSk5s?si=gMpQH9ONtFQAJe51" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
    );
};