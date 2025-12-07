import { useDeleteData } from "@/utils/api";
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

const DeleteAlert = ({
  isOpen,
  onClose,
  cancelRef,
  title,
  url,
  refetch,
  setSelectedItem,
}) => {
  const { deleteData } = useDeleteData();
  const { showToast } = useCustomToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteData(url);
      showToast({ message: `Succesfully Delete ${title}`, type: "success" });
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
          <AlertDialogHeader fontSize="lg">Delete {title}</AlertDialogHeader>
          <hr />
          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
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
              colorScheme="red"
              onClick={handleDelete}
              ml={3}
              size="sm"
              isLoading={isLoading}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteAlert;
