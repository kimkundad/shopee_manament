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
  FormControl,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Spacer,
  Icon,
} from "@chakra-ui/react";
import Link from "next/link";
import { BsArrowLeftCircle } from "react-icons/bs";
import axios from "axios";
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
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
  const [sku, setSku] = useState("");

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

  const comfirmSave = () => {
    onOpenForm1();
  };
  const closeModal = () => {
    onCloseForm1();
    onCloseForm2();
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
    formData.append("sku", sku);
    fileImage.forEach((file, index) => {
      formData.append(`file[${index}]`, file.originFileObj);
    });
    const response = await axios.post(
      "https://shopee-api.deksilp.com/api/addProduct",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    onCloseForm1();
    onOpenForm2();
  };

  const [fileImage, setFileImage] = useState([]);
  const handleSetFileImage = (fileList) => {
    setFileImage(fileList);
  };
  const [fileVideo, setFileVideo] = useState([]);
  const handleSetFileVideo = (fileList) => {
    setFileVideo(fileList);
  };

  const [category, setCategory] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        "https://shopee-api.deksilp.com/api/get_category_all"
      );
      setCategory(res.data.category);
    }

    fetchData();
  }, []);

  return (
    <>
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
                      onClick={handelButton}
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
                      onClick={handelButton}
                    >
                      สินค้ามีตัวเลือก
                    </Button>
                  </Link>
                </Box>
              </Center>
            </WrapItem>
          </Wrap>
        </Box>

        <form>
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
                      <Select
                        placeholder="โปรดเลือก"
                        w="150px"
                        borderColor="gray.400"
                      >
                        {category.map((item, index) => {
                          return (
                            <option value={item.cat_name} key={index}>
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
                      <PicturesWall setFileImage={handleSetFileImage} />
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
                        type="number"
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
                        type="text"
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
                  <Button ml="200px">ยกเลิก</Button>
                  <Button
                    ml="10px"
                    bg="red"
                    color="white"
                    leftIcon={<Image src="/images/save.png" alt="" h="25px" />}
                    _hover={{}}
                    onClick={() => comfirmSave()}
                  >
                    บันทึก
                  </Button>
                </Flex>
              </GridItem>
            </Grid>
          </Box>
          <Modal
            onClose={onCloseForm1}
            size="md"
            isOpen={isOpenForm1}
            isCentered
          >
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
                  <Image
                    src="/images/addproduct.png"
                    alt=""
                    h="120px"
                    w="120px"
                  />
                  <Text fontSize="40px" fontWeight="bold">
                    ยืนยันการเพิ่มสินค้า
                  </Text>
                </Box>
              </ModalBody>
              <ModalFooter justifyContent="center">
                <Flex>
                  <Button bg="white" onClick={() => closeModal()}>
                    ยกเลิก
                  </Button>
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
          <Modal
            onClose={onCloseForm2}
            size="xs"
            isOpen={isOpenForm2}
            isCentered
          >
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
                <Link href="/stock">
                  <Button bg="red" color="white" _hover={{}}>
                    ไปที่หน้าคลังสินค้า
                  </Button>
                </Link>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </form>
      </Box>
    </>
  );
}

export default addProduct;
