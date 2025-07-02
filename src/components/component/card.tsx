import React from 'react'

interface CardProps {
    children: React.ReactNode
    className?: string
}

const Card = ({ children, className = "", ...props }: CardProps) => {
    return (
        <div className={`rounded-lg border bg-white ${className}`} {...props}>
            {children}
        </div>
    )
}

const CardContent = ({ children, className = "", ...props }: CardProps) => {
    return (
        <div className={`p-6 ${className}`} {...props}>
            {children}
        </div>
    )
}

export { Card, CardContent }
export type { CardProps } 