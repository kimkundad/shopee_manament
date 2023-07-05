import React, { useState, useEffect } from "react";
import FormData from "form-data";
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
  Stack,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider,
} from "@chakra-ui/react";
import CardShop from "@/components/cardShop";
import Axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import * as yup from "yup";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  AddIcon,
  TriangleDownIcon,
} from "@chakra-ui/icons";
import { connect, useDispatch, useSelector } from "react-redux";

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
  const userInfo = useSelector((App) => App.userInfo);
  const userAuthen = useSelector((App) => App.authen);
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
  const modalCreateCategory = useDisclosure();
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
  const [checkInputCategory, setCheckInputCategory] = useState(true);
  const [Theme, setTheme] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // เป็นฟังก์ชันและตัวแปรในการเก็บค่ารูปร้านค้า โดยส่ง ฟังก์ชันเพื่อไปเก็บค่าใน component PicturesShop
  const [fileImgShop, setFileImgShop] = useState([]);
  const handleSetFileImgShop = (fileList) => {
    setFileImgShop(fileList);
  };
  // สิ้นสุด ฟังก์ชันและตัวแปรในการเก็บค่ารูปร้านค้า โดยส่ง ฟังก์ชันเพื่อไปเก็บค่าใน component PicturesShop

  // เป็นฟังก์ชันและตัวแปรในการเก็บค่ารูปปกร้านค้า โดยส่ง ฟังก์ชันเพื่อไปเก็บค่าใน component PicturesCoverShop
  const [fileImgCoverShop, setFileImgCoverShop] = useState([]);
  const handleSetFileImgCoverShop = (fileList) => {
    setFileImgCoverShop(fileList);
  };
  // สิ้นสุด ฟังก์ชันและตัวแปรในการเก็บค่ารูปปกร้านค้า โดยส่ง ฟังก์ชันเพื่อไปเก็บค่าใน component PicturesCoverShop

  // ฟังก์ชัน validate form กรอกข้อมูลร้านค้า ชื่อ รายละเอียด รูปร้านค้า รูปปกร้านค้า และเปิด modal ถัดไปและปิด modal
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
      modalAdd2.onOpen();
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
  // สิ้นสุด ฟังก์ชัน validate form กรอกข้อมูลร้านค้า ชื่อ รายละเอียด รูปร้านค้า รูปปกร้านค้า และเปิด modal ถัดไปและปิด modal

  // ฟังก์ชัน กดถัดไปยัง modal เลือกธีม โดยก่อนจะถัดไป มีการตรวจสอบว่าได้กรอกข้อมูล หมวดหมู่แล้วหรือยัง ถ้ายังไม่ได้กรอก ไม่สามารถไป modal ถัดได้
  const handleNextModalSelectTheme = () => {
    modalAdd2.onClose();
    modalSelectTheme.onOpen();
    // const isEmpty = tags.filter((tag) => tag === "");
    // console.log("isEmpty", isEmpty);
    // console.log("tags", tags);
    // if (tags.length == 0) {
    //   setCheckInputCategory(false);
    // } else {
    //   if (isEmpty.length > 0) {
    //     setCheckInputCategory(false);
    //   } else {
    //     modalCreateCategory.onClose();
    //     modalSelectTheme.onOpen();
    //   }
    // }
  };
  // สิ้นสุด ฟังก์ชัน กดถัดไปยัง modal เลือกธีม โดยก่อนจะถัดไป มีการตรวจสอบว่าได้กรอกข้อมูล หมวดหมู่แล้วหรือยัง ถ้ายังไม่ได้กรอก ไม่สามารถไป modal ถัดได้

  // ฟังก์ชัน modal แสดงว่าจะยืนยันการสร้างร้านค้าใช่หือไม่
  const handleNextModalConfirm = () => {
    // console.log("Theme:", Theme);
    modalSelectTheme.onClose();
    modalAdd2.onOpen();
  };
  // สิ้นสุด modal แสดงว่าจะยืนยันการสร้างร้านค้าใช่หือไม่

  const handleConfirm = () => {
    // console.log("selectedProducts", selectedProducts);
    modalSelectTheme.onClose();
    modalConfirm.onOpen();
  };

  // ฟังก์ชัน สร้างร้านค้าส่งค่าหรือยิง api ไปหลังบ้านเพื่อสร้างร้านค้า
  const handleConfirmSuccess = () => {
    // get selected products
    const selected = getProducts.filter((product) =>
      selectedProducts.includes(product.id)
    );

    const formData = new FormData();
    formData.append("nameShop", nameShop);
    formData.append("detailShop", detailShop);
    formData.append("code_user", userInfo.data[0].code_user);
    fileImgShop.forEach((file, index) => {
      formData.append(`file[${index}]`, file.originFileObj);
    });
    fileImgCoverShop.forEach((file, index) => {
      formData.append(`file2[${index}]`, file.originFileObj);
    });
    // tags.forEach((tag, index) => {
    //   formData.append(`category[${index}]`, tag);
    // });
    selected.forEach((select, index) => {
      formData.append(`selectID[${index}]`, select.id);
    });
    formData.append("themeShop", Theme);

    Axios.post("https://api.sellpang.com/api/createShop", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userAuthen.token}`,
      },
    }).then(function (response) {
      if (response.data.success) {
        modalConfirm.onClose();
        modalConfirmSuccess.onOpen();
        fetchAllShops();
        setNameShop("")
        setDetailShop("")
        setFileImgShop([])
        setFileImgCoverShop([])
        setSelectedProducts([])
        setTheme(0)
      }
    });
  };
  // สิ้นสุด ฟังก์ชัน สร้างร้านค้าส่งค่าหรือยิง api ไปหลังบ้านเพื่อสร้างร้านค้า

  // ฟังก์ชัน เรียกข้อมูลร้านค้าใหม่ทั้งหมดที่ส่งมาจากหลังบ้าน
  const fetchAllShops = async () => {
    const formData = new FormData();
    formData.append("code_user", userInfo.data[0].code_user);
    Axios.post("https://api.sellpang.com/api/getAllShops", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(function (response) {
      setShops(response.data.shops);
    });
  };

  useEffect(() => {
    const formData = new FormData();
    formData.append("code_user", userInfo.data[0].code_user);
    Axios.post("https://api.sellpang.com/api/getAllProduct", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(function (response) {
      setProducts(response.data.product);
    });
  }, []);
  // สิ้นสุด ฟังก์ชัน เรียกข้อมูลร้านค้าใหม่ทั้งหมดที่ส่งมาจากหลังบ้าน

  useEffect(() => {
    fetchAllShops();
    setStatusDelete(false);
  }, [statusDelete]);

  // ฟังก์ชัน ค้นหาข้อมูลร้านค้า filter ตามวันที่ และ filter ตามตัวอักษร
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
        `https://api.sellpang.com/api/getSearchShops?search=${query}&ucode=${userInfo.data[0].code_user}`
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
        `https://api.sellpang.com/api/getSearchDateShops?search=${searchDateShops}&ucode=${userInfo.data[0].code_user}`
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
        `https://api.sellpang.com/api/getFilterShops?type=${filterShops}&ucode=${userInfo.data[0].code_user}`
      );
      setShops(response.data.shops);
    };

    if (filterShops !== "") {
      fetchData();
    }
  }, [filterShops]);
  // สิ้นสุด ฟังก์ชัน ค้นหาข้อมูลร้านค้า filter ตามวันที่ และ filter ตามตัวอักษร

  //------count name shop /100 ฿฿ เก็บค่าชื่อร้านค้า------------------
  const [lengthNameShop, setLengthNameShop] = useState(0);
  const [nameShop, setNameShop] = useState("");
  const handleChangeNameShop = (e) => {
    const NameShop = e.target.value;
    setLengthNameShop(NameShop.length);
    setNameShop(NameShop);
    setInputFieldError("");
  };
  //------------------------------------------------------------

  //-------count detail shop /3000 && เก็บค่ารายละเอียดร้านค้า--------
  const [lengthDetailShop, setLengthDetailShop] = useState(0);
  const [detailShop, setDetailShop] = useState("");
  const handleChangeDetailShop = (e) => {
    const DetailShop = e.target.value;
    setLengthDetailShop(DetailShop.length);
    setDetailShop(DetailShop);
    setTextAreaFieldError("");
  };
  //------------------------------------------------------------

  // ฟังก์ชันนี้เป็นฟังก์ชันเลือกสินค้า ซึ่ง ณ ตอนนี้ใช้
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
  // สิ้นสุด ฟังก์ชันนี้เป็นฟังก์ชันเลือกสินค้า ซึ่ง ณ ตอนนี้ใช้

  // const [swiper, setSwiper] = useState(null);

  // const goPrev = () => {
  //   if (swiper) {
  //     swiper.slidePrev();
  //   }
  // };

  // const goNext = () => {
  //   if (swiper) {
  //     swiper.slideNext();
  //   }
  // };

  //------------------- function เพิ่มหมวดหมู่ -----------------
  // ตัวแปรเพิ่ม tag input กรอกข้อมูล หมวดหมู่
  const [tags, setTags] = useState([]);

  // ฟังก์ชันเพิ่ม tag input หมวดหมู่
  const handleAddTag = (event) => {
    event.preventDefault();
    setTags([...tags, ""]);
  };

  // ฟังก์ชันลบ tag input หมวดหมู่
  const handleDeleteTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  // ฟังก์ชันเก็บค่าใส่ในตัวแปร input หมวดหมู่
  const handleTagInputChange = (event, index) => {
    const newTags = [...tags];
    newTags[index] = event.target.value;
    setTags(newTags);
    setCheckInputCategory(true);
  };
  //-------------------------------------------------------------

  const handleCategorySelect = (selected) => {
    const updatedSelectedCategories = [...selected];
    setSelectedCategories(updatedSelectedCategories);
    // console.log("Selected categories:", updatedSelectedCategories);
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
      <Box pt="5px" pb={"5px"} pl={"60px"}>
        {/* <Flex flexWrap={"wrap"} justifyContent={"space-around"}> */}
        <CardShop
          Products={getProducts}
          Shops={getShops}
          statusDelete={setStatusDelete}
        />
        {/* </Flex> */}
      </Box>

      {/* Modal สร้างร้านค้า */}
      <Modal
        closeOnOverlayClick={false}
        onClose={modalAdd.onClose}
        size={"xl"}
        isOpen={modalAdd.isOpen}
        // scrollBehavior={'inside'}
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
                    </Grid>
                  </GridItem>
                </Grid>
              </Box>
            </FormControl>
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            {/* <Button
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
            </Button> */}
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

      {/* Modal สร้างหมวดหมู่ */}
      <Modal
        closeOnOverlayClick={false}
        onClose={modalCreateCategory.onClose}
        size={"xl"}
        isOpen={modalCreateCategory.isOpen}
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
              <Text fontSize={"4xl"}>สร้างหมวดหมู่ร้านค้า</Text>
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
            <Flex>
              <Text fontSize={"25px"}>* หมวดหมู่ร้านค้า</Text>
              <Button
                ml={"10px"}
                bgColor={"green"}
                color={"white"}
                fontSize={"20px"}
                leftIcon={
                  <Image src="/images/pluswhite.png" h="13px" w="13px" />
                }
                onClick={handleAddTag}
              >
                เพิ่ม
              </Button>
            </Flex>
            {checkInputCategory === false && (
              <Text fontSize={"lg"} color={"red"}>
                *กรุณากรอกข้อมูลหมวดหมู่
              </Text>
            )}
            {tags.map((tag, index) => (
              <Box mt={"15px"} key={index}>
                <Flex>
                  <Input
                    border={
                      checkInputCategory ? "1px solid gray" : "1px solid red"
                    }
                    type="text"
                    value={tag}
                    onChange={(event) => handleTagInputChange(event, index)}
                  />
                  <Button
                    ml={"10px"}
                    bgColor={"#ff0000"}
                    color={"white"}
                    onClick={() => handleDeleteTag(index)}
                  >
                    <Image
                      src="/images/pluswhite.png"
                      transform={"rotate(55deg)"}
                      h="15px"
                      w="15px"
                    />
                  </Button>
                </Flex>
              </Box>
            ))}
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            <Button
              onClick={modalCreateCategory.onClose}
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
              onClick={handleNextModalSelectTheme}
              bgColor={"#ff0000"}
              color={"white"}
              px={"2rem"}
              height={"35px"}
              disabled={checkInputCategory}
            >
              ถัดไป
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* End Modal สร้างหมวดหมู่ */}

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
                <GridItem textAlign={"center"}>
                  <Box
                    border={Theme == 0 ? "2px solid blue" : ""}
                    borderRadius={Theme == 0 ? "20px" : ""}
                    padding={Theme == 0 ? "0.75rem" : ""}
                  >
                    <Image
                      borderRadius={"15px"}
                      src={"/images/themeshoppeewhite.jpg"}
                    />
                  </Box>
                  <Radio colorScheme="blue" value="0">
                    ธีมขาว
                  </Radio>
                </GridItem>
                <GridItem textAlign={"center"}>
                  <Box
                    border={Theme == 1 ? "2px solid gray" : ""}
                    borderRadius={Theme == 1 ? "20px" : ""}
                    padding={Theme == 1 ? "0.75rem" : ""}
                  >
                    <Image
                      borderRadius={"15px"}
                      src={"/images/themeshoppeewhite.jpg"}
                    />
                  </Box>
                  <Radio colorScheme="gray" value="1">
                    ธีมดำ
                  </Radio>
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
              onClick={handleConfirm}
              bgColor={"#ff0000"}
              color={"white"}
              px={"2rem"}
              height={"35px"}
              // disabled={isLoading}
            >
              สร้างร้านค้า
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
        <ModalContent width="1000px" height="600px">
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
                  {getProducts.map((getPro, index) => {
                    let nameProduct = getPro.name_product;
                    if (nameProduct.length > 20) {
                      nameProduct = nameProduct.substring(0, 20) + "...";
                    }
                    return (
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
                              "https://api.sellpang.com/images/shopee/products/" +
                              getPro.img_product
                            }
                            height={"50px"}
                          />
                        </Td>
                        <Td>{nameProduct}</Td>
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
                            / {getPro.stock}
                          </Flex>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            {/* <Button
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
            </Button> */}
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
              onClick={handleNextModalSelectTheme}
              bgColor={"#ff0000"}
              color={"white"}
              px={"2rem"}
              height={"35px"}
            >
              ถัดไป
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* End Modal Next step สร้างร้านค้า */}

      {/* Modal Preview สร้างร้านค้า */}
      {/* <Modal
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
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              position={"relative"}
              zIndex={"1"}
            >
              <Image src={"/images/13promax.png"} height={"32rem"} />
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              position={"absolute"}
              zIndex={"-1"}
              top={"52px"}
              left={"111px"}
            >
              <Box height={"121px"} width={"227px"}>
                <Image
                  src={fileImgCoverShop[0]?.thumbUrl}
                  objectFit="cover"
                  width="100%"
                  height="100%"
                />
              </Box>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              position={"absolute"}
              zIndex={"-1"}
              top={"115px"}
              left={"120px"}
            >
              <Image
                src={fileImgShop[0]?.thumbUrl}
                width={"50px"}
                height={"50px"}
                borderRadius={"50px"}
                border={"2px solid white"}
              />
            </Box>
            <Box
              position={"absolute"}
              zIndex={"-1"}
              top={"85px"}
              left={"120px"}
            >
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  ml={"5px"}
                  left={"-12px"}
                  top={"-12px"}
                >
                  <Image src="/images/search.png" h="10px" w="10px" />
                </InputLeftElement>
                <Input
                  borderRadius="3xl"
                  type="text"
                  fontSize="10px"
                  borderColor="gray.500"
                  bgColor="#FFFFFF"
                  height="16px"
                  width="155px"
                  paddingLeft="27px"
                  paddingTop="3px"
                  placeholder="ค้นหา"
                />
              </InputGroup>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              position={"absolute"}
              zIndex={"-1"}
              top={"86px"}
              right={"122px"}
            >
              <Image
                src="/images/cart.png"
                width={"15px"}
                marginRight={"7px"}
                backgroundColor={"white"}
                padding={"2px"}
                borderRadius={"50px"}
              />
              <Image src="/images/user.png" width={"15px"} />
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              position={"absolute"}
              zIndex={"-1"}
              top={"125px"}
              left={"180px"}
              fontSize={"13px"}
            >
              <Text as={"b"} color={"white"} mr={"5px"}>
                {nameShop}
              </Text>
              <Button
                bgColor={"white"}
                padding={"0.15rem"}
                height={"11px"}
                fontSize={"8px"}
                leftIcon={<Image src="/images/chat.png" width={"10px"} />}
              >
                แชทร้านค้า
              </Button>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              position={"absolute"}
              zIndex={"-1"}
              fontSize={"14px"}
              top={"150px"}
              left={"180px"}
            >
              <Button
                bgColor={"#00000085"}
                color={"white"}
                padding={"0.15rem"}
                height={"10px"}
                fontSize={"8px"}
                leftIcon={<Image src="/images/star2.png" width={"8px"} />}
                mr={"5px"}
              >
                4.8/5.0
              </Button>
              <Button
                bgColor={"#ff0000"}
                color={"white"}
                padding={"0.15rem"}
                height={"10px"}
                fontSize={"8px"}
              >
                ร้านแนะนำ
              </Button>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              position={"absolute"}
              zIndex={"-1"}
              top={"175px"}
              left={"105px"}
            >
              <Box
                alignSelf="end"
                px="15px"
                flex="1"
                textAlign="center"
                whiteSpace="nowrap"
                borderBottom="2px"
                borderColor="red"
              >
                <Text fontWeight="bold" fontSize={"12px"}>
                  สินค้าทั้งหมด
                </Text>
              </Box>
              <Box
                alignSelf="end"
                px="15px"
                flex="1"
                textAlign="center"
                whiteSpace="nowrap"
                borderBottom="1px"
                borderColor="gray.300"
              >
                <Text fontWeight="bold" fontSize={"12px"}>
                  ของใช้ภายในบ้าน
                </Text>
              </Box>
              <Box
                alignSelf="end"
                px="15px"
                flex="1"
                textAlign="center"
                whiteSpace="nowrap"
                borderBottom="1px"
                borderColor="gray.300"
              >
                <Text fontWeight="bold" fontSize={"12px"}>
                  เสื้อผ้าแฟชั่น
                </Text>
              </Box>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              position={"absolute"}
              zIndex={"1"}
              top={"206px"}
              left={"119px"}
            >
              <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                <GridItem>
                  <Card
                    maxW="sm"
                    width={"101px"}
                    height={"134px"}
                    boxShadow="md"
                  >
                    <CardBody padding={"5px"} position={"relative"}>
                      <Image
                        height={"62px"}
                        width={"100%"}
                        src="https://api.sellpang.com/images/shopee/products/7k2ldlmlvyZ17a3oMOPlwggkU74SQCmXj39G3DIR.jpg"
                        alt="Green double couch with wooden legs"
                        borderRadius="lg"
                      />
                      <Stack mt={"5px"} spacing="1">
                        <Heading fontSize={"8px"} textAlign={"center"}>
                          นาฬิกา ROLEX
                        </Heading>
                        <Text fontSize={"8px"}>
                          This sofa is perfect for modern tropical spaces
                        </Text>
                      </Stack>
                      <Box>
                        <Flex justifyContent={"space-between"}>
                          <Box mt={"8px"}>
                            <Flex>
                              <Image src="/images/star2.png" width={"5px"} />
                              <Image src="/images/star2.png" width={"5px"} />
                              <Image src="/images/star2.png" width={"5px"} />
                              <Image src="/images/star2.png" width={"5px"} />
                              <Image src="/images/star2.png" width={"5px"} />
                            </Flex>
                            <Text fontSize={"5px"}>ขายไปล้ว 369 ชิ้น</Text>
                          </Box>
                          <Box>
                            <Button
                              bgColor={"#ff0000"}
                              color={"white"}
                              padding={"0"}
                              height={"10px"}
                              fontSize={"13px"}
                              position={"relative"}
                            >
                              290.-
                            </Button>
                            <Text
                              fontSize={"7px"}
                              textDecoration={"line-through"}
                              position={"absolute"}
                              right={"7px"}
                              bottom={"21px"}
                            >
                              ราคาปกติ 490.-
                            </Text>
                          </Box>
                        </Flex>
                      </Box>
                    </CardBody>
                    <Button
                      position={"absolute"}
                      width={"30px"}
                      height={"10px"}
                      fontSize={"8px"}
                      bgColor={"#ff0000"}
                      color={"white"}
                      top={"-5px"}
                      right={"-5px"}
                    >
                      ลด 27%
                    </Button>
                  </Card>
                </GridItem>
                <GridItem>
                  <Card
                    maxW="sm"
                    width={"101px"}
                    height={"134px"}
                    boxShadow="md"
                  >
                    <CardBody padding={"5px"} position={"relative"}>
                      <Image
                        height={"62px"}
                        width={"100%"}
                        src="https://api.sellpang.com/images/shopee/products/rTz62XhqqVPe9KVBjkDjqo1M1M7xAgPK7jbpAjGP.jpg"
                        alt="Green double couch with wooden legs"
                        borderRadius="lg"
                      />
                      <Stack mt={"5px"} spacing="1">
                        <Heading fontSize={"8px"} textAlign={"center"}>
                          เสื้อคลุม Korea
                        </Heading>
                        <Text fontSize={"8px"}>
                          This sofa is perfect for modern tropical spaces
                        </Text>
                      </Stack>
                      <Box>
                        <Flex justifyContent={"space-between"}>
                          <Box mt={"8px"}>
                            <Flex>
                              <Image src="/images/star2.png" width={"5px"} />
                              <Image src="/images/star2.png" width={"5px"} />
                              <Image src="/images/star2.png" width={"5px"} />
                              <Image src="/images/star2.png" width={"5px"} />
                              <Image src="/images/star2.png" width={"5px"} />
                            </Flex>
                            <Text fontSize={"5px"}>ขายไปล้ว 369 ชิ้น</Text>
                          </Box>
                          <Box>
                            <Button
                              bgColor={"#ff0000"}
                              color={"white"}
                              padding={"0"}
                              height={"10px"}
                              fontSize={"13px"}
                              position={"relative"}
                            >
                              290.-
                            </Button>
                            <Text
                              fontSize={"7px"}
                              textDecoration={"line-through"}
                              position={"absolute"}
                              right={"7px"}
                              bottom={"21px"}
                            >
                              ราคาปกติ 490.-
                            </Text>
                          </Box>
                        </Flex>
                      </Box>
                    </CardBody>
                    <Button
                      position={"absolute"}
                      width={"30px"}
                      height={"10px"}
                      fontSize={"8px"}
                      bgColor={"#ff0000"}
                      color={"white"}
                      top={"-5px"}
                      right={"-5px"}
                    >
                      ลด 27%
                    </Button>
                  </Card>
                </GridItem>
                <GridItem>
                  <Card
                    maxW="sm"
                    width={"101px"}
                    height={"134px"}
                    boxShadow="md"
                  >
                    <CardBody padding={"5px"} position={"relative"}>
                      <Image
                        height={"62px"}
                        width={"100%"}
                        src="https://api.sellpang.com/images/shopee/products/FbkeB0WtBsLQUJtlIvAoGCmaf4bFP9REvY4IA7hw.jpg"
                        alt="Green double couch with wooden legs"
                        borderRadius="lg"
                      />
                      <Stack mt={"5px"} spacing="1">
                        <Heading fontSize={"8px"} textAlign={"center"}>
                          เสื้อคลุม Korea
                        </Heading>
                        <Text fontSize={"8px"}>
                          This sofa is perfect for modern tropical spaces
                        </Text>
                      </Stack>
                      <Box>
                        <Flex justifyContent={"space-between"}>
                          <Box mt={"7px"}>
                            <Flex>
                              <Image src="/images/star2.png" width={"5px"} />
                              <Image src="/images/star2.png" width={"5px"} />
                              <Image src="/images/star2.png" width={"5px"} />
                              <Image src="/images/star2.png" width={"5px"} />
                              <Image src="/images/star2.png" width={"5px"} />
                            </Flex>
                            <Text fontSize={"5px"}>ขายไปล้ว 369 ชิ้น</Text>
                          </Box>
                          <Box>
                            <Button
                              bgColor={"#ff0000"}
                              color={"white"}
                              padding={"0"}
                              height={"10px"}
                              fontSize={"13px"}
                              position={"relative"}
                            >
                              290.-
                            </Button>
                            <Text
                              fontSize={"7px"}
                              textDecoration={"line-through"}
                              position={"absolute"}
                              right={"7px"}
                              bottom={"21px"}
                            >
                              ราคาปกติ 490.-
                            </Text>
                          </Box>
                        </Flex>
                      </Box>
                    </CardBody>
                    <Button
                      position={"absolute"}
                      width={"30px"}
                      height={"10px"}
                      fontSize={"8px"}
                      bgColor={"#ff0000"}
                      color={"white"}
                      top={"-5px"}
                      right={"-5px"}
                    >
                      ลด 27%
                    </Button>
                  </Card>
                </GridItem>
                <GridItem>
                  <Card
                    maxW="sm"
                    width={"101px"}
                    height={"134px"}
                    boxShadow="md"
                  >
                    <CardBody padding={"5px"} position={"relative"}>
                      <Image
                        height={"62px"}
                        width={"100%"}
                        src="https://api.sellpang.com/images/shopee/products/MjDW7GIFILiO6yNSdmtaYHjMHRMHKTnXxBXgt8ez.jpg"
                        alt="Green double couch with wooden legs"
                        borderRadius="lg"
                      />
                      <Stack mt={"5px"} spacing="1">
                        <Heading fontSize={"8px"} textAlign={"center"}>
                          สายเดี่ยวลูกไม้
                        </Heading>
                        <Text fontSize={"8px"}>
                          This sofa is perfect for modern tropical spaces
                        </Text>
                      </Stack>
                      <Box>
                        <Flex justifyContent={"space-between"}>
                          <Box mt={"8px"}>
                            <Flex>
                              <Image src="/images/star2.png" width={"5px"} />
                              <Image src="/images/star2.png" width={"5px"} />
                              <Image src="/images/star2.png" width={"5px"} />
                              <Image src="/images/star2.png" width={"5px"} />
                              <Image src="/images/star2.png" width={"5px"} />
                            </Flex>
                            <Text fontSize={"5px"}>ขายไปล้ว 369 ชิ้น</Text>
                          </Box>
                          <Box>
                            <Button
                              bgColor={"#ff0000"}
                              color={"white"}
                              padding={"0"}
                              height={"10px"}
                              fontSize={"13px"}
                              position={"relative"}
                            >
                              290.-
                            </Button>
                            <Text
                              fontSize={"7px"}
                              textDecoration={"line-through"}
                              position={"absolute"}
                              right={"7px"}
                              bottom={"21px"}
                            >
                              ราคาปกติ 490.-
                            </Text>
                          </Box>
                        </Flex>
                      </Box>
                    </CardBody>
                    <Button
                      position={"absolute"}
                      width={"30px"}
                      height={"10px"}
                      fontSize={"8px"}
                      bgColor={"#ff0000"}
                      color={"white"}
                      top={"-5px"}
                      right={"-5px"}
                    >
                      ลด 27%
                    </Button>
                  </Card>
                </GridItem>
              </Grid>
            </Box>
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
      </Modal> */}
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
