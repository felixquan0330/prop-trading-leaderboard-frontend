import React from 'react'
import { Badge, Button } from '@/components'

export default function Hero() {
    return (
        <div className="px-20 pb-16 h-screen">
            <section className="flex flex-col items-center justify-center gap-20 text-center h-full">
                <div className="flex flex-col items-center justify-center gap-10">
                    <div className="flex flex-col gap-8">
                        <div className="text-[40px] text-[#16191d] dark:text-white font-semibold">
                            The Ultimate Leaderboard for Prop Traders
                        </div>
                        <div className="text-[#434a56] dark:text-white text-[22px] font-semibold tracking-wide dark:opacity-70">
                            Track performance across top firms. Live rankings, win rates, badges and more.
                        </div>
                        <div className="
                            relative p-[2px] rounded-2xl
                            dark:bg-gradient-to-b dark:from-[#9CECFB] dark:via-[#65C7F7] dark:to-[#0052D4]
                            dark:shadow-[0_0_25px_0_#9AEBFB]
                        ">
                            <div className="
                                rounded-2xl h-[192px] flex flex-col items-center justify-center gap-3
                                bg-white dark:bg-[#232b33]/90
                                text-[22px] dark:text-white
                                px-8
                            ">
                                <div className="font-semibold">Verified Data You Can Trust</div>
                                <div className='text-[15px] text-[#434A56] dark:text-white dark:opacity-70'>
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
                        <Button className="bg-transparent hover:bg-[#434a56] border-[#434A56] border-1 rounded-md">
                            <span className="text-[#434A56] dark:text-white dark:dark:opacity-70 hover:text-white text-base">View Leaderboard</span>
                        </Button>
                        <Button
                            className="bg-transparent hover:bg-[#434a56] border-[#434A56] border-1 rounded-md
                                        dark:text-white dark:bg-gradient-to-b dark:from-[#9CECFB] dark:via-[#65C7F7] dark:to-[#0052D4] dark:border-none dark:hover:opacity-90">
                            <span className="text-[#434A56] dark:text-white dark:dark:opacity-70 hover:text-white text-base">GOAT Club</span>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}