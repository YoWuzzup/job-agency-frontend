import Head from "next/head";
import { AppProps } from "next/app";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

// redux
import { wrapper, store } from "../redux/store";
import { Provider } from "react-redux";
import { signinUser } from "../redux/actions/user";
import { useAppDispatch, useReadLocalStorage } from "../hooks";

// styles
import "../styles/globals.css";
import createEmotionCache from "../styles/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ColorModeContext from "../styles/ColorModeContext";
import lightTheme from "../styles/lightTheme";
import darkTheme from "../styles/darkTheme";

// components
import { NavBar } from "../components";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const dispatch = useAppDispatch();
  const user = useReadLocalStorage("user");
  const googleOAuthClientId = useMemo(
    () => process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    []
  );

  // Set dark mode based on media query
  const prefersDarkMode: boolean = useMediaQuery(
    "(prefers-color-scheme: dark)"
  );
  const [darkMode, setDarkMode] = useState<boolean>(prefersDarkMode);

  useEffect(() => {
    const mode: boolean = localStorage.getItem("themeIsDark") === "true";
    // set mode
    setDarkMode(mode);

    // set persistent user data
    if (user) dispatch(signinUser(user));
  }, []);

  const setDarkModePreference = useCallback(
    (newmode: any) => {
      localStorage.setItem("themeIsDark", newmode);
      setDarkMode(newmode);
    },
    [setDarkMode]
  );

  return (
    <GoogleOAuthProvider clientId={`${googleOAuthClientId}`}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>

        <Provider store={store}>
          <ColorModeContext.Provider
            value={{ darkMode, setDarkMode: setDarkModePreference }}
          >
            <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <NavBar />
              <Component {...pageProps} />
            </ThemeProvider>
          </ColorModeContext.Provider>
        </Provider>
      </CacheProvider>
    </GoogleOAuthProvider>
  );
}

export default wrapper.withRedux(MyApp);
