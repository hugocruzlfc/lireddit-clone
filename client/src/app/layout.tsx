import { ChakraProvider } from "@chakra-ui/react";
import { UrqlProvider } from "../providers";
import { theme } from "../utils";
import { NavBar } from "../components";

export const metadata = {
  title: "Lireddit",
  description: "A Reddit clone built with Next.js, Chakra UI, and URQL.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UrqlProvider>
          <ChakraProvider>
            <>
              <NavBar />
              {children}
            </>
          </ChakraProvider>
        </UrqlProvider>
      </body>
    </html>
  );
}
