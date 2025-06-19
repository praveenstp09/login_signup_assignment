import React from "react";

const Button = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 border-none rounded hover:opacity-90 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
