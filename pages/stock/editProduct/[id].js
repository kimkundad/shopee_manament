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
  useDisclosure,
  Spacer,
  Icon,
  Switch,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import { BsArrowLeftCircle } from "react-icons/bs";
import axios from "axios";
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
class PicturesWall extends React.Component {
  state = {
    fileList: [],
  };
  handleChange = ({ fileList }) => {
    this.props.setFileImage(fileList);
    this.setState({ fileList });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.imageData !== prevState.imageData) {
      const fileList = nextProps.imageData.map(image => ({
        uid: image.id,
        name: image.name,
        status: 'done',
        url: `https://shopee-api.deksilp.com/images/shopee/products/${image.image}`
      }));
      return { fileList, imageData: nextProps.imageData };
    }
    return null;
  }
  render() {
    const { fileList } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>เพิ่มรูปภาพ ({fileList.length}/10)</div>
      </div>
    );
    return (
      <>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={this.handleChange}
        >
          {fileList.length >= 10 ? null : uploadButton}
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
        <div style={{ marginTop: 8 }}>เพิ่มวิดีโอ ({fileList.length}/2)</div>
      </div>
    );
    return (
      <>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={this.handleChange}
        >
          {fileList.length >= 2 ? null : uploadButton}
        </Upload>
        {fileList.map((file) => (
          <VideoPlayer key={file.uid} videoSrc={file.url} />
        ))}
      </>
    );
  }
}
function UseEditProduct() {
  const router = useRouter();
  const productId = router.query.id;

  const [dataTable, setDataTable] = useState([]);
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState();
  const [div, setDiv] = useState([]);
  const [option, setOption] = useState("ตัวเลือกที่ 1");
  const [subOption, setSubOption] = useState("ตัวเลือกที่ 2");
  useEffect(() => {
    async function fetchData() {
      const category = await axios.get(
        "https://shopee-api.deksilp.com/api/get_category_all"
      );
      setCategory(category.data.category);
      if (productId) {
        const product = await axios.get(
          `https://shopee-api.deksilp.com/api/getProduct/?product_id=${productId}`
        );
        setProduct(product.data.product[0]);
        setName_product(product.data.product[0].name_product);
        setDetail_product(product.data.product[0].detail_product);
        setPrice(product.data.product[0].price);
        setPrice_sales(product.data.product[0].price_sales);
        setCost(product.data.product[0].cost);
        setStock(product.data.product[0].stock);
        setWeight(product.data.product[0].weight);
        setWidth(product.data.product[0].width_product);
        setLength(product.data.product[0].length_product);
        setHeight(product.data.product[0].height_product);
        setSku(product.data.product[0].sku);
        setCategoryId(product.data.product[0].category);
        if (product.data.product[0].type == 1) {
          setButtonActive([true, false]);
        } else {
          setButtonActive([false, true]);
        }
        let div = [];
        if (product.data.product[0].option1 != null) {
          let option = product.data.product[0].option1
          setOption(option);
          div.push([true])
        }
        if (product.data.product[0].option2 != null) {
          let subOption = product.data.product[0].option2
          setSubOption(subOption);
          div.push([true])
        }
        setDiv(div);
        setDataTable(product.data.product[0].allOption1);
        setImageData(product.data.product[0].allImage)
      }
    }

    fetchData();
  }, [productId]);
  console.log(dataTable);
  console.log(product);
  const [imageData,setImageData] = useState([])
  const [name_product, setName_product] = useState(" ");
  const [detail_product, setDetail_product] = useState(" ");
  const [price, setPrice] = useState(" ");
  const [price_sales, setPrice_sales] = useState(" ");
  const [cost, setCost] = useState(" ");
  const [stock, setStock] = useState(" ");
  const [weight, setWeight] = useState(" ");
  const [width, setWidth] = useState(" ");
  const [length, setLength] = useState(" ");
  const [height, setHeight] = useState(" ");
  const [sku, setSku] = useState(" ");
  const [categoryId, setCategoryId] = useState(" ");
  const [fileImage, setFileImage] = useState([]);
  const [fileImageOption, setFileImageOption] = useState([]);
  const [valueSelect, setValueSelect] = useState(null);
  const handleSetFileImage = (fileList) => {
    setFileImage(fileList);
  };
  const [fileVideo, setFileVideo] = useState([]);
  const handleSetFileVideo = (fileList) => {
    setFileVideo(fileList);
  };

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
    event.preventDefault();
    onOpenForm1();
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
    /* const formData = new FormData();
    formData.append("name_product", name_product);
    formData.append("detail_product", detail_product);
    formData.append("price", price);
    formData.append("price_sales", price_sales);
    formData.append("cost", cost);
    formData.append("stock", stock);
    formData.append("weight", weight);
    formData.append("sku", sku);
    formData.append("sub_option", subOption);
    fileImage.forEach((file, index) => {
      formData.append(`file[${index}]`, file.originFileObj);
    });
    formData.append("dataOption", JSON.stringify(dataTable));
    const response = await axios.post(
      "https://shopee-api.deksilp.com/api/addProductMultiOption",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    ); */
    onCloseForm1();
    onOpenForm2();
  };

  
  const handleSelectChange = () => {
    setDiv([...div, true]);
  };
  

  const [nameOption, setNameOption] = useState(null);
  const [priceOption, setPriceOption] = useState(null);
  const [stockOption, setStockOption] = useState(null);
  const [skuOption, setSkuOption] = useState(null);
  function addOption(event) {
    event.preventDefault();
    const arrOption = {
      op_name: nameOption,
      price: priceOption,
      stock: stockOption,
      sku: skuOption,
      indexImageOption: valueSelect,
      allOption2: [],
    };

    dataTable.push(arrOption);
    setDataTable(dataTable);
    onCloseForm3();
  }

  const [nameSubOption, setNameSubOption] = useState(null);
  const [priceSubOption, setPriceSubOption] = useState(null);
  const [stockSubOption, setStockSubOption] = useState(null);
  const [skuSubOption, setSkuSubOption] = useState(null);
  function addSubOption(event) {
    event.preventDefault();
    const arrSubOption = {
      nameSubOption: nameSubOption,
      priceSubOption: priceSubOption,
      stockSubOption: stockSubOption,
      skuSubOption: skuSubOption,
    };
    dataTable[valueSelect].allOption2.push(arrSubOption);
    setDataTable(dataTable);
    onCloseForm4();
  }
  function deleteOption(index = null, subIndex = null) {
    const newArr = [...dataTable];
    if (subIndex == null) {
      newArr.splice(index, 1);
      setDataTable(newArr);
    } else {
      newArr[index].allOption2.splice(subIndex, 1);
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
      if (e.allOption2?.length > 0) {
        e.allOption2 = [];
      }
    });
    setDiv([true]);
  }

  const [displayAdditionOption, setDisplayAdditionOption] = useState(false);
  const [displayAddProduct, setDisplayAddProduct] = useState(true);
  function additionOption() {
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
      newArr[index] = {
        ...newArr[index],
        [id]: event.target.value,
      };
    } else {
      newArr[index].allOption2[subIndex] = {
        ...newArr[index].allOption2[subIndex],
        [id]: event.target.value,
      };
    }

    setDataTable(newArr);
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
                  แก้ไขสินค้า
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
                    <Button
                      id="0"
                      bg={buttonActive[0] ? "red" : "white"}
                      color={buttonActive[0] ? "white" : "red"}
                      border="2px solid red"
                      fontSize="24px"
                      borderRadius="3xl"
                      w="150px"
                      _hover={{}}
                      onClick={handelButton}
                    >
                      สินค้าชิ้นเดียว
                    </Button>
                  </Box>
                </Center>
              </WrapItem>
              <WrapItem>
                <Center>
                  <Box>
                    <Button
                      id="1"
                      bg={buttonActive[1] ? "red" : "white"}
                      color={buttonActive[1] ? "white" : "red"}
                      border="2px solid red"
                      fontSize="24px"
                      borderRadius="3xl"
                      w="150px"
                      _hover={{}}
                      onClick={handelButton}
                    >
                      สินค้ามีตัวเลือก
                    </Button>
                  </Box>
                </Center>
              </WrapItem>
            </Wrap>
          </Box>
          <from>
            {product ? (
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
                            value={name_product}
                            placeholder="ระบุชื่อสินค้า"
                            borderColor="gray.400"
                            onChange={(e) => setName_product(e.target.value)}
                            isRequired
                            maxLength={100}
                          />
                          <InputRightElement pr="45px">
                            <Text>
                              {name_product ? name_product.length : 0}/100
                            </Text>
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
                              onChange={(e) =>
                                setDetail_product(e.target.value)
                              }
                            />
                            <InputRightElement
                              h="100%"
                              alignItems="end"
                              p="10px"
                            >
                              <Text pr="45px">
                                {detail_product ? detail_product.length : 0}
                                /3000
                              </Text>
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
                            value={categoryId}
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
                        </Box>
                      </GridItem>
                      <GridItem colSpan={1} justifySelf="end">
                        <Box pr="5px">
                          <Text>รูปภาพสินค้า : </Text>
                        </Box>
                      </GridItem>
                      <GridItem colSpan={2}>
                        <Box>
                          <PicturesWall setFileImage={handleSetFileImage} imageData={imageData} />
                        </Box>
                      </GridItem>
                      <GridItem colSpan={1} justifySelf="end">
                        <Box pr="5px">
                          <Text>วิดีโอสินค้า : </Text>
                        </Box>
                      </GridItem>
                      <GridItem colSpan={2}>
                        <VideoWall setFileVideo={handleSetFileVideo} />
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
                          <Input
                            pr="40px"
                            placeholder="ระบุรหัสสินค้า"
                            value={sku}
                            onChange={(e) => setSku(parseInt(e.target.value))}
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
                          <Input
                            pr="40px"
                            type="number"
                            placeholder="ระบุราคาสินค้า"
                            value={price}
                            onChange={(e) => setPrice(parseInt(e.target.value))}
                            isRequired
                          />
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
                          <Input
                            pr="40px"
                            type="number"
                            placeholder="ระบุลดราคา"
                            value={price_sales}
                            onChange={(e) =>
                              setPrice_sales(parseInt(e.target.value))
                            }
                          />
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
                            placeholder="ระบุความกว้างสินค้า"
                            value={width}
                            onChange={(e) => setWidth(e.target.value)}
                          />
                          <InputRightElement>
                            <Text>Cm</Text>
                          </InputRightElement>
                        </InputGroup>
                        <InputGroup mt="10px">
                          <Input
                            pr="40px"
                            placeholder="ระบุความยาวสินค้า"
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                          />
                          <InputRightElement>
                            <Text>Cm</Text>
                          </InputRightElement>
                        </InputGroup>
                        <InputGroup mt="10px">
                          <Input
                            pr="40px"
                            placeholder="ระบุความสูงสินค้า"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                          />
                          <InputRightElement>
                            <Text>Cm</Text>
                          </InputRightElement>
                        </InputGroup>
                        {buttonActive[0] ? (
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
                        )}
                      </GridItem>
                    </Grid>
                  </GridItem>
                </Grid>
              </Box>
            ) : null}
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
          </Box>
          <Box px="10%">
            {div?.map((item, index) => {
              return (
                <Flex pt="10px" justifyContent="center" key={index}>
                  <Text fontSize="24px" px="15px" whiteSpace="nowrap">
                    รูปแบบที่ {index + 1} :
                  </Text>
                  <Box width="-webkit-fill-available">
                    <Input
                      value={index == 0 ? option  : subOption}
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
                  <Tr>
                    <Td border="1px solid">{option}</Td>
                    <Td border="1px solid">{subOption}</Td>
                    <Td border="1px solid">ราคา</Td>
                    <Td border="1px solid">สต็อกสินค้า</Td>
                    <Td border="1px solid">รหัสสินค้า</Td>
                    <Td border="1px solid">ใช้งาน</Td>
                    <Td border="1px solid">ดำเนินการ</Td>
                  </Tr>
                </Thead>
                <Tbody>
                  {dataTable?.map((item, index) => (
                    <React.Fragment key={index}>
                      <Tr>
                        <Td
                          border="1px solid"
                          rowSpan={
                            item?.allOption2?.length > 0
                              ? item?.allOption2?.length
                              : 1
                          }
                        >
                          {item.op_name}
                          <Image
                            src={`https://shopee-api.deksilp.com/images/shopee/products/${item.img_name}`}
                          />
                        </Td>
                        <Td border="1px solid">
                          {item?.allOption2?.length > 0 ? (
                            <Input
                              value={
                                item?.allOption2[0]?.sub_op_name !== "undefined"
                                  ? item?.allOption2[0]?.sub_op_name
                                  : ""
                              }
                              onChange={(e) =>
                                editDataTable(e, index, 0, "sub_op_name")
                              }
                            />
                          ) : null}
                        </Td>
                        {item?.allOption2?.length > 0 ? (
                          <Td border="1px solid">
                            <Input
                              value={item?.allOption2[0].price}
                              onChange={(e) =>
                                editDataTable(e, index, 0, "price")
                              }
                            />
                          </Td>
                        ) : (
                          <Td border="1px solid">
                            <Input
                              value={item?.price}
                              onChange={(e) =>
                                editDataTable(e, index, null, "price")
                              }
                            />
                          </Td>
                        )}
                        {item?.allOption2?.length > 0 ? (
                          <Td border="1px solid">
                            <Input
                              value={item?.allOption2[0].stock}
                              onChange={(e) =>
                                editDataTable(e, index, 0, "stock")
                              }
                            />
                          </Td>
                        ) : (
                          <Td border="1px solid">
                            <Input
                              value={item?.stock}
                              onChange={(e) =>
                                editDataTable(e, index, null, "stock")
                              }
                            />
                          </Td>
                        )}
                        {item?.allOption2?.length > 0 ? (
                          <Td border="1px solid">
                            <Input
                              value={item?.allOption2[0].sku}
                              onChange={(e) =>
                                editDataTable(e, index, 0, "sku")
                              }
                            />
                          </Td>
                        ) : (
                          <Td border="1px solid">
                            <Input
                              value={item?.sku}
                              onChange={(e) =>
                                editDataTable(e, index, null, "sku")
                              }
                            />
                          </Td>
                        )}
                        <Td border="1px solid">
                          <Switch colorScheme="brand" />
                        </Td>
                        {item?.allOption2?.length == 0 ? (
                          <Td border="1px solid">
                            <Button onClick={() => deleteOption(index)}>
                              <Image src="/images/trash-bin.png" h="25px" />
                            </Button>
                          </Td>
                        ) : (
                          <Td border="1px solid">
                            <Button onClick={() => deleteOption(index, 0)}>
                              <Image src="/images/trash-bin.png" h="25px" />
                            </Button>
                          </Td>
                        )}
                      </Tr>
                      {item?.allOption2?.map((subItem, subIndex) => {
                        return subIndex !== 0 ? (
                          <Tr key={`${item.sub_op_name}-${subIndex}`}>
                            <Td border="1px solid">
                              <Input
                                value={subItem.sub_op_name}
                                onChange={(e) =>
                                  editDataTable(
                                    e,
                                    index,
                                    subIndex,
                                    "sub_op_name"
                                  )
                                }
                              />
                            </Td>
                            <Td border="1px solid">
                              <Input
                                value={subItem.price}
                                onChange={(e) =>
                                  editDataTable(e, index, subIndex, "price")
                                }
                              />
                            </Td>
                            <Td border="1px solid">
                              <Input
                                value={subItem.sku}
                                onChange={(e) =>
                                  editDataTable(e, index, subIndex, "sku")
                                }
                              />
                            </Td>
                            <Td border="1px solid">
                              <Input
                                value={subItem.stock}
                                onChange={(e) =>
                                  editDataTable(e, index, subIndex, "stock")
                                }
                              />
                            </Td>
                            <Td border="1px solid">
                              <Switch colorScheme="brand" />
                            </Td>
                            <Td border="1px solid">
                              <Button
                                onClick={() => deleteOption(index, subIndex)}
                              >
                                <Image src="/images/trash-bin.png" h="25px" />
                              </Button>
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
              <Button>ยกเลิก</Button>
              <Button
                ml="10px"
                type="submit"
                bg="red"
                color="white"
                leftIcon={<Image src="/images/save.png" alt="" h="25px" />}
                _hover={{}}
                onClick={comfirmSave}
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
                      {fileImage?.map((item, index) => {
                        return index !== 0 ? (
                          <Radio
                            value={index}
                            display="flex"
                            flexDirection="column-reverse"
                            onClick={(event) => setValueSelect(index)}
                          >
                            <Image
                              onClick={(event) => setValueSelect(index)}
                              mb="10px"
                              src={item.thumbUrl}
                              w="50px"
                              h="50px"
                            />
                          </Radio>
                        ) : null;
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
                            {item.op_name}
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
                ยืนยันการแก้ไขสินค้า
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
                แก้ไขสินค้าสำเร็จ
              </Text>
            </Box>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Link href="/stock">
              <Button bg="red" color="white" _hover={{}}>
                ไปที่หน้าคลังสินค้า
              </Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UseEditProduct;
