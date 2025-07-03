interface SwitchProps {
    children: React.ReactNode
}

export const Switch = ({ children }: SwitchProps) => {
    return (
        <div className="flex bg-[#F7F8FA] dark:bg-[#3F3F3F] rounded-full p-1 w-fit shadow-sm">
            {children}
        </div>
    );
};