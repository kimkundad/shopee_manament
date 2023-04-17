import classNames from "classnames";
import { useDropzone } from "react-dropzone";
import React, { useState, useEffect } from "react";
import {
  Flex,
  Switch,
  Text,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  Spacer,
  Button,
  Wrap,
  HStack,
  WrapItem,
  Select,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Link,
  Card,
  CardBody,
  Heading,
  FormControl,
  FormLabel,
  Textarea,
  Grid,
  GridItem,
  InputRightElement,
  Lorem,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Checkbox,
  Menu,
  MenuButton,
  MenuList,
  CheckboxGroup,
  MenuItem,
  RadioGroup,
  Radio,
  IconButton,
} from "@chakra-ui/react";
import ListCheck from "@/components/MenuList";
import CardShop from "@/components/cardShop";
import Axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import * as yup from "yup";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

SwiperCore.use([Navigation, Pagination]);

const schema = yup.object().shape({
  inputField: yup.string().required("กรุณากรอกขื่อร้านค้า"),
  textAreaField: yup.string().required("กรุณากรอกรายละเอียดร้านค้า"),
  fileField: yup.mixed().required("กรุณาเพิ่มรูปโปรไฟล์ร้านค้า"),
  fileCoverField: yup.mixed().required("กรุณาเพิ่มรูปภาพพื้นหลังร้านค้า"),
});

// component upload image shop
class PicturesShop extends React.Component {
  state = {
    fileList: [],
  };
  handleChange = ({ fileList }) => {
    this.props.setFileImgShop(fileList);
    this.setState({ fileList });
  };

  render() {
    const { fileList } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>เพิ่มรูปภาพ ({fileList.length}/1)</div>
      </div>
    );
    return (
      <>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={this.handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
      </>
    );
  }
}

// component upload image cover shop
class PicturesCoverShop extends React.Component {
  state = {
    fileList: [],
  };
  handleChange = ({ fileList }) => {
    this.props.setFileImgCoverShop(fileList);
    this.setState({ fileList });
  };

  render() {
    const { fileList } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>เพิ่มรูปภาพ ({fileList.length}/1)</div>
      </div>
    );
    return (
      <>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={this.handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
      </>
    );
  }
}

