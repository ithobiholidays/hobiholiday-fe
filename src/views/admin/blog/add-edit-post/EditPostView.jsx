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

const paths = [
  {
    title: "Home",
    href: "/dashboard",
  },
  {
    title: "Blog",
    href: "/dashboard/blog/add-edit-post",
  },
  {
    title: "Add New Post",
    href: "/dashboard/add-edit-post/create",
  },
];

const EditPostView = ({ params }) => {
  const { showToast } = useCustomToast();
  const router = useRouter();

  const [fileUrl, setFileUrl] = useState("");

  const {
    getData: getPost,
    data: dataPost,
    loading: loadingPost,
  } = useGetData();
  const {
    getData: getCategory,
    data: dataCategory,
    loading: loadingCategory,
  } = useGetData();

  const { updateData } = useUpdateData();

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    keyword: yup.string().required("SEO Keyword is required"),
    // publishedAt: yup.date().required("Publish Date is required"),
    slug: yup.string().required("Slug is required"),
    description: yup.string().required("Meta Description is required"),
    author: yup.string().required("Author is required"),
    categoriesId: yup.array().min(1, "At least one category is required"),
    content: yup.string().required("Content is required"),
    picture: yup.mixed().required("Featured Image is required"),
  });

  const defaultValues = {
    title: "",
    keyword: "",
    publishedAt: "",
    slug: "",
    description: "",
    author: "",
    categoriesId: [],
    content: "",
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
      formData.append("title", data.title);
      formData.append("keyword", data.keyword);
      formData.append(
        "publishedAt",
        data?.publishedAt ? formatPublishedAt(data.publishedAt) : ""
      );

      formData.append("status", data.publishedAt ? "scheduled" : "published");
      formData.append("slug", data.slug);
      formData.append("description", data.description);
      formData.append("author", data.author);
      formData.append("content", data.content);

      // Append category IDs as a comma-separated string
      formData.append("categoryIds", data.categoriesId.join(", "));

      // Append file if it exists
      if (data.picture && data.picture instanceof File) {
        formData.append("picture", data.picture);
      }

      await updateData("/blogs/edit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      showToast({ message: "Successfully Edit Blog", type: "success" });
      router.push("/dashboard/blog/add-edit-post");
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
      const response = await getPost(`/blogs/${params.id}`);

      const responseCategory = await getCategory("/cat/all");

      setFileUrl(`${response?.data?.imageHost}${response?.data?.picture}`);

      reset({
        ...response.data,
        publishedAt: response?.data?.publishedAt
          ? format(new Date(response?.data?.publishedAt), "yyyy-MM-dd'T'HH:mm")
          : "",
        categoriesId: response?.data?.categories
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
        <p className="text-3xl font-medium">Edit Post</p>
        <Breadcrumbs paths={paths} />
      </div>
      <div className="border mt-8">
        <div className="border-t border-b border-gray-400 py-2 px-3 flex items-center gap-3">
          <MdOutlineEdit />

          <p>Edit Post</p>
        </div>

        <div className="p-8 space-y-6">
          {/* Post Title */}

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-y-8">
                <RHFInput
                  name="title"
                  label="Post Title"
                  placeholder="Enter post title"
                />
                <RHFInput
                  name="keyword"
                  label="SEO Keyword"
                  placeholder="Enter SEO Keyword"
                />
                <RHFInput
                  name="publishedAt"
                  label="Publish Date"
                  type="datetime-local"
                  placeholder="Enter post title"
                />
                <RHFInput name="slug" label="Slug" placeholder="Enter slug" />
                <RHFInput
                  name="description"
                  label="Meta Description"
                  placeholder="Enter Description"
                />
                <RHFInput
                  name="author"
                  label="Author"
                  placeholder="Enter author"
                />
                <RHFCheckbox
                  name="categoriesId"
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
                  row={true}
                />

                <RHFEditor name="content" label={"Post Text"} />

                <RHFUploadImage
                  name="picture"
                  label="Featured Image"
                  type="file"
                  placeholder="Enter Description"
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

export default EditPostView;

const formatPublishedAt = (dateString) => {
  const timeZone = "Asia/Jakarta"; // UTC+7
  const zonedDate = toZonedTime(new Date(dateString), timeZone);

  return format(zonedDate, "yyyy-MM-dd HH:mm:ss.SSSXXX"); // Formats with +07 timezone
};
