// pages/_app.tsx
import React, { Fragment } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "components/layout/Layout";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store, persistor } from "@/store/config";
import { PersistGate } from "redux-persist/integration/react";
import { useRouter } from "next/router";
const theme = extendTheme({
  colors: {
    brand: {
      50: "#44337A",
      100: "#B794F4",
      500: "#3FFF33", // you need this
    },
  },
});
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const currentPath = router.asPath;
  return (
    <Fragment>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ChakraProvider theme={theme}>
            {currentPath == "/" ? (
              <Component {...pageProps} />
            ) : (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            )}
          </ChakraProvider>
        </PersistGate>
      </Provider>
    </Fragment>
  );
}
export default MyApp;
