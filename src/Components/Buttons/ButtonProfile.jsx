import React from 'react';

function ButtonProfile({ children, className, type, onClick }) {
  return (
    <button
      className={`flex flex-shrink-0 gap-2 self-center text-sm border-4 py-1 px-2 rounded ${className}`}
      type={type || 'button'}
      onClick={onClick}>
      {children}
    </button>
  );
}

export default ButtonProfile;
