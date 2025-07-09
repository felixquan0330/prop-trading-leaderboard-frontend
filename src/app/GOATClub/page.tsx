"use client"
import { GOATClubCard } from "./card";
import { Button } from "@/components";
import { ArrowLeft, ArrowRight } from "@/components/component/icons";
import { PaginationDots } from "@/components/component/paginationDots";

export default function GOATClub() {

    return (
        <div className="max-w-[1440px] w-full mx-auto px-20 pt-24 pb-16 flex flex-col gap-8">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-3">
                        <h6 className="text-[#16191d] dark:text-white text-2xl font-bold text-center">GOAT Club</h6>
                        <p className="text-[#434a56] dark:text-white dark:opacity-70 text-center text-md font-medium">
                            Spotlighting the best traders with verified payouts over $100K
                        </p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-end items-center gap-2">
                            <div className="text-[#434a56] dark:text-white text-sm font-medium">See more</div>
                            <div className="flex gap-4 items-center">
                                <Button variant="icon" size="fit" className="text-[#434a56] bg-transparent rounded-full border">
                                    <ArrowLeft className="w-4 h-4" />
                                </Button>
                                <Button variant="icon" size="fit" className="text-[#434a56] bg-transparent rounded-full border">
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="w-1/4">
                                <GOATClubCard
                                    avatarUrl="/user-default-light.png"
                                    username="PipHunterX"
                                    country="USA"
                                    firm="Alpha Prop Firm"
                                    payout="$186,000 paid out"
                                    quote="One trade at a time."
                                />
                            </div>
                            <div className="w-1/4">
                                <GOATClubCard
                                    avatarUrl="/user-default-light.png"
                                    username="DuneTrader"
                                    country="SA"
                                    firm="DesertEdge"
                                    payout="$145,700 paid out"
                                    quote="Patience pays."
                                />
                            </div>
                            <div className="w-1/4">
                                <GOATClubCard
                                    avatarUrl="/user-default-light.png"
                                    username="SniperWolfFX"
                                    country="UK"
                                    firm="Titan Trades"
                                    payout="$142,500 paid out"
                                    quote="Precision is everything."
                                />
                            </div>
                            <div className="w-1/4">
                                <GOATClubCard
                                    avatarUrl="/user-default-light.png"
                                    username="ChartSurfer"
                                    country="FRA"
                                    firm="PropElite"
                                    payout="$131,300 paid out"
                                    quote="Ride the wave."
                                />
                            </div>
                        </div>
                    </div>
                    <PaginationDots total={4} activeIndex={0} />
                </div>
            </div>
            <div className="flex justify-center">
                <Button
                    variant="outline"
                    className="text-[#434a56] dark:text-white bg-transparent rounded-sm border dark:border-[#3F3F3F]
                                dark:text-white dark:bg-gradient-to-b dark:from-[#9CECFB] dark:via-[#65C7F7] dark:to-[#0052D4] dark:border-none dark:hover:opacity-90">
                    See All
                </Button>
            </div>
        </div>
    )
}