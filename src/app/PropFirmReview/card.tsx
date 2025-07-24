import React from 'react';
import { Calendar, Weekend, FireWall, Dollar, ActiveRating, InactiveRating } from '@/components/component/icons';

interface PropFirmCardProps {
    logoUrl?: string;
    name: string;
    rating: number; // e.g. 4.7
    traders: number;
    maxDrawdown: string;
    minTradingDays: string;
    weekendTrading?: string; // e.g. 'Allowed' or 'Not Allowed'
    payouts?: string; // e.g. 'Bi-Weekly'
}

export const PropFirmCard: React.FC<PropFirmCardProps> = ({
    logoUrl,
    name,
    rating,
    traders,
    maxDrawdown,
    minTradingDays,
    weekendTrading,
    payouts,
}) => {
    return (
        <div
          className="rounded-2xl p-6 flex flex-col justify-between gap-3 w-full min-h-[320px] border border-[rgba(255,255,255,0.1)] bg-[linear-gradient(180deg,_#0E1625_0%,_#0B111B_100%)] backdrop-blur-[12px] shadow-[0_4px_30px_rgba(0,0,0,0.25)]"
        >
            <div className="flex justify-between">
                <div className="flex items-center gap-2">
                    <img
                        src={logoUrl || '/images/placeholder.png'}
                        alt={name}
                        className="w-8 h-8 rounded object-cover border border-[#3F3F3F] bg-[#171717]"
                    />
                    <div>
                        <span className="font-bold text-lg text-white">{name}</span>
                        <div className="flex items-center gap-1">
                            {[...Array(Math.floor(rating))].map((_, i) => (
                                <span key={i} className="text-[#FFD700] text-lg align-middle">
                                    <ActiveRating />
                                </span>
                            ))}
                            {[...Array(5 - Math.floor(rating))].map((_, i) => (
                                <span key={i} className="text-[#3F3F3F] text-lg align-middle">
                                    <InactiveRating />
                                </span>
                            ))}
                        </div>
                        <span className="text-white opacity-70 text-sm font-normal mt-1">
                            {rating} from {traders.toLocaleString()} traders
                        </span>
                    </div>
                </div>
                <div className="flex justify-between items-start mb-2">
                    <img src="/images/placeholder.png" alt="firm-bg" className="w-6 h-6 opacity-40" />
                </div>
            </div>
            <hr className="my-2 text-[#3F3F3F]" />
            <div className="flex flex-col gap-2 text-sm text-white opacity-70">
                <div className="flex items-center gap-2">
                    <FireWall />
                    <span>Max Drawdown: <span className="font-bold">{maxDrawdown}</span></span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar />
                    <span>Min Trading Days: <span className="font-bold">{minTradingDays}</span></span>
                </div>
                {weekendTrading && (
                    <div className="flex items-center gap-2">
                        <Weekend />
                        <span>Weekend Trading: <span className="font-bold">{weekendTrading}</span></span>
                    </div>
                )}
                {payouts && (
                    <div className="flex items-center gap-2">
                        <Dollar />
                        <span>Payouts: <span className="font-bold">{payouts}</span></span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PropFirmCard;
