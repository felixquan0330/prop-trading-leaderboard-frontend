import React from 'react'
import { Badge, Button, Header } from '@/components'

export default function Hero() {
    return (
        <div className="px-20 pb-16 h-screen relative overflow-hidden">
            <Header />
            {/* Left Blur */}
            <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#98E9FB] opacity-60 blur-[250px] z-0" />
            {/* Right Blur */}
            <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-[400px] h-[400px] bg-[#98E9FB] opacity-60 blur-[250px] z-0" />
            <section className="flex flex-col items-center justify-center gap-20 text-center h-full relative z-10">
                <div className="flex flex-col items-center justify-center gap-10">
                    <div className="flex flex-col gap-8">
                        <div className="text-[40px] text-white font-semibold tracking-tighter">
                            The Ultimate Leaderboard for Prop Traders
                        </div>
                        <div className="text-white text-[22px] font-semibold tracking-normal">
                            Track performance across top firms. Live rankings, win rates, badges and more.
                        </div>
                        <div className="
                            relative p-[2px] rounded-2xl
                            bg-gradient-to-b from-[#9CECFB] via-[#65C7F7] to-[#0052D4]
                            shadow-[0_0_25px_0_#9AEBFB]
                        ">
                            <div className="
                                rounded-2xl h-[192px] flex flex-col items-center justify-center gap-3
                                bg-[#232b33]/90
                                text-[22px] text-white
                                px-8
                                border border-[#3F3F3F]
                            ">
                                <div className="font-semibold">Verified Data You Can Trust</div>
                                <div className='text-[15px] text-white'>
                                    Tracked, ranked, and updated daily from real prop trading data.
                                </div>
                                <div className='flex items-center gap-3'>
                                    <Badge>✅ Accurate & Verified</Badge>
                                    <Badge>🔎 Proof-Driven Results</Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="
                            p-[1px] rounded-md
                            border-none
                            bg-gradient-to-b from-[#9CECFB] via-[#65C7F7] to-[#0052D4]
                        ">
                            <button className="
                                rounded-md px-5 py-2
                                bg-[#282828] text-white hover:bg-[#3F3F3F] transition text-sm w-full
                                border-none
                            ">
                                View Leaderboard
                            </button>
                        </div>
                        <Button
                            className="bg-transparent hover:bg-[#434a56] border-[#434A56] border-1 rounded-md
                                        text-white bg-gradient-to-b from-[#9CECFB] via-[#65C7F7] to-[#0052D4] border-none hover:opacity-90">
                            <span className="text-white opacity-70 hover:text-white text-base">GOAT Club</span>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}