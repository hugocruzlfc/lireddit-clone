"use client";
import React from "react";
import { Link } from "@chakra-ui/next-js";

export interface CustomLinkProps {
  label: string;
  href: string;
  color?: string;
  hover?: string;
}

export const CustomLink: React.FC<CustomLinkProps> = ({
  label,
  href,
  color = "blue.400",
  hover = "blue.500",
}) => {
  return (
    <Link
      href={href}
      color={color}
      _hover={{ color: hover }}
    >
      {label}
    </Link>
  );
};
