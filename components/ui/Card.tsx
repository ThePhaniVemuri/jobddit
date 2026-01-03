import React, { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    hoverEffect?: boolean;
}

export function Card({ children, className = '', hoverEffect = false, ...props }: CardProps) {
    const baseStyles = "bg-white border-2 border-brand-dark rounded-xl p-6 transition-all duration-200";
    const hoverStyles = hoverEffect
        ? "hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(18,18,18,1)]"
        : "shadow-[4px_4px_0px_0px_rgba(18,18,18,1)]"; // Default shadow for simple cards usually exists or not. 

    // Let's decide: standard card has a shadow?
    // Gumroad often has cards with borders and simple hover lifts. 
    // Let's make default card just bordered, and if hoverEffect is true, it lifts and adds shadow.
    // actually, "brutal" usually implies a hard shadow always present or on hover. 
    // Let's make the default have a small shadow, and hover makes it bigger or moves it.

    const finalStyles = hoverEffect
        ? "bg-white border-2 border-brand-dark rounded-xl p-6 shadow-[2px_2px_0px_0px_rgba(18,18,18,1)] hover:shadow-[6px_6px_0px_0px_rgba(18,18,18,1)] hover:-translate-y-1 transition-all duration-200"
        : "bg-white border-2 border-brand-dark rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(18,18,18,1)]";

    return (
        <div className={`${finalStyles} ${className}`} {...props}>
            {children}
        </div>
    );
}
