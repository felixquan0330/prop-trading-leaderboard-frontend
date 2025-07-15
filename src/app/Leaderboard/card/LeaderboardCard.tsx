import { ProfitCard } from './ProfitCard'
import { TraderCard } from './TraderCard'
import { Button } from '@/components'

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
    subtitle,
    badges,
}: LeaderboardCardProps) => {
    return (
        <div
            className="w-fit rounded-2xl p-6 bg-gradient-to-r from-[#0E1625] to-[#0B111B] border border-white/10 backdrop-blur-[12px] shadow-[0_4px_30px_0_rgba(0,0,0,0.25)] flex items-center"
            style={{
                boxShadow: '0 4px 30px 0 rgba(0,0,0,0.25), inset 0 2px 6px 0 rgba(255,255,255,0.04)'
            }}
        >
            <div className="text-[#FFFFFFBF] items-center justify-center text-base flex items-center gap-2 min-w-[50px]">
                {
                    rank === 1 ? <img src={"/medal/gold.png"} alt="1" className="w-4 h-4" /> :
                        rank === 2 ? <img src={"/medal/silver.png"} alt="2" className="w-4 h-4" /> :
                            rank === 3 ? <img src={"/medal/bronze.png"} alt="3" className="w-4 h-4" /> :
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
                    subtitle={subtitle}
                />
            </div>

            <div className="flex items-center gap-2 min-w-[200px] max-w-[200px] p-4">
                <img src={`/propfirm_icon/${firmname}.png`} alt={firmname} className="w-6 h-6" />
                {firmname}
            </div>


            <div className="flex items-center justify-center min-w-[300px] max-w-[300px]">
                <ProfitCard currentProfit={currentProfit} targetProfit={targetProfit} />
            </div>

            {/* Right: Badges and More */}
            <div className="flex flex-col items-center justify-center gap-3 min-w-[300px] max-w-[300px]">
                {
                    badges.map((badge, index) => (
                        <div key={index} className="relative p-[1px]">
                            <span className="bg-white/10 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 border border-[1px] border-[#FFFFFF33]">
                                {badge.icon} {badge.name}
                            </span>
                        </div>
                    ))
                }
            </div>
            <div
                className="
                    p-[1px] rounded-md
                    bg-gradient-to-r from-[#22D3EE] via-[#3B82F6] to-[#1E3A8A]"
            >
                <Button
                    className="
                        rounded-md
                        bg-gradient-to-r from-[#0E1625] to-[#0B111B]
                        px-2 py-1 w-full
                    "
                >
                    More
                </Button>
            </div>
        </div>
    )
}