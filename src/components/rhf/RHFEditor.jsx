import dynamic from "next/dynamic";
import { useEffect } from "react";

import { Controller, useFormContext } from "react-hook-form";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

// ----------------------------------------------------------------------

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }], // Headings
    ["bold", "italic", "underline", "strike"], // Text styling
    [{ list: "ordered" }, { list: "bullet" }], // Lists
    [{ script: "sub" }, { script: "super" }], // Subscript/Superscript
    [{ indent: "-1" }, { indent: "+1" }], // Indentation
    [{ align: [] }], // Text alignment
    [{ color: [] }, { background: [] }], // Text color and background
    ["blockquote", "code-block"], // Quote and Code Block
    ["link", "image", "video"], // Insert link, image, and video
    ["clean"], // Remove formatting
  ],
};

export default function RHFEditor({
  name,
  label,
  helperText,
  placeholder,
  ...other
}) {
  const {
    control,
    watch,
    setValue,
    formState: { isSubmitSuccessful },
  } = useFormContext();

  const values = watch();

  useEffect(() => {
    if (values[name] === "<p><br></p>") {
      setValue(name, "", {
        shouldValidate: !isSubmitSuccessful,
      });
    }
  }, [isSubmitSuccessful, name, setValue, values]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="grid grid-cols-4 gap-8">
          <p className={" col-span-1 self-start place-self-end mt-1"}>
            {label}
          </p>
          <div className="col-span-3">
            <ReactQuill
              theme="snow"
              value={field.value}
              onChange={field.onChange}
              modules={modules}
            />
            <p className="text-red-500 text-sm">{error?.message}</p>
          </div>
        </div>
      )}
    />
  );
}
