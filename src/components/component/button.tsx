import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    variant?: "default" | "outline" | "icon" | "switch"
    size?: "default" | "fit" | "sm"
    className?: string
}

export const Button = ({ children, variant = "default", size = "default", className = "", ...props }: ButtonProps) => {
    const baseClasses = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
    
    const variants: Record<string, string> = {
        default: "text-white hover:bg-[#434a56] px-4 py-2",
        outline: "border border-[#3F3F3F] bg-transparent px-4 py-2 text-white",
        icon: "rounded-full text-white gap-2",
        switch: "rounded-full text-white"
    }
    
    const sizes: Record<string, string> = {
        default: "h-10",
        fit: "h-6 w-6 p-2",
        sm: "h-6 px-3 text-sm"
    }
    
    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`
    
    return (
        <button className={classes} {...props}>
            {children}
        </button>
    )
}