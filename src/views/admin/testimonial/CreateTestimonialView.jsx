"use client";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useEffect } from "react";
import { MdOutlineEdit } from "react-icons/md";
import RHFInput from "@/components/rhf/RHFInput";
import RHFCheckbox from "@/components/rhf/RHFCheckbox";
import { useGetData, usePostData } from "@/utils/api";
import { useCustomToast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import RHFTextArea from "@/components/rhf/RHFTextArea";
import { RHFUploadImage } from "@/components/rhf/RHFUploadImage";
import RHFEditor from "@/components/rhf/RHFEditor";
import RHFFormattedTextField from "@/components/rhf/RHFTextCurrency";

const paths = [
  { title: "Home", href: "/dashboard" },
  { title: "Testimonials", href: "/dashboard/testimonials" },
  { title: "Create", href: "/" },
];

const schema = yup.object().shape({
  title: yup.string().required("Testimony Name is required"),
  order: yup.string().required("Sort Order is required"),
  link: yup.string().required("Testimoni URL is required"),
});

const defaultValues = {
  title: "",
  order: "",
  link: "",
};

const CreateTestimonialView = () => {
  const router = useRouter();

  const { showToast } = useCustomToast();
  const { postData } = usePostData();

  const { getData, data, totalData, loading } = useGetData();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await postData("/testi/add", data);

      showToast({
        message: "Testimony created successfully",
        type: "success",
      });
      router.push("/dashboard/testimonials");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        showToast({ message: error.response.data?.message, type: "error" });
      } else {
        showToast({ message: "An unexpected error occurred", type: "error" });
      }
    }
  };

  return (
    <div>
      <div className="flex gap-10 items-center">
        <p className="text-3xl font-medium">Add Testimony</p>
        <Breadcrumbs paths={paths} />
      </div>
      <div className="border mt-8">
        <div className="border-t border-b border-gray-400 py-2 px-3 flex items-center gap-3">
          <MdOutlineEdit />
          <p>Add Testimony</p>
        </div>

        <div className="p-8 space-y-6">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-y-8">
                <RHFInput
                  name="title"
                  label="Testimony Name"
                  placeholder={"Enter Testimony Name"}
                />
                <RHFInput
                  name="order"
                  type="number"
                  label="Sort Order"
                  placeholder={"Enter Sort Order"}
                />
                <RHFInput
                  name="link"
                  label="Testimony URL"
                  placeholder={"Enter Testimony URL"}
                />

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
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default CreateTestimonialView;
