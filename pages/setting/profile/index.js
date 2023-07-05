import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import ButtonBack from "@/components/button/ButtonBack";
import FormData from "form-data";
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
import axios from "axios";
import { BsArrowLeftCircle, BsPerson, BsCameraFill } from "react-icons/bs";
import { FaRegSave } from "react-icons/fa";
import { VscSave } from "react-icons/vsc";
import { connect, useDispatch, useSelector } from "react-redux";
import { createSlice } from "@reduxjs/toolkit";
import { useToast } from "@chakra-ui/react";

export default function Profile() {
  const fileInputRef = useRef(null);
  const toast = useToast();
  const userInfo = useSelector((App) => App.userInfo);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();
  const initialState = {
    isLoading: false,
    data: null,
    dataBiller: null,
    isError: false,
    errorData: null,
  };
  const slice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
      getUserSuccess(state, action) {
        state.isLoading = false;
        state.data = action.payload;
      },
    },
  });
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);

    // const reader = new FileReader();
    // reader.addEventListener("load", (event) => {
    //   const image = event.target.result;
    //   setImagePreview(image);
    // });
    // reader.readAsDataURL(file);

    async function update() {
      if (event.target.files[0] !== undefined) {
        const formdata = new FormData();
        formdata.append("user_id", userInfo.data[0]?.id);
        formdata.append("avatar", file);
        const res = await axios.post(
          `https://api.sellpang.com/api/editAvatar/`,
          formdata
        );
        dispatch(slice.actions.getUserSuccess([res.data.user]));
        setImagePreview(res.data.user.avatar);
      }
    }
    update();
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const [fname, setFname] = useState(null);
  const [lname, setLname] = useState(null);
  const [gender, setGender] = useState("ชาย");
  const [address, setAddress] = useState(null);
  const [subDistrict, setSubDistrict] = useState(null);
  const [district, setDistrict] = useState(null);
  const [county, setCounty] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [facebook, setFacebook] = useState(null);
  const [line, setLine] = useState(null);
  const [instagram, setInstagram] = useState(null);
  const [twitter, setTwitter] = useState(null);
  const [tiktok, setTiktok] = useState(null);
  const [youtube, setYoutube] = useState(null);

  useEffect(() => {
    async function fecthdata() {
      const formdataUser = new FormData();
      formdataUser.append("user_id", userInfo.data[0].id);
      const user = await axios.post(
        `https://api.sellpang.com/api/getUser`,
        formdataUser
      );
      setImagePreview(user.data.user.avatar);
      const formdata = new FormData();
      formdata.append("user_code", userInfo.data[0].code_user);
      const res = await axios.post(
        `https://api.sellpang.com/api/getOwnershops`,
        formdata
      );
      if (res.data.owner_shop) {
        setFname(res.data.owner_shop?.fname);
        setLname(res.data.owner_shop?.lname);
        setGender(res.data.owner_shop?.gender);
        setAddress(res.data.owner_shop?.address);
        setSubDistrict(res.data.owner_shop?.sub_district);
        setDistrict(res.data.owner_shop?.district);
        setCounty(res.data.owner_shop?.county);
        setZipCode(res.data.owner_shop?.zip_code);
        setPhone(res.data.owner_shop?.phone);
        setEmail(res.data.owner_shop?.email);
        setFacebook(res.data.owner_shop?.facebook);
        setLine(res.data.owner_shop?.line);
        setInstagram(res.data.owner_shop?.instagram);
        setTwitter(res.data.owner_shop?.twitter);
        setTiktok(res.data.owner_shop?.tiktok);
        setYoutube(res.data.owner_shop?.youtube);
      }
    }
    fecthdata();
  }, []);

  const updateOwnerShop = async (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("fname", fname == null ? " " : fname);
    formdata.append("lname", lname == null ? " " : lname);
    formdata.append("gender", gender == null ? " " : gender);
    formdata.append("address", address == null ? " " : address);
    formdata.append("sub_district", subDistrict == null ? " " : subDistrict);
    formdata.append("district", district == null ? " " : district);
    formdata.append("county", county == null ? " " : county);
    formdata.append("zip_code", zipCode == null ? " " : zipCode);
    formdata.append("phone", phone == null ? " " : phone);
    formdata.append("email", email == null ? " " : email);
    formdata.append("facebook", facebook == null ? " " : facebook);
    formdata.append("line", line == null ? " " : line);
    formdata.append("instagram", instagram == null ? " " : instagram);
    formdata.append("twitter", twitter == null ? " " : twitter);
    formdata.append("tiktok", tiktok == null ? " " : tiktok);
    formdata.append("youtube", youtube == null ? " " : youtube);
    formdata.append("user_code", 8863299);
    formdata.append("user_id", 0);
    const res = await axios.post(
      `https://api.sellpang.com/api/updateOwnerShop`,
      formdata
    );
    if (res.data.status) {
      toast({
        title: `Updated profile successfully`,
        position: "top-right",
        status: "success",
        isClosable: true,
      });
    }
    // console.log(res);
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

      <Box bg={"#f3f4f6"} pl={10} pt={2} pb={2} borderTop="1px solid">
        <HStack>
          <Icon as={BsPerson} boxSize={8} />
          <Text pt="1" pl="2" as="b" fontSize="21">
            {" "}
            โปรไฟล์ของฉัน
          </Text>
        </HStack>
      </Box>

      <Box p={10}>
        <form onSubmit={updateOwnerShop}>
          <SimpleGrid minChildWidth="300px" spacing="40px">
            <Box>
              <Grid templateColumns="repeat(8, 1fr)" gap={6}>
                <GridItem colSpan={8} align={"center"}>
                  <Avatar
                    // size="2xl"
                    width={"180px"}
                    height={"180px"}
                    left={"40px"}
                    name="Segun Adebayo"
                    src={
                      imagePreview == null
                        ? "/images/user.png"
                        : `https://api.sellpang.com/images/shopee/avatar/${imagePreview}`
                    }
                    alt="demo"
                    style={{ width: "180px", height: "180px" }}
                  >
                    <AvatarBadge
                      boxSize={10}
                      borderColor="#f84c01"
                      bg="white"
                      borderWidth={2}
                      right={"55px"}
                      top={"50px"}
                      position="relative"
                      padding={2}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        ref={fileInputRef}
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
                        onClick={handleIconClick}
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
                  <Input
                    placeholder="ชื่อจริง"
                    id="fname"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                  />
                </GridItem>

                <GridItem colSpan={2} display={"flex"} justifyContent={"right"}>
                  <FormLabel m={0}>นามสกุล : </FormLabel>
                </GridItem>
                <GridItem colSpan={6}>
                  <Input
                    placeholder="นามสกุล"
                    id="lname"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                  />
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
                  <RadioGroup
                    defaultValue="1"
                    onChange={setGender}
                    value={gender}
                  >
                    <Stack spacing={5} direction="row">
                      <Radio colorScheme="green" value="ชาย">
                        ชาย
                      </Radio>
                      <Radio colorScheme="green" value="หญิง">
                        หญิง
                      </Radio>
                      <Radio colorScheme="green" value="อื่นๆ">
                        อื่นๆ
                      </Radio>
                      <Radio colorScheme="green" value="ไม่ระบุ">
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
                  <Textarea
                    placeholder="เลขที่บ้าน ถนน ซอย"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </GridItem>

                <GridItem colSpan={2} display={"flex"} justifyContent={"right"}>
                  <FormLabel m={0}>ตำบล : </FormLabel>
                </GridItem>
                <GridItem colSpan={6}>
                  <Input
                    placeholder="ตำบล"
                    id="sub_district"
                    value={subDistrict}
                    onChange={(e) => setSubDistrict(e.target.value)}
                  />
                </GridItem>

                <GridItem colSpan={2} display={"flex"} justifyContent={"right"}>
                  <FormLabel m={0}>อำเภอ : </FormLabel>
                </GridItem>
                <GridItem colSpan={6}>
                  <Input
                    placeholder="อำเภอ"
                    id="district"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                  />
                </GridItem>

                <GridItem colSpan={2} display={"flex"} justifyContent={"right"}>
                  <FormLabel m={0}>จังหวัด : </FormLabel>
                </GridItem>
                <GridItem colSpan={6}>
                  <Input
                    placeholder="จังหวัด"
                    id="county"
                    value={county}
                    onChange={(e) => setCounty(e.target.value)}
                  />
                </GridItem>

                <GridItem colSpan={2} display={"flex"} justifyContent={"right"}>
                  <FormLabel m={0}>ไปรษณีย์ : </FormLabel>
                </GridItem>
                <GridItem colSpan={6}>
                  <Input
                    placeholder="ไปรษณีย์"
                    id="zip_code"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
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
                  <Input
                    placeholder="xxx-xxxx-xxx"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </GridItem>

                <GridItem colSpan={2} display={"flex"} justifyContent={"right"}>
                  <FormLabel m={0}>อีเมลล์ : </FormLabel>
                </GridItem>
                <GridItem colSpan={6}>
                  <Input
                    placeholder="Christian_N@gmail.com"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
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
                  <Input
                    placeholder="facebook"
                    id="facebook"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                  />
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
                  <Input
                    placeholder="LINE"
                    id="line"
                    value={line}
                    onChange={(e) => setLine(e.target.value)}
                  />
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
                  <Input
                    placeholder="Instagram"
                    id="instagram"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                  />
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
                  <Input
                    placeholder="Twitter"
                    id="twitter"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                  />
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
                  <Input
                    placeholder="Tik-Tok"
                    id="tiktok"
                    value={tiktok}
                    onChange={(e) => setTiktok(e.target.value)}
                  />
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
                  <Input
                    placeholder="Youtube"
                    id="youtube"
                    value={youtube}
                    onChange={(e) => setYoutube(e.target.value)}
                  />
                </GridItem>
              </Grid>
            </Box>
          </SimpleGrid>
          <HStack justify="center" mt={10}>
            <ButtonGroup gap="4">
              <Button colorScheme="gray">ยกเลิก</Button>
              <Button
                type="submit"
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
