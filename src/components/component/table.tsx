import React from 'react';

export const Table = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <table className={`border-separate border-spacing-0 rounded-xl overflow-hidden border border-[#e2e5e9] dark:border-[#282828] w-full ${className}`}>
        {children}
    </table>
);

export const Th = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <th className={`p-4 text-center ${className}`}>
        <span className="text-sm">{children}</span>
    </th>
);

export const Td = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <td className={`p-4 text-center border-b border-[#F6F7F8] dark:border-[#3F3F3F] ${className}`}>
        <span className="text-sm">{children}</span>
    </td>
);

export const TableHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <thead className={`bg-[#f6f7f8] dark:bg-[#3F3F3F] ${className}`}>
        <tr>
            {children}
        </tr>
    </thead>
);

export const TableBody = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <tbody className={className}>
        {children}
    </tbody>
);

export const TableRow = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <tr className={className}>
        {children}
    </tr>
);