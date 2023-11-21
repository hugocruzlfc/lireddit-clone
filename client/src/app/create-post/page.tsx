"use client";
import { NextPage } from "next";
import { useEffect } from "react";
import { Form, Formik } from "formik";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useCreatePostMutation, useMeQuery } from "@/src/generated/graphql";
import { InputField, Wrapper } from "@/src/components";

const CreatePost: NextPage = ({}) => {
  const [, createPost] = useCreatePostMutation();
  const router = useRouter();
  const [{ data, fetching }] = useMeQuery();

  useEffect(() => {
    if (!fetching && !data?.me) {
      router.replace("/login");
    }
  }, [fetching, data, router]);

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values) => {
          const { error } = await createPost({ input: values });
          if (!error) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="title"
              placeholder="title"
              label="Title"
              type="text"
            />

            <InputField
              textarea
              name="text"
              placeholder="text..."
              label="Text"
              type="text"
            />
            <Button
              mt={4}
              type="submit"
              colorScheme="teal"
              isLoading={isSubmitting}
            >
              Create
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default CreatePost;
