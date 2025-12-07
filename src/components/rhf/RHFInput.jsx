import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

const RHFInput = ({
  name,
  label,
  placeholder,
  type = "text",
  row = true,
  customMessage,
}) => {
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
        <Input {...register(name)} placeholder={placeholder} type={type} />
        <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
        {customMessage && (
          <span className="text-sm text-green-600 mt-1.5 block">
            {customMessage}
          </span>
        )}
      </div>
    </FormControl>
  );
};

export default RHFInput;
