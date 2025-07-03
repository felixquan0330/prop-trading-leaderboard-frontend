"use client"
import { PropFirmCard } from "./card";
import { Button } from "@/components";
import { ArrowLeft, ArrowRight } from "@/components/component/icons";
import { PaginationDots } from "@/components/component/paginationDots";

export default function PropFirmReview() {

    return (
        <div className="px-20 pt-24 pb-16 flex flex-col gap-8">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-3">
                        <h6 className="text-[#16191d] dark:text-white text-2xl font-bold text-center">Prop Firm Reviews</h6>
                        <p className="text-[#434a56] dark:text-white opacity-70 text-center text-sm font-medium">
                            Compare top prop firms by rules, payout speed, and trader ratings
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
                            <div className="w-1/3">
                                <PropFirmCard
                                    name="FTMO"
                                    rating={4.7}
                                    traders={1220}
                                    maxDrawdown="10%"
                                    minTradingDays="5 Days"
                                    weekendTrading="Not Allowed"
                                />
                            </div>
                            <div className="w-1/3">
                                <PropFirmCard
                                    name="MyFundedFX"
                                    rating={4.5}
                                    traders={980}
                                    maxDrawdown="8%"
                                    minTradingDays="3 Days"
                                    weekendTrading="Allowed"
                                />
                            </div>
                            <div className="w-1/3">
                                <PropFirmCard
                                    name="E8 Funding"
                                    rating={4.6}
                                    traders={1100}
                                    maxDrawdown="12%"
                                    minTradingDays="7 Days"
                                    payouts="Bi-Weekly"
                                />
                            </div>
                        </div>
                        <PaginationDots total={4} activeIndex={0} />
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <Button variant="outline" className="text-[#434a56] dark:text-white bg-transparent rounded-sm border dark:border-[#3F3F3F]">
                    See All
                </Button>
            </div>
        </div>
    )
}