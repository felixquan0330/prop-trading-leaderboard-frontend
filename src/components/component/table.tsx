import React from 'react';

export const Table = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <table className={`border-separate border-spacing-0 rounded-xl overflow-hidden border border-[#282828] w-full ${className}`}>
        {children}
    </table>
);

export const TableHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <thead className={`bg-[#3F3F3F] ${className}`}>
        {children}
    </thead>
);

export const TableBody = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <tbody className={className}>
        {children}
    </tbody>
);

export const TableRow = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <tr className={`hover:bg-[#252525] transition-colors ${className}`}>
        {children}
    </tr>
);

export const Th = ({ children, className = '', ...props }: { children: React.ReactNode; className?: string; [key: string]: any }) => (
    <th className={`p-4 text-center font-thin text-sm text-white border-b border-[#3F3F3F] ${className}`} {...props}>
        {children}
    </th>
);

export const Td = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <td className={`p-4 text-center border-b border-[#3F3F3F] ${className}`}>
        {children}
    </td>
);