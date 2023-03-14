// pages/_app.tsx
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "components/layout/Layout";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
const theme = extendTheme({
  colors: {
    brand: {
      50: "#44337A",
      100: "#B794F4",
      500: "#3FFF33", // you need this
    }
  }
});
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
export default MyApp;
