import React from 'react'
import { Button, Header } from '@/components'
import { WavyBackground } from "./component/wave-background";

export default function Hero() {
    return (
        <div className="relative overflow-hidden flex flex-col px-20">
            <Header />
            <WavyBackground className="flex-1 flex flex-col justify-center items-center w-full">
                <section className="flex flex-col items-center justify-center gap-20 text-center relative z-10 w-full py-24">
                    <div className="flex flex-col items-center justify-center gap-10">
                        <div className="flex flex-col gap-4">
                            <div className="text-[40px] text-white font-semibold tracking-tighter">
                                THE #1 LEADERBOARD FOR PROP TRADERS <br />
                                WORLDWIDE
                            </div>
                            <div className="text-white/75 text-[18px] tracking-normal">
                                See who’s winning across top firms — in real time.
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
            </WavyBackground>
        </div >
    )
}