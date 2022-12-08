import React from 'react';

function ButtonProfile({ children, className, type, onClick }) {
    return (
        <button
            className={`flex items-center gap-2 flex-shrink-0 text-sm border-4 py-1 px-2 rounded ${className}`}
            type={type || 'button'}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default ButtonProfile;
