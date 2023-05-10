import React, { useState, useEffect } from "react";
import Link from "next/link";
// import Image from "next/image";
// import orders from "@/data/orders";
import axios from "axios";
import {
  Flex,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Box,
  Spacer,
  Button,
  HStack,
  Select,
  Avatar,
  IconButton,
  Checkbox,
  Skeleton,
  Wrap,
  WrapItem,
  Center,
  Badge,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Tooltip,
  hasArrow,
  CheckboxGroup,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import {
  Icon,
  RepeatIcon,
  HamburgerIcon,
  AddIcon,
  ExternalLinkIcon,
  EditIcon,
} from "@chakra-ui/icons";

import {
  BsAlarm,
  BsBoxSeam,
  BsArrowReturnLeft,
  BsPatchCheckFill,
  BsTruck,
  BsFillClipboardCheckFill,
  BsXOctagonFill,
  BsClockHistory,
  BsBoxFill,
  BsXCircleFill,
  BsEyeFill,
  BsFillClipboard2CheckFill,
} from "react-icons/bs";

function MenuCheckboxList(props) {
  const { values, onValueChange } = props;

  function handleCheck(e, index) {
    const newValues = [...values];
    newValues[index].isShow = e.target.checked;
    onValueChange(newValues);
    console.log(props.values);
  }

  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={Button}
        bg="white !important"
        fontSize="21px"
        minWidth={"200"}
        leftIcon={
          <Image src="/images/menu.png" width="25px" height="25px" alt="menu" />
        }
        rightIcon={
          <Image
            src="/images/arrow/down-filled-triangular-arrow.png"
            width="20px"
            height="10px"
            alt="arrow-down"
          />
        }
        _hover={{}}
      >
        เลือกตัวแสดงผล
      </MenuButton>

      <MenuList
        minWidth="200px"
        border="1px"
        borderColor="red"
        borderRadius="md"
      >
        <CheckboxGroup>
          {values.map((item, index) => {
            return (
              <MenuItem key={index}>
                <Checkbox
                  sx={{
                    ".chakra-checkbox__control": {
                      background: "white !important",
                      borderColor: "black !important",
                      color: "#3FFF33 !important",
                      border: "1px solid",
                    },
                  }}
                  defaultChecked
                  onChange={(e) => handleCheck(e, index)}
                >
                  {item.label}
                </Checkbox>
              </MenuItem>
            );
          })}
        </CheckboxGroup>
      </MenuList>
    </Menu>
  );
}

// function InsertDataTable(props) {
//   let query = props.name;
//   let searchValue = props.onSearchValue;
//   let searchDate = props.onSearchDate;
//   const { onFilteredAmount, onFilterCountOrders } = props;

//   let totalAmount = 0;
//   let totalOrders = 0;
//   return (
//     <>
//       {onFilteredAmount(totalAmount)}
//       {onFilterCountOrders(totalOrders)}
//     </>
//   );
// }

