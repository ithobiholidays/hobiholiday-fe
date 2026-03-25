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
import React, { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import RHFInput from "@/components/rhf/RHFInput";
import RHFCheckbox from "@/components/rhf/RHFCheckbox";
import { useGetData, usePostData, useUpdateData } from "@/utils/api";
import { useCustomToast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import RHFTextArea from "@/components/rhf/RHFTextArea";
import { RHFUploadImage } from "@/components/rhf/RHFUploadImage";
import RHFEditor from "@/components/rhf/RHFEditor";
import RHFFormattedTextField from "@/components/rhf/RHFTextCurrency";

const paths = [
  { title: "Home", href: "/dashboard" },
  { title: "Packages", href: "/dashboard/tour-packages/add-edit-packages" },
  { title: "Edit Package", href: "/" },
];

const schema = yup.object().shape({
  title: yup.string().required("Package Name is required"),
  theme: yup.string().required("Package Theme is required"),
  date: yup.string().required("Package Date is required"),
  startDate: yup.string().nullable(),
  endDate: yup.string().nullable(),
  discPrice: yup.number().required("Discounted Price is required"),
  price: yup.number().required("Price is required"),
  detail: yup.string().required("Package Detail is required"),
  description: yup.string().required("Description is required"),
  labelType: yup.array().min(1, "At least one label is required"),
  category: yup.array().min(1, "At least one category is required"),
  banner: yup.mixed().required("Banner is required"),

  itenerary: yup.mixed().required("itenerary is required"),
});

const defaultValues = {
  title: "",
  theme: "",
  date: "",
  startDate: "",
  endDate: "",
  detail: "",
  labelType: [],
  category: [],
  discPrice: 0,
  price: 0,
  description: "",
  banner: null,
  itenerary: null,
};

const labelType = [
  { label: "Promo", value: "Promo" },
  { label: "Super Sale", value: "Super Sale" },
];

const EditPackagesView = ({ params }) => {
  const { showToast } = useCustomToast();
  const router = useRouter();
  const { updateData } = useUpdateData();

  const [iteneraryFile, setIteneraryFile] = useState("");

  const [bannerFile, setBannerFile] = useState("");

  const {
    getData: getPackages,
    data: dataPackages,
    loading: loadingPost,
  } = useGetData();
  const {
    getData: getCategory,
    data: dataCategory,
    loading: loadingCategory,
  } = useGetData();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("id", data.id);
      formData.append("title", data.title);
      formData.append("price", data.price);
      formData.append("discPrice", data.discPrice);
      formData.append("description", data.description);
      formData.append("theme", data.theme);
      formData.append("detail", data.detail);
      formData.append("categoryIds", data.category.join(", "));
      formData.append("label", data.labelType[0]);
      formData.append("date", data.date);
      formData.append("startDate", data.startDate || "");
      formData.append("endDate", data.endDate || "");
      formData.append("banner", data.banner);
      formData.append("itenerary", data.itenerary);

      await updateData("/product/edit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showToast({ message: "Package edited successfully", type: "success" });
      router.push("/dashboard/tour-packages/add-edit-packages");
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
      const response = await getPackages(`/product/${params.id}`);

      const responseCategory = await getCategory("/category/all");

      setBannerFile(`${response?.data?.bannerHost}${response?.data?.banner}`);
      setIteneraryFile(
        `${response?.data?.iteneraryHost}${response?.data?.itenerary}`
      );

      reset({
        ...response.data,
        labelType: [response?.data?.label],
        category: response?.data?.categories
          .map(
            (name) =>
              responseCategory?.data.find((cat) => cat.name === name)?.id
          )
          .filter(Boolean),
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
        <p className="text-3xl font-medium">Add Package</p>
        <Breadcrumbs paths={paths} />
      </div>
      <div className="border mt-8">
        <div className="border-t border-b border-gray-400 py-2 px-3 flex items-center gap-3">
          <MdOutlineEdit />
          <p>Add Package</p>
        </div>

        <div className="p-8 space-y-6">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-y-8">
                <RHFInput
                  name="title"
                  label="Package Name"
                  placeholder={"Enter Package Name"}
                />
                <RHFInput
                  name="theme"
                  label="Package Theme"
                  placeholder={"Enter Package Theme"}
                />
                <RHFInput
                  name="date"
                  label="Package Date"
                  placeholder={"Enter Package Date"}
                />
                <RHFInput
                  name="startDate"
                  label="Start Date"
                  type="date"
                />
                <RHFInput
                  name="endDate"
                  label="End Date"
                  type="date"
                />
                <RHFTextArea
                  name="detail"
                  label="Package Detail"
                  placeholder={"Enter Package Detail"}
                />

                <RHFCheckbox
                  name="labelType"
                  label="Label Type"
                  options={labelType}
                />
                <RHFCheckbox
                  name="category"
                  label="Category"
                  options={
                    dataCategory?.length > 0
                      ? dataCategory?.map((dt) => {
                          return {
                            label: dt?.name,
                            value: dt?.id,
                          };
                        })
                      : []
                  }
                />

                <RHFFormattedTextField
                  name="discPrice"
                  label="Sale Price"
                  type="number"
                  placeholder={"Enter Sale Price"}
                />
                <RHFFormattedTextField
                  name="price"
                  label="Regular Price"
                  placeholder={"Enter Regular Price"}
                />

                <RHFEditor
                  name="description"
                  label="Description"
                  type="number"
                  placeholder={"Enter Description"}
                />

                <RHFUploadImage
                  name="banner"
                  label="Banner"
                  type="file"
                  defaultValue={bannerFile}
                />

                <RHFUploadImage
                  name="itenerary"
                  label="Itinerary"
                  type="file"
                  fileType="document"
                  defaultValue={iteneraryFile}
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

export default EditPackagesView;
