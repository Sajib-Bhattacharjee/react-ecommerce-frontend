import React from "react";

// This is a simplified icon wrapper that bypasses TypeScript React-Icons issues
interface IconProps {
  icon: any; // Using any to bypass TypeScript issues with React Icons
}

export const Icon: React.FC<IconProps> = ({ icon: IconComponent }) => {
  return (
    <span className="icon-wrapper">
      {/* @ts-ignore - React Icons have complex typing that causes issues */}
      <IconComponent size={20} />
    </span>
  );
};
