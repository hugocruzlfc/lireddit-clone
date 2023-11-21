"use client";
import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";

const NavBar: React.FC = () => {
  const [{ fetching: fetchingLogout }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();
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
      top={0}
      position="sticky"
      zIndex={1}
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
