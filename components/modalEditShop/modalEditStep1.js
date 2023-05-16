import React, { useLayoutEffect, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
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
  IconButton,
  Stack,
  Divider,
  CardFooter,
  ButtonGroup,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import Axios from "axios";
import * as yup from "yup";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { Scrollbars } from "react-scrollbars-custom";

SwiperCore.use([Navigation, Pagination]);

const schema = yup.object().shape({
  inputField: yup.string().required("กรุณากรอกขื่อร้านค้า"),
  textAreaField: yup.string().required("กรุณากรอกรายละเอียดร้านค้า"),
  fileField: yup.mixed().required("กรุณาเพิ่มรูปโปรไฟล์ร้านค้า"),
  fileCoverField: yup.mixed().required("กรุณาเพิ่มรูปภาพพื้นหลังร้านค้า"),
});
class PicturesShop extends React.Component {
  state = {
    fileList: [
      {
        uid: "-1",
        name: this.props.nameImgShop,
        status: "done",
        url: `https://api.sellpang.com/images/shopee/shop/${this.props.nameImgShop}`,
      },
    ],
  };
  handleChange = ({ fileList }) => {
    this.props.setEditFileImgShop(fileList);
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
    fileList: [
      {
        uid: "-1",
        name: this.props.nameImgCoverShop,
        status: "done",
        url: `https://api.sellpang.com/images/shopee/cover_img_shop/${this.props.nameImgCoverShop}`,
      },
    ],
  };
  handleChange = ({ fileList }) => {
    this.props.setEditFileImgCoverShop(fileList);
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

function modalEditStep1(props) {
  const { isOpen, onClose, Shops, statusEdit, Products } = props;
  const modalCreateCategory = useDisclosure();
  const modalEditNextStep = useDisclosure();
  const modalConfirmEdit = useDisclosure();
  const modalConfirmEditSuccess = useDisclosure();
  const modalPreview = useDisclosure();
  const modalEditTheme = useDisclosure();
  const [editNameShop, setEditNameShop] = useState(Shops.name_shop);
  const [editDetailShop, setEditDetailShop] = useState(Shops.detail_shop);
  const [Theme, setTheme] = useState(Shops.theme);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [editNameShopLength, setEditNameShopLength] = useState(
    Shops.name_shop.length
  );
  const [editDetailShopLength, setEditDetailShopLength] = useState(
    Shops.detail_shop.length
  );
  const [shopID, setShopID] = useState(Shops.id);
  const [isLoading, setIsLoading] = useState(false);
  const [inputFieldError, setInputFieldError] = useState("");
  const [textAreaFieldError, setTextAreaFieldError] = useState("");
  const [textImageShopError, setTextImageShopError] = useState("");
  const [textImageCoverShopError, setTextImageCoverShopError] = useState("");
  const [listProduct, setListProduct] = useState([]);
  const [checkInputCategory, setCheckInputCategory] = useState(true);
  // ตัวแปรเพิ่ม tag input กรอกข้อมูล หมวดหมู่
  const [tags, setTags] = useState([]);

  const imageShopCheck = [
    {
      uid: "-1",
      name: Shops.img_shop,
      status: "done",
      url: `https://api.sellpang.com/images/shopee/shop/${Shops.img_shop}`,
    },
  ];

  const imageCoverShopCheck = [
    {
      uid: "-1",
      name: Shops.cover_img_shop,
      status: "done",
      url: `https://api.sellpang.com/images/shopee/cover_img_shop/${Shops.cover_img_shop}`,
    },
  ];

  const [editFileImgShop, setEditFileImgShop] = useState(imageShopCheck);
  const handleSetEditFileImgShop = (fileList) => {
    setEditFileImgShop(fileList);
    console.log("edit shop image", editFileImgShop);
  };

  const [editFileImgCoverShop, setEditFileImgCoverShop] =
    useState(imageCoverShopCheck);
  const handleSetEditFileImgCoverShop = (fileList) => {
    setEditFileImgCoverShop(fileList);
  };

  const fetchListProduct = async () => {
    Axios.get(
      "https://api.sellpang.com/api/getListProduct/" + shopID
    ).then(function (response) {
      if (response.data.success) {
        setListProduct(response.data.list_products);
      }
    });
  };

  useEffect(() => {
    fetchListProduct();
  }, []);

  const onChangeNameShop = (e) => {
    const nameShop = e.target.value;
    setEditNameShop(nameShop);
    setEditNameShopLength(nameShop.length);
    setInputFieldError("");
  };

  const onChangeDetailShop = (e) => {
    const detailShop = e.target.value;
    setEditDetailShop(detailShop);
    setEditDetailShopLength(detailShop.length);
    setTextAreaFieldError("");
  };

  const handleEditNextStep = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      Axios.get(
        "https://api.sellpang.com/api/getCategoryShop/" + shopID
      ).then(function (response) {
        if (response.data.success) {
          setTags(response.data.category_shop);
        }
      });
      await schema.validate(
        {
          inputField: editNameShop,
          textAreaField: editDetailShop,
          fileField: editFileImgShop[0],
          fileCoverField: editFileImgCoverShop[0],
        },
        { abortEarly: false }
      );
      // ส่งค่าไปยัง API หรือทำอื่นๆ ที่ต้องการ
      console.log("Data submitted successfully.");
      console.log("Theme:", Theme);
      console.log("Tags:", tags);
      onClose();
      modalEditNextStep.onOpen();
      setInputFieldError("");
      setTextAreaFieldError("");
      setTextImageShopError("");
      setTextImageCoverShopError("");
      setSelectedProducts(listProduct.map((listPro) => listPro.product_id));
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

  // ฟังก์ชัน กดถัดไปยัง modal เลือกธีม โดยก่อนจะถัดไป มีการตรวจสอบว่าได้กรอกข้อมูล หมวดหมู่แล้วหรือยัง ถ้ายังไม่ได้กรอก ไม่สามารถไป modal ถัดได้
  const handleNextModalSelectTheme = () => {
    modalEditNextStep.onClose();
    modalEditTheme.onOpen();
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
    //     modalEditTheme.onOpen();
    //   }
    // }
  };
  // สิ้นสุด ฟังก์ชัน กดถัดไปยัง modal เลือกธีม โดยก่อนจะถัดไป มีการตรวจสอบว่าได้กรอกข้อมูล หมวดหมู่แล้วหรือยัง ถ้ายังไม่ได้กรอก ไม่สามารถไป modal ถัดได้

  const handleNextModalEditProduct = () => {
    modalEditTheme.onClose();
    modalEditNextStep.onOpen();
  };

  const handleConfirmEdit = () => {
    modalEditTheme.onClose();
    modalConfirmEdit.onOpen();
  };

  const handleConfirmEditSuccess = () => {
    const selected = Products.filter((product) =>
      selectedProducts.includes(product.id)
    );
    const formData = new FormData();
    formData.append("shopID", shopID);
    formData.append("editNameShop", editNameShop);
    formData.append("editDetailShop", editDetailShop);
    editFileImgShop.forEach((file, index) => {
      formData.append(`file[${index}]`, file.originFileObj);
    });
    editFileImgCoverShop.forEach((file, index) => {
      formData.append(`file2[${index}]`, file.originFileObj);
    });
    selected.forEach((select, index) => {
      formData.append(`selectID[${index}]`, select.id);
    });
    formData.append("editThemeShop", Theme);

    Axios.post("https://api.sellpang.com/api/editShop", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then(function (response) {
      if (response.data.success) {
        modalConfirmEdit.onClose();
        modalConfirmEditSuccess.onOpen();
        statusEdit(true);
        fetchListProduct();
      }
    });
  };

  const handleAllCheckboxChange = (e) => {
    if (e.target.checked) {
      setSelectedProducts(Products.map((product) => product.id));
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

  //------------------- function เพิ่มหมวดหมู่ -----------------

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

  return (
    <>
      {/* Modal แก้ไขร้านค้า */}
      <Modal
        closeOnOverlayClick={false}
        onClose={onClose}
        isOpen={isOpen}
        size={"xl"}
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
              <Text fontSize={"4xl"}>แก้ไขข้อมูลร้านค้า</Text>
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
                            placeholder="ระบุชื่อสินค้า"
                            borderColor={inputFieldError ? "red" : "gray.400"}
                            value={editNameShop}
                            onChange={onChangeNameShop}
                          />
                          <InputRightElement pr="45px">
                            <Text>{editNameShopLength}/100</Text>
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
                              value={editDetailShop}
                              onChange={onChangeDetailShop}
                            />
                            <InputRightElement
                              h="100%"
                              alignItems="end"
                              p="10px"
                            >
                              <Text pr="45px">{editDetailShopLength}/3000</Text>
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
                          <PicturesShop
                            setEditFileImgShop={handleSetEditFileImgShop}
                            nameImgShop={Shops.img_shop}
                          />
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
                            setEditFileImgCoverShop={
                              handleSetEditFileImgCoverShop
                            }
                            nameImgCoverShop={Shops.cover_img_shop}
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
                      {/* <GridItem colSpan={1} justifySelf="end">
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
                      </GridItem> */}
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
              onClick={onClose}
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
              onClick={handleEditNextStep}
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
      {/* End Modal แก้ไขร้านค้า */}

      {/* Modal แก้ไขหมวดหมู่ */}
      {/* <Modal
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
      </Modal> */}
      {/* End Modal แก้ไขหมวดหมู่ */}

      {/* Modal แก้ไขเลือกธีม */}
      <Modal
        closeOnOverlayClick={false}
        onClose={modalEditTheme.onClose}
        size={"xl"}
        isOpen={modalEditTheme.isOpen}
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
            <RadioGroup defaultValue={Theme.toString()} onChange={setTheme}>
              <Stack>
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
                    <Radio colorScheme="blue" value="0" size="lg">
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
                    <Radio colorScheme="gray" value="1" size="lg">
                      ธีมดำ
                    </Radio>
                  </GridItem>
                </Grid>
              </Stack>
            </RadioGroup>
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            <Button
              onClick={modalEditTheme.onClose}
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
              onClick={handleConfirmEdit}
              bgColor={"#ff0000"}
              color={"white"}
              px={"2rem"}
              height={"35px"}
              leftIcon={<Image src="/images/updateshop.png" alt="" h="20px" />}
              // disabled={isLoading}
            >
              บันทึก
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* End Modal แก้ไขเลือกธีม */}

      {/* Modal Edit Next step สร้างร้านค้า */}
      <Modal
        closeOnOverlayClick={false}
        onClose={modalEditNextStep.onClose}
        size="custom"
        isOpen={modalEditNextStep.isOpen}
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
                      {/* <Checkbox
                        isChecked={allChecked}
                        isIndeterminate={isIndeterminate}
                        onChange={handleSelectAllChange}
                      />
                      เลือกทั้งหมด */}
                      <Checkbox
                        isChecked={selectedProducts.length === Products.length}
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
                  {Products.map((getPro, index) => {
                    const isChecked = selectedProducts.includes(getPro.id);
                    return (
                      <Tr key={index}>
                        <Td>
                          {/* <Checkbox
                          isChecked={getPro.checked}
                          onChange={handleProductChange(getPro.id)}
                        /> */}
                          <Checkbox
                            isChecked={isChecked}
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
                            width={"30px"}
                            height={"25px"}
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
              onClick={modalEditNextStep.onClose}
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
              // leftIcon={<Image src="/images/updateshop.png" alt="" h="20px" />}
            >
              ถัดไป
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* End Modal Edit Next step สร้างร้านค้า */}

      {/* Modal confirm สร้างร้านค้า */}
      <Modal
        closeOnOverlayClick={false}
        onClose={modalConfirmEdit.onClose}
        size={"lg"}
        isOpen={modalConfirmEdit.isOpen}
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
                src="/images/editconfirmshop.png"
                width={"150px"}
                // height={"35px"}
                mr={"10px"}
              />
              <Text fontSize={"5xl"} fontWeight={"bold"} mt={"20px"}>
                ยืนยันการแก้ไขร้านค้า
              </Text>
            </Flex>
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            <Button
              onClick={modalConfirmEdit.onClose}
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
              onClick={handleConfirmEditSuccess}
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
        onClose={modalConfirmEditSuccess.onClose}
        size={"lg"}
        isOpen={modalConfirmEditSuccess.isOpen}
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
                แก้ไขร้านค้าเสร็จสิ้น
              </Text>
            </Flex>
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            <Button
              onClick={modalConfirmEditSuccess.onClose}
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
                  // src="https://api.sellpang.com/images/shopee/cover_img_shop/ow9eC03MUxqOWwVBWEPGv3eLIAHKyx5my8A2yP6O.jpg"
                  src={
                    editFileImgCoverShop[0]?.url ||
                    editFileImgCoverShop[0]?.thumbUrl
                  }
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
                // src="https://api.sellpang.com/images/shopee/shop/rDM383VIMS22QpH2QJkexfrmUOMLiMiBmZEKYMQb.jpg"
                src={editFileImgShop[0]?.url || editFileImgShop[0]?.thumbUrl}
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
                {editNameShop}
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
                          {/* This sofa is perfect for modern tropical spaces,
                            baroque inspired spaces, earthy toned spaces and for
                            people who love a chic design with a sprinkle of
                            vintage design. */}
                        </Text>
                      </Stack>
                      <Box>
                        <Flex justifyContent={"space-between"}>
                          <Box mt={"8px"}>
                            {/* <Text fontSize={"8px"}>ดาว</Text> */}
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
                          {/* This sofa is perfect for modern tropical spaces,
                            baroque inspired spaces, earthy toned spaces and for
                            people who love a chic design with a sprinkle of
                            vintage design. */}
                        </Text>
                      </Stack>
                      <Box>
                        <Flex justifyContent={"space-between"}>
                          <Box mt={"8px"}>
                            {/* <Text fontSize={"8px"}>ดาว</Text> */}
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
                          {/* This sofa is perfect for modern tropical spaces,
                            baroque inspired spaces, earthy toned spaces and for
                            people who love a chic design with a sprinkle of
                            vintage design. */}
                        </Text>
                      </Stack>
                      <Box>
                        <Flex justifyContent={"space-between"}>
                          <Box mt={"7px"}>
                            {/* <Text fontSize={"8px"}>ดาว</Text> */}
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
                          {/* This sofa is perfect for modern tropical spaces,
                            baroque inspired spaces, earthy toned spaces and for
                            people who love a chic design with a sprinkle of
                            vintage design. */}
                        </Text>
                      </Stack>
                      <Box>
                        <Flex justifyContent={"space-between"}>
                          <Box mt={"8px"}>
                            {/* <Text fontSize={"8px"}>ดาว</Text> */}
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

            {/* <div className="swiper-container">
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
            </div> */}
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
    </>
  );
}

export default modalEditStep1;
