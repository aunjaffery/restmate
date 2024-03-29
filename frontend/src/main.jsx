import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@fontsource-variable/rubik";
import "@fontsource/rubik/400.css";
import "@fontsource/rubik/700.css";
import "./main.css";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
const components = {
  Button: {
    variants: {
      solid: {
        color: "white",
        borderRadius: "md",
        bg: "dark.300",
        _hover: {
          bg: "dark.400",
        },
        _active: {
          bg: "dark.400",
        },
      },
      second: ({ colorMode }) => ({
        color: "gray.500",
        borderRadius: "md",
        bg: "dark.200",
        bg: colorMode === "dark" ? "dark.200" : "light.200",
        _hover: {
          color: "white",
          bg: colorMode === "dark" ? "gray.700" : "gray.400",
        },
        _active: {
          color: "white",
        },
      }),
    },
  },
};

const colors = {
  dark: {
    50: "#222935", //border color
    100: "#0d1721", //primary-bg
    200: "#122230", //sec-color: gradiant 1
    300: "#6466f1", //accent-Indigo
    400: "#4f46e5", //accent-Indigo-darker
    500: "#22c55e", //green-bright
    600: "#091118", //gradiant 2
  },
  light: {
    50: "#d3d3d3", //border color
    100: "#ffffff", //primary-bg
    200: "#e2e8f0", // sec-color: gray.200
    300: "#6466f1", //accent-Indigo
    400: "#4f46e5", //accent-Indigo-darker
    500: "#122230", //gradiant 1
    600: "#091118", //gradiant 2
  },
};
const fonts = {
  heading: `'Rubik', sans-serif`,
  body: `'Rubik', sans-serif`,
};

const container = document.getElementById("root");

const root = createRoot(container);
const theme = extendTheme({ config, colors, fonts, components });

root.render(
  <ChakraProvider theme={theme}>
    <App />
    <ToastContainer
      position="bottom-right"
      autoClose={2000}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Flip}
    />
  </ChakraProvider>,
);
