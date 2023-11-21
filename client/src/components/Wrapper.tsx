import React from "react";
import { Box } from "@chakra-ui/react";
import { WrapperVariant } from "../types";

interface WrapperProps {
  children: React.ReactNode;
  variant?: WrapperVariant;
}

const Wrapper: React.FC<WrapperProps> = ({ children, variant = "regular" }) => {
  return (
    <Box
      w="100%"
      maxW={variant === "regular" ? "800px" : "400px"}
      mt={8}
      mx="auto"
    >
      {children}
    </Box>
  );
};

export default Wrapper;
