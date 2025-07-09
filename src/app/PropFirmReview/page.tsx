"use client"
import { useState } from "react";
import { PropFirmCard } from "./card";
import { Button } from "@/components";
import { ArrowLeft, ArrowRight } from "@/components/component/icons";
import { PaginationDots } from "@/components/component/paginationDots";

// Prop firm data for sliding
const propFirmsData = [
    {
        name: "FTMO",
        rating: 4.7,
        traders: 1220,
        maxDrawdown: "10%",
        minTradingDays: "5 Days",
        weekendTrading: "Not Allowed"
    },
    {
        name: "MyFundedFX",
        rating: 4.5,
        traders: 980,
        maxDrawdown: "8%",
        minTradingDays: "3 Days",
        weekendTrading: "Allowed"
    },
    {
        name: "E8 Funding",
        rating: 4.6,
        traders: 1100,
        maxDrawdown: "12%",
        minTradingDays: "7 Days",
        payouts: "Bi-Weekly"
    },
    {
        name: "FundingPips",
        rating: 4.8,
        traders: 1450,
        maxDrawdown: "6%",
        minTradingDays: "4 Days",
        weekendTrading: "Allowed",
        payouts: "Weekly"
    },
    {
        name: "Apex Trader Funding",
        rating: 4.4,
        traders: 890,
        maxDrawdown: "15%",
        minTradingDays: "10 Days",
        weekendTrading: "Not Allowed",
        payouts: "Monthly"
    },
    {
        name: "Topstep",
        rating: 4.3,
        traders: 750,
        maxDrawdown: "8%",
        minTradingDays: "5 Days",
        weekendTrading: "Allowed",
        payouts: "Bi-Weekly"
    },
    {
        name: "SurgeTrader",
        rating: 4.6,
        traders: 1100,
        maxDrawdown: "10%",
        minTradingDays: "3 Days",
        weekendTrading: "Allowed",
        payouts: "Weekly"
    },
    {
        name: "Traders With Edge",
        rating: 4.2,
        traders: 650,
        maxDrawdown: "12%",
        minTradingDays: "7 Days",
        weekendTrading: "Not Allowed",
        payouts: "Monthly"
    },
    {
        name: "City Traders Imperium",
        rating: 4.7,
        traders: 1200,
        maxDrawdown: "8%",
        minTradingDays: "5 Days",
        weekendTrading: "Allowed",
        payouts: "Bi-Weekly"
    },
    {
        name: "The Funded Trader",
        rating: 4.5,
        traders: 950,
        maxDrawdown: "10%",
        minTradingDays: "4 Days",
        weekendTrading: "Allowed",
        payouts: "Weekly"
    },
    {
        name: "BluSky Trading",
        rating: 4.4,
        traders: 800,
        maxDrawdown: "12%",
        minTradingDays: "6 Days",
        weekendTrading: "Not Allowed",
        payouts: "Monthly"
    },
    {
        name: "Traders Central",
        rating: 4.6,
        traders: 1100,
        maxDrawdown: "8%",
        minTradingDays: "3 Days",
        weekendTrading: "Allowed",
        payouts: "Bi-Weekly"
    }
];

export default function PropFirmReview() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const cardsPerSlide = 3;
    const totalSlides = Math.ceil(propFirmsData.length / cardsPerSlide);

    const nextSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const prevSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const goToSlide = (slideIndex: number) => {
        if (isAnimating || slideIndex === currentSlide) return;
        setIsAnimating(true);
        setCurrentSlide(slideIndex);
        setTimeout(() => setIsAnimating(false), 500);
    };

    return (
        <div className="max-w-[1440px] w-full mx-auto px-20 pt-24 pb-16 flex flex-col gap-8">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-3">
                        <h6 className="text-[#16191d] dark:text-white text-2xl font-bold text-center">Prop Firm Reviews</h6>
                        <p className="text-[#434a56] dark:text-white dark:opacity-70 text-center text-md font-medium">
                            Compare top prop firms by rules, payout speed, and trader ratings
                        </p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-end items-center gap-2">
                            <div className="text-[#434a56] dark:text-white text-sm font-medium">See more</div>
                            <div className="flex gap-4 items-center">
                                <Button 
                                    variant="icon" 
                                    size="fit" 
                                    className={`text-[#434a56] bg-transparent rounded-full border hover:bg-gray-50 dark:hover:bg-[#3F3F3F] transition-colors ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={prevSlide}
                                    disabled={isAnimating}
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                </Button>
                                <Button 
                                    variant="icon" 
                                    size="fit" 
                                    className={`text-[#434a56] bg-transparent rounded-full border hover:bg-gray-50 dark:hover:bg-[#3F3F3F] transition-colors ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={nextSlide}
                                    disabled={isAnimating}
                                >
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="relative overflow-hidden">
                            <div 
                                className="flex transition-all duration-500 ease-in-out"
                                style={{
                                    width: `${totalSlides * 100}%`,
                                    transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`,
                                }}
                            >
                                {Array.from({ length: totalSlides }, (_, slideIndex) => (
                                    <div key={slideIndex} className="w-full flex gap-6">
                                        {propFirmsData.slice(slideIndex * cardsPerSlide, (slideIndex + 1) * cardsPerSlide).map((firm, index) => (
                                            <div key={`${slideIndex}-${index}`} className="w-1/3">
                                                <PropFirmCard
                                                    name={firm.name}
                                                    rating={firm.rating}
                                                    traders={firm.traders}
                                                    maxDrawdown={firm.maxDrawdown}
                                                    minTradingDays={firm.minTradingDays}
                                                    weekendTrading={firm.weekendTrading}
                                                    payouts={firm.payouts}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <PaginationDots total={totalSlides} activeIndex={currentSlide} onClick={goToSlide} />
                    </div>
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