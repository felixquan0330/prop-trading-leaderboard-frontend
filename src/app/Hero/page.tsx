import React from 'react'
import { Button } from '@/components'

export default function Hero() {
    return (
        <div className="px-20 pb-16 h-screen">
            <section className="flex items-center justify-center gap-20 text-center h-full">
                <div className="flex flex-col items-center justify-center gap-10">
                    <div className="flex flex-col gap-6">
                        <div className="text-[40px] text-[#16191d] dark:text-white font-semibold">
                            The Ultimate Leaderboard for Prop Traders
                        </div>
                        <div className="text-[#434a56] dark:text-white text-[22px] font-semibold tracking-wide opacity-70">
                            Track performance across top firms. Live rankings, win rates, badges and more.
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Button className="bg-white hover:bg-[#434a56] border-[#434A56] border-1 rounded-md">
                            <span className="text-[#434A56] hover:text-white font-semibold">View Leaderboard</span>
                        </Button>
                        <Button className="bg-white hover:bg-[#434a56] border-[#434A56] border-1 rounded-md">
                            <span className="text-[#434A56] hover:text-white font-semibold">GOAT Club</span>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}