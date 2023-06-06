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

const ImagesInputField = () => {
  const [files, setFiles] = useState([]);

  const onDelete = React.useCallback(
    () =>
      modals.openConfirmModal({
        title: "Delete unsaved changes",
        children: (
          <Text size="sm">Are you sure you want to delete this image? .</Text>
        ),
        centered: true,
        labels: { cancel: "Cancel", confirm: "Confirm" },
        cancelProps: { color: "red" },
        onCancel: () => {},
        onConfirm: () => setFiles([]),
      }),
    []
  );

  const previews = files.map((file, index) => {
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
          <Image
            key={index}
            src={imageUrl}

            // imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
          />
        </a>
        <Dropzone
          sx={{ border: "none" }}
          accept={IMAGE_MIME_TYPE}
          multiple={false}
          onDrop={setFiles}
        >
          <Text align="center">Edit Image</Text>
        </Dropzone>
      </div>
    );
  });

  React.useEffect(() => {
    files.map(async (file) => {
      //result base64
      const result = await resizeFile(file);

      // console.log(result);
      // const imageRef = ref(storage, `images/${v4()}.jpeg`);
      // const test = await uploadString(
      //   imageRef,
      //   result.replace("data:image/jpeg;base64,", ""),
      //   "base64"
      // );
      // const url = await getDownloadURL(test.ref);
    });
  }, [files]);

  return (
    <Flex w={300}>
      {previews.length ? (
        <>{previews}</>
      ) : (
        <Dropzone
          w={300}
          accept={IMAGE_MIME_TYPE}
          multiple={false}
          onDrop={setFiles}
        >
          <Text align="center">Drop image here</Text>
        </Dropzone>
      )}
    </Flex>
  );
};

export default ImagesInputField;
