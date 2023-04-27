import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ButtonBack from "@/components/button/ButtonBack";
import {
  Box,
  Text,
  HStack,
  Center,
  Input,
  Button,
  Spacer,
  Avatar,
  AvatarBadge,
  Select,
  IconButton,
  Flex,
  Stack,
  InputGroup,
  InputLeftElement,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Lorem,
  LinkBox,
  Grid,
  GridItem,
  Switch,
  VStack,
  InputRightElement,
  Textarea,
  ButtonGroup,
  RadioGroup,
  Radio,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  AddIcon,
  EditIcon,
  DeleteIcon,
  Icon,
  ArrowLeftIcon,
  ArrowRightIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { BsArrowLeftCircle, BsPerson, BsCameraFill } from "react-icons/bs";
import { FaRegSave } from "react-icons/fa";
import { VscSave } from "react-icons/vsc";

export default function Profile() {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);

    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      const image = event.target.result;
      setImagePreview(image);
    });
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Box px={10} py={5}>
        <Box>
          <ButtonBack />
        </Box>
        <Box>
          <Center>
            <HStack>
              <Image width={35} height={35} src={"/images/menu/ตั้งค่า.png"} />
              <Text as="b" fontSize="4xl">
                {" "}
                ตั้งค่า
              </Text>
            </HStack>
          </Center>
        </Box>
      </Box>

      <Box bg={"#f3f4f6"} pl={10} pt={2} pb={2}>
        <HStack>
          <Icon as={BsPerson} boxSize={8} />
          <Text pt="1" pl="2" as="b" fontSize="21">
            {" "}
            โปรไฟล์ของฉัน
          </Text>
        </HStack>
      </Box>

      <Box p={10}>
        <form onSubmit={""}>
          <SimpleGrid minChildWidth="300px" spacing="40px">
            <Box>
              <Grid templateColumns="repeat(8, 1fr)" gap={6}>
                <GridItem colSpan={8} align={"center"}>
                  <Avatar
                    // size="2xl"
                    width={'180px'}
                    height={'180px'}
                    left={'40px'}
                    name="Segun Adebayo"
                    src={imagePreview == null ? "/images/user.png" : imagePreview}
                    // src="https://bit.ly/sage-adebayo"
                    alt="demo"
                  >
                    <AvatarBadge
                      boxSize={10}
                      borderColor="#f84c01"
                      bg="white"
                      borderWidth={2}
                      right={"55px"}
                      top={'50px'}
                      position="relative"
                      padding={2}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          opacity: 0,
                          zIndex: 1,
                          cursor: "pointer",
                        }}
                      />
                      <Icon
                        as={BsCameraFill}
                        mt={-0.5}
                        boxSize={6}
                        color={"#f84c01"}
                        cursor="pointer"
                        onClick={() => {
                          document.querySelector("input[type='file']").click();
                        }}
                        position="relative"
                        zIndex={2}
                      />
                    </AvatarBadge>
                  </Avatar>
                </GridItem>
              </Grid>
            </Box>
            <Box>
              <Grid
                templateColumns="repeat(8, 1fr)"
                gap={2}
                alignItems={"center"}
              >
                <GridItem colSpan={2} display={"flex"} justifyContent={"right"}>
                  <FormLabel m={0}>ชื่อจริง : </FormLabel>
                </GridItem>
                <GridItem colSpan={6}>
                  <Input placeholder="ชื่อจริง" />
                </GridItem>

                <GridItem colSpan={2} display={"flex"} justifyContent={"right"}>
                  <FormLabel m={0}>นามสกุล : </FormLabel>
                </GridItem>
                <GridItem colSpan={6}>
                  <Input placeholder="นามสกุล" />
                </GridItem>

                <GridItem
                  colSpan={2}
                  display={"flex"}
                  justifyContent={"right"}
                  alignSelf="stretch"
                >
                  <FormLabel mt={2}>เพศ : </FormLabel>
                </GridItem>
                <GridItem colSpan={6}>
                  <RadioGroup defaultValue="1">
                    <Stack spacing={5} direction="row">
                      <Radio colorScheme="green" value="1">
                        ชาย
                      </Radio>
                      <Radio colorScheme="green" value="2">
                        หญิง
                      </Radio>
                      <Radio colorScheme="green" value="3">
                        อื่นๆ
                      </Radio>
                      <Radio colorScheme="green" value="4">
                        ไม่ระบุ
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </GridItem>

                <GridItem
                  colSpan={2}
                  display={"flex"}
                  justifyContent={"right"}
                  alignSelf="stretch"
                >
                  <FormLabel mt={2}>ที่อยู่ : </FormLabel>
                </GridItem>
                <GridItem colSpan={6}>
                  <Textarea placeholder="เลขที่บ้าน ถนน ซอย" />
                </GridItem>

                <GridItem colSpan={2} display={"flex"} justifyContent={"right"}>
                  <FormLabel m={0}>ตำบล : </FormLabel>
                </GridItem>
                <GridItem colSpan={6}>
                  <Input placeholder="ตำบล" />
                </GridItem>

                <GridItem colSpan={2} display={"flex"} justifyContent={"right"}>
                  <FormLabel m={0}>อำเภอ : </FormLabel>
                </GridItem>
                <GridItem colSpan={6}>
                  <Input placeholder="อำเภอ" />
                </GridItem>

                <GridItem colSpan={2} display={"flex"} justifyContent={"right"}>
                  <FormLabel m={0}>จังหวัด : </FormLabel>
                </GridItem>
                <GridItem colSpan={6}>
                  <Input placeholder="จังหวัด" />
                </GridItem>

                <GridItem colSpan={2} display={"flex"} justifyContent={"right"}>
                  <FormLabel m={0}>ไปรษณีย์ : </FormLabel>
                </GridItem>
                <GridItem colSpan={6}>
                  <Input placeholder="ไปรษณีย์" />
                </GridItem>

                {/* <GridItem colSpan={2} display={"flex"} justifyContent={"right"}>
                  <FormLabel m={0}>ประเทศ : </FormLabel>
                </GridItem>
                <GridItem colSpan={6}>
                  <Input placeholder="ประเทศ" />
                </GridItem> */}
              </Grid>
            </Box>
            <Box>
              <Grid
                templateColumns="repeat(8, 1fr)"
                gap={2}
                alignItems={"center"}
              >
                <GridItem colSpan={2} display={"flex"} justifyContent={"right"}>
                  <FormLabel m={0}>เบอร์โทร : </FormLabel>
                </GridItem>
                <GridItem colSpan={6}>
                  <Input placeholder="xxx-xxxx-xxx" />
                </GridItem>

                <GridItem colSpan={2} display={"flex"} justifyContent={"right"}>
                  <FormLabel m={0}>อีเมลล์ : </FormLabel>
                </GridItem>
                <GridItem colSpan={6}>
                  <Input placeholder="Christian_N@gmail.com" />
                </GridItem>

                <GridItem colSpan={2} display={"flex"} justifyContent={"right"}>
                  <FormLabel m={0}>
                    <Image
                      width={36}
                      height={36}
                      src={"/images/social/facebook.png"}
                      alt="demo"
                    />
                  </FormLabel>
                </GridItem>
                <GridItem colSpan={6}>
                  <Input placeholder="facebook" />
                </GridItem>

                <GridItem colSpan={2} display={"flex"} justifyContent={"right"}>
                  <FormLabel m={0}>
                    <Image
                      width={36}
                      height={36}
                      src={"/images/social/line.png"}
                      alt="demo"
                    />
                  </FormLabel>
                </GridItem>
                <GridItem colSpan={6}>
                  <Input placeholder="LINE" />
                </GridItem>

                <GridItem colSpan={2} display={"flex"} justifyContent={"right"}>
                  <FormLabel m={0}>
                    <Image
                      width={36}
                      height={36}
                      src={"/images/social/instagram.png"}
                      alt="demo"
                    />
                  </FormLabel>
                </GridItem>
                <GridItem colSpan={6}>
                  <Input placeholder="Instagram" />
                </GridItem>

                <GridItem colSpan={2} display={"flex"} justifyContent={"right"}>
                  <FormLabel m={0}>
                    <Image
                      width={36}
                      height={36}
                      src={"/images/social/twitter.png"}
                      alt="demo"
                    />
                  </FormLabel>
                </GridItem>
                <GridItem colSpan={6}>
                  <Input placeholder="Twitter" />
                </GridItem>

                <GridItem colSpan={2} display={"flex"} justifyContent={"right"}>
                  <FormLabel m={0}>
                    <Image
                      width={36}
                      height={36}
                      src={"/images/social/tik-tok.png"}
                      alt="demo"
                    />
                  </FormLabel>
                </GridItem>
                <GridItem colSpan={6}>
                  <Input placeholder="Tik-Tok" />
                </GridItem>

                <GridItem colSpan={2} display={"flex"} justifyContent={"right"}>
                  <FormLabel m={0}>
                    <Image
                      width={36}
                      height={36}
                      src={"/images/social/youtube.png"}
                      alt="demo"
                    />
                  </FormLabel>
                </GridItem>
                <GridItem colSpan={6}>
                  <Input placeholder="Youtube" />
                </GridItem>
              </Grid>
            </Box>
          </SimpleGrid>
          <HStack justify="center" mt={10}>
            <ButtonGroup gap="4">
              <Button colorScheme="gray">ยกเลิก</Button>
              <Button
                onClick={null}
                leftIcon={<VscSave />}
                background="#f84c01"
                color="white"
              >
                บันทึก
              </Button>
            </ButtonGroup>
          </HStack>
        </form>
      </Box>
    </>
  );
}
