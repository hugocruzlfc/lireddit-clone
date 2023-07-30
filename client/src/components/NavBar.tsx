import { Box, Flex, Link as LinkUi } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  return (
    <Flex
      bg="tomato"
      p={4}
    >
      <Box ml={"auto"}>
        <Link href="/login">
          <LinkUi
            color="white"
            mr={2}
          >
            Login
          </LinkUi>
        </Link>
        <Link href="/register">
          <LinkUi color="white">Register</LinkUi>
        </Link>
      </Box>
    </Flex>
  );
};

export default NavBar;
