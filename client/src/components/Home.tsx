"use client";
import React, { useState } from "react";
import Wrapper from "./Wrapper";
import { usePostsQuery } from "../generated/graphql";
import { CustomLink } from "./CustomLink";
import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { Post } from "./Post";

export const Home: React.FC = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [{ data, fetching, error }] = usePostsQuery({
    variables,
  });

  console.log(data);

  if (!fetching && !data) {
    return <div>Query failed.</div>;
  }

  return (
    <Wrapper variant="regular">
      <Flex
        align="center"
        mb={4}
      >
        <Heading>LiReddit</Heading>
        <Stack ml="auto">
          <CustomLink
            label="Create post"
            href="/create-post"
          />
        </Stack>
      </Flex>

      {!data && fetching ? (
        <div>Loading...</div>
      ) : (
        <Stack spacing="8px">
          {data!.posts.map((p) => (
            <React.Fragment key={p.id}>
              <Post
                title={p.title}
                text={p.textSnippet}
              />
            </React.Fragment>
          ))}
        </Stack>
      )}
      {data ? (
        <Flex>
          <Button
            m="auto"
            my={4}
            isLoading={fetching}
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts[data.posts.length - 1]?.createdAt,
              });
            }}
          >
            Load More
          </Button>
        </Flex>
      ) : null}
    </Wrapper>
  );
};
