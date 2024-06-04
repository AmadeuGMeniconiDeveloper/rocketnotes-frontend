// import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import GlobalStyle from "./styles/global";

import { AuthProvider } from "./contexts/authContext";

import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";

import { Routes } from "./routes";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes />
    </ThemeProvider>
  </AuthProvider>
  // </StrictMode>
);
