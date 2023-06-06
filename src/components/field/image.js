import { useState } from "react";
import { Text, Image, SimpleGrid, Flex } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

import Resizer from "react-image-file-resizer";

import * as React from "react";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { storage, storageImageRef } from "../../services/firebase";
import { v4 } from "uuid";
import { modals } from "@mantine/modals";
import { useController, useFormContext } from "react-hook-form";

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      80,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

async function getFileFromUrl(url, name, defaultType = "image/jpeg") {
  const response = await fetch(url);
  const data = await response.blob();
  const file = new File([data], name, {
    type: "image/jpeg",
  });

  console.log(file);
  return file;
}

const ImagesInputField = ({
  name = "",
  placeholder = <Text align="center">Drop image here</Text>,
  deleteDescription = (
    <Text size="sm">Are you sure you want to delete this image? .</Text>
  ),
  deleteTitle = "Delete unsaved changes",
  defaultRef = `${v4()}.jpeg`,
}) => {
  const { control } = useFormContext();
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
    const imageUrl = URL.createObjectURL(file);

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
        <a href={imageUrl} target="_blank">
          <Image key={index} src={imageUrl} />
        </a>
        <Dropzone
          sx={{ border: "none" }}
          accept={IMAGE_MIME_TYPE}
          multiple={false}
          onDrop={(file) => field.onChange(file)}
        >
          <Text align="center">Edit Image</Text>
        </Dropzone>
      </div>
    );
  });

  React.useEffect(() => {
    // field.value.map(async (file) => {
    //   //result base64
    //   const result = await resizeFile(file);
    //   const imageRef = ref(storage, defaultRef);
    //   const test = await uploadString(
    //     imageRef,
    //     result.replace("data:image/jpeg;base64,", ""),
    //     "base64"
    //   );
    //   const url = await getDownloadURL(test.ref);
    //   console.log(url);
    //   return result;
    // });
  }, [defaultRef, field]);

  // console.log(field.value);

  return (
    <Flex w={300}>
      {previews.length ? (
        <>{previews}</>
      ) : (
        <Dropzone
          sx={(theme) => ({
            borderColor: !!fieldState?.error?.message ? "red" : "#ced4da",
            color: !!fieldState?.error?.message ? "red" : theme.colors.gray[6],
          })}
          w={300}
          accept={IMAGE_MIME_TYPE}
          multiple={false}
          onDrop={(file) => field.onChange(file)}
        >
          {placeholder}
        </Dropzone>
      )}
    </Flex>
  );
};

export default ImagesInputField;
