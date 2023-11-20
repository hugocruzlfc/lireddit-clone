import Link from "next/link";
import React from "react";

export interface ForgotPasswordLinkProps {
  label: string;
}

export const ForgotPasswordLink: React.FC<ForgotPasswordLinkProps> = ({
  label,
}) => {
  return (
    <Link
      href="/forgot-password"
      style={{ color: "#2196F3", textDecoration: "underline" }}
    >
      {label}
    </Link>
  );
};
