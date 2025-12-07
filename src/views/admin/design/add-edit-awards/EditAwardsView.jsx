"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import {
  Button,
  Card,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import RHFInput from "@/components/rhf/RHFInput";
import RHFEditor from "@/components/rhf/RHFEditor";
import RHFCheckbox from "@/components/rhf/RHFCheckbox";
import { useGetData, usePostData, useUpdateData } from "@/utils/api";
import { useCustomToast } from "@/utils/toast";

import { format } from "date-fns"; // Ensure you have date-fns installed
import { toZonedTime } from "date-fns-tz";
import { useRouter } from "next/navigation";
import { RHFUploadImage } from "@/components/rhf/RHFUploadImage";
import RHFTextArea from "@/components/rhf/RHFTextArea";

const paths = [
  {
    title: "Home",
    href: "/dashboard",
  },
  {
    title: "Design",
    href: "/dashboard/design/add-edit-awards",
  },
  {
    title: "Edit Award",
    href: "/",
  },
];

const EditAwardsView = ({ params }) => {
  const { showToast } = useCustomToast();
  const router = useRouter();

  const [fileUrl, setFileUrl] = useState("");

  const {
    getData: getPost,
    data: dataPost,
    loading: loadingPost,
  } = useGetData();

  const { updateData } = useUpdateData();

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    order: yup.string().required("Order is required"),
    description: yup.string().required("Description is required"),
    picture: yup.mixed().required("Photo is required"),
  });

  const defaultValues = {
    name: "",
    order: "",
    description: "",
    picture: null,
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("id", data.id);
      formData.append("name", data.name);
      formData.append("order", data.order);
      formData.append("description", data.description);

      // Append file if it exists
      if (data.picture && data.picture instanceof File) {
        formData.append("picture", data.picture);
      }

      await updateData("/reward/edit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      showToast({ message: "Successfully Edit Award", type: "success" });
      router.push("/dashboard/design/add-edit-awards");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        showToast({ message: error.response.data?.message, type: "error" });
      } else {
        showToast({ message: "An unexpected error occurred", type: "error" });
      }
    }
  };

  const fetchPost = async () => {
    try {
      const response = await getPost(`/reward/${params.id}`);

      setFileUrl(`${response?.data?.imageHost}${response?.data?.picture}`);

      reset({
        ...response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div>
      <div className="flex gap-10 items-center">
        <p className="text-3xl font-medium">Edit Award</p>
        <Breadcrumbs paths={paths} />
      </div>
      <div className="border mt-8">
        <div className="border-t border-b border-gray-400 py-2 px-3 flex items-center gap-3">
          <MdOutlineEdit />

          <p>Edit Award</p>
        </div>

        <div className="p-8 space-y-6">
          {/* Post Title */}

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-y-8">
                <RHFInput name="name" label="Name" placeholder="Enter name" />
                <RHFInput
                  name="order"
                  label="Order"
                  placeholder="Enter Order"
                />
                <RHFTextArea
                  name="description"
                  label="Description"
                  placeholder={"Enter Description"}
                />

                <RHFUploadImage
                  name="picture"
                  label="Photo"
                  type="file"
                  defaultValue={fileUrl}
                />
              </div>
              <div className="flex justify-end mt-8">
                <Button
                  type="submit"
                  colorScheme="blue"
                  isLoading={isSubmitting}
                  size="sm"
                >
                  Submit
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default EditAwardsView;

const formatPublishedAt = (dateString) => {
  const timeZone = "Asia/Jakarta"; // UTC+7
  const zonedDate = toZonedTime(new Date(dateString), timeZone);

  return format(zonedDate, "yyyy-MM-dd HH:mm:ss.SSSXXX"); // Formats with +07 timezone
};
