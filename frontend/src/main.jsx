import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "./main.css";
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const colors = {
  fuse: {
    100: "#0f172a", //dark blue background
    200: "#1e293b", // sec grayish
    300: "#0ea5e9", //light blue
    400: "#22313a", // gun-metal
  },
};

const container = document.getElementById("root");

const root = createRoot(container);
const theme = extendTheme({ config, colors });

root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
);
