import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Checkbox,
  Stack,
} from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";

const RHFCheckboxGroup = ({ name, label, options, row = true }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const getSelected = (selectedItems, item) =>
    selectedItems.includes(item)
      ? selectedItems.filter((value) => value !== item)
      : [...selectedItems, item];

  return (
    <div className={"grid grid-cols-4 gap-8"}>
      <p className={"col-span-1 place-self-end self-start"}>{label}</p>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className={row ? "col-span-3" : ""}>
            <div className="grid grid-cols-4 gap-3">
              {options.map((option) => (
                <Checkbox
                  key={option.value}
                  isChecked={field.value?.includes(option.value)}
                  onChange={() =>
                    field.onChange(getSelected(field.value || [], option.value))
                  }
                >
                  {option.label}
                </Checkbox>
              ))}
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-1">{error.message}</p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default RHFCheckboxGroup;
