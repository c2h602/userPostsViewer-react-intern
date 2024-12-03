import { ReactNode } from "react";

interface IButton {
    children?: ReactNode;
    onClick?: () => void;
    className: string;
}

export default function Button( {children, onClick, className}: IButton) {
      
    return (
        <button onClick={onClick} className={className}>
            {children}
        </button>
    )
}