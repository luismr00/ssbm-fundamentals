import React from 'react'
import meleeFox from '../../assets/fox_melee.jpeg'

const Section3 = () => {
  return (
    <div className="py-28 px-16">
        <div className="self-stretch flex flex-row items-center justify-start gap-[80px]">
            <div className="flex-1 flex flex-col items-start justify-start">
                <div className="self-stretch flex flex-col items-start justify-start gap-[24px]">
                        <b className="self-stretch leading-[120%] text-h2">Master the Art of Competitive Smash Bros.</b>
                        <p className="self-stretch leading-[150%] text-paragraph">Welcome to SSBM Fundamentals, your ultimate resource for improving your skills in Super Smash Bros. Our team of expert players and coaches are dedicated to helping you understand the game's mechanics, develop effective strategies, and dominate your opponents. Whether you're a beginner looking to learn the basics or an experienced player aiming to reach the top, we have the knowledge and tools to guide you on your journey to mastery.</p>
                </div>                
            </div>
            <img className="flex-1 max-w-full overflow-hidden h-[640px] object-cover" alt="" src={meleeFox} />
        </div>
    </div>
  )
}

export default Section3