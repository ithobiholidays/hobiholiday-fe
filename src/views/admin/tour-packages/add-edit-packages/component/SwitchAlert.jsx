import { useDeleteData, usePostData } from "@/utils/api";
import { useCustomToast } from "@/utils/toast";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const SwitchAlert = ({
  isOpen,
  onClose,
  cancelRef,
  refetch,
  selectedItem,
  setSelectedItem,
}) => {
  const { postData } = usePostData();
  const { showToast } = useCustomToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await postData("/product/status", {
        id: selectedItem?.id,
        status: !selectedItem?.isActive,
      });
      showToast({ message: `Action Success !`, type: "success" });
      onClose();
      refetch();
    } catch (error) {
      showToast({ message: `Unexpected Error Happened`, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      setSelectedItem("");
    };
  }, []);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      size={{ sm: "xl", md: "2xl", lg: "3xl" }}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg">Package</AlertDialogHeader>
          <hr />
          <AlertDialogBody>
            Are You Sure You Want to Perform this Action ?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={onClose}
              variant={"ghost"}
              size="sm"
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleDelete}
              ml={3}
              size="sm"
              isLoading={isLoading}
            >
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default SwitchAlert;
