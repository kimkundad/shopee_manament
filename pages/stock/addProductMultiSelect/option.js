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
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
      </>
    );
  }
}

function option() {
  const router = useRouter();
  const data = router.query;

  const [div, setDiv] = useState([true]);
  const handleSelectChange = () => {
    setDiv([...div, true]);
  };

  const [dataTableOption1, setDataTableOption1] = useState([]);
  const [dataTableOption2, setDataTableOption2] = useState([]);
  const [option1, setOption1] = useState(null);
  const [option2, setOption2] = useState(null);

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
  const comfirmSave = () => {
    onOpenForm1();
  };
  const closeModal = () => {
    onCloseForm1();
    onCloseForm2();
  };
  const saveSuccess = () => {
    onCloseForm1();
    onOpenForm2();
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
                  />
                  <Button mt="15px" onClick={() => comfirmSave()}>
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
          {option1 ? (
            <Box pl="115px" pt="15px">
              <Text>{option1}</Text>
              <Table minWidth="100%" border="1px solid" textAlign="center">
                <Thead>
                  <Tr>
                    <Td border="1px solid">{option1}</Td>
                    <Td border="1px solid">ราคา</Td>
                    <Td border="1px solid">สต็อกสินค้า</Td>
                    <Td border="1px solid">รหัสสินค้า</Td>
                    <Td border="1px solid">ใช้งาน</Td>
                    <Td border="1px solid">ดำเนินการ</Td>
                  </Tr>
                </Thead>
                <Tbody>
                  {dataTableOption1?.map((item, index) => (
                    <React.Fragment key={item.label}>
                      <Tr>
                        <Td border="1px solid">{item.label}</Td>
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
                    </React.Fragment>
                  ))}
                </Tbody>
              </Table>
            </Box>
          ) : null}
          {option2 ? (
            <Box pl="115px" pt="15px">
              <Text>{option2}</Text>
              <Table minWidth="100%" border="1px solid" textAlign="center">
                <Thead>
                  <Tr>
                    <Td border="1px solid">{option2}</Td>
                    <Td border="1px solid">ราคา</Td>
                    <Td border="1px solid">สต็อกสินค้า</Td>
                    <Td border="1px solid">รหัสสินค้า</Td>
                    <Td border="1px solid">ใช้งาน</Td>
                    <Td border="1px solid">ดำเนินการ</Td>
                  </Tr>
                </Thead>
                <Tbody>
                  {dataTableOption2?.map((item, index) => (
                    <React.Fragment key={item.label}>
                      <Tr>
                        <Td border="1px solid">{item.label}</Td>
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
                    </React.Fragment>
                  ))}
                </Tbody>
              </Table>
            </Box>
          ) : null}
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
      <Modal onClose={onCloseForm1} size="md" isOpen={isOpenForm1} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader pr="10px" pt="10px">
            <Flex justifyContent="center">
              <Text>เพิ่มตัวเลือก {option1}</Text>
              <Spacer/>
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
            <Box>
              <Input />
            </Box>
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
