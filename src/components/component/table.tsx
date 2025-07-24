import React from 'react';

export const Table = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <table className={`border-separate border-spacing-0 rounded-xl overflow-hidden border border-white/10 w-full ${className}`}>
        {children}
    </table>
);

export const TableHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <thead
        className={`bg-[linear-gradient(180deg,_#0E1625_0%,_#0B111B_100%)] border border-white/10 ${className}`}
    >
        {children}
    </thead>
);

export const TableBody = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <tbody className={className}>
        {children}
    </tbody>
);

export const TableRow = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <tr className={`hover:bg-[#252525] ${className}`}>
        {children}
    </tr>
);

export const Th = ({ children, className = '', ...props }: { children: React.ReactNode; className?: string; [key: string]: any }) => (
    <th className={`p-4 text-center text-sm text-white font-semibold w-1/3 ${className}`} {...props}>
        {children}
    </th>
);

export const Td = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <td className={`p-4 text-center border-b-2 border-white/10 w-1/3 ${className}`}>
        {children}
    </td>
);