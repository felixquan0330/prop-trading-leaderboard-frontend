import { ProfitCard } from './ProfitCard'
import { TraderCard } from './TraderCard'

interface LeaderboardCardProps {
    avatarUrl: string;
    userid: string;
    country: 'US' | 'FR' | 'GB' | 'JP' | 'AU' | 'SA' | 'CA' | 'IT' | 'IN' | 'NZ';
    firmname: string;
    isVerified: boolean;
    currentProfit: number;
    targetProfit: number;
    rank: number;
    subtitle: string;
    badges: Array<{
        name: string;
        icon: string;
        color: string;
    }>;
}

export const LeaderboardCard = ({
    avatarUrl,
    userid,
    country,
    firmname,
    isVerified,
    currentProfit,
    targetProfit,
    rank,
    badges,
}: LeaderboardCardProps) => {
    return (
        <div
                        className={`w-full rounded-2xl px-8 py-6 bg-gradient-to-r from-[#0E1625] to-[#0B111B] backdrop-blur-[12px] flex justify-between items-center border border-white/10 ${
                rank === 1 
                    ? 'shadow-[0_0px_12px_0px_rgba(255,215,0,0.5),0_4px_30px_0_rgba(0,0,0,0.25),inset_0_2px_8px_0_rgba(255,250,205,0.3)]' 
                    : rank === 2
                    ? 'shadow-[0_0px_12px_0px_rgba(192,192,192,0.75),0_4px_30px_0_rgba(0,0,0,0.25),inset_0_2px_6px_0_rgba(255,255,255,0.04)]'
                    : rank === 3
                    ? 'shadow-[0_0px_12px_0px_rgba(205,127,50,0.75),0_4px_30px_0_rgba(0,0,0,0.25),inset_0_2px_6px_0_rgba(255,255,255,0.04)]'
                    : 'shadow-[0_4px_30px_0_rgba(0,0,0,0.25),inset_0_2px_6px_0_rgba(255,255,255,0.04)]'
            }`}
        >
            <div className={`text-[#FFFFFFBF] items-center justify-center flex items-center gap-2 p-4 ${
                rank === 1 || rank === 2 || rank === 3 ? 'text-xl' : 'text-base'
            }`}>
                {
                    rank === 1 ? <img src={"/medal/gold.png"} alt="1" className="w-8 h-6" /> :
                        rank === 2 ? <img src={"/medal/silver.png"} alt="2" className="w-8 h-6" /> :
                            rank === 3 ? <img src={"/medal/bronze.png"} alt="3" className="w-8 h-6" /> :
                                ""
                }
                #{rank}
            </div>
            <div className="flex items-center min-w-[300px] max-w-[300px] p-4">
                <TraderCard
                    avatarUrl={avatarUrl}
                    userid={userid}
                    country={country}
                    isVerified={isVerified}
                />
            </div>

            <div className="flex items-center gap-2 min-w-[200px] max-w-[200px] p-4">
                <img src={`/propfirm_icon/${firmname}.png`} alt={firmname} className="w-6 h-6" />
                {firmname}
            </div>


            <div className="flex items-center justify-center min-w-[300px] max-w-[300px]">
                <ProfitCard currentProfit={currentProfit} targetProfit={targetProfit} />
            </div>
        </div>
    )
}