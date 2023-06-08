import { Text, Image, Flex } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

import * as React from "react";
import { modals } from "@mantine/modals";
import { useController, useFormContext } from "react-hook-form";
import { urlPattern } from "../../utils/regex";

const ImagesInputField = ({
  name = "",
  placeholder = <Text align="center">Drop image here</Text>,
  label = "Unggah Gambar",
  deleteDescription = (
    <Text size="sm">Are you sure you want to delete this image? .</Text>
  ),
  deleteTitle = "Delete unsaved changes",
}) => {
  const { control } = useFormContext();
  //save object files
  const { field, fieldState } = useController({ control, name });

  const onDelete = React.useCallback(
    () =>
      modals.openConfirmModal({
        title: deleteTitle,
        children: deleteDescription,
        centered: true,
        labels: { cancel: "Cancel", confirm: "Confirm" },
        cancelProps: { color: "red" },
        onCancel: () => {},
        onConfirm: () => field.onChange([]),
      }),
    [deleteDescription, deleteTitle, field]
  );

  const previews = (field.value || []).map((file, index) => {
    const imageUrl = urlPattern.test(file) ? file : URL.createObjectURL(file);
    console.log(imageUrl);
    return (
      <div
        style={{
          boxSizing: "border-box",
          border: "0.125rem dashed #ced4da",
          borderRadius: 10,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <button
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            zIndex: 3,
            border: "1px solid red",
            borderRadius: 9999,
            color: "white",
            backgroundColor: "red",
            cursor: "pointer",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
          }}
          onClick={onDelete}
        >
          x
        </button>
        <a href={imageUrl} target="_blank" rel="noreferrer">
          <Image key={index} src={imageUrl} />
        </a>
        <Dropzone
          sx={{ border: "none" }}
          accept={IMAGE_MIME_TYPE}
          multiple={false}
          onDrop={(file) => {
            field.onChange(file);
          }}
        >
          <Text align="center">Edit Image</Text>
        </Dropzone>
      </div>
    );
  });

  return (
    <>
      <Text fz={16} fw={600}>
        {label}
      </Text>
      <Flex w={300}>
        {previews.length ? (
          <>{previews}</>
        ) : (
          <Dropzone
            sx={(theme) => ({
              borderColor: !!fieldState?.error?.message ? "red" : "#ced4da",
              color: !!fieldState?.error?.message
                ? "red"
                : theme.colors.gray[6],
            })}
            w={300}
            accept={IMAGE_MIME_TYPE}
            multiple={false}
            onDrop={(file) => {
              field.onChange(file);
            }}
          >
            {placeholder}
          </Dropzone>
        )}
      </Flex>
    </>
  );
};

export default ImagesInputField;
