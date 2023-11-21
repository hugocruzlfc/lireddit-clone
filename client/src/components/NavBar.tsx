"use client";
import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { CustomLink } from "./CustomLink";

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
          <CustomLink
            href="/login"
            label="Login"
            color="gray.50"
            hover="gray.900"
          />
        </Box>
        <Box>
          <CustomLink
            href="/register"
            label="Register"
            color="gray.50"
            hover="gray.900"
          />
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
          color="gray.900"
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
