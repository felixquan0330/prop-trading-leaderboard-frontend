"use client"
import { useState } from "react";
import { GOATClubCard } from "./card";
import { Button } from "@/components";
import { ArrowLeft, ArrowRight } from "@/components/component/icons";
import { PaginationDots } from "@/components/component/paginationDots";

// Card data for sliding
const cardsData = [
    {
        avatarUrl: "/user-default-light.png",
        username: "PipHunterX",
        country: "USA",
        firm: "Alpha Prop Firm",
        payout: "$186,000 paid out",
        quote: "One trade at a time."
    },
    {
        avatarUrl: "/user-default-light.png",
        username: "DuneTrader",
        country: "SA",
        firm: "DesertEdge",
        payout: "$145,700 paid out",
        quote: "Patience pays."
    },
    {
        avatarUrl: "/user-default-light.png",
        username: "SniperWolfFX",
        country: "UK",
        firm: "Titan Trades",
        payout: "$142,500 paid out",
        quote: "Precision is everything."
    },
    {
        avatarUrl: "/user-default-light.png",
        username: "ChartSurfer",
        country: "FRA",
        firm: "PropElite",
        payout: "$131,300 paid out",
        quote: "Ride the wave."
    },
    {
        avatarUrl: "/user-default-light.png",
        username: "VolatilityKing",
        country: "USA",
        firm: "RiskMaster Pro",
        payout: "$198,500 paid out",
        quote: "Embrace the chaos."
    },
    {
        avatarUrl: "/user-default-light.png",
        username: "TrendTracker",
        country: "UK",
        firm: "Momentum Capital",
        payout: "$167,200 paid out",
        quote: "Follow the trend."
    },
    {
        avatarUrl: "/user-default-light.png",
        username: "ScalpMaster",
        country: "FRA",
        firm: "QuickTrades",
        payout: "$123,800 paid out",
        quote: "Small gains, big results."
    },
    {
        avatarUrl: "/user-default-light.png",
        username: "FundamentalFX",
        country: "SA",
        firm: "Economic Edge",
        payout: "$156,900 paid out",
        quote: "Data drives decisions."
    }
];

export default function GOATClub() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const cardsPerSlide = 4;
    const totalSlides = Math.ceil(cardsData.length / cardsPerSlide);

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

    const getCurrentCards = () => {
        const startIndex = currentSlide * cardsPerSlide;
        return cardsData.slice(startIndex, startIndex + cardsPerSlide);
    };

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
                                        {cardsData.slice(slideIndex * cardsPerSlide, (slideIndex + 1) * cardsPerSlide).map((card, index) => (
                                            <div key={`${slideIndex}-${index}`} className="w-1/4">
                                                <GOATClubCard
                                                    avatarUrl={card.avatarUrl}
                                                    username={card.username}
                                                    country={card.country}
                                                    firm={card.firm}
                                                    payout={card.payout}
                                                    quote={card.quote}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <PaginationDots total={totalSlides} activeIndex={currentSlide} onClick={goToSlide} />
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