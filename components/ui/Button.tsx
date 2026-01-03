import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export function Button({
    children,
    className = '',
    variant = 'primary',
    size = 'md',
    ...props
}: ButtonProps) {

    const baseStyles = "inline-flex items-center justify-center font-bold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border-2 border-brand-dark active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";

    const variants = {
        primary: "bg-brand-orange text-white shadow-[4px_4px_0px_0px_rgba(18,18,18,1)] hover:bg-brand-orange-hover hover:shadow-[2px_2px_0px_0px_rgba(18,18,18,1)] hover:translate-x-[2px] hover:translate-y-[2px]",
        secondary: "bg-brand-dark text-white shadow-[4px_4px_0px_0px_rgba(255,69,0,1)] hover:bg-gray-800 hover:shadow-[2px_2px_0px_0px_rgba(255,69,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]", // Orange shadow
        outline: "bg-white text-brand-dark shadow-[4px_4px_0px_0px_rgba(18,18,18,1)] hover:bg-brand-gray hover:shadow-[2px_2px_0px_0px_rgba(18,18,18,1)] hover:translate-x-[2px] hover:translate-y-[2px]",
        ghost: "bg-transparent border-transparent shadow-none hover:bg-brand-gray/50 hover:border-transparent active:translate-x-0 active:translate-y-0"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    };

    const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    return (
        <button className={combinedClassName} {...props}>
            {children}
        </button>
    );
}
