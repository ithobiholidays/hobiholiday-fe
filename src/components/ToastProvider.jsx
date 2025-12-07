"use client";
import { ChakraProvider, useToast } from "@chakra-ui/react";

const ToastProvider = ({ children }) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};

export default ToastProvider;
