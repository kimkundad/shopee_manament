import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Flex,
  Image,
  Text,
  Wrap,
  WrapItem,
  Center,
  Button,
  Grid,
  GridItem,
  Input,
  Textarea,
  Select,
} from "@chakra-ui/react";
const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  width: 100,
  height: 100,
  marginBottom: 15,
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

function addProduct() {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
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
  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);
  return (
    <Box>
      <Flex justifyContent="center" alignItems="center">
        <Image src="/images/addProduct.png" alt="" h="40px" w="40px" />
        <Text pl="10px" fontSize="40px" fontWeight="bold" color="black">
          เพิ่มสินค้า
        </Text>
      </Flex>
      <Wrap spacing="100px" justify="center">
        <WrapItem>
          <Center>
            <Box>
              <Button bg="red" fontSize="24px" borderRadius="3xl" w="150px">
                สินค้าชินเดียว
              </Button>
            </Box>
          </Center>
        </WrapItem>
        <WrapItem>
          <Center>
            <Box>
              <Button bg="red" fontSize="24px" borderRadius="3xl" w="150px">
                สินค้ามีตัวเลือก
              </Button>
            </Box>
          </Center>
        </WrapItem>
      </Wrap>
      <Grid
        templateColumns="repeat(2, 1fr)"
        gap={6}
        justifyItems="end"
        pt="15px"
        px="35px"
      >
        <GridItem fontSize="25px">
          <Box>
            <Flex justifyContent="flex-end">
              <Box pr="5px">
                <Text>* ชื่อสินค้า : </Text>
              </Box>
              <Box>
                <Input isRequired borderColor="gray.400" />
              </Box>
            </Flex>
            <Flex justifyContent="flex-end" pt="15px">
              <Box pr="5px">
                <Text>* รายละเอียดสินค้า : </Text>
              </Box>
              <Box>
                <Textarea
                  h="170px"
                  isRequired
                  maxLength={3000}
                  borderColor="gray.400"
                />
              </Box>
            </Flex>
            <Flex justifyContent="flex-end" pt="15px">
              <Box pr="5px">
                <Text>* หมวดหมู่สินค้า : </Text>
              </Box>
              <Box>
                <Select
                  placeholder="โปรดเลือก"
                  w="150px"
                  borderColor="gray.400"
                >
                  <option value="item1">1</option>
                  <option value="item2">2</option>
                  <option value="item3">3</option>
                  <option value="item4">4</option>
                </Select>
              </Box>
            </Flex>
            <Flex justifyContent="flex-end" pt="15px">
              <Box pr="5px">
                <Text>รูปภาพสินค้า : </Text>
              </Box>
              <Box>
                <Box
                  {...getRootProps({ className: "dropzone" })}
                  borderRadius="xl"
                  bg="gray.100"
                >
                  <Input {...getInputProps()} />
                  <Image src="/images/addImage.png" alt="" h="60px" w="70px" />
                  <Text>กดเพื่ออัพโหลดรูป</Text>
                  <Text>(0/10)</Text>
                </Box>
                <aside style={thumbsContainer}>{thumbs}</aside>
                <Text>*ต้องมีขนาดไฟล์ไม่เกิน 150 MB</Text>
              </Box>
            </Flex>
            <Flex justifyContent="flex-end" pt="15px">
              <Box pr="5px">
                <Text>วิดีโอสินค้า : </Text>
              </Box>
              <Box>
                <Box
                  {...getRootProps({ className: "dropzone" })}
                  borderRadius="xl"
                  bg="gray.100"
                  h="100px"
                  fontSize="15px"
                  p="10px"
                >
                  <Input {...getInputProps()} />
                  <Image src="/images/addVideo.png" alt="" h="40px" w="40px" />
                  <Text pt="5px">เพิ่มวิดีโอ</Text>
                  <Text>(0/2)</Text>
                </Box>
                <aside style={thumbsContainer}>{thumbs}</aside>
                <Text>*ต้องมีขนาดไฟล์ไม่เกิน 500 MB</Text>
              </Box>
            </Flex>
          </Box>
        </GridItem>
        <GridItem>
          <Box fontSize="23px">
            <Flex justifyContent="flex-end" pt="15px">
              <Box pr="5px">
                <Text>รหัสสินค้า : </Text>
              </Box>
              <Box>
                <Input isRequired borderColor="gray.400" />
              </Box>
            </Flex>
            <Flex justifyContent="flex-end" pt="15px">
              <Box pr="5px">
                <Text>ต้นทุน : </Text>
              </Box>
              <Box>
                <Input w="500px" isRequired borderColor="gray.400" />
              </Box>
            </Flex>
            <Flex justifyContent="flex-end" pt="15px">
              <Box pr="5px">
                <Text>* ราคา : </Text>
              </Box>
              <Box>
                <Input w="500px" isRequired borderColor="gray.400" />
              </Box>
            </Flex>
            <Flex justifyContent="flex-end" pt="15px">
              <Box pr="5px">
                <Text>ลดราคา : </Text>
              </Box>
              <Box>
                <Input w="500px" isRequired borderColor="gray.400" />
              </Box>
            </Flex>
            <Flex justifyContent="flex-end" pt="15px">
              <Box pr="5px">
                <Text>สต๊อกสินค้า : </Text>
              </Box>
              <Box>
                <Input w="500px" isRequired borderColor="gray.400" />
              </Box>
            </Flex>
            <Flex justifyContent="flex-end" pt="15px">
              <Box pr="5px">
                <Text>น้ำหนัก : </Text>
              </Box>
              <Box>
                <Input w="500px" isRequired borderColor="gray.400" />
              </Box>
            </Flex>
            <Flex justifyContent="flex-end" pt="15px">
              <Box pr="5px">
                <Text>ขนาดสินค้า : </Text>
              </Box>
              <Box w="500px">
                <Input isRequired borderColor="gray.400"/>
                <Input isRequired borderColor="gray.400" mt="15px"/>
                <Input isRequired borderColor="gray.400" mt="15px"/>
              </Box>
            </Flex>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default addProduct;
