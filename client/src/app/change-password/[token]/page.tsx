"use client";
import { NextPage } from "next";
import { useState } from "react";
import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useChangePasswordMutation } from "@/src/generated/graphql";
import { CustomLink, InputField, Wrapper } from "@/src/components";
import { toErrorMap } from "@/src/utils";
import { DynamicUrlParam } from "@/src/types";

export interface ChangePasswordProps {
  params: DynamicUrlParam;
}

//{ params }: { params: { token: string } }
const ChangePassword: NextPage<ChangePasswordProps> = ({
  params: { token },
}) => {
  const [, changePassword] = useChangePasswordMutation();
  const router = useRouter();
  const [tokenError, setTokenError] = useState("");
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            token,
            newPassword: values.newPassword,
          });
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            // worked
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="new Password"
              label="New Password"
              type="password"
            />
            {tokenError && (
              <Box>
                <Box color="red">{tokenError}</Box>
                <CustomLink
                  label="Go to forget it again"
                  href="/forgot-password"
                />
              </Box>
            )}
            <Button
              mt={4}
              type="submit"
              colorScheme="teal"
              isLoading={isSubmitting}
            >
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default ChangePassword;
