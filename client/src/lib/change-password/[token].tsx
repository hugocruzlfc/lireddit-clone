// import { NextPage } from "next";
// import { Form, Formik } from "formik";
// import { ForgotPasswordLink, InputField, Wrapper } from "../../components";
// import { Box, Button } from "@chakra-ui/react";
// import { useChangePasswordMutation } from "../../generated/graphql";
// import { useRouter } from "next/router";
// import { toErrorMap } from "../../utils/toErrorMap";
// import { useState } from "react";
// import { NextUrqlClientConfig, withUrqlClient } from "next-urql";
// import { createUrqlClient } from "../../urql";
// import Link from "next/link";

// export interface ChangePasswordProps {
//   token: string;
// }

// const ChangePassword: NextPage<ChangePasswordProps> = ({ token }) => {
//   const [, changePassword] = useChangePasswordMutation();
//   const router = useRouter();
//   const [tokenError, setTokenError] = useState("");
//   return (
//     <Wrapper variant="small">
//       <Formik
//         initialValues={{ newPassword: "" }}
//         onSubmit={async (values, { setErrors }) => {
//           const response = await changePassword({
//             token,
//             newPassword: values.newPassword,
//           });
//           if (response.data?.changePassword.errors) {
//             const errorMap = toErrorMap(response.data.changePassword.errors);
//             if ("token" in errorMap) {
//               setTokenError(errorMap.token);
//             }
//             setErrors(errorMap);
//           } else if (response.data?.changePassword.user) {
//             // worked
//             router.push("/");
//           }
//         }}
//       >
//         {({ isSubmitting }) => (
//           <Form>
//             <InputField
//               name="newPassword"
//               placeholder="new Password"
//               label="New Password"
//               type="password"
//             />
//             {tokenError && (
//               <Box>
//                 <Box color="red">{tokenError}</Box>
//                 <ForgotPasswordLink label="Go to forget it again" />
//               </Box>
//             )}
//             <Button
//               mt={4}
//               type="submit"
//               colorScheme="teal"
//               isLoading={isSubmitting}
//             >
//               Change Password
//             </Button>
//           </Form>
//         )}
//       </Formik>
//     </Wrapper>
//   );
// };

// ChangePassword.getInitialProps = ({ query }) => {
//   return {
//     token: query.token as string,
//   };
// };

// export default withUrqlClient(createUrqlClient as NextUrqlClientConfig)(
//   ChangePassword
// );
