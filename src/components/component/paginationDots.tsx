import React from "react";

interface PaginationDotsProps {
    total: number;
    activeIndex: number;
    onClick?: (index: number) => void;
}

export const PaginationDots: React.FC<PaginationDotsProps> = ({
    total,
    activeIndex,
    onClick,
}) => (
    <div className="flex items-center justify-center gap-3 py-2">
        {Array.from({ length: total }).map((_, idx) => (
            <button
                key={idx}
                className={`w-2 h-2 rounded-full transition-colors ${idx === activeIndex ? "bg-[#9CECFB]" : "bg-[#3F3F3F]"
                    }`}
                onClick={() => onClick?.(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                type="button"
            />
        ))}
    </div>
);