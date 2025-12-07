import { NumericFormat } from "react-number-format";
import { Controller, useFormContext } from "react-hook-form";

import { Input } from "@chakra-ui/react";

export default function RHFFormattedTextField({
  name,
  helperText,
  type,
  prefix = "",
  label,
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="grid grid-cols-4 gap-8">
          <p className={"col-span-1 self-start place-self-end mt-1"}>{label}</p>
          <div className="col-span-3">
            <NumericFormat
              customInput={Input}
              thousandSeparator={"."}
              decimalSeparator={","}
              onValueChange={({ floatValue }) => {
                field.onChange(floatValue);
              }}
              prefix={prefix}
              value={field.value}
            />
            <p className="text-red-500 text-sm mt-1">{error?.message}</p>
          </div>
        </div>
      )}
    />
  );
}
