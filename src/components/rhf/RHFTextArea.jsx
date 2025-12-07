import {
  FormControl,
  FormLabel,
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

const RHFTextArea = ({ name, label, placeholder, row = true }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl
      isInvalid={errors[name]}
      className={row ? "grid grid-cols-4 gap-8" : "flex flex-col gap-2"}
    >
      <p className={row ? " col-span-1 self-start place-self-end mt-1" : ""}>
        {label}
      </p>
      <div className={row ? "col-span-3" : "w-full"}>
        <Textarea {...register(name)} placeholder={placeholder} />
        <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
      </div>
    </FormControl>
  );
};

export default RHFTextArea;
