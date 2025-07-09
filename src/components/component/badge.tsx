export const Badge = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
    return (
        <span
            className="
                bg-[#3F3F3F] 
                rounded-full px-3 py-1 
                text-xs font-medium text-white
                border border-[#737373]"
        >
            {children}
        </span>
    )
}