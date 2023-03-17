import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { BsArrowLeftCircle } from "react-icons/bs";
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
  InputGroup,
  InputRightElement,
  FormControl,
  Icon,
  Spacer,
} from "@chakra-ui/react";
import Link from "next/link";
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

function index() {
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

  const [buttonActive, setButtonActive] = useState([false, true]);

  return (
    <Box>
      <Box>
        <Flex justifyContent="center" p="15px">
          <Link href="/stock">
            <Button
              bg="red"
              h="25px"
              borderRadius="3xl"
              color="white"
              px="7px"
              leftIcon={<Icon as={BsArrowLeftCircle} color="white" />}
            >
              ย้อนกลับ
            </Button>
          </Link>
          <Spacer />
          <Flex alignItems="center">
            <Image src="/images/addProduct.png" alt="" h="40px" w="40px" />
            <Text pl="10px" fontSize="40px" fontWeight="bold" color="black">
              เพิ่มสินค้า
            </Text>
          </Flex>
          <Spacer />
          <Link href="/stock">
            <Image src="/images/close.png" alt="" h="20px" w="20px" />
          </Link>
        </Flex>
        <Wrap spacing="100px" justify="center">
          <WrapItem>
            <Center>
              <Box>
                <Link href="/stock/addProduct">
                  <Button
                    id="0"
                    bg={buttonActive[0] ? "red" : "white"}
                    color={buttonActive[0] ? "white" : "red"}
                    border="2px solid red"
                    fontSize="24px"
                    borderRadius="3xl"
                    w="150px"
                    _hover={{}}
                  >
                    สินค้าชิ้นเดียว
                  </Button>
                </Link>
              </Box>
            </Center>
          </WrapItem>
          <WrapItem>
            <Center>
              <Box>
                <Link href="/stock/addProductMultiSelect">
                  <Button
                    id="1"
                    bg={buttonActive[1] ? "red" : "white"}
                    color={buttonActive[1] ? "white" : "red"}
                    border="2px solid red"
                    fontSize="24px"
                    borderRadius="3xl"
                    w="150px"
                    _hover={{}}
                  >
                    สินค้ามีตัวเลือก
                  </Button>
                </Link>
              </Box>
            </Center>
          </WrapItem>
        </Wrap>
      </Box>

      <FormControl>
        <Box>
          <Grid
            templateColumns="repeat(2, 1fr)"
            gap={6}
            justifyItems="end"
            pt="15px"
            px="35px"
          >
            <GridItem fontSize="25px" width="100%">
              <Grid templateColumns="repeat(3, 1fr)" gap={2}>
                <GridItem colSpan={1} justifySelf="end">
                  <Box pr="5px">
                    <Text>* ชื่อสินค้า : </Text>
                  </Box>
                </GridItem>
                <GridItem colSpan={2}>
                  <InputGroup>
                    <Input
                      pr="100px"
                      type="text"
                      placeholder="ระบุชื่อสินค้า"
                      borderColor="gray.400"
                    />
                    <InputRightElement pr="45px">
                      <Text>0/100</Text>
                    </InputRightElement>
                  </InputGroup>
                </GridItem>
                <GridItem colSpan={1} justifySelf="end">
                  <Box pr="5px">
                    <Text>* รายละเอียดสินค้า : </Text>
                  </Box>
                </GridItem>
                <GridItem colSpan={2}>
                  <Box>
                    <InputGroup flexDirection="column-reverse">
                      <Textarea
                        h="170px"
                        isRequired
                        resize="none"
                        maxLength={3000}
                        borderColor="gray.400"
                        placeholder="ระบุรายละเอียดสินค้า"
                        pr="60px"
                      />
                      <InputRightElement h="100%" alignItems="end" p="10px">
                        <Text pr="45px">0/3000</Text>
                      </InputRightElement>
                    </InputGroup>
                  </Box>
                </GridItem>
                <GridItem colSpan={1} justifySelf="end">
                  <Box pr="5px">
                    <Text>* หมวดหมู่สินค้า : </Text>
                  </Box>
                </GridItem>
                <GridItem colSpan={2}>
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
                </GridItem>
                <GridItem colSpan={1} justifySelf="end">
                  <Box pr="5px">
                    <Text>รูปภาพสินค้า : </Text>
                  </Box>
                </GridItem>
                <GridItem colSpan={2}>
                  <Box>
                    <Box
                      {...getRootProps({ className: "dropzone" })}
                      borderRadius="xl"
                      bg="gray.100"
                    >
                      <Input {...getInputProps()} />
                      <Image
                        src="/images/addImage.png"
                        alt=""
                        h="60px"
                        w="70px"
                      />
                      <Text>กดเพื่ออัพโหลดรูป</Text>
                      <Text>(0/10)</Text>
                    </Box>
                    <aside style={thumbsContainer}>{thumbs}</aside>
                    <Text color="orange">*ต้องมีขนาดไฟล์ไม่เกิน 150 MB</Text>
                  </Box>
                </GridItem>
                <GridItem colSpan={1} justifySelf="end">
                  <Box pr="5px">
                    <Text>วิดีโอสินค้า : </Text>
                  </Box>
                </GridItem>
                <GridItem colSpan={2}>
                  <Box>
                    <Box
                      {...getRootProps({ className: "dropzone" })}
                      borderRadius="xl"
                      bg="gray.100"
                      h="100px"
                      w="100px"
                      fontSize="15px"
                      p="10px"
                    >
                      <Input {...getInputProps()} />
                      <Image
                        src="/images/addVideo.png"
                        alt=""
                        h="40px"
                        w="40px"
                      />
                      <Text pt="5px">เพิ่มวิดีโอ</Text>
                      <Text>(0/2)</Text>
                    </Box>
                    <aside style={thumbsContainer}>{thumbs}</aside>
                    <Text color="orange">*ต้องมีขนาดไฟล์ไม่เกิน 500 MB</Text>
                  </Box>
                </GridItem>
              </Grid>
            </GridItem>
            <GridItem fontSize="25px" width="100%">
              <Grid templateColumns="repeat(3, 1fr)" gap={2}>
                <GridItem colSpan={1} justifySelf="end">
                  <Box pr="5px">
                    <Text>รหัสสินค้า : </Text>
                  </Box>
                </GridItem>
                <GridItem colSpan={2}>
                  <InputGroup>
                    <Input pr="40px" type="text" placeholder="ระบุรหัสสินค้า" />
                  </InputGroup>
                </GridItem>
                <GridItem colSpan={1} justifySelf="end">
                  <Box pr="5px">
                    <Text>ต้นทุน : </Text>
                  </Box>
                </GridItem>
                <GridItem colSpan={2}>
                  <InputGroup>
                    <Input
                      pr="40px"
                      type="text"
                      placeholder="ระบุต้นทุนสินค้า"
                    />
                    <InputRightElement>
                      <Text>฿</Text>
                    </InputRightElement>
                  </InputGroup>
                </GridItem>
                <GridItem colSpan={1} justifySelf="end">
                  <Box pr="5px">
                    <Text>* ราคา : </Text>
                  </Box>
                </GridItem>
                <GridItem colSpan={2}>
                  <InputGroup>
                    <Input pr="40px" type="text" placeholder="ระบุราคาสินค้า" />
                    <InputRightElement>
                      <Text>฿</Text>
                    </InputRightElement>
                  </InputGroup>
                </GridItem>
                <GridItem colSpan={1} justifySelf="end">
                  <Box pr="5px">
                    <Text>ลดราคา : </Text>
                  </Box>
                </GridItem>
                <GridItem colSpan={2}>
                  <InputGroup>
                    <Input pr="40px" type="text" placeholder="ระบุลดราคา" />
                    <InputRightElement>
                      <Text>฿</Text>
                    </InputRightElement>
                  </InputGroup>
                </GridItem>
                <GridItem colSpan={1} justifySelf="end">
                  <Box pr="5px">
                    <Text>สต๊อกสินค้า : </Text>
                  </Box>
                </GridItem>
                <GridItem colSpan={2}>
                  <Input pr="50px" type="text" placeholder="ระบุจำนวนสินค้า" />
                </GridItem>
                <GridItem colSpan={1} justifySelf="end">
                  <Box pr="5px">
                    <Text>น้ำหนัก : </Text>
                  </Box>
                </GridItem>
                <GridItem colSpan={2}>
                  <InputGroup>
                    <Input
                      pr="40px"
                      type="text"
                      placeholder="ระบุน้ำหนักสินค้า"
                    />
                    <InputRightElement>
                      <Text>Kg</Text>
                    </InputRightElement>
                  </InputGroup>
                </GridItem>
                <GridItem colSpan={1} justifySelf="end">
                  <Box pr="5px">
                    <Text>ขนาด : </Text>
                  </Box>
                </GridItem>
                <GridItem colSpan={2}>
                  <InputGroup>
                    <Input
                      pr="40px"
                      type="text"
                      placeholder="ระบุความกว้างสินค้า"
                    />
                    <InputRightElement>
                      <Text>Cm</Text>
                    </InputRightElement>
                  </InputGroup>
                  <InputGroup mt="10px">
                    <Input
                      pr="40px"
                      type="text"
                      placeholder="ระบุความยาวสินค้า"
                    />
                    <InputRightElement>
                      <Text>Cm</Text>
                    </InputRightElement>
                  </InputGroup>
                  <InputGroup mt="10px">
                    <Input
                      pr="40px"
                      type="text"
                      placeholder="ระบุความสูงสินค้า"
                    />
                    <InputRightElement>
                      <Text>Cm</Text>
                    </InputRightElement>
                  </InputGroup>
                </GridItem>
              </Grid>
              <Flex justifyContent="center" pt="10px">
                <Link href="/stock/addProductMultiSelect/option">
                  <Button
                    ml="200px"
                    type="submit"
                    bg="red"
                    leftIcon={
                      <Image src="/images/pluswhite.png" alt="" h="15px" />
                    }
                    _hover={{}}
                    color="white"
                    h="35px"
                    fontSize="21px"
                  >
                    เพิ่มตัวเลือกสินค้า
                  </Button>
                </Link>
              </Flex>
            </GridItem>
          </Grid>
        </Box>
      </FormControl>
    </Box>
  );
}

export default index;
