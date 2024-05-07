import React from 'react'

const Section1 = () => {
  return (
    <div className="flex flex-col items-start justify-start py-28 px-16 box-border">
        <div className="self-stretch flex flex-row items-start justify-start gap-[80px]">
            <div className="flex-1 flex flex-col items-start justify-start">
                <div className="self-stretch flex flex-col items-start justify-start gap-[24px]">
                    <b className="self-stretch text-h2 leading-[120%]">Steps for Improving and how SSBM Fundamentals can Guide you</b>
                    <p className='text-paragraph'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </div>
            <div className="flex-1 flex flex-col items-start justify-start gap-[16px] text-xl">
                    <div className="self-stretch flex flex-row items-start justify-start gap-[40px]">
                        <div className="flex flex-col items-center justify-start gap-[16px]">
                                <img className="w-12 h-12 overflow-hidden shrink-0" alt="" src="" />
                                <div className="w-0.5 bg-link-alternate box-border h-[102px] border-r-[2px] border-solid border-link-alternate" />
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start gap-[16px]">
                                <b className="self-stretch leading-[140%] text-subheading">Learning tech skill</b>
                                <div className="self-stretch text-base leading-[150%]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</div>
                        </div>
                    </div>
                    <div className="self-stretch flex flex-row items-start justify-start gap-[40px]">
                        <div className="flex flex-col items-center justify-start gap-[16px]">
                                <img className="w-12 h-12 overflow-hidden shrink-0" alt="" src="Icon / Relume.svg" />
                                <div className="w-0.5 bg-link-alternate box-border h-[102px] border-r-[2px] border-solid border-link-alternate" />
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start gap-[16px]">
                                <b className="self-stretch leading-[140%] text-subheading">Learn and apply SSBM Tutorials</b>
                                <div className="self-stretch text-base leading-[150%]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</div>
                        </div>
                    </div>
                    <div className="self-stretch flex flex-row items-start justify-start gap-[40px]">
                        <div className="flex flex-col items-center justify-start">
                                <img className="w-12 h-12 overflow-hidden shrink-0" alt="" src="Icon / Relume.svg" />
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start gap-[16px]">
                                <b className="self-stretch leading-[140%] text-subheading">Apply gameplans</b>
                                <div className="self-stretch text-base leading-[150%]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Section1