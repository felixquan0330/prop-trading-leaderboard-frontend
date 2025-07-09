import React from 'react';
import { US, FR, GB, SA } from 'country-flag-icons/react/3x2';

interface GOATClubCardProps {
    avatarUrl?: string;
    username: string;
    country: string;
    firm: string;
    payout: string;
    quote: string;
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
        <div className="bg-[#282828] rounded-2xl p-6 flex flex-col items-center border border-[#3F3F3F] w-full max-w-xs min-w-[250px] mx-auto">
            <div className="flex justify-between items-start w-full mb-2">
                <div className="flex items-center gap-2">
                    <img
                        src={avatarUrl || '/user-default-dark.png'}
                        alt={username}
                        className="w-10 h-10 rounded-full object-cover border border-[#3F3F3F] bg-[#171717]"
                    />
                    <div className="flex items-center gap-1">
                        {country === "USA" && <US title="United States" className="w-4 h-4" />}
                        {country === "FRA" && <FR title="France" className="w-4 h-4" />}
                        {country === "UK" && <GB title="United Kingdom" className="w-4 h-4" />}
                        {country === "SA" && <SA title="Saudi Arabia" className="w-4 h-4" />}
                        <span className="text-lg text-white flex items-center gap-1">
                            {country} {username}
                        </span>
                    </div>
                </div>
                <img src="/images/placeholder.png" alt="profile-bg" className="w-5 h-5 opacity-40" />
            </div>
            <div className="w-full text-left text-white opacity-70 text-sm font-medium mb-2 pl-12">{firm}</div>
            <hr className="my-2 w-full text-[#3F3F3F]" />
            <div className="flex flex-col gap-2 mb-4 text-center">
                <span className="text-md font-bold text-white">{payout}</span>
                <span className="italic text-white opacity-70 text-sm">"{quote}"</span>
            </div>
            <div className="
                p-[1px] rounded-full
                border-none
                bg-gradient-to-b from-[#9CECFB] via-[#65C7F7] to-[#0052D4]
            ">
                <button className="
                    rounded-full px-5 py-2
                    bg-[#282828] text-white hover:bg-[#3F3F3F] transition text-sm w-full
                    border-none
                ">
                    View Profile
                </button>
            </div>
        </div>
    );
};

export default GOATClubCard;
