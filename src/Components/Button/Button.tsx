import { ReactNode } from "react";

interface ButtonProps {
    children?: ReactNode;
    onClick?: () => void;
    className: string;
}

export default function Button( {children, onClick, className}: ButtonProps) {
      
    return (
        <button onClick={onClick} className={className}>
            {children}
        </button>
    )
}