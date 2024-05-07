import React from 'react'

const Footer = () => {
  return (
    <div className="bg-black text-white overflow-hidden flex flex-col items-start justify-start py-20 px-16 box-border gap-[80px] text-base">
        <div className="self-stretch flex flex-row items-start justify-start gap-[128px]">
                <div className="w-[500px] flex flex-col items-start justify-start gap-[24px]">
                    <img className="w-[63px] h-[27px] overflow-hidden shrink-0" alt="" src="Color = Dark.svg" />
                    <div className="self-stretch leading-[150%]">Stay up to date on features and releases by joining our newsletter.</div>
                    <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
                            <div className="self-stretch flex flex-row items-start justify-start gap-[16px]">
                                <div className="flex-1 flex flex-row items-center justify-start p-3 border-[1px] border-solid">
                                    <div className="flex-1 leading-[150%]">Your email</div>
                                </div>
                                <div className="w-[121px] box-border flex flex-row items-center justify-center py-3 px-6 border-[1px] border-solid">
                                    <div className=" leading-[150%]">Subscribe</div>
                                </div>
                            </div>
                            <div className="self-stretch leading-[150%]">By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.</div>
                    </div>
                </div>
                <div className="flex-1 flex flex-row items-start justify-start gap-[40px]">
                    <div className="flex-1 flex flex-col items-start justify-start gap-[16px]">
                            <div className="self-stretch leading-[150%] font-semibold">Column One</div>
                            <div className="self-stretch flex flex-col items-start justify-start">
                                <div className="self-stretch flex flex-row items-start justify-start py-2 px-0">
                                        <div className="flex-1 leading-[150%]">Link One</div>
                                </div>
                                <div className="self-stretch flex flex-row items-start justify-start py-2 px-0">
                                        <div className="flex-1 leading-[150%]">Link Two</div>
                                </div>
                                <div className="self-stretch flex flex-row items-start justify-start py-2 px-0">
                                        <div className="flex-1 leading-[150%]">Link Three</div>
                                </div>
                                <div className="self-stretch flex flex-row items-start justify-start py-2 px-0">
                                        <div className="flex-1 leading-[150%]">Link Four</div>
                                </div>
                                <div className="self-stretch flex flex-row items-start justify-start py-2 px-0">
                                        <div className="flex-1 leading-[150%]">Link Five</div>
                                </div>
                            </div>
                    </div>
                    <div className="flex-1 overflow-hidden flex flex-col items-start justify-start gap-[16px]">
                            <div className="self-stretch leading-[150%] font-semibold">Column Two</div>
                            <div className="self-stretch flex flex-col items-start justify-start">
                                <div className="self-stretch flex flex-row items-start justify-start py-2 px-0">
                                    <div className="flex-1 leading-[150%]">Link Six</div>
                                </div>
                                <div className="self-stretch flex flex-row items-start justify-start py-2 px-0">
                                    <div className="flex-1 leading-[150%]">Link Seven</div>
                                </div>
                                <div className="self-stretch flex flex-row items-start justify-start py-2 px-0">
                                    <div className="flex-1 leading-[150%]">Link Eight</div>
                                </div>
                                <div className="self-stretch flex flex-row items-start justify-start py-2 px-0">
                                    <div className="flex-1 leading-[150%]">Link Nine</div>
                                </div>
                                <div className="self-stretch flex flex-row items-start justify-start py-2 px-0">
                                    <div className="flex-1 leading-[150%]">Link Ten</div>
                                </div>
                            </div>
                    </div>
                    <div className="flex-1 flex flex-col items-start justify-start gap-[16px]">
                            <div className="self-stretch leading-[150%] font-semibold">Follow us</div>
                            <div className="self-stretch flex flex-col items-start justify-start">
                                <div className="self-stretch flex flex-row items-center justify-start py-2 px-0 gap-[12px]">
                                    <img className="w-6 h-6" alt="" src="Icon / Facebook.svg" />
                                    <div className="leading-[150%]">Facebook</div>
                                </div>
                                <div className="self-stretch flex flex-row items-center justify-start py-2 px-0 gap-[12px]">
                                    <img className="w-6 h-6" alt="" src="Icon / Instagram.svg" />
                                    <div className="leading-[150%]">Instagram</div>
                                </div>
                                <div className="self-stretch flex flex-row items-center justify-start py-2 px-0 gap-[12px]">
                                    <img className="w-6 h-6" alt="" src="Icon / X.svg" />
                                    <div className="leading-[150%]">X</div>
                                </div>
                                <div className="self-stretch flex flex-row items-center justify-start py-2 px-0 gap-[12px]">
                                    <img className="w-6 h-6" alt="" src="Icon / LinkedIn.svg" />
                                    <div className="leading-[150%]">LinkedIn</div>
                                </div>
                                <div className="self-stretch flex flex-row items-center justify-start py-2 px-0 gap-[12px]">
                                    <img className="w-6 h-6" alt="" src="Icon / Youtube.svg" />
                                    <div className="leading-[150%]">Youtube</div>
                                </div>
                            </div>
                    </div>
                </div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-[32px]">
                <div className="self-stretch border-[1px] border-solid" />
                <div className="self-stretch flex flex-row items-start justify-between">
                    <div className="leading-[150%]">© 2024 SSBM Fundamentals. All rights reserved.</div>
                    <div className="flex flex-row items-start justify-start gap-[24px]">
                        <div className="[text-decoration:underline] leading-[150%]">Privacy Policy</div>
                        <div className="[text-decoration:underline] leading-[150%]">Terms of Service</div>
                        <div className="[text-decoration:underline] leading-[150%]">Cookies Settings</div>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default Footer