export default function shop() {
  const [getProducts, setProducts] = useState([]);
  const [getShops, setShops] = useState([]);

  const [buttonActive, setButtonActive] = useState([false, true]);
  const colunm = [
    {
      label: "เรียงตามตัวอักษร",
    },
    {
      label: "เรียงตามวันที่สร้าง",
    },
    {
      label: "เรียงตามวันที่แก้ไข",
    },
    {
      label: "จำนวนผู้เข้าชม",
    },
  ];
  const modalAdd = useDisclosure();
  const modalAdd2 = useDisclosure();
  const modalPreview = useDisclosure();
  const modalConfirm = useDisclosure();
  const modalConfirmSuccess = useDisclosure();
  const modalSelectTheme = useDisclosure();
  const [statusDelete, setStatusDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputFieldError, setInputFieldError] = useState("");
  const [textAreaFieldError, setTextAreaFieldError] = useState("");
  const [textImageShopError, setTextImageShopError] = useState("");
  const [textImageCoverShopError, setTextImageCoverShopError] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [Theme, setTheme] = useState("");

  const [fileImgShop, setFileImgShop] = useState([]);
  const handleSetFileImgShop = (fileList) => {
    setFileImgShop(fileList);
  };

  const [fileImgCoverShop, setFileImgCoverShop] = useState([]);
  const handleSetFileImgCoverShop = (fileList) => {
    setFileImgCoverShop(fileList);
  };

  const handleClickNextStopAdd = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await schema.validate(
        {
          inputField: nameShop,
          textAreaField: detailShop,
          fileField: fileImgShop[0],
          fileCoverField: fileImgCoverShop[0],
        },
        { abortEarly: false }
      );
      // ส่งค่าไปยัง API หรือทำอื่นๆ ที่ต้องการ
      modalAdd.onClose();
      modalSelectTheme.onOpen();
      setInputFieldError("");
      setTextAreaFieldError("");
      setTextImageShopError("");
      setTextImageCoverShopError("");

      // ไปยังหน้าต่อไป
    } catch (error) {
      if (error.inner.some((err) => err.path === "inputField")) {
        setInputFieldError(
          error.inner.find((err) => err.path === "inputField").message
        );
      }
      if (error.inner.some((err) => err.path === "textAreaField")) {
        setTextAreaFieldError(
          error.inner.find((err) => err.path === "textAreaField").message
        );
      }
      if (error.inner.some((err) => err.path === "fileField")) {
        setTextImageShopError(
          error.inner.find((err) => err.path === "fileField").message
        );
      }
      if (error.inner.some((err) => err.path === "fileCoverField")) {
        setTextImageCoverShopError(
          error.inner.find((err) => err.path === "fileCoverField").message
        );
      }
    }
    setIsLoading(false);
  };

  const handleNextModalSelectProduct = () => {
    console.log('Theme:',Theme)
    modalSelectTheme.onClose();
    modalAdd2.onOpen();
  };

  const handleConfirm = () => {
    modalAdd2.onClose();
    modalConfirm.onOpen();
  };

  const handleConfirmSuccess = () => {
    // get selected products
    const selected = getProducts.filter((product) =>
      selectedProducts.includes(product.id)
    );

    const formData = new FormData();
    formData.append("nameShop", nameShop);
    formData.append("detailShop", detailShop);
    fileImgShop.forEach((file, index) => {
      formData.append(`file[${index}]`, file.originFileObj);
    });
    fileImgCoverShop.forEach((file, index) => {
      formData.append(`file2[${index}]`, file.originFileObj);
    });
    selected.forEach((select, index) => {
      formData.append(`selectID[${index}]`, select.id);
    });

    Axios.post("https://shopee-api.deksilp.com/api/createShop", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then(function (response) {
      if (response.data.success) {
        modalConfirm.onClose();
        modalConfirmSuccess.onOpen();
        fetchAllShops();
      }
    });
  };

  const fetchAllShops = async () => {
    Axios.get("https://shopee-api.deksilp.com/api/getAllShops").then(function (
      response
    ) {
      setShops(response.data.shops);
    });
  };

  useEffect(() => {
    Axios.get("https://shopee-api.deksilp.com/api/getAllProduct").then(
      function (response) {
        setProducts(response.data.product);
      }
    );
  }, []);

  useEffect(() => {
    fetchAllShops();
    setStatusDelete(false);
  }, [statusDelete]);

  const [query, setQuery] = useState("");
  const [searchDateShops, setSearchDateShops] = useState("");
  const [filterShops, setFilterShops] = useState("");

  const handleSearch = (event) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);
    setSearchDateShops("");
    setFilterShops("");
    if (searchQuery === "") {
      setQuery(null);
    }
  };

  const handleSearchDateShops = (event) => {
    const DateShops = event.target.value;
    setSearchDateShops(DateShops);
    setQuery("");
    setFilterShops("");
    if (DateShops === "") {
      setSearchDateShops(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await Axios.get(
        `https://shopee-api.deksilp.com/api/getSearchShops?search=${query}`
      );
      setShops(response.data.shops);
    };

    if (query !== "") {
      fetchData();
    }
  }, [query]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await Axios.get(
        `https://shopee-api.deksilp.com/api/getSearchDateShops?search=${searchDateShops}`
      );
      setShops(response.data.shops);
    };

    if (searchDateShops !== "") {
      fetchData();
    }
  }, [searchDateShops]);

  const handleFilterShops = (value) => {
    const TypeShops = value;
    setFilterShops(TypeShops);
    setSearchDateShops("");
    setQuery("");
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await Axios.get(
        `https://shopee-api.deksilp.com/api/getFilterShops?type=${filterShops}`
      );
      setShops(response.data.shops);
    };

    if (filterShops !== "") {
      fetchData();
    }
  }, [filterShops]);

  //   count name shop /100
  const [lengthNameShop, setLengthNameShop] = useState(0);
  const [nameShop, setNameShop] = useState("");
  const handleChangeNameShop = (e) => {
    const NameShop = e.target.value;
    setLengthNameShop(NameShop.length);
    setNameShop(NameShop);
    setInputFieldError("");
  };

  //   count detail shop /3000
  const [lengthDetailShop, setLengthDetailShop] = useState(0);
  const [detailShop, setDetailShop] = useState("");
  const handleChangeDetailShop = (e) => {
    const DetailShop = e.target.value;
    setLengthDetailShop(DetailShop.length);
    setDetailShop(DetailShop);
    setTextAreaFieldError("");
  };

  const handleAllCheckboxChange = (e) => {
    if (e.target.checked) {
      setSelectedProducts(getProducts.map((product) => product.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleCheckboxChange = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const [swiper, setSwiper] = useState(null);

  const goPrev = () => {
    if (swiper) {
      swiper.slidePrev();
    }
  };

  const goNext = () => {
    if (swiper) {
      swiper.slideNext();
    }
  };

  return (
    <>
      <Box m="10px" pt="10px" pb={"10px"}>
        <Flex>
          <Box>
            <InputGroup>
              <InputLeftElement pointerEvents="none" ml={"5px"}>
                <Image src="/images/search.png" h="20px" w="20px" />
              </InputLeftElement>
              <Input
                borderRadius="3xl"
                type="text"
                fontSize="21px"
                borderColor="gray.500"
                placeholder="ค้นหาชื่อร้านค้า"
                value={query || ""}
                onChange={handleSearch}
              />
            </InputGroup>
          </Box>
          <Box ml="10px">
            <InputGroup>
              <InputLeftElement pointerEvents="none" ml={"5px"}>
                <Image src="/images/calendar.png" h="20px" w="20px" />
              </InputLeftElement>
              <Input
                type="date"
                borderRadius="3xl"
                fontSize="21px"
                borderColor="gray.500"
                placeholder="เลือกวันที่"
                value={searchDateShops || ""}
                onChange={handleSearchDateShops}
              />
            </InputGroup>
          </Box>
          <Box ml="10px" border="1px" borderColor="black" borderRadius="md">
            {/* <ListCheck data={colunm} /> */}
            <Menu closeOnSelect={false}>
              <MenuButton
                as={Button}
                bg="white !important"
                fontSize="21px"
                leftIcon={<Image src="/images/menu.png" h="25px" w="25px" />}
                rightIcon={
                  <Image
                    src="/images/arrow/down-filled-triangular-arrow.png"
                    h="10px"
                    w="20px"
                  />
                }
                _hover={{}}
              >
                เลือกตัวแสดงผล
              </MenuButton>
              <MenuList
                minWidth="200px"
                border="1px"
                borderColor="black"
                borderRadius="md"
              >
                <RadioGroup onChange={handleFilterShops} value={filterShops}>
                  <MenuItem>
                    <Radio
                      sx={{
                        ".chakra-radio__control": {
                          background: "white !important",
                          borderColor: "black !important",
                          color: "#3FFF33 !important",
                          border: "1px solid",
                        },
                      }}
                      value="default"
                    >
                      เรียงตามค่าเริ่มต้น
                    </Radio>
                  </MenuItem>
                  <MenuItem>
                    <Radio
                      sx={{
                        ".chakra-radio__control": {
                          background: "white !important",
                          borderColor: "black !important",
                          color: "#3FFF33 !important",
                          border: "1px solid",
                        },
                      }}
                      value="asc"
                    >
                      เรียงตามตัวอักษร
                    </Radio>
                  </MenuItem>
                  <MenuItem>
                    <Radio
                      sx={{
                        ".chakra-radio__control": {
                          background: "white !important",
                          borderColor: "black !important",
                          color: "#3FFF33 !important",
                          border: "1px solid",
                        },
                      }}
                      value="createdDateShop"
                    >
                      เรียงตามวันที่สร้าง
                    </Radio>
                  </MenuItem>
                  <MenuItem>
                    <Radio
                      sx={{
                        ".chakra-radio__control": {
                          background: "white !important",
                          borderColor: "black !important",
                          color: "#3FFF33 !important",
                          border: "1px solid",
                        },
                      }}
                      value="modifiedDateShop"
                    >
                      เรียงตามวันที่แก้ไข
                    </Radio>
                  </MenuItem>
                  {/* <MenuItem>
                    <Radio
                      sx={{
                        ".chakra-radio__control": {
                          background: "white !important",
                          borderColor: "black !important",
                          color: "#3FFF33 !important",
                          border: "1px solid",
                        },
                      }}
                      value="viewCount"
                    >
                      จำนวนผู้เข้าชม
                    </Radio>
                  </MenuItem> */}
                </RadioGroup>
              </MenuList>
            </Menu>
          </Box>
          <Spacer />
          <Box borderWidth="1px" borderColor="red" borderRadius="md">
            <Button
              fontSize="21px"
              leftIcon={<Image src="/images/pluswhite.png" h="15px" w="15px" />}
              bg="red"
              variant="solid"
              color="white"
              _hover={{}}
              onClick={modalAdd.onOpen}
            >
              สร้างร้านค้า
            </Button>
          </Box>
        </Flex>
      </Box>
      <Box pt="5px" pb={"5px"}>
        <Flex flexWrap={"wrap"} justifyContent={"space-around"}>
          <CardShop
            Products={getProducts}
            Shops={getShops}
            statusDelete={setStatusDelete}
          />
        </Flex>
      </Box>

      {/* Modal สร้างร้านค้า */}
      <Modal
        closeOnOverlayClick={false}
        onClose={modalAdd.onClose}
        size={"xl"}
        isOpen={modalAdd.isOpen}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex justifyContent={"center"}>
              <Image
                src="/images/addshop.png"
                width={"40px"}
                height={"35px"}
                mr={"10px"}
              />
              <Text fontSize={"4xl"}>สร้างร้านค้า</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton
            color={"white"}
            bgColor={"#ff0000"}
            borderRadius={"50px"}
            width={"20px"}
            height={"20px"}
            fontSize={"9px"}
          />
          <ModalBody>
            <FormControl>
              <Box>
                <Grid
                  templateColumns="repeat(1, 1fr)"
                  gap={6}
                  justifyItems="end"
                  // pt="15px"
                  px="35px"
                >
                  <GridItem fontSize="25px" width="100%">
                    <Grid templateColumns="repeat(3, 1fr)" gap={2}>
                      <GridItem colSpan={1} justifySelf="end">
                        <Box pr="5px">
                          <Text>* ชื่อร้านค้า : </Text>
                        </Box>
                      </GridItem>
                      <GridItem colSpan={2}>
                        <InputGroup>
                          <Input
                            pr="100px"
                            type="text"
                            placeholder="ระบุชื่อร้านค้า"
                            borderColor={inputFieldError ? "red" : "gray.400"}
                            onChange={handleChangeNameShop}
                          />
                          <InputRightElement pr="45px">
                            <Text>{lengthNameShop}/100</Text>
                          </InputRightElement>
                        </InputGroup>
                        {inputFieldError && (
                          <Text fontSize={"sm"} color={"red"}>
                            *{inputFieldError}
                          </Text>
                        )}
                      </GridItem>
                      <GridItem colSpan={1} justifySelf="end">
                        <Box pr="5px">
                          <Text whiteSpace={"nowrap"}>
                            * รายละเอียดร้านค้า :{" "}
                          </Text>
                        </Box>
                      </GridItem>
                      <GridItem colSpan={2}>
                        <Box>
                          <InputGroup flexDirection="column-reverse">
                            <Textarea
                              h="100px"
                              isRequired
                              resize="none"
                              maxLength={3000}
                              borderColor={
                                textAreaFieldError ? "red" : "gray.400"
                              }
                              placeholder="ระบุรายละเอียดสินค้า"
                              pr="60px"
                              onChange={handleChangeDetailShop}
                            />
                            <InputRightElement
                              h="100%"
                              alignItems="end"
                              p="10px"
                            >
                              <Text pr="45px">{lengthDetailShop}/3000</Text>
                            </InputRightElement>
                          </InputGroup>
                          {textAreaFieldError && (
                            <Text fontSize={"sm"} color={"red"}>
                              *{textAreaFieldError}
                            </Text>
                          )}
                        </Box>
                      </GridItem>
                      <GridItem colSpan={1} justifySelf="end">
                        <Box pr="5px">
                          <Text>รูปโปรไฟล์ร้านค้า : </Text>
                        </Box>
                      </GridItem>
                      <GridItem colSpan={2}>
                        <Box>
                          <PicturesShop setFileImgShop={handleSetFileImgShop} />
                          {textImageShopError && (
                            <Text fontSize={"sm"} color={"red"}>
                              *{textImageShopError}
                            </Text>
                          )}
                          <Text fontSize={"sm"}>
                            ขนาดแนะนำ 250px X 250px ชนิดรูป: png, jpg, jpeg.
                          </Text>
                        </Box>
                      </GridItem>
                      <GridItem colSpan={1} justifySelf="end">
                        <Box pr="5px">
                          <Text>รูุปปกร้านค้า : </Text>
                        </Box>
                      </GridItem>
                      <GridItem colSpan={2}>
                        <Box>
                          <PicturesCoverShop
                            setFileImgCoverShop={handleSetFileImgCoverShop}
                          />
                          {textImageCoverShopError && (
                            <Text fontSize={"sm"} color={"red"}>
                              *{textImageCoverShopError}
                            </Text>
                          )}
                          <Text fontSize={"sm"}>
                            ขนาดแนะนำแนวนอน 450px X 200px ชนิดรูป: png, jpg,
                            jpeg.
                          </Text>
                        </Box>
                      </GridItem>
                      <GridItem colSpan={1} justifySelf="end">
                        <Box pr="5px">
                          <Text>* รูปแบบร้านค้า : </Text>
                        </Box>
                      </GridItem>
                      <GridItem colSpan={2}>
                        <Box>
                          <Select
                            placeholder="ค่าเริ่มต้น"
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
                    </Grid>
                  </GridItem>
                </Grid>
              </Box>
            </FormControl>
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            <Button
              onClick={modalPreview.onOpen}
              bgColor={"white"}
              color={"#ff0000"}
              border={"2px solid #ff0000"}
              height={"35px"}
              leftIcon={
                <Image src="/images/viewshop.png" h="15px" width={"25px"} />
              }
              mr={"10px"}
            >
              ดูตัวอย่าง
            </Button>
            <Button
              onClick={modalAdd.onClose}
              bgColor={"white"}
              color={"gray"}
              border={"2px solid gray"}
              px={"2rem"}
              height={"35px"}
              mr={"10px"}
            >
              ยกเลิก
            </Button>
            <Button
              onClick={handleClickNextStopAdd}
              bgColor={"#ff0000"}
              color={"white"}
              px={"2rem"}
              height={"35px"}
              disabled={isLoading}
            >
              ถัดไป
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* End Modal สร้างร้านค้า */}

      {/* Modal เลือกธีม */}
      <Modal
        closeOnOverlayClick={false}
        onClose={modalSelectTheme.onClose}
        size={"xl"}
        isOpen={modalSelectTheme.isOpen}
        scrollBehavior={"inside"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex justifyContent={"center"}>
              <Image
                src="/images/addshop.png"
                width={"40px"}
                height={"35px"}
                mr={"10px"}
              />
              <Text fontSize={"4xl"}>เลือกธีมร้านค้า</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton
            color={"white"}
            bgColor={"#ff0000"}
            borderRadius={"50px"}
            width={"20px"}
            height={"20px"}
            fontSize={"9px"}
          />
          <ModalBody>
            <RadioGroup defaultValue="0" onChange={setTheme}>
              <Grid templateColumns="repeat(2, 1fr)" gap={8}>
                <GridItem
                  border={"2px solid blue"}
                  padding={"0.5rem"}
                  borderRadius={"15px"}
                >
                  <Box textAlign={"center"}>
                    <Heading>สีขาว</Heading>
                    {/* <Image
                      borderRadius={"15px"}
                      src={
                        "https://shopee-api.deksilp.com/images/shopee/cover_img_shop/zC0vOKXtODAu7qb5YTeS4rYq9NTcJ3mmDpTm6Pxe.jpg"
                      }
                    /> */}
                    <Radio colorScheme="blue" value="0">
                      ธีมขาว
                    </Radio>
                  </Box>
                </GridItem>
                <GridItem
                  border={"2px solid gray"}
                  padding={"0.5rem"}
                  borderRadius={"15px"}
                >
                  <Box textAlign={"center"}>
                    <Heading>สีดำ</Heading>
                    {/* <Image
                      borderRadius={"15px"}
                      src={
                        "https://shopee-api.deksilp.com/images/shopee/cover_img_shop/zqCs2uwIQGr76ijJetmn44cofVs3vWhsmbXqtYTW.jpg"
                      }
                    /> */}
                    <Radio colorScheme="gray" value="1">
                      ธีมดำ
                    </Radio>
                  </Box>
                </GridItem>
              </Grid>
            </RadioGroup>
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            <Button
              onClick={modalSelectTheme.onClose}
              bgColor={"white"}
              color={"gray"}
              border={"2px solid gray"}
              px={"2rem"}
              height={"35px"}
              mr={"10px"}
            >
              ยกเลิก
            </Button>
            <Button
              onClick={handleNextModalSelectProduct}
              bgColor={"#ff0000"}
              color={"white"}
              px={"2rem"}
              height={"35px"}
              // disabled={isLoading}
            >
              ถัดไป
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* End Modal เลือกธีม */}

      {/* Modal Next step สร้างร้านค้า */}
      <Modal
        closeOnOverlayClick={false}
        onClose={modalAdd2.onClose}
        size="custom"
        isOpen={modalAdd2.isOpen}
        scrollBehavior={"inside"}
      >
        <ModalOverlay />
        <ModalContent width="800px" height="600px">
          <ModalHeader>
            <Flex justifyContent={"center"}>
              <Image
                src="/images/selectproduct.png"
                width={"40px"}
                height={"35px"}
                mr={"10px"}
              />
              <Text fontSize={"4xl"}>เลือกสินค้า</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton
            color={"white"}
            bgColor={"#ff0000"}
            borderRadius={"50px"}
            width={"20px"}
            height={"20px"}
            fontSize={"9px"}
          />
          <ModalBody>
            <TableContainer>
              <Table variant="striped" colorScheme="gray">
                <Thead bgColor={"#ff0000"}>
                  <Tr>
                    <Th color={"white"}>
                      <Checkbox
                        isChecked={
                          selectedProducts.length === getProducts.length
                        }
                        onChange={handleAllCheckboxChange}
                      ></Checkbox>
                    </Th>
                    <Th color={"white"}>รหัสสินค้า</Th>
                    <Th color={"white"}>รูปสินค้า</Th>
                    <Th color={"white"}>ชื่อสินค้า</Th>
                    <Th color={"white"}>ราคา</Th>
                    <Th color={"white"}>สต๊อกสินค้า</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {getProducts.map((getPro, index) => (
                    <Tr key={index}>
                      <Td>
                        <Checkbox
                          isChecked={selectedProducts.includes(getPro.id)}
                          onChange={() => handleCheckboxChange(getPro.id)}
                        />
                      </Td>
                      <Td>{getPro.sku}</Td>
                      <Td isNumeric>
                        <Image
                          src={
                            "https://shopee-api.deksilp.com/images/shopee/products/" +
                            getPro.img_product
                          }
                          height={"50px"}
                        />
                      </Td>
                      <Td>{getPro.name_product}</Td>
                      <Td>{getPro.price}</Td>
                      <Td>
                        <Flex alignItems={"center"}>
                          <NumberInput
                            defaultValue={getPro.stock}
                            min={0}
                            bgColor={"white"}
                            borderRadius="10px"
                            backgroundColor="white"
                            width="90px"
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                          / 1,500
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            <Button
              onClick={modalPreview.onOpen}
              bgColor={"white"}
              color={"#ff0000"}
              border={"2px solid #ff0000"}
              height={"35px"}
              leftIcon={
                <Image src="/images/viewshop.png" h="15px" width={"25px"} />
              }
              mr={"10px"}
            >
              ดูตัวอย่าง
            </Button>
            <Button
              onClick={modalAdd2.onClose}
              bgColor={"white"}
              color={"gray"}
              border={"2px solid gray"}
              px={"2rem"}
              height={"35px"}
              mr={"10px"}
            >
              ยกเลิก
            </Button>
            <Button
              onClick={handleConfirm}
              bgColor={"#ff0000"}
              color={"white"}
              px={"2rem"}
              height={"35px"}
            >
              สร้างร้านค้า
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* End Modal Next step สร้างร้านค้า */}

      {/* Modal Preview สร้างร้านค้า */}
      <Modal
        closeOnOverlayClick={false}
        onClose={modalPreview.onClose}
        size={"md"}
        isOpen={modalPreview.isOpen}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton
            color={"white"}
            bgColor={"#ff0000"}
            borderRadius={"50px"}
            width={"20px"}
            height={"20px"}
            fontSize={"9px"}
          />
          <ModalBody paddingStart={"4rem"} paddingEnd={"4rem"}>
            <div className="swiper-container">
              <Swiper
                onSwiper={setSwiper}
                navigation={{
                  prevEl: ".swiper-button-prev",
                  nextEl: ".swiper-button-next",
                }}
                pagination={{
                  el: ".swiper-pagination",
                  clickable: true,
                }}
              >
                <SwiperSlide>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Image src={"/images/previewShop.jpg"} height={"33rem"} />
                  </Box>
                </SwiperSlide>
                <SwiperSlide>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Image src={"/images/previewShop.jpg"} height={"33rem"} />
                  </Box>
                </SwiperSlide>
                <SwiperSlide>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Image src={"/images/previewShop.jpg"} height={"33rem"} />
                  </Box>
                </SwiperSlide>
                <SwiperSlide>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Image src={"/images/previewShop.jpg"} height={"33rem"} />
                  </Box>
                </SwiperSlide>
                <SwiperSlide>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Image src={"/images/previewShop.jpg"} height={"33rem"} />
                  </Box>
                </SwiperSlide>
              </Swiper>
              <IconButton
                position="absolute"
                top="50%"
                left="10px"
                transform="translateY(-50%)"
                aria-label="Previous"
                background={"#edf2f700"}
                borderRadius={"50px"}
                fontSize={"30px"}
                border={"2px solid"}
                icon={<ChevronLeftIcon />}
                onClick={goPrev}
              />
              <IconButton
                position="absolute"
                top="50%"
                right="10px"
                transform="translateY(-50%)"
                aria-label="Next"
                background={"#edf2f700"}
                borderRadius={"50px"}
                fontSize={"30px"}
                border={"2px solid"}
                icon={<ChevronRightIcon />}
                onClick={goNext}
              />
              <div className="swiper-pagination"></div>
            </div>
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            <Button
              onClick={modalPreview.onClose}
              bgColor={"#ff0000"}
              color={"white"}
              px={"2rem"}
              height={"35px"}
            >
              ปิด
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* End Modal Preview สร้างร้านค้า */}

      {/* Modal confirm สร้างร้านค้า */}
      <Modal
        closeOnOverlayClick={false}
        onClose={modalConfirm.onClose}
        size={"lg"}
        isOpen={modalConfirm.isOpen}
      >
        <ModalOverlay />
        <ModalContent top={"20%"}>
          <ModalHeader></ModalHeader>
          <ModalCloseButton
            color={"white"}
            bgColor={"#ff0000"}
            borderRadius={"50px"}
            width={"20px"}
            height={"20px"}
            fontSize={"9px"}
          />
          <ModalBody>
            <Flex flexDirection={"column"} alignItems={"center"}>
              <Image
                src="/images/addshop.png"
                width={"150px"}
                // height={"35px"}
                mr={"10px"}
              />
              <Text fontSize={"5xl"} fontWeight={"bold"} mt={"20px"}>
                ยืนยันการสร้างร้านค้า
              </Text>
            </Flex>
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            <Button
              onClick={modalConfirm.onClose}
              bgColor={"white"}
              color={"gray"}
              border={"2px solid gray"}
              px={"2rem"}
              height={"35px"}
              mr={"10px"}
            >
              ยกเลิก
            </Button>
            <Button
              onClick={handleConfirmSuccess}
              bgColor={"#ff0000"}
              color={"white"}
              px={"2rem"}
              height={"35px"}
            >
              ยืนยัน
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* End Modal confirm สร้างร้านค้า */}

      {/* Modal confirm success สร้างร้านค้า */}
      <Modal
        closeOnOverlayClick={false}
        onClose={modalConfirmSuccess.onClose}
        size={"lg"}
        isOpen={modalConfirmSuccess.isOpen}
      >
        <ModalOverlay />
        <ModalContent top={"20%"}>
          <ModalHeader></ModalHeader>
          <ModalCloseButton
            color={"white"}
            bgColor={"#ff0000"}
            borderRadius={"50px"}
            width={"20px"}
            height={"20px"}
            fontSize={"9px"}
          />
          <ModalBody>
            <Flex flexDirection={"column"} alignItems={"center"}>
              <Image
                src="/images/checkshop.png"
                width={"130px"}
                // height={"35px"}
                mr={"10px"}
              />
              <Text fontSize={"5xl"} fontWeight={"bold"} mt={"20px"}>
                สร้างร้านค้าเสร็จสิ้น
              </Text>
            </Flex>
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            <Button
              onClick={modalConfirmSuccess.onClose}
              bgColor={"#ff0000"}
              color={"white"}
              px={"2rem"}
              height={"35px"}
            >
              ไปที่หน้าร้านค้า
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* End Modal confirm success สร้างร้านค้า */}
    </>
  );
}
