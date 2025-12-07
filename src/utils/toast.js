import { useToast } from "@chakra-ui/react";

export const useCustomToast = () => {
  const toast = useToast();

  const showToast = ({ message, type, position = "top-right" }) => {
    toast({
      description: message,
      status: type, // Can be "success", "info", "warning", or "error"
      position: position,
      isClosable: true,
      duration: 5000,
      variant: "left-accent",
    });
  };

  return { showToast };
};
