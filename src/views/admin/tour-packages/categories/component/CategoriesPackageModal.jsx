import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomModal from "@/components/ui/CustomModal";
import { usePostData, useUpdateData } from "@/utils/api";
import { useCustomToast } from "@/utils/toast";

// Validation schema using Yup
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
});

const CategoriesPackageModal = ({
  isOpen,
  onClose,
  refetch,
  selectedItem,
  setSelectedItem,
}) => {
  const { postData } = usePostData();
  const { updateData } = useUpdateData();

  const { showToast } = useCustomToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      if (data?.id) {
        await updateData(`/category/edit`, data);
        showToast({ message: "Succesfully Edit Category", type: "success" });
      } else {
        await postData("/category/add", data);
        showToast({ message: "Succesfully Create Category", type: "success" });
      }
      onClose();
      reset();
      refetch();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        showToast({ message: error.response.data?.message, type: "error" });
      } else {
        showToast({ message: "An unexpected error occurred", type: "error" });
      }
    }
  };

  useEffect(() => {
    if (selectedItem) {
      reset(selectedItem);
    }

    return () => {
      setSelectedItem("");
    };
  }, []);

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>
          {selectedItem?.id ? "Edit" : "Create New"} Category
        </ModalHeader>
        <hr />
        <ModalCloseButton />

        <ModalBody>
          <FormControl isInvalid={errors.name}>
            <FormLabel className="font-normal">Name</FormLabel>
            <Input {...register("name")} placeholder="Enter category name" />
            <FormLabel className="font-normal mt-4">Order</FormLabel>
            <Input {...register("order")} placeholder="Enter category order" />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose} size="sm">
            Close
          </Button>
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={isSubmitting}
            size="sm"
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </CustomModal>
  );
};

export default CategoriesPackageModal;
