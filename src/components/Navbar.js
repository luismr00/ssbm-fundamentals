import React from "react";

export const Navbar = () => {
    return (
        <div className="font-heading-style overflow-hidden flex flex-col items-center justify-start text-left text-white text-border-alternate font-text-regular-normal">
            <div className="self-stretch box-border h-[72px] overflow-hidden shrink-0 flex flex-row items-center justify-between py-0 px-16 border-b-[1px] border-solid border-border-alternate">
                <div className="flex flex-row items-center justify-between">
                {/* <img className="w-[63px]  h-[27px] overflow-hidden shrink-0 gap-[24px]" alt="" src="Color = Dark.svg" /> */}
                    <div className="overflow-hidden flex flex-row items-start justify-start gap-[32px]">
                        <b className="">SSBM Fundamentals</b>
                        <div className="flex flex-row items-center justify-center gap-[4px]">
                            <div className=" leading-[150%]">Tutorials</div>
                            <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="white" aria-hidden="true">
                                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div className=" leading-[150%]">Resources</div>
                        <div className=" leading-[150%]">Pricing</div>
                        <div className=" leading-[150%]">Contact</div>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-center gap-[16px] text-text-primary">
                    <button className="bg-white text-black py-2 px-5 border-[1px] border-solid border-black">Log In</button>
                    <button className="bg-gray-950 py-2 px-5 text-border-alternate border-[1px] ">Register</button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;