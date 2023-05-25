import { useState } from "react";
import { Text, Image, SimpleGrid } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

import Resizer from "react-image-file-resizer";

import * as React from "react";

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      100,
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

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);

    console.log(imageUrl);
    return (
      <Image
        key={index}
        src={imageUrl}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    );
  });

  React.useEffect(() => {
    files.map(async (file) => {
      const result = await resizeFile(file);
      console.log(result);
    });
  }, [files]);

  return (
    <div>
      <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles}>
        <Text align="center">Drop images here</Text>
      </Dropzone>

      <SimpleGrid
        cols={4}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        mt={previews.length > 0 ? "xl" : 0}
      >
        {previews}
      </SimpleGrid>
    </div>
  );
};

export default ImagesInputField;
