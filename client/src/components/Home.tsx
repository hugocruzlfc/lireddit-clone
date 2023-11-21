"use client";
import React from "react";
import Wrapper from "./Wrapper";
import { usePostsQuery } from "../generated/graphql";

export const Home: React.FC = () => {
  const [{ data }] = usePostsQuery();

  return (
    <Wrapper variant="regular">
      <div>Hellwefwefo</div>
      {!data ? (
        <div>Loading...</div>
      ) : (
        data.posts.map((p) => <div key={p.id}>{p.title}</div>)
      )}
    </Wrapper>
  );
};
