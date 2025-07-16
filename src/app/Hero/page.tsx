import React from 'react'
import { Badge, Button, Header } from '@/components'

export default function Hero() {
    return (
        <div className="px-20 relative overflow-hidden">
            <Header />
            <section className="flex flex-col items-center justify-center gap-20 text-center relative z-10 pt-24">
                <div className="flex flex-col items-center justify-center gap-10">
                    <div className="flex flex-col gap-8">
                        <div className="text-[40px] text-white font-semibold tracking-tighter">
                            The Ultimate Leaderboard for Prop Traders
                        </div>
                        <div className="text-white text-[22px] font-semibold tracking-normal">
                            Track performance across top firms. Live rankings, win rates, badges and more.
                        </div>
                        <div className="
                            relative p-[1px] rounded-2xl
                            bg-gradient-to-r from-[#22D3EE] via-[#3B82F6] to-[#1E3A8A]
                            shadow-[0_4px_30px_1px_rgba(34,211,238,0.33)]
                        ">
                            <div className="
                                rounded-2xl h-[192px] flex flex-col items-center justify-center gap-3
                                bg-gradient-to-r from-[#18345C] to-[#1E223A]
                                text-[22px] text-white
                                px-8
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
                        <Button
                            className="bg-gradient-to-r from-[#22D3EE] via-[#3B82F6] to-[#1E3A8A] text-white rounded-md px-4 py-2 border-none shadow-none hover:opacity-90 transition"
                            variant="outline">
                            View GOAT Club
                        </Button>
                        <Button className="bg-white/20 border-white/10 rounded-md">
                            <span>View Leaderboard</span>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}