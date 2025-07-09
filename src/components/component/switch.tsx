import React from 'react';

interface SwitchProps {
    children: React.ReactNode;
}

export const Switch = ({ children }: SwitchProps) => {
    return (
        <div className="flex bg-[#171717] rounded-full p-1 w-fit shadow-sm">
            {children}
        </div>
    );
};