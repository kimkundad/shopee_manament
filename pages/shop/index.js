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
} from "@chakra-ui/react";
import ListCheck from "@/components/MenuList";
import CardShop from "@/components/cardShop";
import Axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";

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
  const [getProduct, setGetProduct] = useState([
    {
      id: 1,
      codeProduct: "001",
      productImage: "images/addProduct.png",
      nameProduct: "pangpang",
      priceProduct: 149,
      stockProduct: 15,
      checked: false,
    },
    {
      id: 2,
      codeProduct: "002",
      productImage: "images/addProduct.png",
      nameProduct: "pangpang",
      priceProduct: 159,
      stockProduct: 16,
      checked: false,
    },
    {
      id: 3,
      codeProduct: "003",
      productImage: "images/addProduct.png",
      nameProduct: "pangpang",
      priceProduct: 169,
      stockProduct: 17,
      checked: false,
    },
    {
      id: 4,
      codeProduct: "004",
      productImage: "images/addProduct.png",
      nameProduct: "pangpang",
      priceProduct: 179,
      stockProduct: 18,
    },
    {
      id: 5,
      codeProduct: "005",
      productImage: "images/addProduct.png",
      nameProduct: "pangpang",
      priceProduct: 189,
      stockProduct: 19,
      checked: false,
    },
    {
      id: 6,
      codeProduct: "006",
      productImage: "images/addProduct.png",
      nameProduct: "pangpang",
      priceProduct: 199,
      stockProduct: 20,
      checked: false,
    },
  ]);

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
  const [statusDelete, setStatusDelete] = useState(false);

  const handleClickNextStopAdd = () => {
    modalAdd.onClose();
    modalAdd2.onOpen();
  };

  const handleConfirm = () => {
    modalAdd2.onClose();
    modalConfirm.onOpen();
  };

  const handleConfirmSuccess = () => {
    const formData = new FormData();
    formData.append("nameShop", nameShop);
    formData.append("detailShop", detailShop);
    fileImgShop.forEach((file, index) => {
      formData.append(`file[${index}]`, file.originFileObj);
    });
    fileImgCoverShop.forEach((file, index) => {
      formData.append(`file2[${index}]`, file.originFileObj);
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

  const handleSelectAllChange = (e) => {
    const isChecked = e.target.checked;
    const updatedProducts = getProduct.map((product) => ({
      ...product,
      checked: isChecked,
    }));
    setGetProduct(updatedProducts);
  };

  const handleProductChange = (id) => (e) => {
    const isChecked = e.target.checked;
    const updatedProducts = getProduct.map((product) =>
      product.id === id ? { ...product, checked: isChecked } : product
    );
    setGetProduct(updatedProducts);
  };

  const allChecked = getProduct.every((product) => product.checked);
  const isIndeterminate =
    getProduct.some((product) => product.checked) && !allChecked;

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

  const [fileImgShop, setFileImgShop] = useState([]);
  const handleSetFileImgShop = (fileList) => {
    setFileImgShop(fileList);
  };

  const [fileImgCoverShop, setFileImgCoverShop] = useState([]);
  const handleSetFileImgCoverShop = (fileList) => {
    setFileImgCoverShop(fileList);
  };

  //   count name shop /100
  const [lengthNameShop, setLengthNameShop] = useState(0);
  const [nameShop, setNameShop] = useState("");
  const handleChangeNameShop = (e) => {
    const NameShop = e.target.value;
    setLengthNameShop(NameShop.length);
    setNameShop(NameShop);
  };

  //   count detail shop /3000
  const [lengthDetailShop, setLengthDetailShop] = useState(0);
  const [detailShop, setDetailShop] = useState("");
  const handleChangeDetailShop = (e) => {
    const DetailShop = e.target.value;
    setLengthDetailShop(DetailShop.length);
    setDetailShop(DetailShop);
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
          <CardShop Products={getProducts} Shops={getShops} statusDelete={setStatusDelete} />
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
                            borderColor="gray.400"
                            onChange={handleChangeNameShop}
                          />
                          <InputRightElement pr="45px">
                            <Text>{lengthNameShop}/100</Text>
                          </InputRightElement>
                        </InputGroup>
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
                              borderColor="gray.400"
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
            >
              ถัดไป
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* End Modal สร้างร้านค้า */}

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
                        isChecked={allChecked}
                        isIndeterminate={isIndeterminate}
                        onChange={handleSelectAllChange}
                      />
                      เลือกทั้งหมด
                    </Th>
                    <Th color={"white"}>รหัสสินค้า</Th>
                    <Th color={"white"}>รูปสินค้า</Th>
                    <Th color={"white"}>ชื่อสินค้า</Th>
                    <Th color={"white"}>ราคา</Th>
                    <Th color={"white"}>สต๊อกสินค้า</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {getProduct.map((getPro, index) => (
                    <Tr key={getPro.id}>
                      <Td>
                        <Checkbox
                          isChecked={getPro.checked}
                          onChange={handleProductChange(getPro.id)}
                        />
                      </Td>
                      <Td>{getPro.codeProduct}</Td>
                      <Td isNumeric>
                        <Image
                          src={getPro.productImage}
                          width={"30px"}
                          height={"25px"}
                        />
                      </Td>
                      <Td>{getPro.nameProduct}</Td>
                      <Td>{getPro.priceProduct}</Td>
                      <Td>
                        <Flex alignItems={"center"}>
                          <NumberInput
                            defaultValue={getPro.stockProduct}
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

      {/* Modal สร้างร้านค้า */}
      <Modal
        closeOnOverlayClick={false}
        onClose={modalPreview.onClose}
        size={"xl"}
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
          <ModalBody></ModalBody>
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
