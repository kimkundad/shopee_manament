import React, { useState, useEffect } from "react";
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
  Table,
  Tbody,
  Tr,
  Td,
  Thead,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spacer,
  Icon,
  Switch,
  Radio,
  RadioGroup,
  Stack,
  Container,
  VStack,
  IconButton,
  HStack,
  Th,
  InputRightAddon,
} from "@chakra-ui/react";
import Link from "next/link";
import { BsArrowLeftCircle } from "react-icons/bs";
import axios from "axios";
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  PhoneIcon,
  AddIcon,
  WarningIcon,
  SmallAddIcon,
  EditIcon,
} from "@chakra-ui/icons";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
/* import "antd/dist/antd.css"; */

class PicturesWall extends React.Component {
  state = {
    fileList: [],
  };
  handleChange = ({ fileList }) => {
    this.props.setFileImage(fileList);
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
class VideoPlayer extends React.Component {
  render() {
    return (
      <video controls>
        <source src={this.props.videoSrc} type="video/mp4" />
      </video>
    );
  }
}

class VideoWall extends React.Component {
  state = {
    fileList: [],
  };

  handleChange = ({ fileList }) => {
    this.props.setFileVideo(fileList);
    this.setState({ fileList });
  };

  render() {
    const { fileList } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>เพิ่มรูปภาพ ({fileList.length}/9)</div>
      </div>
    );
    return (
      <>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={this.handleChange}
        >
          {fileList.length >= 9 ? null : uploadButton}
        </Upload>
        {/* {fileList.map((file) => (
          <VideoPlayer key={file.uid} videoSrc={file.url} />
        ))} */}
      </>
    );
  }
}
function addProduct() {
  const [name_product, setName_product] = useState("");
  const [detail_product, setDetail_product] = useState("");
  const [price, setPrice] = useState("");
  const [price_sales, setPrice_sales] = useState("");
  const [cost, setCost] = useState("");
  const [stock, setStock] = useState("");
  const [weight, setWeight] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [height, setHeight] = useState("");
  const [sku, setSku] = useState("");
  const [fileImage, setFileImage] = useState([]);
  // const [fileImageOption, setFileImageOption] = useState([]);
  const [valueSelect, setValueSelect] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [categoryIdDelete, setCategoryIdDelete] = useState(null);
  const [tags2, setTags2] = useState([]);

  // modal chakra.ui
  const modalAddCategory = useDisclosure();
  const modalConfirm = useDisclosure();
  const modalConfirmSuccess = useDisclosure();

  const modalEditCategory = useDisclosure();
  const modalConfirmEdit = useDisclosure();
  const modalConfirmEditSuccess = useDisclosure();

  const modalConfirmDeleteCategory = useDisclosure();
  const modalConfirmDeleteSuccessCategory = useDisclosure();

  const modalSaveOption = useDisclosure();
  const modalSaveOptionSuccess = useDisclosure();
  // end modal chakra.ui

  const [checkInputCategory, setCheckInputCategory] = useState(true);
  const [checkInputCategory2, setCheckInputCategory2] = useState(true);

  const [images, setImages] = useState([]);
  const [imageCount, setImageCount] = useState(1);
  const [files, setFiles] = useState([]);

  const [imagesSub, setImagesSub] = useState([]);
  const [imageSubCount, setImageSubCount] = useState(5);
  const [filesSub, setFilesSub] = useState([]);
  const [btnCheckSaveStep1, setBtnCheckSaveStep1] = useState(false);
  const [subProductImg, setSubProductImg] = useState([]);
  const [productID, setProductID] = useState("");
  const router = useRouter();
  const { type } = router.query;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImages([...images, URL.createObjectURL(file)]);
      setFiles([...files, file]);
    }
  };

  const handleImageSubUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagesSub([...imagesSub, URL.createObjectURL(file)]);
      setFilesSub([...filesSub, file]);
    }
  };

  const handleDeleteImage = (index) => {
    const newTags = [...images];
    newTags.splice(index, 1);
    const newTags2 = [...files];
    newTags2.splice(index, 1);
    setImages(newTags);
    setFiles(newTags2);
  };

  const handleDeleteImageSub = (index) => {
    const newTags = [...imagesSub];
    newTags.splice(index, 1);
    const newTags2 = [...filesSub];
    newTags2.splice(index, 1);
    setImagesSub(newTags);
    setFilesSub(newTags2);
  };

  // const handleSetFileImage = (fileList) => {
  //   setFileImage(fileList);
  // };
  // const [fileVideo, setFileVideo] = useState([]);
  // const handleSetFileVideo = (fileList) => {
  //   setFileVideo(fileList);
  // };

  const [buttonActive, setButtonActive] = useState([true, false]);

  const handelButton = (event) => {
    event.target.id === "0"
      ? setButtonActive([true, false])
      : setButtonActive([false, true]);
  };

  const {
    isOpen: isOpenForm1,
    onOpen: onOpenForm1,
    onClose: onCloseForm1,
  } = useDisclosure();
  const {
    isOpen: isOpenForm2,
    onOpen: onOpenForm2,
    onClose: onCloseForm2,
  } = useDisclosure();
  const {
    isOpen: isOpenForm3,
    onOpen: onOpenForm3,
    onClose: onCloseForm3,
  } = useDisclosure();

  const {
    isOpen: isOpenForm4,
    onOpen: onOpenForm4,
    onClose: onCloseForm4,
  } = useDisclosure();
  const comfirmSave = (event) => {
    // console.log("images", images);
    console.log("files", files);
    // console.log("imagesSub", imagesSub);
    console.log("filesSub", filesSub);
    // console.log("option", option);
    // console.log("Suboption", subOption);
    // console.log("dataTable", dataTable);
    event.preventDefault();
    onOpenForm1();
  };

  const comfirmSaveOption = (event) => {
    // console.log("images", images);
    // console.log("files", files);
    // console.log("imagesSub", imagesSub);
    // console.log("filesSub", filesSub);
    // console.log("option", option);
    // console.log("Suboption", subOption);
    console.log("dataTable", dataTable);
    event.preventDefault();
    modalSaveOption.onOpen();
  };

  const closeModal = () => {
    onCloseForm1();
    onCloseForm2();
    onCloseForm3();
    onCloseForm4();
  };
  const modalAddOptiion = (event) => {
    event.preventDefault();
    setValueSelect(null);
    onOpenForm3();
  };
  const modalAddSubOptiion = (event) => {
    event.preventDefault();
    onOpenForm4();
  };
  const saveSuccess = async () => {
    const formData = new FormData();
    formData.append("name_product", name_product);
    formData.append("detail_product", detail_product);
    formData.append("price", price);
    formData.append("price_sales", price_sales);
    formData.append("cost", cost);
    formData.append("stock", stock);
    formData.append("weight", weight);
    formData.append("width_product", width);
    formData.append("length_product", length);
    formData.append("height_product", height);
    formData.append("sku", sku);
    formData.append("category", categoryId);
    files.forEach((file, index) => {
      formData.append(`file[${index}]`, file);
    });
    filesSub.forEach((file, index) => {
      formData.append(`image[${index}]`, file);
    });
    const response = await axios.post(
      "https://api.sellpang.com/api/addProduct",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    if (response.data.success) {
      onCloseForm1();
      onOpenForm2();
      setBtnCheckSaveStep1(true);
      setSubProductImg(response.data.subProductImg);
      setProductID(response.data.productID);
    }
  };

  const saveSubOptionSuccess = async () => {
    const formData = new FormData();
    formData.append("productID", productID);
    formData.append("option1", option);
    formData.append("option2", subOption);
    formData.append("dataOption", JSON.stringify(dataTable));
    const response = await axios.post(
      "https://api.sellpang.com/api/addOptionProduct",
      formData
    );
    if (response.data.success) {
      modalSaveOption.onClose();
      modalSaveOptionSuccess.onOpen();
    }
  };

  const [category, setCategory] = useState([]);
  // function fetchData() {
  //   const res = axios.get(
  //     "https://api.sellpang.com/api/get_category_all"
  //   );
  //   setCategory(res.data.category);
  // }
  const fetchData = async () => {
    axios
      .get("https://api.sellpang.com/api/get_category_all")
      .then(function (response) {
        setCategory(response.data.category);
        setTags2(response.data.category);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [div, setDiv] = useState([]);
  const handleSelectChange = () => {
    setDiv([...div, true]);
  };

  const [dataTable, setDataTable] = useState([]);
  const [option, setOption] = useState("ตัวเลือกที่ 1");
  const [subOption, setSubOption] = useState("ตัวเลือกที่ 2");

  const [nameOption, setNameOption] = useState(null);
  const [priceOption, setPriceOption] = useState(null);
  const [stockOption, setStockOption] = useState(null);
  const [skuOption, setSkuOption] = useState(null);
  const [statusOption, setStatusOption] = useState(true);
  function addOption(event) {
    event.preventDefault();
    const arrOption = {
      nameOption: nameOption,
      priceOption: priceOption,
      stockOption: stockOption,
      skuOption: skuOption,
      indexImageOption: valueSelect,
      statusOption: statusOption,
      subOption: [],
    };
    console.log("valueSelect", valueSelect);
    dataTable.push(arrOption);
    setDataTable(dataTable);
    onCloseForm3();
  }

  const [nameSubOption, setNameSubOption] = useState(null);
  const [priceSubOption, setPriceSubOption] = useState(null);
  const [stockSubOption, setStockSubOption] = useState(null);
  const [skuSubOption, setSkuSubOption] = useState(null);
  const [statusSubOption, setStatusSubOption] = useState(true);
  function addSubOption(event) {
    event.preventDefault();
    const arrSubOption = {
      nameSubOption: nameSubOption,
      priceSubOption: priceSubOption,
      stockSubOption: stockSubOption,
      skuSubOption: skuSubOption,
      statusSubOption: statusSubOption,
    };
    dataTable[valueSelect].subOption.push(arrSubOption);
    setDataTable(dataTable);
    onCloseForm4();
  }
  function deleteOption(index = null, subIndex = null) {
    const newArr = [...dataTable];
    if (subIndex == null) {
      newArr.splice(index, 1);
      setDataTable(newArr);
    } else {
      newArr[index].subOption.splice(subIndex, 1);
      setDataTable(newArr);
    }
  }

  function deleteAllOption() {
    setOption("ตัวเลือกที่ 1");
    setSubOption("ตัวเลือกที่ 2");
    setDataTable([]);
    setDiv([]);
  }
  function deleteAllSubOption() {
    setSubOption("ตัวเลือกที่ 2");
    dataTable.forEach((e) => {
      if (e.subOption?.length > 0) {
        e.subOption = [];
      }
    });
    setDiv([true]);
  }

  const [displayAdditionOption, setDisplayAdditionOption] = useState(false);
  const [displayAddProduct, setDisplayAddProduct] = useState(true);
  function additionOption() {
    console.log("subProductImg", subProductImg);
    setDisplayAdditionOption(true);
    setDisplayAddProduct(false);
  }

  function hideAdditionOption() {
    setDisplayAdditionOption(false);
    setDisplayAddProduct(true);
  }

  const editDataTable = (event, index = null, subIndex = null, id) => {
    const newArr = [...dataTable];

    if (subIndex == null) {
      if (id == "statusOption") {
        if (newArr[index].statusOption == true) {
          newArr[index] = {
            ...newArr[index],
            [id]: false,
          };
        } else {
          newArr[index] = {
            ...newArr[index],
            [id]: true,
          };
        }
      } else {
        newArr[index] = {
          ...newArr[index],
          [id]: event.target.value,
        };
      }
    } else {
      if (id == "statusSubOption") {
        if (newArr[index].statusSubOption == true) {
          newArr[index].subOption[subIndex] = {
            ...newArr[index].subOption[subIndex],
            [id]: false,
          };
        } else {
          newArr[index].subOption[subIndex] = {
            ...newArr[index].subOption[subIndex],
            [id]: true,
          };
        }
      } else {
        newArr[index].subOption[subIndex] = {
          ...newArr[index].subOption[subIndex],
          [id]: event.target.value,
        };
      }
    }

    setDataTable(newArr);
  };

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

  // ฟังก์ชันเปิด modal ยืนยันการสร้างหมวดหมู่
  const handleConfirmAddCategory = () => {
    const isEmpty = tags.filter((tag) => tag === "");
    console.log("isEmpty", isEmpty);
    console.log("tags", tags);
    if (tags.length == 0) {
      setCheckInputCategory(false);
    } else {
      if (isEmpty.length > 0) {
        setCheckInputCategory(false);
      } else {
        modalAddCategory.onClose();
        modalConfirm.onOpen();
      }
    }
  };

  const handleConfirmSuccess = () => {
    const formData = new FormData();
    formData.append("userID", 34);
    tags.forEach((category, index) => {
      formData.append(`category[${index}]`, category);
    });

    axios
      .post("https://api.sellpang.com/api/addCategory", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(function (response) {
        if (response.data.success) {
          modalConfirm.onClose();
          modalConfirmSuccess.onOpen();
          setTags([]);
          fetchData();
        }
      });
  };

  const openModalEditCategory = () => {
    console.log("tags2", category);
  };
  // ฟังก์ชันเพิ่ม tag input หมวดหมู่
  // const handleAddTag2 = (event) => {
  //   event.preventDefault();
  //   setTags2([...tags2, ""]);
  // };

  // ฟังก์ชันลบ tag input หมวดหมู่
  const handleDeleteTag2 = (id) => {
    modalConfirmDeleteCategory.onOpen();
    console.log("ID:", id);
    setCategoryIdDelete(id);
    // const newTags = [...tags2];
    // newTags.splice(index, 1);
    // setTags2(newTags);
  };

  const handleConfirmDeleteSuccess = () => {
    axios
      .post("https://api.sellpang.com/api/deleteCategory/" + categoryIdDelete)
      .then(function (response) {
        if (response.data.success) {
          modalConfirmDeleteCategory.onClose();
          modalConfirmDeleteSuccessCategory.onOpen();
          fetchData();
          setTags2([]);
        }
      });
  };

  // ฟังก์ชันเก็บค่าใส่ในตัวแปร input หมวดหมู่
  const handleTagInputChange2 = (event, index, image, id) => {
    const newTags = [...tags2];
    newTags[index] = {
      cat_name: event.target.value,
      image: image,
      id: id,
    };

    setTags2(newTags);
    setCheckInputCategory2(true);
  };

  // ฟังก์ชันเปิด modal ยืนยันการแก้ไขหมวดหมู่
  const handleConfirmEditCategory = () => {
    const isEmpty = tags2.filter((tag) => tag.cat_name === "");
    console.log("isEmpty", isEmpty);
    if (isEmpty.length > 0) {
      setCheckInputCategory2(false);
    } else {
      modalConfirmEdit.onOpen();
    }
  };

  const handleConfirmEditSuccess = () => {
    console.log("Tags2", tags2);
    const data = {
      category: tags2,
    };
    // const formData = new FormData();
    // tags2.forEach((category, index) => {
    //   formData.append(`category[${index}]`, category);
    // });

    axios
      .post("https://api.sellpang.com/api/EditCategory", data)
      .then(function (response) {
        if (response.data.success) {
          modalConfirmEdit.onClose();
          modalConfirmEditSuccess.onOpen();
          fetchData();
          setTags2([]);
        }
      });
  };
  return (
    <>
      <Box>
        <Box display={displayAddProduct ? "block" : "none"}>
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
                  {type === "single"
                    ? "เพิ่มสินค้ามาตรฐาน"
                    : "เพิ่มสินค้ามีตัวเลือก"}
                </Text>
              </Flex>
              <Spacer />
              <Link href="/stock">
                <Image src="/images/close.png" alt="" h="20px" w="20px" />
              </Link>
            </Flex>
            {type === "multi" && (
              <Wrap spacing="100px" justify="center">
                <WrapItem>
                  <Center>
                    <Box>
                      <Button
                        id="0"
                        bg={"red"}
                        color={"white"}
                        border="2px solid red"
                        fontSize="24px"
                        borderRadius="3xl"
                        w="150px"
                        _hover={{}}
                        onClick={hideAdditionOption}
                      >
                        สร้างสินค้า
                      </Button>
                    </Box>
                  </Center>
                </WrapItem>
                <WrapItem>
                  <Center>
                    <Box>
                      <Button
                        id="1"
                        bg={"white"}
                        color={"red"}
                        border="2px solid red"
                        fontSize="24px"
                        borderRadius="3xl"
                        w="175px"
                        _hover={{}}
                        onClick={additionOption}
                        // isDisabled={true}
                      >
                        สร้างตัวเลือกสินค้า
                      </Button>
                    </Box>
                  </Center>
                </WrapItem>
              </Wrap>
            )}
          </Box>

          <from>
            <Box>
              <Grid
                templateColumns="repeat(2, 1fr)"
                gap={6}
                justifyItems="end"
                p={"1rem"}
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
                          value={name_product}
                          placeholder="ระบุชื่อสินค้า"
                          borderColor="gray.400"
                          onChange={(e) => setName_product(e.target.value)}
                          isRequired
                          maxLength={100}
                        />
                        <InputRightElement pr="45px">
                          <Text>{name_product.length}/100</Text>
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
                            value={detail_product}
                            onChange={(e) => setDetail_product(e.target.value)}
                          />
                          <InputRightElement h="100%" alignItems="end" p="10px">
                            <Text pr="45px">{detail_product.length}/3000</Text>
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
                        <Flex>
                          <Select
                            placeholder="โปรดเลือก"
                            w="150px"
                            borderColor="gray.200"
                            onChange={(e) => setCategoryId(e.target.value)}
                          >
                            {category?.map((item, index) => {
                              return (
                                <option value={item.id} key={index}>
                                  {item.cat_name}
                                </option>
                              );
                            })}
                          </Select>
                          <Button
                            ml={"10px"}
                            bgColor={"green.400"}
                            color={"white"}
                            padding={"0.5rem 1rem 0.5rem 0.5rem"}
                            onClick={modalAddCategory.onOpen}
                          >
                            <SmallAddIcon boxSize={6} />
                            เพิ่มหมวดหมู่
                          </Button>
                          <Button
                            ml={"10px"}
                            bgColor={"#2778c4"}
                            color={"white"}
                            padding={"0.5rem 1rem 0.5rem 1rem"}
                            onClick={modalEditCategory.onOpen}
                          >
                            <EditIcon boxSize={4} mr={"5px"} />
                            แก้ไขหมวดหมู่
                          </Button>
                        </Flex>
                      </Box>
                    </GridItem>
                    <GridItem colSpan={1} justifySelf="end">
                      <Box pr="5px">
                        <Text>รูปภาพหลักสินค้า : </Text>
                      </Box>
                    </GridItem>
                    <GridItem colSpan={2}>
                      <Box>
                        <HStack alignItems="flex-start" spacing={4}>
                          {images.map((img, idx) => (
                            <Box
                              key={idx}
                              position="relative"
                              w="200px"
                              h="150px"
                              border="1px dashed #d9d9d9"
                              bgColor={"whitesmoke"}
                              borderRadius="md"
                              bgImage={`url(${img})`}
                              bgSize="contain"
                              bgPosition="center"
                              bgRepeat="no-repeat"
                            >
                              <IconButton
                                position="absolute"
                                top="4px"
                                right="4px"
                                icon={<DeleteIcon />}
                                colorScheme="red"
                                onClick={() => handleDeleteImage(idx)}
                              />
                            </Box>
                          ))}
                          {images.length < imageCount && (
                            <Box
                              w="200px"
                              h="150px"
                              border="1px dashed #d9d9d9"
                              borderRadius="md"
                              bgColor={"whitesmoke"}
                              _hover={{ border: "1px dashed blue" }}
                            >
                              <label htmlFor="upload">
                                <Box
                                  width="100%"
                                  height="100%"
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                                  cursor="pointer"
                                >
                                  <Text fontSize="lg" color="black">
                                    เพิ่มรูปภาพ
                                  </Text>
                                  <Text ml={2} fontSize="lg">
                                    ({`${images.length}/${imageCount}`})
                                  </Text>
                                  <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    id="upload"
                                    display="none"
                                  />
                                </Box>
                              </label>
                            </Box>
                          )}
                        </HStack>
                        {/* <PicturesWall setFileImage={handleSetFileImage} /> */}
                      </Box>
                    </GridItem>
                    {/* <GridItem colSpan={1} justifySelf="end">
                      <Box pr="5px">
                        <Text>รูปภาพประกอบสินค้า : </Text>
                      </Box>
                    </GridItem> */}
                    {/* <VideoWall setFileVideo={handleSetFileVideo} /> */}
                    {/* <GridItem colSpan={2}>
                      <HStack alignItems="flex-start" spacing={4}>
                        {images.map((img, idx) => (
                          <Box
                            key={idx}
                            position="relative"
                            w="200px"
                            h="150px"
                            border="1px dashed #d9d9d9"
                            bgColor={"whitesmoke"}
                            borderRadius="md"
                            bgImage={`url(${img})`}
                            bgSize="contain"
                            bgPosition="center"
                            bgRepeat="no-repeat"
                          >
                            <IconButton
                              position="absolute"
                              top="4px"
                              right="4px"
                              icon={<DeleteIcon />}
                              colorScheme="red"
                              onClick={() => handleDeleteImage(idx)}
                            />
                          </Box>
                        ))}
                        {images.length < imageCount && (
                          <Box
                            w="200px"
                            h="150px"
                            border="1px dashed #d9d9d9"
                            borderRadius="md"
                            bgColor={"whitesmoke"}
                          >
                            <label htmlFor="upload">
                              <Box
                                width="100%"
                                height="100%"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                cursor="pointer"
                              >
                                <Text fontSize="lg" color="black">
                                  เพิ่มรูปภาพ
                                </Text>
                                <Text ml={2} fontSize="lg">
                                  ({`${images.length}/${imageCount}`})
                                </Text>
                                <Input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageUpload}
                                  id="upload"
                                  display="none"
                                />
                              </Box>
                            </label>
                          </Box>
                        )}
                      </HStack>
                    </GridItem> */}
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
                        <Input
                          pr="40px"
                          type="text"
                          placeholder="ระบุรหัสสินค้า"
                          value={sku}
                          onChange={(e) => setSku(e.target.value)}
                        />
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
                          type="number"
                          placeholder="ระบุต้นทุนสินค้า"
                          value={cost}
                          onChange={(e) => setCost(parseInt(e.target.value))}
                        />
                        <InputRightAddon children="฿" />
                      </InputGroup>
                    </GridItem>
                    <GridItem colSpan={1} justifySelf="end">
                      <Box pr="5px">
                        <Text>* ราคา : </Text>
                      </Box>
                    </GridItem>
                    <GridItem colSpan={2}>
                      <InputGroup>
                        <Input
                          pr="40px"
                          type="number"
                          placeholder="ระบุราคาสินค้า"
                          value={price}
                          onChange={(e) => setPrice(parseInt(e.target.value))}
                          isRequired
                        />
                        <InputRightAddon children="฿" />
                      </InputGroup>
                    </GridItem>
                    <GridItem colSpan={1} justifySelf="end">
                      <Box pr="5px">
                        <Text>ลดราคา : </Text>
                      </Box>
                    </GridItem>
                    <GridItem colSpan={2}>
                      <InputGroup>
                        <Input
                          pr="40px"
                          type="number"
                          placeholder="ระบุลดราคา ( กรุณากรอกเป็นจำนวนเปอร์เซ็น )"
                          value={price_sales}
                          onChange={(e) =>
                            setPrice_sales(parseInt(e.target.value))
                          }
                        />
                        <InputRightAddon children="%" />
                        {/* <InputRightElement>
                          <Text fontSize={'xl'}>%</Text>
                        </InputRightElement> */}
                      </InputGroup>
                    </GridItem>
                    <GridItem colSpan={1} justifySelf="end">
                      <Box pr="5px">
                        <Text>สต๊อกสินค้า : </Text>
                      </Box>
                    </GridItem>
                    <GridItem colSpan={2}>
                      <Input
                        pr="50px"
                        type="number"
                        placeholder="ระบุจำนวนสินค้า"
                        value={stock}
                        onChange={(e) => setStock(parseInt(e.target.value))}
                      />
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
                          placeholder="ระบุน้ำหนักสินค้า"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                        />
                        <InputRightAddon children="Kg." />
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
                          placeholder="ระบุความกว้างสินค้า"
                          onChange={(e) => setWidth(e.target.value)}
                        />
                        <InputRightAddon children="Cm." />
                      </InputGroup>
                      <InputGroup mt="10px">
                        <Input
                          pr="40px"
                          placeholder="ระบุความยาวสินค้า"
                          onChange={(e) => setLength(e.target.value)}
                        />
                        <InputRightAddon children="Cm." />
                      </InputGroup>
                      <InputGroup mt="10px">
                        <Input
                          pr="40px"
                          placeholder="ระบุความสูงสินค้า"
                          onChange={(e) => setHeight(e.target.value)}
                        />
                        <InputRightAddon children="Cm." />
                      </InputGroup>
                      {/* {buttonActive[0] ? (
                        <Flex justifyContent="center" pt="10px">
                          <Button>ยกเลิก</Button>
                          <Button
                            ml="10px"
                            type="submit"
                            bg="red"
                            color="white"
                            leftIcon={
                              <Image src="/images/save.png" alt="" h="25px" />
                            }
                            _hover={{}}
                            onClick={comfirmSave}
                          >
                            บันทึก
                          </Button>
                        </Flex>
                      ) : (
                        <Flex justifyContent="center" pt="10px">
                          <Button
                            type="submit"
                            bg="red"
                            leftIcon={
                              <Image
                                src="/images/pluswhite.png"
                                alt=""
                                h="15px"
                              />
                            }
                            _hover={{}}
                            color="white"
                            h="35px"
                            fontSize="21px"
                            onClick={additionOption}
                          >
                            เพิ่มตัวเลือกสินค้า
                          </Button>
                        </Flex>
                      )} */}
                    </GridItem>
                  </Grid>
                </GridItem>
              </Grid>
              <Box p={"0rem 1.5rem 1.5rem 1.5rem"}>
                <Box pr={5}>
                  <Text fontSize="25px">รูปภาพประกอบสินค้า :</Text>
                </Box>
                <Box
                  border={"1px solid #dcd9d9"}
                  borderRadius={"15px"}
                  padding={"0.5rem"}
                >
                  <HStack alignItems="flex-start" spacing={4}>
                    {imagesSub.map((img, idx) => (
                      <Box
                        key={idx}
                        position="relative"
                        w="200px"
                        h="150px"
                        border="1px dashed #d9d9d9"
                        bgColor={"whitesmoke"}
                        borderRadius="md"
                        bgImage={`url(${img})`}
                        bgSize="contain"
                        bgPosition="center"
                        bgRepeat="no-repeat"
                      >
                        <IconButton
                          position="absolute"
                          top="4px"
                          right="4px"
                          icon={<DeleteIcon />}
                          colorScheme="red"
                          onClick={() => handleDeleteImageSub(idx)}
                        />
                      </Box>
                    ))}
                    {imagesSub.length < imageSubCount && (
                      <Box
                        w="200px"
                        h="150px"
                        border="1px dashed #d9d9d9"
                        borderRadius="md"
                        bgColor={"whitesmoke"}
                        _hover={{ border: "1px dashed blue" }}
                      >
                        <label htmlFor="upload">
                          <Box
                            width="100%"
                            height="100%"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            cursor="pointer"
                          >
                            <Text fontSize="lg" color="black">
                              เพิ่มรูปภาพ
                            </Text>
                            <Text ml={2} fontSize="lg">
                              ({`${imagesSub.length}/${imageSubCount}`})
                            </Text>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={handleImageSubUpload}
                              id="upload"
                              display="none"
                            />
                          </Box>
                        </label>
                      </Box>
                    )}
                  </HStack>
                </Box>
                <Box>
                  {/* <Flex justifyContent="center" pt="10px">
                    <Text color={"red"}>
                      *เงื่อนไข : แม่ค้าต้องทำการเพิ่มสินค้าให้เรียบร้อยก่อน
                      จึงจะสามารถเพิ่มตัวเลือกให้กับสินค้าของท่านได้
                    </Text>
                  </Flex> */}
                  <Flex justifyContent="center" pt={5}>
                    {/* <Button>ยกเลิก</Button> */}
                    {type === "single" ? (
                      <Button
                        ml="10px"
                        type="submit"
                        bg="red"
                        color="white"
                        padding={"1rem 2rem"}
                        fontSize={"20px"}
                        leftIcon={
                          <Image src="/images/save.png" alt="" h="20px" />
                        }
                        _hover={{}}
                        onClick={comfirmSave}
                        isDisabled={btnCheckSaveStep1}
                      >
                        บันทึก
                      </Button>
                    ) : (
                      <Button
                        ml="10px"
                        type="submit"
                        bg="white"
                        color="red"
                        border={"2px solid red"}
                        padding={"1rem 2rem"}
                        fontSize={"20px"}
                        _hover={{}}
                        onClick={additionOption}
                        // isDisabled={btnCheckSaveStep1 == true ? false : true}
                        // onClick={comfirmSave}
                      >
                        เพิ่มตัวเลือก
                      </Button>
                    )}
                  </Flex>
                </Box>
              </Box>
            </Box>
          </from>
        </Box>
        <Box display={displayAdditionOption ? "block" : "none"}>
          <Box>
            <Flex justifyContent="center" p="15px">
              <Button
                bg="red"
                h="25px"
                borderRadius="3xl"
                color="white"
                px="7px"
                leftIcon={<Icon as={BsArrowLeftCircle} color="white" />}
                onClick={hideAdditionOption}
              >
                ย้อนกลับ
              </Button>
              <Spacer />
              <Flex alignItems="center">
                <Image src="/images/addProduct.png" alt="" h="40px" w="40px" />
                <Text pl="10px" fontSize="40px" fontWeight="bold" color="black">
                  เพิ่มตัวเลือกสินค้า
                </Text>
              </Flex>
              <Spacer />
              <Box onClick={hideAdditionOption}>
                <Image src="/images/close.png" alt="" h="20px" w="20px" />
              </Box>
            </Flex>
            <Wrap spacing="100px" justify="center">
              <WrapItem>
                <Center>
                  <Box>
                    <Button
                      id="0"
                      bg={"white"}
                      color={"red"}
                      border="2px solid red"
                      fontSize="24px"
                      borderRadius="3xl"
                      w="150px"
                      _hover={{}}
                      onClick={hideAdditionOption}
                      // isDisabled={true}
                    >
                      สร้างสินค้า
                    </Button>
                  </Box>
                </Center>
              </WrapItem>
              <WrapItem>
                <Center>
                  <Box>
                    <Button
                      id="1"
                      bg={"red"}
                      color={"white"}
                      border="2px solid red"
                      fontSize="24px"
                      borderRadius="3xl"
                      w="175px"
                      _hover={{}}
                      onClick={handelButton}
                    >
                      สร้างตัวเลือกสินค้า
                    </Button>
                  </Box>
                </Center>
              </WrapItem>
            </Wrap>
          </Box>
          <Box px="10%" mt={10}>
            {div?.map((item, index) => {
              return (
                <Flex pt="10px" justifyContent="center" key={index}>
                  <Text fontSize="24px" px="15px" whiteSpace="nowrap">
                    รูปแบบที่ {index + 1} :
                  </Text>
                  <Box width="-webkit-fill-available">
                    <Input
                      onChange={
                        index == 0
                          ? (e) => setOption(e.target.value)
                          : (e) => setSubOption(e.target.value)
                      }
                      placeholder="เช่น สี ขนาด ไซด์"
                      required
                    />
                    <Button
                      mt="15px"
                      type="submit"
                      onClick={
                        index == 0
                          ? option !== "ตัวเลือกที่ 1" && option !== ""
                            ? modalAddOptiion
                            : null
                          : subOption !== "ตัวเลือกที่ 2" && subOption !== ""
                          ? modalAddSubOptiion
                          : null
                      }
                    >
                      เพิ่มตัวเลือก
                    </Button>
                    <Button
                      ml="15px"
                      mt="15px"
                      onClick={
                        index == 0 ? deleteAllOption : deleteAllSubOption
                      }
                    >
                      ลบรูปแบบ
                    </Button>
                  </Box>
                </Flex>
              );
            })}
            <Box pl="116px" pt="15px">
              <Button
                border="2px solid black"
                bg="white"
                leftIcon={<Image src="/images/plusblack.png" alt="" h="15px" />}
                _hover={{}}
                onClick={handleSelectChange}
                isDisabled={div.length > 1}
              >
                เพิ่มรูปแบบ ({div.length}/2)
              </Button>
            </Box>
            <Box pl="115px" pt="15px">
              <Table minWidth="100%" border="1px solid" textAlign="center">
                <Thead>
                  <Tr bgColor={"whitesmoke"}>
                    <Th border="1px solid" whiteSpace={"nowrap"}>
                      {option}
                    </Th>
                    <Th border="1px solid" whiteSpace={"nowrap"}>
                      {subOption}
                    </Th>
                    <Th border="1px solid" whiteSpace={"nowrap"}>
                      ราคา
                    </Th>
                    <Th border="1px solid" whiteSpace={"nowrap"}>
                      สต็อกสินค้า
                    </Th>
                    <Th border="1px solid" whiteSpace={"nowrap"}>
                      รหัสสินค้า
                    </Th>
                    <Th border="1px solid" whiteSpace={"nowrap"}>
                      ใช้งาน
                    </Th>
                    <Th border="1px solid" whiteSpace={"nowrap"}>
                      ดำเนินการ
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {dataTable?.map((item, index) => (
                    <React.Fragment key={index}>
                      <Tr>
                        <Td
                          border="1px solid"
                          rowSpan={
                            item?.subOption?.length > 0
                              ? item?.subOption?.length
                              : 1
                          }
                        >
                          {item.nameOption}
                          <Image
                            src={fileImage[item.indexImageOption]?.thumbUrl}
                          />
                        </Td>
                        <Td border="1px solid">
                          {item?.subOption?.length > 0 ? (
                            <Input
                              value={item?.subOption[0]?.nameSubOption}
                              onChange={(e) =>
                                editDataTable(e, index, 0, "nameSubOption")
                              }
                            />
                          ) : null}
                        </Td>
                        {item?.subOption?.length > 0 ? (
                          <Td border="1px solid">
                            <Input
                              value={item?.subOption[0].priceSubOption}
                              onChange={(e) =>
                                editDataTable(e, index, 0, "priceSubOption")
                              }
                            />
                          </Td>
                        ) : (
                          <Td border="1px solid">
                            <Input
                              value={item?.priceOption}
                              onChange={(e) =>
                                editDataTable(e, index, null, "priceOption")
                              }
                            />
                          </Td>
                        )}
                        {item?.subOption?.length > 0 ? (
                          <Td border="1px solid">
                            <Input
                              value={item?.subOption[0].stockSubOption}
                              onChange={(e) =>
                                editDataTable(e, index, 0, "stockSubOption")
                              }
                            />
                          </Td>
                        ) : (
                          <Td border="1px solid">
                            <Input
                              value={item?.stockOption}
                              onChange={(e) =>
                                editDataTable(e, index, null, "stockOption")
                              }
                            />
                          </Td>
                        )}
                        {item?.subOption?.length > 0 ? (
                          <Td border="1px solid">
                            <Input
                              value={item?.subOption[0].skuSubOption}
                              onChange={(e) =>
                                editDataTable(e, index, 0, "skuSubOption")
                              }
                            />
                          </Td>
                        ) : (
                          <Td border="1px solid">
                            <Input
                              value={item?.skuOption}
                              onChange={(e) =>
                                editDataTable(e, index, null, "skuOption")
                              }
                            />
                          </Td>
                        )}
                        {item?.subOption?.length > 0 ? (
                          <Td border="1px solid">
                            <Switch
                              colorScheme="brand"
                              isChecked={item?.subOption[0].statusSubOption}
                              onChange={(e) =>
                                editDataTable(e, index, 0, "statusSubOption")
                              }
                            />
                          </Td>
                        ) : (
                          <Td border="1px solid">
                            <Switch
                              colorScheme="brand"
                              isChecked={item?.statusOption}
                              onChange={(e) =>
                                editDataTable(e, index, null, "statusOption")
                              }
                            />
                          </Td>
                        )}
                        {item?.subOption?.length == 0 ? (
                          <Td border="1px solid">
                            <Image
                              src="/images/trash-bin.png"
                              h="25px"
                              onClick={() => deleteOption(index)}
                            />
                          </Td>
                        ) : (
                          <Td border="1px solid">
                            <Image
                              src="/images/trash-bin.png"
                              h="25px"
                              onClick={() => deleteOption(index, 0)}
                            />
                          </Td>
                        )}
                      </Tr>
                      {item?.subOption?.map((subItem, subIndex) => {
                        return subIndex !== 0 ? (
                          <Tr key={`${item.nameOption}-${subIndex}`}>
                            <Td border="1px solid">
                              <Input
                                value={subItem.nameSubOption}
                                onChange={(e) =>
                                  editDataTable(
                                    e,
                                    index,
                                    subIndex,
                                    "nameSubOption"
                                  )
                                }
                              />
                            </Td>
                            <Td border="1px solid">
                              <Input
                                value={subItem.priceSubOption}
                                onChange={(e) =>
                                  editDataTable(
                                    e,
                                    index,
                                    subIndex,
                                    "priceSubOption"
                                  )
                                }
                              />
                            </Td>
                            <Td border="1px solid">
                              <Input
                                value={subItem.skuSubOption}
                                onChange={(e) =>
                                  editDataTable(
                                    e,
                                    index,
                                    subIndex,
                                    "skuSubOption"
                                  )
                                }
                              />
                            </Td>
                            <Td border="1px solid">
                              <Input
                                value={subItem.stockSubOption}
                                onChange={(e) =>
                                  editDataTable(
                                    e,
                                    index,
                                    subIndex,
                                    "stockSubOption"
                                  )
                                }
                              />
                            </Td>
                            <Td border="1px solid">
                              <Switch
                                colorScheme="brand"
                                isChecked={subItem.statusSubOption}
                                onChange={(e) =>
                                  editDataTable(
                                    e,
                                    index,
                                    subIndex,
                                    "statusSubOption"
                                  )
                                }
                              />
                            </Td>
                            <Td border="1px solid">
                              <Image
                                src="/images/trash-bin.png"
                                h="25px"
                                onClick={() => deleteOption(index, subIndex)}
                              />
                            </Td>
                          </Tr>
                        ) : null;
                      })}
                    </React.Fragment>
                  ))}
                </Tbody>
              </Table>
            </Box>
            <Flex pl="100px" py="15px" justifyContent="center">
              {/* <Button>ย้อนกลับ</Button> */}
              <Button
                ml="10px"
                type="submit"
                bg="red"
                color="white"
                padding={"1rem 2rem"}
                fontSize={"20px"}
                leftIcon={<Image src="/images/save.png" alt="" h="20px" />}
                _hover={{}}
                onClick={comfirmSaveOption}
              >
                บันทึก
              </Button>
            </Flex>
          </Box>
          <Modal
            onClose={onCloseForm3}
            size="md"
            isOpen={isOpenForm3}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader pr="10px" pt="10px">
                <Flex justifyContent="center">
                  <Text>เพิ่มตัวเลือก {option}</Text>
                  <Spacer />
                  <Box>
                    <Image
                      src="/images/close.png"
                      alt=""
                      h="25px"
                      w="25px"
                      onClick={() => closeModal()}
                    />
                  </Box>
                </Flex>
              </ModalHeader>
              <ModalBody>
                <form onSubmit={addOption}>
                  <Text>เลือกรูปสำหรับ tag {option}</Text>
                  <RadioGroup py="15px" value={valueSelect}>
                    <Stack direction="row">
                      {subProductImg?.map((item, index) => {
                        return (
                          <Radio
                            value={item.id}
                            display="flex"
                            flexDirection="column-reverse"
                            onClick={(event) => setValueSelect(item.id)}
                          >
                            <Image
                              onClick={(event) => setValueSelect(item.id)}
                              mb="10px"
                              src={`https://api.sellpang.com/images/shopee/products/${item.image}`}
                              w="65px"
                              h="65px"
                            />
                          </Radio>
                        );
                      })}
                    </Stack>
                  </RadioGroup>
                  <Text>ชื่อ:</Text>
                  <Input
                    id="option"
                    onChange={(e) => setNameOption(e.target.value)}
                    required
                  />
                  <Text>ราคาสินค้า:</Text>
                  <Input
                    id="price_option"
                    onChange={(e) => setPriceOption(e.target.value)}
                    required
                  />
                  <Text>จำนวนสินค้า:</Text>
                  <Input
                    id="stock"
                    onChange={(e) => setStockOption(e.target.value)}
                    required
                  />
                  <Text>รหัสสินค้า:</Text>
                  <Input
                    id="sku"
                    onChange={(e) => setSkuOption(e.target.value)}
                    required
                  />
                  <Button mt="10px" type="submit">
                    save
                  </Button>
                </form>
              </ModalBody>
              <ModalFooter justifyContent="center"></ModalFooter>
            </ModalContent>
          </Modal>
          <Modal
            onClose={onCloseForm4}
            size="md"
            isOpen={isOpenForm4}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader pr="10px" pt="10px">
                <Flex justifyContent="center">
                  <Text>เพิ่มตัวเลือก {subOption}</Text>
                  <Spacer />
                  <Box>
                    <Image
                      src="/images/close.png"
                      alt=""
                      h="25px"
                      w="25px"
                      onClick={() => closeModal()}
                    />
                  </Box>
                </Flex>
              </ModalHeader>
              <ModalBody>
                <form onSubmit={addSubOption}>
                  <Text>
                    เลือก {option} สำหรับเพิ่ม {subOption}
                  </Text>
                  <RadioGroup py="15px" value={valueSelect}>
                    <Stack direction="row">
                      {dataTable?.map((item, index) => {
                        return (
                          <Radio
                            key={index}
                            value={index}
                            display="flex"
                            flexDirection="column-reverse"
                            onClick={(event) => setValueSelect(index)}
                          >
                            {item.nameOption}
                          </Radio>
                        );
                      })}
                    </Stack>
                  </RadioGroup>
                  <Text>ชื่อ:</Text>
                  <Input
                    id="option"
                    onChange={(e) => setNameSubOption(e.target.value)}
                    required
                  />
                  <Text>ราคาสินค้า:</Text>
                  <Input
                    id="price_option"
                    onChange={(e) => setPriceSubOption(e.target.value)}
                    required
                  />
                  <Text>จำนวนสินค้า:</Text>
                  <Input
                    id="stock"
                    onChange={(e) => setStockSubOption(e.target.value)}
                    required
                  />
                  <Text>รหัสสินค้า:</Text>
                  <Input
                    id="sku"
                    onChange={(e) => setSkuSubOption(e.target.value)}
                    required
                  />
                  <Button mt="10px" type="submit">
                    save
                  </Button>
                </form>
              </ModalBody>
              <ModalFooter justifyContent="center"></ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Box>

      <Modal onClose={onCloseForm1} size="md" isOpen={isOpenForm1} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader alignSelf="flex-end" pr="10px" pt="10px">
            <Image
              src="/images/close.png"
              alt=""
              h="25px"
              w="25px"
              onClick={() => closeModal()}
            />
          </ModalHeader>
          <ModalBody>
            <Box textAlign="-webkit-center">
              <Image src="/images/addproduct.png" alt="" h="120px" w="120px" />
              <Text fontSize="40px" fontWeight="bold">
                ยืนยันการเพิ่มสินค้า
              </Text>
            </Box>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Flex>
              <Button bg="white">ยกเลิก</Button>
              <Button
                bg="red"
                type="submit"
                color="white"
                onClick={() => saveSuccess()}
              >
                ยืนยัน
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal onClose={onCloseForm2} size="xs" isOpen={isOpenForm2} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader alignSelf="flex-end" pr="10px" pt="10px">
            <Image
              src="/images/close.png"
              alt=""
              h="25px"
              w="25px"
              onClick={() => closeModal()}
            />
          </ModalHeader>
          <ModalBody>
            <Box textAlign="-webkit-center">
              <Image src="/images/check.png" alt="" h="120px" w="120px" />
              <Text fontSize="40px" fontWeight="bold">
                เพิ่มสินค้าสำเร็จ
              </Text>
            </Box>
          </ModalBody>
          <ModalFooter justifyContent="center">
            {/* <Link href="/stock">
              <Button bg="red" color="white" _hover={{}}>
                ไปที่หน้าคลังสินค้า
              </Button>
            </Link> */}
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal สร้างหมวดหมู่ */}
      <Modal
        closeOnOverlayClick={false}
        onClose={modalAddCategory.onClose}
        size={"xl"}
        isOpen={modalAddCategory.isOpen}
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
              <Text fontSize={"4xl"}>สร้างหมวดหมู่</Text>
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
              onClick={modalAddCategory.onClose}
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
              onClick={handleConfirmAddCategory}
              bgColor={"#ff0000"}
              color={"white"}
              px={"2rem"}
              height={"35px"}
              disabled={checkInputCategory}
            >
              บันทึก
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* End Modal สร้างหมวดหมู่ */}

      {/* Modal confirm สร้างหมวดหมู่ */}
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
                ยืนยันการสร้างหมวดหมู่
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
      {/* End Modal confirm สร้างหมวดหมู่ */}

      {/* Modal confirm success สร้างหมวดหมู่ */}
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
              <Image src="/images/checkshop.png" width={"130px"} mr={"10px"} />
              <Text fontSize={"5xl"} fontWeight={"bold"} mt={"20px"}>
                สร้างหมวดหมู่เสร็จสิ้น
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
      {/* End Modal confirm success สร้างหมวดหมู่ */}

      {/* Modal แก้ไขหมวดหมู่ */}
      <Modal
        closeOnOverlayClick={false}
        onClose={modalEditCategory.onClose}
        size={"xl"}
        isOpen={modalEditCategory.isOpen}
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
              <Text fontSize={"4xl"}>แก้ไขหมวดหมู่</Text>
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
              <Text fontSize={"25px"}>* รายการหมวดหมู่</Text>
              {/* <Button
                ml={"10px"}
                bgColor={"green"}
                color={"white"}
                fontSize={"20px"}
                leftIcon={
                  <Image src="/images/pluswhite.png" h="13px" w="13px" />
                }
                onClick={handleAddTag2}
              >
                เพิ่ม
              </Button> */}
            </Flex>
            {checkInputCategory2 === false && (
              <Text fontSize={"lg"} color={"red"}>
                *กรุณากรอกข้อมูลหมวดหมู่
              </Text>
            )}
            {tags2.map((tag, index) => (
              <Box mt={"15px"} key={index}>
                <Flex>
                  <Input
                    border={
                      checkInputCategory2 ? "1px solid gray" : "1px solid red"
                    }
                    type="text"
                    value={tag.cat_name}
                    onChange={(event) =>
                      handleTagInputChange2(event, index, tag.image, tag.id)
                    }
                  />
                  <Button
                    ml={"10px"}
                    bgColor={"#ff0000"}
                    color={"white"}
                    onClick={() => handleDeleteTag2(tag.id)}
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
              onClick={modalEditCategory.onClose}
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
              onClick={handleConfirmEditCategory}
              bgColor={"#ff0000"}
              color={"white"}
              px={"2rem"}
              height={"35px"}
              disabled={checkInputCategory2}
            >
              บันทึก
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* End Modal แก้ไขหมวดหมู่ */}

      {/* Modal confirm แก้ไขหมวดหมู่ */}
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
                src="/images/addshop.png"
                width={"150px"}
                // height={"35px"}
                mr={"10px"}
              />
              <Text fontSize={"5xl"} fontWeight={"bold"} mt={"20px"}>
                ยืนยันการแก้ไขหมวดหมู่
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
      {/* End Modal confirm แก้ไขหมวดหมู่ */}

      {/* Modal confirm success แก้ไขหมวดหมู่ */}
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
              <Image src="/images/checkshop.png" width={"130px"} mr={"10px"} />
              <Text fontSize={"5xl"} fontWeight={"bold"} mt={"20px"}>
                แก้ไขหมวดหมู่เสร็จสิ้น
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
      {/* End Modal confirm success แก้ไขหมวดหมู่ */}

      {/* Modal confirm ลบหมวดหมู่ */}
      <Modal
        closeOnOverlayClick={false}
        onClose={modalConfirmDeleteCategory.onClose}
        size={"lg"}
        isOpen={modalConfirmDeleteCategory.isOpen}
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
                ยืนยันการลบหมวดหมู่ ?
              </Text>
              <Text>
                เมื่อทำการลบหมวดหมู่ สินค้าหมวดหมู่นี้
                สถานะจะถูกปิดใช้งานจนกว่าจะทำการเปิดใช้งาน
              </Text>
            </Flex>
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            <Button
              onClick={modalConfirmDeleteCategory.onClose}
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
              onClick={handleConfirmDeleteSuccess}
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
      {/* End Modal confirm ลบหมวดหมู่ */}

      {/* Modal confirm success ลบหมวดหมู่ */}
      <Modal
        closeOnOverlayClick={false}
        onClose={modalConfirmDeleteSuccessCategory.onClose}
        size={"lg"}
        isOpen={modalConfirmDeleteSuccessCategory.isOpen}
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
              <Image src="/images/checkshop.png" width={"130px"} mr={"10px"} />
              <Text fontSize={"5xl"} fontWeight={"bold"} mt={"20px"}>
                ลบหมวดหมู่เสร็จสิ้น
              </Text>
            </Flex>
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            <Button
              onClick={modalConfirmDeleteSuccessCategory.onClose}
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
      {/* End Modal confirm success ลบหมวดหมู่ */}

      {/* Modal confirm สร้าง option ต่างๆของ Product */}
      <Modal
        closeOnOverlayClick={false}
        onClose={modalSaveOption.onClose}
        size={"lg"}
        isOpen={modalSaveOption.isOpen}
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
                ยืนยันการสร้างตัวเลือก ?
              </Text>
            </Flex>
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            <Button
              onClick={modalSaveOption.onClose}
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
              onClick={saveSubOptionSuccess}
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
      {/* End Modal confirm สร้าง option ต่างๆของ Product */}

      {/* Modal confirm success สร้างตัวเลือก */}
      <Modal
        closeOnOverlayClick={false}
        onClose={modalSaveOptionSuccess.onClose}
        size={"lg"}
        isOpen={modalSaveOptionSuccess.isOpen}
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
              <Image src="/images/checkshop.png" width={"130px"} mr={"10px"} />
              <Text fontSize={"5xl"} fontWeight={"bold"} mt={"20px"}>
                สร้างตัวเลือกสินค้าเสร็จสิ้น
              </Text>
            </Flex>
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            <Link href="/stock">
              <Button
                onClick={modalSaveOptionSuccess.onClose}
                bgColor={"#ff0000"}
                color={"white"}
                px={"2rem"}
                height={"35px"}
              >
                ไปที่หน้าร้านค้า
              </Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* End Modal confirm success สร้างตัวเลือก */}
    </>
  );
}

export default addProduct;
