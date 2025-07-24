interface ProfitCardProps {
    currentProfit: number;
    targetProfit: number;
    className?: string;
}

export const ProfitCard = ({ currentProfit, targetProfit, className = "" }: ProfitCardProps) => {
    const progressPercentage = Math.min((currentProfit / targetProfit) * 100, 100);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="py-4 w-fit mx-auto">
            <div className={`bg-white/5 border border-white/10 backdrop-blur-[12px] rounded-lg p-4 shadow-lg ${className}`}>
                <div className="flex items-center gap-10 mb-3">
                    <div>
                        💰<span className="text-white opacity-50 font-thin text-sm ml-1">Current Profit</span>
                    </div>
                    <div className="text-white text-sm">
                        {formatCurrency(currentProfit)} / {formatCurrency(targetProfit)}
                    </div>
                </div>

                <div className="w-full h-3 bg-gray-600 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-[#22D3EE] via-[#3B82F6] to-[#1E3A8A] rounded-full transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
            </div>
        </div>

    );
}; 