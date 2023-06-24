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
  isHide = false,
  deleteDescription = (
    <Text size="sm">Apakah anda yakin ingin menghapus gambar ini?</Text>
  ),
  deleteTitle = "Delete unsaved changes",
  width = 300,
  height,
  isFinished,
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
        withCloseButton: false,
        onCancel: () => {},
        onConfirm: () => field.onChange([]),
      }),
    [deleteDescription, deleteTitle, field]
  );

  const onView = React.useCallback(
    (imageUrl) => () => {
      modals.open({
        centered: true,
        closeOnClickOutside: true,
        withCloseButton: false,
        children: <Image src={imageUrl} />,
      });
    },
    []
  );

  const previews = (field.value || []).map((file, index) => {
    const imageUrl = urlPattern.test(file) ? file : URL.createObjectURL(file);
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
        {isFinished ? (
          <></>
        ) : (
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
            type="button"
            onClick={onDelete}
          >
            x
          </button>
        )}
        <div onClick={onView(imageUrl)}>
          <Image key={index} src={imageUrl} fit="cover" />
        </div>
        {!isHide && (
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
        )}
      </div>
    );
  });

  return (
    <Flex direction="row" align="center" gap={26}>
      <Text fz={16} fw={600}>
        {label}
      </Text>
      <Flex w={width} h={height}>
        {previews.length ? (
          <>{previews}</>
        ) : (
          <Dropzone
            sx={(theme) => ({
              borderColor: !!fieldState?.error?.message ? "red" : "#ced4da",
              color: !!fieldState?.error?.message
                ? "red"
                : theme.colors.gray[6],
              position: "relative",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              overflow: "hidden",
            })}
            w={width}
            h={height}
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
    </Flex>
  );
};

export default ImagesInputField;
