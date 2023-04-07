import React, { useState, useEffect } from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
import {
  Box,
  Flex,
  Image,
  Text,
  Input,
  Tag,
  Button,
  Table,
  Tbody,
  Tr,
  Td,
  Thead,
  Icon,
  Spacer,
  Switch,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import axios from "axios";
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
class PicturesWall extends React.Component {
  state = {
    fileList: [],
  };
  handleChange = ({ fileList }) => {
    /* this.props.setFileImage(fileList); */
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

function option() {
  const router = useRouter();
  const data = router.query;

  const [div, setDiv] = useState([]);
  const handleSelectChange = () => {
    setDiv([...div, true]);
  };

  const [dataTableOption1, setDataTableOption1] = useState([]);
  const [dataTableOption2, setDataTableOption2] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [option1, setOption1] = useState("ตัวเลือกที่ 1");
  const [option2, setOption2] = useState("ตัวเลือกที่ 2");

  const [nameOption1, setNameOption1] = useState(null);
  const [priceOption1, setPriceOption1] = useState(null);
  const [stockOption1, setStockOption1] = useState(null);
  const [skuOption1, setSkuOption1] = useState(null);
  const addOption1 = (event) => {
    event.preventDefault();
    const arrOption1 = {label:nameOption1,priceOption1:priceOption1,stockOption1:stockOption1,skuOption1:skuOption1}
    
    const newArr = [...dataTableOption1,arrOption1];
    
    const newArr34 = newArr.map((item) => ({
      ...item,
      dataTableOption2,
    }))
    setDataTableOption1(newArr)
    setDataTable(newArr34)
  }
  //modal
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
  const comfirmSave = () => {
    onOpenForm1();
  };
  const closeModal = () => {
    onCloseForm1();
    onCloseForm2();
    onCloseForm3();
  };
  const saveSuccess = () => {
    onCloseForm1();
    onOpenForm2();
  };

  const modalAddOptiion1 = (event) => {
    event.preventDefault();
    onOpenForm3();
  };
  console.log(data);
  return (
    <Box>
      <Box>
        <Flex justifyContent="center" p="15px">
          <Link href="/stock/addProductMultiSelect">
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
              เพิ่มตัวเลือกสินค้า
            </Text>
          </Flex>
          <Spacer />
          <Link href="/stock">
            <Image src="/images/close.png" alt="" h="20px" w="20px" />
          </Link>
        </Flex>
      </Box>
      <form>
        <Box px="10%">
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
                        ? (e) => setOption1(e.target.value)
                        : (e) => setOption2(e.target.value)
                    }
                    placeholder="เช่น สี ขนาด ไซด์"
                    required
                  />
                  <Button mt="15px" type="submit" onClick={option1 !== "ตัวเลือกที่ 1" ? modalAddOptiion1:null}>
                    เพิ่มตัวเลือก
                  </Button>
                  <Button ml="15px" mt="15px">
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
                  <Td border="1px solid">{option1}</Td>
                  <Td border="1px solid">{option2}</Td>
                  <Td border="1px solid">ราคา</Td>
                  <Td border="1px solid">สต็อกสินค้า</Td>
                  <Td border="1px solid">รหัสสินค้า</Td>
                  <Td border="1px solid">ใช้งาน</Td>
                  <Td border="1px solid">ดำเนินการ</Td>
                </Tr>
              </Thead>
              <Tbody>
                {dataTable?.map((item, index) => (
                  <React.Fragment key={item.label}>
                    <Tr>
                      <Td
                        border="1px solid"
                        rowSpan={item.dataTableOption2?.length > 0 ? item.dataTableOption2?.length : 1}
                      >
                        {item.label}
                        <PicturesWall/>
                      </Td>
                      <Td border="1px solid">
                        {item.dataTableOption2?.length > 0 ? item.dataTableOption2[0]?.label : null}
                      </Td>
                      <Td border="1px solid">
                        {item.priceOption1}
                      </Td>
                      <Td border="1px solid">
                        {item.stockOption1}
                      </Td>
                      <Td border="1px solid">
                        {item.skuOption1}
                      </Td>
                      <Td border="1px solid">
                        <Switch colorScheme="brand" />
                      </Td>
                      <Td border="1px solid">
                        <Image src="/images/trash-bin.png" h="25px" />
                      </Td>
                    </Tr>
                    {item?.dataTableOption2?.map((subItem, subIndex) => {
                      return subIndex !== 0 ? (
                        <Tr key={`${item.label}-${subIndex}`}>
                          <Td border="1px solid">{subItem.label}</Td>
                          <Td border="1px solid">
                            <Input placeholder="ระบุราคา" />
                          </Td>
                          <Td border="1px solid">
                            <Input placeholder="ระบุจำนวน" />
                          </Td>
                          <Td border="1px solid">
                            <Input placeholder="ระบุจำนวนสินค้า" />
                          </Td>
                          <Td border="1px solid">
                            <Switch colorScheme="brand" />
                          </Td>
                          <Td border="1px solid">
                            <Image src="/images/trash-bin.png" h="25px" />
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
            >
              บันทึก
            </Button>
          </Flex>
        </Box>
      </form>
      <Modal onClose={onCloseForm3} size="md" isOpen={isOpenForm3} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader pr="10px" pt="10px">
            <Flex justifyContent="center">
              <Text>เพิ่มตัวเลือก {option1}</Text>
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
            <form onSubmit={addOption1}>
              <Text>ชื่อ:</Text>
              <Input id="option" onChange={(e) => setNameOption1(e.target.value)} required/>
              <Text>ราคาสินค้า:</Text>
              <Input id="price_option" onChange={(e) => setPriceOption1(e.target.value)} required/>
              <Text>จำนวนสินค้า:</Text>
              <Input id="stock" onChange={(e) => setStockOption1(e.target.value)} required/>
              <Text>รหัสสินค้า:</Text>
              <Input id="sku" onChange={(e) => setSkuOption1(e.target.value)} required/>
              <Button mt="10px" type="submit">
                save
              </Button>
            </form>
          </ModalBody>
          <ModalFooter justifyContent="center"></ModalFooter>
        </ModalContent>
      </Modal>
      {/* <Modal onClose={onCloseForm1} size="md" isOpen={isOpenForm1} isCentered>
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
            <Link href="/stock">
              <Button bg="red" color="white" _hover={{}}>
                ไปที่หน้าคลังสินค้า
              </Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </Box>
  );
}

export default option;
