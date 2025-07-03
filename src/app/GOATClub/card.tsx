import React from 'react';
import { US, SA, GB, FR } from 'country-flag-icons/react/3x2'

interface GOATClubCardProps {
    avatarUrl?: string;
    username: string;
    country: string; // e.g. 🇺🇸
    firm: string;
    payout: string; // e.g. "$186,000 paid out"
    quote: string; // e.g. "One trade at a time."
}

export const GOATClubCard: React.FC<GOATClubCardProps> = ({
    avatarUrl,
    username,
    country,
    firm,
    payout,
    quote,
}) => {
    return (
        <div className="bg-white dark:bg-[#282828] rounded-2xl p-6 flex flex-col items-center border border-gray-200 dark:border-[#3F3F3F] w-full max-w-xs min-w-[250px] mx-auto">
            <div className="flex justify-between items-start w-full mb-2">
                <div className="flex items-center gap-2">
                    <img
                        src={avatarUrl || '/user-default.png'}
                        alt={username}
                        className="w-10 h-10 rounded-full object-cover border border-gray-200 bg-gray-100"
                    />
                    <div className="flex items-center gap-1">
                        {country === "USA" && <US title="United States" className="w-4 h-4" />}
                        {country === "FRA" && <FR title="France" className="w-4 h-4" />}
                        {country === "UK" && <GB title="United Kingdom" className="w-4 h-4" />}
                        {country === "SA" && <SA title="Saudi Arabia" className="w-4 h-4" />}
                        <span className="text-lg text-[#16191d] dark:text-white flex items-center gap-1">
                            {country} {username}
                        </span>
                    </div>
                </div>
                <img src="/images/placeholder.png" alt="profile-bg" className="w-5 h-5 opacity-40" />
            </div>
            <div className="w-full text-left text-[#7B849B] dark:text-white dark:opacity-70 text-sm font-medium mb-2 pl-12">{firm}</div>
            <hr className="my-2 w-full text-[#E2E5E9]" />
            <div className="w-full flex flex-col items-center gap-1 mb-2">
                <span className="text-md font-bold text-[#16191d] dark:text-white">{payout}</span>
                <span className="italic text-[#7B849B] dark:text-white dark:opacity-70 text-sm">“{quote}”</span>
            </div>
            <button className="mt-3 px-5 py-2 rounded-md border border-gray-300 bg-white dark:bg-[#282828] text-[#16191d] dark:text-white hover:bg-gray-50 dark:hover:bg-[#3F3F3F] dark:hover:text-white dark:border-[#3F3F3F] transition text-sm">
                View Profile
            </button>
        </div>
    );
};

export default GOATClubCard;
