import { useDeleteData, usePostData, useUpdateData } from "@/utils/api";
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

const ChangeStatusAlert = ({
  isOpen,
  onClose,
  cancelRef,

  refetch,
  selectedItem,
  setSelectedItem,
  selectedValue,
  setSelectedValue,
}) => {
  const { postData } = usePostData();

  const { showToast } = useCustomToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await postData("/cv/edit", {
        id: selectedItem?.id,
        status: selectedValue,
      });
      showToast({ message: `Succesfully Update CV`, type: "success" });
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
      setSelectedValue("");
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
          <AlertDialogHeader fontSize="lg">Change CV Status</AlertDialogHeader>
          <hr />
          <AlertDialogBody>
            Are you sure you want to change the status?
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
              Save
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ChangeStatusAlert;
