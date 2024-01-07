"use client";
import React from "react";
import Wrapper from "./Wrapper";
import { usePostsQuery } from "../generated/graphql";
import { CustomLink } from "./CustomLink";

export const Home: React.FC = () => {
  const [{ data }] = usePostsQuery({
    variables: {
      limit: 10,
    },
  });

  return (
    <Wrapper variant="regular">
      <CustomLink
        label="Create post"
        href="/create-post"
      />
      {!data ? (
        <div>Loading...</div>
      ) : (
        data.posts.map((p) => <div key={p.id}>{p.title}</div>)
      )}
    </Wrapper>
  );
};
