export const Badge = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
    return (
        <span className="bg-[#f6f7f8] rounded-full px-3 py-1 text-xs font-medium text-[#434a56] border border-[#e2e5e9]">
            {children}
        </span>
    )
}