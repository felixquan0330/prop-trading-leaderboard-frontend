import { Check } from '@/components';
import { US, FR, GB, JP, AU, SA, CA, IT, IN, NZ } from 'country-flag-icons/react/3x2';

interface TraderCardProps {
    avatarUrl: string;
    userid: string;
    country: 'US' | 'FR' | 'GB' | 'JP' | 'AU' | 'SA' | 'CA' | 'IT' | 'IN' | 'NZ';
    isVerified?: boolean;
    className?: string;
}

export const TraderCard = ({ 
    avatarUrl, 
    userid, 
    country, 
    isVerified = false, 
    className = ""
}: TraderCardProps) => {
    const getCountryFlag = (countryCode: string) => {
        const flagComponents: { [key: string]: React.ComponentType<any> } = {
            US, FR, GB, JP, AU, SA, CA, IT, IN, NZ
        };
        
        const FlagComponent = flagComponents[countryCode];
        return FlagComponent ? <FlagComponent className="w-full h-full" /> : null;
    };

    return (
        <div className={`flex items-center gap-2 w-fit mx-auto ${className}`}>
            <div className="relative">
                <img 
                    src={avatarUrl} 
                    alt={`${userid}'s avatar`} 
                    className="w-12 h-12 rounded-full border border-[#3B82F6]/30 bg-[#22D3EE]"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-white p-px">
                    <div className="w-full h-full rounded-full overflow-hidden">
                        {getCountryFlag(country)}
                    </div>
                </div>
            </div>
            
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-lg truncate">{userid}</span>
                    {isVerified && (
                        <Check className="w-4 h-4 text-blue-500" />
                    )}
                </div>
            </div>
        </div>
    );
};