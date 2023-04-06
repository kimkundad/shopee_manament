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
} from "@chakra-ui/react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";

class PicturesShop extends React.Component {
  state = {
    fileList: [
      {
        uid: '-1',
        name: this.props.nameImgShop,
        status: 'done',
        url: `https://shopee-api.deksilp.com/images/shopee/shop/${this.props.nameImgShop}`,
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
        uid: '-1',
        name: this.props.nameImgCoverShop,
        status: 'done',
        url: `https://shopee-api.deksilp.com/images/shopee/cover_img_shop/${this.props.nameImgCoverShop}`,
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
  const { isOpen, onClose, Shops } = props;
  const modalEditNextStep = useDisclosure();
  const modalConfirmEdit = useDisclosure();
  const modalConfirmEditSuccess = useDisclosure();
  const [editNameShop, setEditNameShop] = useState(Shops.name_shop);
  const [editDetailShop, setEditDetailShop] = useState(Shops.detail_shop);
  const [editNameShopLength, setEditNameShopLength] = useState(Shops.name_shop.length);
  const [editDetailShopLength, setEditDetailShopLength] = useState(Shops.detail_shop.length);

  const onChangeNameShop = (e) => {
    const nameShop = e.target.value;
    setEditNameShop(nameShop);
    setEditNameShopLength(nameShop.length);
  }

  const onChangeDetailShop = (e) => {
    const detailShop = e.target.value;
    setEditDetailShop(detailShop);
    setEditDetailShopLength(detailShop.length);
  }

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

  const handleEditNextStep = () => {
    onClose();
    modalEditNextStep.onOpen();
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

  const handleConfirmEdit = () => {
    modalEditNextStep.onClose();
    modalConfirmEdit.onOpen();
  };

  const handleConfirmEditSuccess = () => {
    modalConfirmEdit.onClose();
    modalConfirmEditSuccess.onOpen();
  };

  const [editFileImgShop, setEditFileImgShop] = useState([]);
  const handleSetEditFileImgShop = (fileList) => {
    setEditFileImgShop(fileList);
  };

  const [editFileImgCoverShop, setEditFileImgCoverShop] = useState([]);
  const handleSetEditFileImgCoverShop = (fileList) => {
    setEditFileImgCoverShop(fileList);
  };
  
  return (
    <>
      {/* Modal แก้ไขร้านค้า */}
      <Modal
        closeOnOverlayClick={false}
        onClose={onClose}
        isOpen={isOpen}
        size={"xl"}
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
                            borderColor="gray.400"
                            value={editNameShop}
                            onChange={onChangeNameShop}
                          />
                          <InputRightElement pr="45px">
                            <Text>{editNameShopLength}/100</Text>
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
                              value={editDetailShop}
                              onChange={onChangeDetailShop}
                            />
                            <InputRightElement
                              h="100%"
                              alignItems="end"
                              p="10px"
                            >
                              <Text pr="45px">
                                {editDetailShopLength}/3000
                              </Text>
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
                          <PicturesShop
                            setEditFileImgShop={handleSetEditFileImgShop}
                            nameImgShop={Shops.img_shop}
                          />
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
              onClick={onClose}
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
            >
              ถัดไป
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* End Modal แก้ไขร้านค้า */}

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
              onClick={modalEditNextStep.onClose}
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
              onClick={handleConfirmEdit}
              bgColor={"#ff0000"}
              color={"white"}
              px={"2rem"}
              height={"35px"}
              leftIcon={<Image src="/images/updateshop.png" alt="" h="20px" />}
            >
              บันทึก
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
    </>
  );
}

export default modalEditStep1;
