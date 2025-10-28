import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "blue" | "green" | "red" | "gray";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  variant = "blue",
  size = "md",
  fullWidth = false,
  disabled = false,
}: ButtonProps) {
  const colors = {
    blue: "bg-blue-600 text-white hover:bg-blue-700",
    green: "bg-green-600 text-white hover:bg-green-700",
    red: "bg-red-600 text-white hover:bg-red-700",
    gray: "bg-gray-300 text-gray-800 hover:bg-gray-400",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg font-semibold transition ${colors[variant]} ${sizes[size]
        } ${fullWidth ? "w-full" : ""} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
}
