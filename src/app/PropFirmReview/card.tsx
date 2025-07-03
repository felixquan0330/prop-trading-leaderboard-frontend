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
        <div className="bg-white dark:bg-[#282828] rounded-2xl p-6 flex flex-col gap-3 w-full border border-gray-200 dark:border-[#3F3F3F]">
            <div className="flex justify-between">
                <div className="flex items-center gap-2">
                    <img
                        src={logoUrl || '/images/placeholder.png'}
                        alt={name}
                        className="w-8 h-8 rounded object-cover border border-gray-200 bg-gray-100"
                    />
                    <div>
                        <span className="font-bold text-lg text-[#16191d] dark:text-white">{name}</span>
                        <div className="flex items-center gap-1">
                            {[...Array(Math.floor(rating))].map((_, i) => (
                                <span key={i} className="text-[#FFD700] text-lg align-middle">
                                    <ActiveRating />
                                </span>
                            ))}
                            {[...Array(5 - Math.floor(rating))].map((_, i) => (
                                <span key={i} className="text-[#E5E7EB] text-lg align-middle">
                                    <InactiveRating />
                                </span>
                            ))}
                        </div>
                        <span className="text-[#7B849B] dark:text-white dark:opacity-70 text-sm font-normal mt-1">
                            {rating} from {traders.toLocaleString()} traders
                        </span>
                    </div>
                </div>
                <div className="flex justify-between items-start mb-2">
                    <img src="/images/placeholder.png" alt="firm-bg" className="w-6 h-6 opacity-40" />
                </div>
            </div>
            <hr className="my-2 text-[#E2E5E9]" />
            <div className="flex flex-col gap-2 text-sm text-[#434a56] dark:text-white dark:opacity-70">
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
