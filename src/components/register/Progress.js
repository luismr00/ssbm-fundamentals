import React from 'react'

const Progress = () => {
    return (
        <div class="w-full flex flex-row items-center justify-start text-left">
            <div class="w-8 h-8 bg-border-primary box-border flex items-center justify-center text-text-alternate border-[0.7px] border-solid border-border-primary rounded-full bg-white text-black font-bold">
                <div class="relative leading-[150%]">1</div>
            </div>
            <div class="flex-1 h-[1px] bg-white"></div>
            <div class="w-8 h-8 box-border flex items-center justify-center border-[1px] border-solid border-border-primary rounded-full bg-white text-black font-bold">
                <div class="relative leading-[150%]">2</div>
            </div>
            <div class="flex-1 h-[1px] bg-white"></div>
            <div class="w-8 h-8 box-border flex items-center justify-center border-[1px] border-solid border-border-primary rounded-full bg-white text-black font-bold">
                <div class="relative leading-[150%]">3</div>
            </div>
            <div class="flex-1 h-[1px] bg-white"></div>
            <div class="w-8 h-8 box-border flex items-center justify-center border-[1px] border-solid border-border-primary rounded-full bg-white text-black font-bold">
                <div class="relative leading-[150%]">4</div>
            </div>
        </div>
    );
}

export default Progress