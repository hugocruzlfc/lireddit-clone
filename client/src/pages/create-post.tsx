import { NextPage } from "next";
import { InputField, Wrapper } from "../components";
import { Form, Formik } from "formik";
import { Button } from "@chakra-ui/react";
import { useCreatePostMutation } from "../generated/graphql";
import { useRouter } from "next/router";

const CreatePost: NextPage = ({}) => {
  const [, createPost] = useCreatePostMutation();
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values, { setErrors }) => {
          await createPost({ input: values });
          router.push("/");
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
