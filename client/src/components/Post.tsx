import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";

export interface PostProps {
  title: string;
  text: string;
}

export const Post: React.FC<PostProps> = ({ title, text }) => {
  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
    >
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{text}</Text>
    </Box>
  );
};
