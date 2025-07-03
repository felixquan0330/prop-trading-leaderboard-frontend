export const Badge = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
    return (
        <span
            className="
                bg-[#f6f7f8] dark:bg-[#3F3F3F] 
                rounded-full px-3 py-1 
                text-xs font-medium text-[#434a56] dark:text-white opacity-70
                border border-[#e2e5e9] dark:border-[#3F3F3F]"
        >
            {children}
        </span>
    )
}