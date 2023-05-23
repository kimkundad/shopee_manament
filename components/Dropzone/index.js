import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Text,
  Flex,
  Image,
  Input,
  Card,
  CardHeader,
} from "@chakra-ui/react";
import style from "./style.module.css";
const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  justifyContent: "center",
  display: "inline-flex",
  borderRadius: 2,
  marginBottom: 8,
  marginRight: 8,
  width: "100%",
  height: "100%",
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

function Dropzone({ setImage }) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    multiple: false,
    onDrop: (acceptedFiles) => {
      setImage(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  const deleteImage = () => {
    setFiles([]);
    setImage(null);
  };

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <Box className="container">
      {files.length == 0 ? (
        <Box {...getRootProps({ className: style.dropzone })} borderRadius="xl" bg="gray.200">
          <Input {...getInputProps()} />
          <Image src="/images/new.png" alt="" h="80px" w="100px"/>
          <Text>คลิกเพื่อเพิ่มรูปภาพ ({files.length}/1)</Text>
        </Box>
      ) : (
        <Card p="0px">
          <CardHeader>
            <Box
              pos="absolute"
              top="10px"
              right="10px"
              onClick={deleteImage}
            >
              <Image src="/images/delete.png" h="30px" w="30px"/>
            </Box>
            {thumbs}
          </CardHeader>
        </Card>
      )}
    </Box>
  );
}

export default Dropzone;