export default function Order() {
  const labelLists = [
    { label: "เลือกทั้งหมด", isShow: true },
    { label: "เลขคำสั่งซื้อ", isShow: true },
    // { label: "รูปสินค้า", isShow: true },
    { label: "ชื่อผู้รับ", isShow: true },
    { label: "ที่อยู่", isShow: true },
    { label: "เบอร์โทร", isShow: true },
    { label: "จำนวน", isShow: true },
    { label: "ยอดสั่งซื้อ", isShow: true },
    { label: "การชำระเงิน", isShow: true },
    { label: "วันที่สั่งซื้อ", isShow: true },
    // { label: "ผู้ทำรายการ", isShow: false },
    { label: "ดำเนินการ", isShow: true },
  ];
  const [orders, setOrders] = useState([]);
  const [navbarTab, setNavbarTab] = useState("ที่ต้องชำระ");
  const [searchId, setSearchId] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [checkBoxData, setCheckBoxData] = useState(labelLists);
  let totalAmount = 0;
  let totalQuantity = 0;
  const modalSlipPayment = useDisclosure();
  const modalOpenImgSlipPayment = useDisclosure();

  const fetchData = async () => {
    const response = await axios.get(
      `https://shopee-api.deksilp.com/api/getOrders`
    );
    setOrders(response.data.orders);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const countOrder = orders.filter(
    (item) => item.status === "ที่ต้องชำระ"
  ).length;
  const countPacking = orders.filter(
    (item) => item.status === "กำลังแพ็ค"
  ).length;
  const countReadyShip = orders.filter(
    (item) => item.status === "พร้อมส่ง"
  ).length;
  const countDelivering = orders.filter(
    (item) => item.status === "จัดส่งสำเร็จ"
  ).length;
  const countDelivered = orders.filter(
    (item) => item.status === "ส่งสำเร็จ"
  ).length;
  const countRemand = orders.filter((item) => item.status === "ตีกลับ").length;
  const countCancel = orders.filter((item) => item.status === "ยกเลิก").length;

  const handleSetStatusOrder = async (index, id, status) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("status", status);
    const response = await axios.post(
      "https://shopee-api.deksilp.com/api/setStatusOrders",
      formData
    );
    if (response.data.success) {
      fetchData();
    }
  };

  const handleOpenModalSlipPayment = (id) => {
    modalSlipPayment.onOpen();
    const data = orders.filter((item) => item.ID === id)
    console.log('data',data);
  };

  const handleOpenModalImgSlip = () => {
    modalOpenImgSlipPayment.onOpen();
  };
  return (
    <>
      {/* Start Header */}
      <Box pt={10}>
        <Center>
          <HStack>
            <Image
              width={"36px"}
              height={"36px"}
              src={"/images/menu/คำสั่งซื้อ.png"}
              alt={"รูปคำสั่งซื้อ"}
            />
            <Text as="b" fontSize="4xl" color={"#fe4900"} p={3}>
              คำสั่งซื้อ
            </Text>
          </HStack>
        </Center>
      </Box>
      {/* End Header */}

      {/* Start Tabs */}
      <Box pt={5}>
        <Tabs>
          <TabList>
            <Tab
              _selected={{ borderBottomColor: "red", borderBottomWidth: "3px" }}
              w="160px"
              onClick={() => setNavbarTab("ที่ต้องชำระ")}
            >
              <Icon as={BsAlarm} boxSize={5} />
              <Text as="b" fontSize={17} px={4}>
                ออเดอร์
              </Text>
              <Badge
                boxSize={5}
                fontSize={15}
                color={"white"}
                bg="red.400"
                textAlign={"center"}
                borderRadius={"50%"}
              >
                {countOrder}
              </Badge>
            </Tab>
            <Tab
              _selected={{ borderBottomColor: "red", borderBottomWidth: "3px" }}
              w="160px"
              onClick={() => setNavbarTab("กำลังแพ็ค")}
            >
              <Icon as={BsBoxSeam} boxSize={5} />
              <Text as="b" fontSize={17} px={4}>
                กำลังแพ็ค
              </Text>
              <Badge
                boxSize={5}
                fontSize={15}
                color={"white"}
                bg="blue.400"
                textAlign={"center"}
                borderRadius={"50%"}
              >
                {countPacking}
              </Badge>
            </Tab>
            <Tab
              _selected={{ borderBottomColor: "red", borderBottomWidth: "3px" }}
              w="160px"
              onClick={() => setNavbarTab("พร้อมส่ง")}
            >
              <Icon as={BsTruck} boxSize={5} />
              <Text as="b" fontSize={17} px={4}>
                พร้อมส่ง
              </Text>
              <Badge
                boxSize={5}
                fontSize={15}
                color={"white"}
                bg="yellow.400"
                textAlign={"center"}
                borderRadius={"50%"}
              >
                {countReadyShip}
              </Badge>
            </Tab>
            <Tab
              _selected={{ borderBottomColor: "red", borderBottomWidth: "3px" }}
              w="160px"
              onClick={() => setNavbarTab("จัดส่งสำเร็จ")}
            >
              <Icon as={BsFillClipboardCheckFill} boxSize={5} />
              <Text as="b" fontSize={17} px={4}>
                ส่งแล้ว
              </Text>
              <Badge
                boxSize={5}
                fontSize={15}
                color={"white"}
                bg="green.400"
                textAlign={"center"}
                borderRadius={"50%"}
              >
                {countDelivering}
              </Badge>
            </Tab>
            <Tab
              _selected={{ borderBottomColor: "red", borderBottomWidth: "3px" }}
              w="160px"
              onClick={() => setNavbarTab("ส่งสำเร็จ")}
            >
              <Icon as={BsPatchCheckFill} boxSize={5} />
              <Text as="b" fontSize={17} px={4}>
                ส่งสำเร็จ
              </Text>
              <Badge
                boxSize={5}
                fontSize={15}
                color={"white"}
                bg="purple.400"
                textAlign={"center"}
                borderRadius={"50%"}
              >
                {countDelivered}
              </Badge>
            </Tab>
            <Tab
              _selected={{ borderBottomColor: "red", borderBottomWidth: "3px" }}
              w="160px"
              onClick={() => setNavbarTab("ตีกลับ")}
            >
              <Icon as={BsArrowReturnLeft} boxSize={5} />
              <Text as="b" fontSize={17} px={4}>
                ตีกลับ
              </Text>
              <Badge
                boxSize={5}
                fontSize={15}
                color={"white"}
                bg="orange.400"
                textAlign={"center"}
                borderRadius={"50%"}
              >
                {countRemand}
              </Badge>
            </Tab>
            <Tab
              _selected={{ borderBottomColor: "red", borderBottomWidth: "3px" }}
              w="160px"
              onClick={() => setNavbarTab("ยกเลิก")}
            >
              <Icon as={BsXOctagonFill} boxSize={5} />
              <Text as="b" fontSize={17} px={4}>
                ยกเลิก
              </Text>
              <Badge
                boxSize={5}
                fontSize={15}
                color={"white"}
                bg="pink.400"
                textAlign={"center"}
                borderRadius={"50%"}
              >
                {countCancel}
              </Badge>
            </Tab>
          </TabList>
        </Tabs>
      </Box>
      {/* End Tabs */}

      {/* Start Navbar */}
      <Box p={5}>
        <Flex>
          <Box>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Image
                  src="/images/search.png"
                  width={"20px"}
                  height={"20px"}
                  alt=""
                />
              </InputLeftElement>
              <Input
                borderRadius="3xl"
                type="text"
                fontSize="21px"
                borderColor="gray.500"
                placeholder="ค้นหาคำสั่งซื้อ"
                value={searchId}
                onChange={(e) => {
                  setSearchId(e.target.value);
                }}
              />
            </InputGroup>
          </Box>

          <Box ml={5}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Image
                  src="/images/calendar.png"
                  width={"20px"}
                  height={"20px"}
                  alt=""
                />
              </InputLeftElement>
              <Input
                type="date"
                borderRadius="3xl"
                fontSize="21px"
                borderColor="gray.500"
                placeholder="เลือกวันที่"
                value={searchDate}
                onChange={(e) => {
                  setSearchDate(e.target.value);
                }}
              />
              <InputRightElement>
                <Tooltip hasArrow label="รีเซ็ทปฎิทิน" bg="red" color="white">
                  <Icon
                    as={RepeatIcon}
                    boxSize={5}
                    color="red"
                    onClickCapture={(e) => {
                      setSearchDate("");
                    }}
                  />
                </Tooltip>
              </InputRightElement>
            </InputGroup>
          </Box>

          <Box ml={5} border="1px" borderColor="red" borderRadius="md">
            <MenuCheckboxList
              values={checkBoxData}
              onValueChange={setCheckBoxData}
            />
          </Box>

          <Spacer />
          {/* <Box borderWidth="1px" borderColor="red" borderRadius="md">
            <Link href="/order/add">
              <Button
                fontSize="21px"
                leftIcon={
                  <Image
                    src="/images/pluswhite.png"
                    width={"15px"}
                    height={"15px"}
                    alt=""
                  />
                }
                bg="red"
                variant="solid"
                color="white"
                _hover={{}}
              >
                เพิ่มคำสั่งซื้อ
              </Button>
            </Link>
          </Box> */}
        </Flex>
      </Box>
      {/* End Navbar */}

      {/* Start Table */}
      <Box p={5} minHeight={800}>
        <Flex justifyContent={"space-between"}>
          <TableContainer fontSize="17" width={"100%"}>
            <Table
              variant="striped"
              colorScheme="gray"
              css={{
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <Thead>
                <Tr bg={"#f84c01"}>
                  {labelLists.map((item, index) => {
                    if (checkBoxData[index] && checkBoxData[index].isShow) {
                      return (
                        <Th
                          p={2}
                          color={"white"}
                          fontSize="15"
                          textAlign={"center"}
                          key={index}
                        >
                          {item.label === "ดำเนินการ" && (
                            <>
                              {navbarTab === "ตีกลับ" && (
                                <Text>วันที่ตีกลับ</Text>
                              )}
                              {navbarTab === "ยกเลิก" && (
                                <Text>วันที่ยกเลิก</Text>
                              )}
                              {navbarTab !== "ยกเลิก" &&
                                navbarTab !== "ตีกลับ" && (
                                  <Text>{item.label}</Text>
                                )}
                            </>
                          )}
                          {item.label !== "ดำเนินการ" && (
                            <>
                              <Text>{item.label}</Text>
                            </>
                          )}
                          {index === 0 && (
                            <Center>
                              <Checkbox
                                size="md"
                                colorScheme="green"
                                defaultChecked
                              />
                            </Center>
                          )}
                        </Th>
                      );
                    }
                  })}
                </Tr>
              </Thead>
              <Tbody>
                {orders
                  .filter((order) => {
                    if (searchId !== "") {
                      return (
                        (order.status.includes(navbarTab) &&
                          order.orderId.toString().includes(searchId)) ||
                        order.receiverName.toString().includes(searchId) ||
                        order.address.toString().includes(searchId) ||
                        order.phoneNumber.toString().includes(searchId) ||
                        order.amount.toString().includes(searchId)
                      );
                    } else if (searchDate !== "") {
                      return (
                        order.status.includes(navbarTab) &&
                        order.createAt.includes(searchDate)
                      );
                    } else {
                      return order.status.includes(navbarTab);
                    }
                  })
                  .map((filteredOrder, index) => {
                    const orderAmount = Number(filteredOrder.amount);
                    const orderQuantity = Number(filteredOrder.quantity);
                    totalAmount += orderAmount;
                    totalQuantity += orderQuantity;
                    return (
                      <Tr key={`${filteredOrder.orderId}-${index}`}>
                        {checkBoxData[0] && checkBoxData[0].isShow ? (
                          <Td
                            px={5}
                            py={2}
                            borderLeftRadius={"10"}
                            textAlign={"center"}
                          >
                            <Checkbox
                              size="md"
                              colorScheme="green"
                              defaultChecked
                            ></Checkbox>
                          </Td>
                        ) : null}
                        {checkBoxData[1] && checkBoxData[1].isShow ? (
                          <Td p={2} textAlign={"center"}>
                            {filteredOrder.orderId}
                          </Td>
                        ) : null}
                        {/* {checkBoxData[2] && checkBoxData[2].isShow ? (
                          <Td p={2}>
                            <Center>
                              <Image
                                src={`https://shopee-api.deksilp.com/images/shopee/products/${filteredOrder.imageThumbnail}`}
                                width={30}
                                height={30}
                                alt="bay"
                              />
                            </Center>
                          </Td>
                        ) : null} */}
                        {checkBoxData[2] && checkBoxData[2].isShow ? (
                          <Td p={2} textAlign={"center"}>
                            {filteredOrder.receiverName}
                          </Td>
                        ) : null}
                        {checkBoxData[3] && checkBoxData[3].isShow ? (
                          <Td p={2} textAlign={"center"}>
                            {filteredOrder.address}
                          </Td>
                        ) : null}
                        {checkBoxData[4] && checkBoxData[4].isShow ? (
                          <Td p={2} textAlign={"center"}>
                            {filteredOrder.phoneNumber}
                          </Td>
                        ) : null}
                        {checkBoxData[5] && checkBoxData[5].isShow ? (
                          <Td p={2} textAlign={"center"}>
                            {filteredOrder.quantity}
                          </Td>
                        ) : null}
                        {checkBoxData[6] && checkBoxData[6].isShow ? (
                          <Td p={2} textAlign={"center"}>
                            {filteredOrder.amount}
                          </Td>
                        ) : null}
                        {checkBoxData[7] && checkBoxData[7].isShow ? (
                          <Td p={2}>
                            <Center>
                              <Image
                                src={`/images/banks/${filteredOrder.bankThumbnail}`}
                                width={30}
                                height={30}
                                alt="bay"
                              />
                            </Center>
                          </Td>
                        ) : null}
                        {checkBoxData[8] && checkBoxData[8].isShow ? (
                          <Td p={2} textAlign={"center"}>
                            {filteredOrder.createAt}
                          </Td>
                        ) : null}
                        {/* {checkBoxData[10] && checkBoxData[10].isShow ? (
                          <Td p={2} textAlign={"center"}>
                            Admin
                          </Td>
                        ) : null} */}
                        {checkBoxData[9] && checkBoxData[9].isShow ? (
                          <Td
                            p={2}
                            borderRightRadius={"10"}
                            textAlign={"center"}
                          >
                            {navbarTab == "ที่ต้องชำระ" ? (
                              <Menu>
                                <MenuButton
                                  as={IconButton}
                                  aria-label="Options"
                                  icon={<HamburgerIcon />}
                                  variant="outline"
                                  border="none"
                                />
                                <MenuList>
                                  <MenuItem
                                    icon={
                                      <Icon
                                        as={BsFillClipboard2CheckFill}
                                        boxSize={4}
                                      />
                                    }
                                    onClick={() => {handleOpenModalSlipPayment(filteredOrder.ID)}}
                                  >
                                    ดูหลักฐานการชำระเงิน
                                  </MenuItem>
                                  <MenuItem
                                    icon={<Icon as={BsEyeFill} boxSize={4} />}
                                  >
                                    ดูรายละเอียด
                                  </MenuItem>
                                  <MenuItem
                                    icon={<Icon as={BsBoxSeam} boxSize={4} />}
                                    onClick={() => {
                                      handleSetStatusOrder(
                                        index,
                                        filteredOrder.ID,
                                        "กำลังแพ็ค"
                                      );
                                    }}
                                  >
                                    เปลี่ยนสถานะ "กำลังแพ็ค"
                                  </MenuItem>
                                  <MenuItem
                                    icon={
                                      <Icon as={BsXOctagonFill} boxSize={4} />
                                    }
                                    onClick={() => {
                                      handleSetStatusOrder(
                                        index,
                                        filteredOrder.ID,
                                        "ยกเลิก"
                                      );
                                    }}
                                  >
                                    ยกเลิกคำสั่งซื้อ
                                  </MenuItem>
                                </MenuList>
                              </Menu>
                            ) : (
                              <HStack>
                                {/* <IconButton
                                  icon={<BsClockHistory />}
                                  size="xs"
                                  color={"#f84c01"}
                                  borderColor={"#f84c01"}
                                  aria-label="Edit"
                                  variant="outline"
                                /> */}
                                {navbarTab == "กำลังแพ็ค" && (
                                  <IconButton
                                    icon={
                                      <Image
                                        src={"/images/delivery-truck 1.png"}
                                        width={"14px"}
                                      />
                                    }
                                    size="xs"
                                    color={"#f84c01"}
                                    borderColor={"#f84c01"}
                                    aria-label="Edit"
                                    variant="outline"
                                    onClick={() => {
                                      handleSetStatusOrder(
                                        index,
                                        filteredOrder.ID,
                                        "พร้อมส่ง"
                                      );
                                    }}
                                  />
                                )}
                                {navbarTab == "พร้อมส่ง" && (
                                  <IconButton
                                    icon={
                                      <Image
                                        src={"/images/delivery-truck 2.png"}
                                        width={"14px"}
                                      />
                                    }
                                    size="xs"
                                    color={"#f84c01"}
                                    borderColor={"#f84c01"}
                                    aria-label="Edit"
                                    variant="outline"
                                    onClick={() => {
                                      handleSetStatusOrder(
                                        index,
                                        filteredOrder.ID,
                                        "จัดส่งสำเร็จ"
                                      );
                                    }}
                                  />
                                )}
                                {navbarTab == "จัดส่งสำเร็จ" && (
                                  <IconButton
                                    icon={
                                      <Image
                                        src={"/images/ส่งสำเร็จ 1.png"}
                                        width={"14px"}
                                      />
                                    }
                                    size="xs"
                                    color={"#f84c01"}
                                    borderColor={"#f84c01"}
                                    aria-label="Edit"
                                    variant="outline"
                                    onClick={() => {
                                      handleSetStatusOrder(
                                        index,
                                        filteredOrder.ID,
                                        "ส่งสำเร็จ"
                                      );
                                    }}
                                  />
                                )}
                                {navbarTab == "ส่งสำเร็จ" && (
                                  <IconButton
                                    icon={
                                      <Image
                                        src={"/images/ตีกลับ.png"}
                                        width={"14px"}
                                      />
                                    }
                                    size="xs"
                                    color={"#f84c01"}
                                    borderColor={"#f84c01"}
                                    aria-label="Edit"
                                    variant="outline"
                                    onClick={() => {
                                      handleSetStatusOrder(
                                        index,
                                        filteredOrder.ID,
                                        "ตีกลับ"
                                      );
                                    }}
                                  />
                                )}
                                {navbarTab != "ตีกลับ" &&
                                navbarTab != "ยกเลิก" ? (
                                  <IconButton
                                    icon={<BsXCircleFill />}
                                    size="xs"
                                    color={"#f84c01"}
                                    borderColor={"#f84c01"}
                                    aria-label="Edit"
                                    variant="outline"
                                    onClick={() => {
                                      handleSetStatusOrder(
                                        index,
                                        filteredOrder.ID,
                                        "ยกเลิก"
                                      );
                                    }}
                                  />
                                ) : null}
                                {navbarTab == "ตีกลับ" && (
                                  <Text>{filteredOrder.updateAt}</Text>
                                )}
                                {navbarTab == "ยกเลิก" && (
                                  <Text>{filteredOrder.updateAt}</Text>
                                )}
                              </HStack>
                            )}
                          </Td>
                        ) : null}
                      </Tr>
                    );
                  })}
              </Tbody>
              <Tfoot bgColor={"whitesmoke"}>
                <Tr>
                  <Th colSpan={5}>ยอดรวม</Th>
                  <Th>{totalQuantity}</Th>
                  <Th colSpan={4}>{totalAmount}</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Flex>
      </Box>
      <Modal
        closeOnOverlayClick={false}
        isOpen={modalSlipPayment.isOpen}
        onClose={modalSlipPayment.onClose}
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"33px"}>
            <Center>
              <Image src={"/images/receipt.png"} width={"25px"} />
              <Text ml={3}>หลักฐานการชำระเงิน</Text>
            </Center>
          </ModalHeader>
          <ModalCloseButton
            bgColor={"red"}
            color={"white"}
            borderRadius={"50px"}
            fontSize={"10px"}
            width={"20px"}
            height={"20px"}
          />
          <ModalBody pb={6}>
            <Center>
              <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <GridItem w="100%">
                  <Text fontSize={"20px"}>โอนจาก : มดหอม จัดผล</Text>
                </GridItem>
                <GridItem w="100%">
                  <Text fontSize={"20px"}>เลขบัญชี : 987-654-3210</Text>
                </GridItem>
                <GridItem w="100%">
                  <Text fontSize={"20px"}>ไปยัง : หยกน้อย เจ้าปัญญา</Text>
                </GridItem>
                <GridItem w="100%">
                  <Text fontSize={"20px"}>เลขบัญชี : 012-345-6789</Text>
                </GridItem>
                <GridItem w="100%">
                  <Text fontSize={"20px"}>วันที่ : 08/02/06</Text>
                </GridItem>
                <GridItem w="100%">
                  <Text fontSize={"20px"}>เวลา : 12:25</Text>
                </GridItem>
                <GridItem w="100%">
                  <Text fontSize={"20px"}>จำนวนเงิน : 125.00</Text>
                </GridItem>
                <GridItem w="100%">
                  <Text fontSize={"20px"}>รหัสอ้างอิง : 0123456789012</Text>
                </GridItem>
              </Grid>
            </Center>
            <Box mt={5}>
              <Center>
                <Box bgColor={"#000"} position="relative" overflow="hidden">
                  <Image
                    src={"/images/No-Image.png"}
                    h={"300px"}
                    transition={"300ms"}
                    _hover={{ opacity: 0.5, cursor: "pointer" }}
                    onClick={handleOpenModalImgSlip}
                  />
                </Box>
              </Center>
            </Box>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Button colorScheme="red" mr={3}>
              ยืนยัน
            </Button>
            {/* <Button onClick={modalSlipPayment.onClose}>Cancel</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        closeOnOverlayClick={false}
        isOpen={modalOpenImgSlipPayment.isOpen}
        onClose={modalOpenImgSlipPayment.onClose}
        // size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton
            bgColor={"red"}
            color={"white"}
            borderRadius={"50px"}
            fontSize={"10px"}
            width={"20px"}
            height={"20px"}
          />
          <ModalBody padding={"0 1rem"}>
            <Box mt={5}>
              <Image src={"/images/No-Image.png"} w={"100%"} h={"100%"} />
            </Box>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Button
              colorScheme="red"
              mr={3}
              onClick={modalOpenImgSlipPayment.onClose}
            >
              ยืนยัน
            </Button>
            {/* <Button onClick={modalSlipPayment.onClose}>Cancel</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* End Table */}
    </>
  );
}
