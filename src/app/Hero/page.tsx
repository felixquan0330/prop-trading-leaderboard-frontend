import React from 'react'
import { Header, Button } from '@/components'

export default function Hero() {
    return (
        <div className="px-20 pb-16 h-screen">
            <Header />
            <section className="flex items-center justify-center gap-20 text-center h-full">
                <div className="flex flex-col items-center justify-center gap-10">
                    <div className="flex flex-col gap-6">
                        <div className="text-[40px] text-[#16191d] font-semibold">
                            The Ultimate Leaderboard for Prop Traders
                        </div>
                        <div className="text-[#434a56] text-[22px] font-semibold tracking-wide">
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