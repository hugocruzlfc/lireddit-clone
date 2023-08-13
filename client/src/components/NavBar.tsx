import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: fetchingLogout }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    //pause: true,
    pause: isServer(),
  });
  let body = null;

  // data is loading
  if (fetching) {
    body = null;
  } else if (!data?.me) {
    // user not logged in
    body = (
      <Flex>
        <Box mr={3}>
          <Link href="/login">Login</Link>
        </Box>
        <Box>
          <Link href="/register">Register</Link>
        </Box>
      </Flex>
    );
  } else {
    // user is logged in
    body = (
      <Flex>
        <Box as="span">{data.me.username}</Box>

        <Button
          variant="link"
          ml={3}
          onClick={() => logout({})}
          isLoading={fetchingLogout}
        >
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex
      bg="tan"
      p={4}
    >
      <Box
        ml={"auto"}
        color={"white"}
        display="flex"
      >
        {body}
      </Box>
    </Flex>
  );
};

export default NavBar;
