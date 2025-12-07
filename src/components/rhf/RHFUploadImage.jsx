import { useState, useRef, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  IconButton,
  Image,
  Text,
  FormErrorMessage,
  Flex,
} from "@chakra-ui/react";
import { IoMdClose, IoMdDocument } from "react-icons/io";

export function RHFUploadImage({
  name,
  label,
  helperText,
  defaultValue,
  width = "120px",
  disabled = false,
  row = true,
  fileType = "image",
  ...other
}) {
  const { control } = useFormContext();
  const [url, setUrl] = useState(null);
  const [fileState, setFileState] = useState(null);
  const fileInputRef = useRef(null);

  const convertImageUrlToBlob = async (url) => {
    try {
      const response = await fetch(url);
      return await response.blob();
    } catch (error) {
      console.error("Error converting image URL to blob:", error);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const allowedTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
          "image/svg+xml",
        ];

        const handleFileChange = (e) => {
          const file = e.target.files[0];
          if (!file) return;

          if (fileType === "image") {
            if (!allowedTypes.includes(file.type)) {
              alert("Invalid file type. Please select PNG or JPEG files only.");
              return;
            }

            const newUrl = URL.createObjectURL(file);
            setUrl(newUrl);
          } else {
            setUrl(null); // Ensure no preview for non-image files
          }
          setFileState(file);
          field.onChange(file);
        };

        const handleDelete = () => {
          setUrl(null);
          setFileState(null);
          field.onChange(undefined);
        };

        const handleInitialValue = async () => {
          if (defaultValue) {
            try {
              const blob = await convertImageUrlToBlob(defaultValue);
              const fileName = defaultValue.split("/").pop();
              const realFileName = fileName.split("-").pop();
              const file = new File([blob], realFileName, { type: blob.type });
              const newUrl = URL.createObjectURL(blob);
              if (fileType === "image") {
                setUrl(newUrl);
              } else {
                setUrl(null);
              }
              setFileState(file);
              field.onChange(file);
            } catch (error) {
              console.error("Error handling initial value:", error);
            }
          }
        };

        useEffect(() => {
          if (defaultValue) {
            handleInitialValue();
          }
        }, [defaultValue]);

        return (
          <FormControl isInvalid={!!error} mt={3}>
            <Box className="grid grid-cols-4 gap-4 items-center">
              <p
                className={
                  row ? " col-span-1 self-start place-self-end mt-1" : ""
                }
              >
                {label}
              </p>{" "}
              <Box className="col-span-3">
                <Input
                  type="file"
                  ref={fileInputRef}
                  hidden
                  onChange={handleFileChange}
                  disabled={disabled}
                />

                <Flex gap={2}>
                  <div
                    className="w-full rounded bg-slate-100 px-4 py-2 border hover:cursor-pointer"
                    onClick={() => fileInputRef?.current?.click()}
                  >
                    <Text>{fileState ? "Change file" : "No file chosen"}</Text>
                  </div>
                </Flex>
                <FormErrorMessage>{error?.message}</FormErrorMessage>

                {/* this for render image */}
                {url && (
                  <Box mt={3} position="relative" display="inline-block">
                    <Image
                      src={url}
                      boxSize={width}
                      objectFit="cover"
                      borderRadius="md"
                    />
                    <IconButton
                      size="xs"
                      position="absolute"
                      top={1}
                      right={1}
                      onClick={handleDelete}
                      isDisabled={disabled}
                      colorScheme="red"
                      icon={<Text>x</Text>}
                    />
                    <Text
                      fontSize="sm"
                      mt={1}
                      textAlign="center"
                      maxWidth={`${width}px`}
                      whiteSpace="normal" // Allows text to wrap
                      wordBreak="break-word" // Ensures long words break
                      overflowWrap="break-word" // Additional fallback for text wrapping
                      display="inline-block" // Ensures width respects the parent container
                    >
                      {fileState?.name}
                    </Text>
                  </Box>
                )}

                {/* this for render document name */}
                {!url && fileState && (
                  <div className="border bg-white px-4 py-2 mt-2 flex items-center gap-4">
                    <IoMdDocument className="text-xl" />
                    <p>{fileState?.name}</p>
                    <IconButton
                      className="ml-auto"
                      variant={"outline"}
                      size={"sm"}
                      onClick={handleDelete}
                    >
                      <IoMdClose className="text-xl " />
                    </IconButton>
                  </div>
                )}
              </Box>
            </Box>
          </FormControl>
        );
      }}
    />
  );
}
