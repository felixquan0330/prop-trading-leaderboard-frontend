import React from 'react'

interface AvatarProps {
    children: React.ReactNode
    className?: string
}

const Avatar = ({ children, className = "", ...props }: AvatarProps) => {
    return (
        <div className={`relative flex h-6 w-6 shrink-0 overflow-hidden rounded-full ${className}`} {...props}>
            {children}
        </div>
    )
}

const AvatarFallback = ({ children, className = "", ...props }: AvatarProps) => {
    return (
        <div className={`flex h-full w-full items-center justify-center rounded-full ${className}`} {...props}>
            {children}
        </div>
    )
}

export { Avatar, AvatarFallback }
export type { AvatarProps } 