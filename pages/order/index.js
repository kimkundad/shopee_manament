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
  BsArrowBarDown,
} from "react-icons/bs";
import jsPDF from "jspdf";
import "jspdf-autotable";
import THSarabunNew from "@/components/THSarabunNew";
import THSarabunNewBlod from "@/components/THSarabunNewBlod";

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
  const [navbarTab, setNavbarTab] = useState("ตรวจสอบคำสั่งซื้อ");
  const [searchId, setSearchId] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [checkBoxData, setCheckBoxData] = useState(labelLists);
  let totalAmount = 0;
  let totalQuantity = 0;
  let amountProduct = "";
  const modalOpenImgSlipPayment = useDisclosure();

  const modalDetailOrder = useDisclosure();
  const ModalConfirmSetStatus = useDisclosure();

  // ชื่อตัวแปรของการดูรายละเอียดหลักฐาน
  const [namePayment, setNamePayment] = useState("");
  const [accountNumberPayment, setAccountNumberPayment] = useState("");
  const [datePayment, setDatePayment] = useState("");
  const [timePayment, setTimePayment] = useState("");
  const [pricePayment, setPricePayment] = useState("");
  const [codePayment, setCodePayment] = useState("");
  const [imageSlip, setImageSlip] = useState("");
  const [typePayment, setTypePayment] = useState("");
  const [detailOrder, setDetailOrder] = useState([]);
  const [idOrder, setIdOrder] = useState("");
  const [codeOrder, setCodeOrder] = useState("");
  const [nameBank, setNameBank] = useState("");
  const [dateCreateOrder, setDateCreateOrder] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressReceiverName, setAddressReceiverName] = useState("");
  const [checkIssueTaxInvoice, setCheckIssueTaxInvoice] = useState(true);
  const [selectedOrders, setSelectedOrders] = useState([]);
  // end

  const fetchData = async () => {
    const response = await axios.get(
      `https://shopee-api.deksilp.com/api/getOrders`
    );
    setOrders(response.data.orders);
    console.log(orders);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const countOrder = orders.filter(
    (item) => item.status === "ตรวจสอบคำสั่งซื้อ"
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
      modalDetailOrder.onClose();
    }
  };

  const handleOpenModalImgSlip = () => {
    modalOpenImgSlipPayment.onOpen();
  };

  const handleOpenModalDetailOrder = (id) => {
    modalDetailOrder.onOpen();
    const data = orders.filter((item) => item.ID === id);
    const optionsDate = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }; // กำหนดรูปแบบวันที่และเวลา
    const optionsPrice = {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };
    const optionsDateOnly = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }; // กำหนดรูปแบบแค่วันที่อย่างเดียว
    const amountOrder = data[0].amount;
    const formattedPrice = amountOrder.toLocaleString("en-US", optionsPrice);
    const dateOrder = new Date(data[0].createAt); // แปลงค่าวันที่ให้เป็น Date object
    const formattedDate = dateOrder.toLocaleDateString("th-TH", optionsDate); // แปลงวันที่เป็นรูปแบบ "DD/MM/YYYY"
    const datePayment = new Date(data[0].dateSlipPayment); // แปลงค่าวันที่ให้เป็น Date object
    const formattedDatePayment = datePayment.toLocaleDateString(
      "th-TH",
      optionsDateOnly
    ); // แปลงวันที่เป็นรูปแบบ "DD/MM/YYYY"

    const addressReceiverName = `${data[0].address} ต.${data[0].sub_district} อ.${data[0].district} จ.${data[0].province} ${data[0].postcode}`;
    setTypePayment(data[0].typePaymentOrder);
    setNamePayment(data[0].receiverName);
    setAccountNumberPayment(data[0].accountNumber);
    setDatePayment(formattedDatePayment);
    setTimePayment(data[0].timeSlipPayment);
    setPricePayment(formattedPrice);
    setCodePayment(data[0].orderId);
    setImageSlip(data[0].slipPayment);
    setDetailOrder(data[0].orderDetails);
    setCodeOrder(data[0].orderId);
    setNameBank(data[0].nameBank);
    setPhoneNumber(data[0].phoneNumber);
    setDateCreateOrder(formattedDate);
    setAddressReceiverName(addressReceiverName);
    setIdOrder(data[0].ID);
    console.log("Order", data);
    console.log("Detail order", detailOrder);
  };

  const handleIssueTaxInvoice = (event) => {
    const value = event.target.checked;
    setCheckIssueTaxInvoice(value);
  };

  const handleAllCheckboxChange = (e) => {
    if (e.target.checked) {
      setSelectedOrders(orders.map((order) => order.ID));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleCheckboxChange = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  const handelLogSelect = async (status) => {
    const formData = new FormData();
    selectedOrders.forEach((ids, index) => {
      formData.append(`ids[${index}]`, ids);
    });
    formData.append(`status`, status);
    const response = await axios.post(
      "https://shopee-api.deksilp.com/api/setStatusOrdersMulti",
      formData
    );
    if (response.data.success) {
      fetchData();
      setSelectedOrders([]);
      ModalConfirmSetStatus.onClose();
    }
  };

  const handleCheckSelect = () => {
    const selected = orders.filter((order) =>
      selectedOrders.includes(order.ID)
    );
    if (selectedOrders.length > 0) {
      const optionsDate = {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }; // กำหนดรูปแบบวันที่และเวลา
      const date = new Date();
      const formattedDate = date.toLocaleDateString("th-TH", optionsDate); // แปลงวันที่เป็นรูปแบบ "DD/MM/YYYY"
      // Create a new instance of jsPDF
      const doc = new jsPDF();

      // Add the Thai font
      doc.addFileToVFS("THSarabunNew.ttf", THSarabunNew);
      doc.addFileToVFS("THSarabunNew Bold.ttf", THSarabunNewBlod);
      doc.addFont("THSarabunNew.ttf", "THSarabunNew", "normal");
      doc.addFont("THSarabunNew Bold.ttf", "THSarabunNewBlod", "bold");
      doc.setFont("THSarabunNew");

      let y = 10; // Start y at the top of the page

      selected.forEach((order, index) => {
        if (index !== 0) {
          doc.addPage();
          y = 10;
        }
        const addressReceiverName = `${order.address} ต.${order.sub_district} อ.${order.district} จ.${order.province} ${order.postcode}`;
        // Add recipient's name, address and phone number
        doc.setFont("THSarabunNewBlod", "bold");
        doc.setFontSize(16);
        doc.text("Recipient Name: " + order.receiverName, 10, y);
        doc.setFont("THSarabunNew", "normal");
        doc.setFontSize(14);
        doc.text("Address: " + addressReceiverName, 10, y + 10);
        doc.text("Phone Number: " + order.phoneNumber, 10, y + 20);

        // Draw the table header
        const header = ["Order ID", "Product Name", "Num", "Price"];
        const columnWidths = [40, 70, 30, 30];
        const headerHeight = 10;
        const cellHeight = 10;
        let x = 10;
        for (let i = 0; i < header.length; i++) {
          doc.setFillColor(220, 220, 220);
          doc.rect(x, y + 30, columnWidths[i], headerHeight, "F"); // Draw a filled rectangle for each header cell
          doc.rect(x, y + 30, columnWidths[i], headerHeight); // Draw the cell border
          doc.text(header[i], x + 2, y + 38); // The y value is y + 30 (top of the cell) + half the cell height
          x += columnWidths[i];
        }

        // Draw the table rows
        y += 40; // Start y below the header
        for (let i = 0; i < order.orderDetails.length; i++) {
          const product = order.orderDetails[i];
          const row = [
            order.orderId.toString(),
            product.nameProduct,
            product.num.toString(),
            product.priceProduct.toString(),
          ];
          x = 10;
          for (let j = 0; j < row.length; j++) {
            doc.text(row[j], x + 2, y + cellHeight / 2 + 2);
            // The y value is the top of the cell + half the cell height
            doc.rect(x, y, columnWidths[j], cellHeight); // Draw the cell border
            x += columnWidths[j];
          }
          y += cellHeight;
        }
        doc.text("ยอดรวม: ", 122, y + 10);
        doc.text(order.amount.toString(), 152, y + 10);
        // Increment y by a certain amount to leave some space between each order
        y += 20;
      });
      // Save the PDF as a blob
      const pdfBlob = doc.output("blob");

      // Create a blob URL
      const url = URL.createObjectURL(pdfBlob);

      // Open the PDF in a new tab
      window.open(url, "_blank");

      // Create a link element, click it to start the download
      const link = document.createElement("a");
      link.href = url;
      link.download = `orders-${formattedDate}.pdf`;
      link.click();

      // Clean up
      link.remove();
      URL.revokeObjectURL(url);
      ModalConfirmSetStatus.onOpen();
    }
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
              onClick={() => setNavbarTab("ตรวจสอบคำสั่งซื้อ")}
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
          {navbarTab === "กำลังแพ็ค" && (
            <Box borderWidth="1px" borderColor="green" borderRadius="md">
              <Button
                fontSize="21px"
                leftIcon={<Icon as={BsArrowBarDown} boxSize={5} />}
                bg="green"
                variant="solid"
                color="white"
                _hover={{}}
                onClick={handleCheckSelect}
              >
                ดาวน์โหลดคำสั่งซื้อ
              </Button>
            </Box>
          )}
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
                                isChecked={
                                  selectedOrders.length === orders.length
                                }
                                onChange={handleAllCheckboxChange}
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
                        order.province.toString().includes(searchId) ||
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
                    const optionsDate = {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                    }; // กำหนดรูปแบบวันที่และเวลา
                    const dateOrder = new Date(filteredOrder.createAt); // แปลงค่าวันที่ให้เป็น Date object
                    const formattedDate = dateOrder.toLocaleDateString(
                      "th-TH",
                      optionsDate
                    ); // แปลงวันที่เป็นรูปแบบ "DD/MM/YYYY"
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
                              border="1px solid gray"
                              isChecked={selectedOrders.includes(
                                filteredOrder.ID
                              )}
                              onChange={() =>
                                handleCheckboxChange(filteredOrder.ID)
                              }
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
                            {filteredOrder.province}
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
                            {filteredOrder.typePaymentOrder == "โอนเงิน" ? (
                              <Center>
                                {filteredOrder.bankThumbnail !== null ? (
                                  <Box position="relative">
                                    <Image
                                      src={`/images/banks/${filteredOrder.bankThumbnail}`}
                                      width={30}
                                      height={30}
                                      alt="bay"
                                    />
                                    <Image
                                      src="/images/check2.png"
                                      width={"15px"}
                                      height={"15px"}
                                      alt="bay"
                                      position="absolute"
                                      top={"-5px"}
                                      right={"-5px"}
                                    />
                                  </Box>
                                ) : (
                                  <Box position="relative">
                                    <Image
                                      src={`/images/banks/qr.png`}
                                      width={30}
                                      height={30}
                                      alt="bay"
                                    />
                                    <Image
                                      src="/images/ออเดอร์.png"
                                      width={"15px"}
                                      height={"15px"}
                                      alt="bay"
                                      position="absolute"
                                      top={"-5px"}
                                      right={"-5px"}
                                    />
                                  </Box>
                                )}
                              </Center>
                            ) : (
                              <Center>
                                <Image
                                  src={`/images/พร้อมส่ง.png`}
                                  width={"45px"}
                                  height={"45px"}
                                  alt="bay"
                                />
                              </Center>
                            )}
                          </Td>
                        ) : null}
                        {checkBoxData[8] && checkBoxData[8].isShow ? (
                          <Td p={2} textAlign={"center"}>
                            {formattedDate}
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
                            <Center>
                              {navbarTab == "ตรวจสอบคำสั่งซื้อ" ? (
                                // <Menu>
                                //   <MenuButton
                                //     as={IconButton}
                                //     aria-label="Options"
                                //     icon={<HamburgerIcon />}
                                //     variant="outline"
                                //     border="none"
                                //   />
                                //   <MenuList>
                                //     <MenuItem
                                //       icon={<Icon as={BsEyeFill} boxSize={4} />}
                                //       onClick={() => {
                                //         handleOpenModalDetailOrder(
                                //           filteredOrder.ID
                                //         );
                                //       }}
                                //     >
                                //       ดูรายละเอียด
                                //     </MenuItem>
                                //     <MenuItem
                                //       icon={<Icon as={BsBoxSeam} boxSize={4} />}
                                //       onClick={() => {
                                //         handleSetStatusOrder(
                                //           index,
                                //           filteredOrder.ID,
                                //           "กำลังแพ็ค"
                                //         );
                                //       }}
                                //     >
                                //       เปลี่ยนสถานะ "กำลังแพ็ค"
                                //     </MenuItem>
                                //     <MenuItem
                                //       icon={
                                //         <Icon as={BsXOctagonFill} boxSize={4} />
                                //       }
                                //       onClick={() => {
                                //         handleSetStatusOrder(
                                //           index,
                                //           filteredOrder.ID,
                                //           "ยกเลิก"
                                //         );
                                //       }}
                                //     >
                                //       ยกเลิกคำสั่งซื้อ
                                //     </MenuItem>
                                //   </MenuList>
                                // </Menu>

                                <Image
                                  src={"/images/research.png"}
                                  w={"30px"}
                                  h={"30px"}
                                  _hover={{ cursor: "pointer" }}
                                  onClick={() => {
                                    handleOpenModalDetailOrder(
                                      filteredOrder.ID
                                    );
                                  }}
                                />
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
                            </Center>
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
        {navbarTab === "ตรวจสอบคำสั่งซื้อ" && (
          <Box mt={5}>
            <Center>
              <Button
                bgColor={"green"}
                color={"white"}
                onClick={() => {
                  handelLogSelect("กำลังแพ็ค");
                }}
              >
                ยืนยันคำสั่งซื้อ
              </Button>
            </Center>
          </Box>
        )}
      </Box>

      {/* modal ดูรายละเอียด */}
      <Modal
        closeOnOverlayClick={false}
        isOpen={modalDetailOrder.isOpen}
        onClose={modalDetailOrder.onClose}
        size={"xl"}
        scrollBehavior={"inside"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"33px"}>
            <Center>
              <Image src={"/images/คำสั่งซื้อ ส้ม.png"} width={"35px"} />
              <Text ml={3}>ข้อมูลคำสั่งซื้อ</Text>
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
            {typePayment == "โอนเงิน" && (
              <Box>
                <Flex
                  alignItems="center"
                  mt="15px"
                  borderTop="1px"
                  borderTopColor="black"
                  bg="gray.100"
                >
                  <Image src="/images/shopping-list.png" h="20px" m="8px" />
                  <Text fontWeight="bold" fontSize="20px">
                    หลักฐานการขำระเงิน
                  </Text>
                </Flex>
                <Center mt={5}>
                  {accountNumberPayment != null ? (
                    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                      <GridItem w="100%">
                        <Text>โอนจาก : {namePayment}</Text>
                      </GridItem>
                      <GridItem w="100%">
                        <Text>เลขบัญชี : {accountNumberPayment}</Text>
                      </GridItem>
                      <GridItem w="100%">
                        <Text>วันที่ : {datePayment}</Text>
                      </GridItem>
                      <GridItem w="100%">
                        <Text>เวลา : {timePayment}</Text>
                      </GridItem>
                      <GridItem w="100%">
                        <Text>จำนวนเงิน : {pricePayment}</Text>
                      </GridItem>
                      <GridItem w="100%">
                        <Text>รหัสอ้างอิง : {codePayment}</Text>
                      </GridItem>
                    </Grid>
                  ) : (
                    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                      <GridItem w="100%">
                        <Text>โอนจาก : {namePayment}</Text>
                      </GridItem>
                      <GridItem w="100%">
                        <Text>สถานะ : รอการชำระเงิน</Text>
                      </GridItem>
                      <GridItem w="100%">
                        <Text>วันที่ : -</Text>
                      </GridItem>
                      <GridItem w="100%">
                        <Text>เวลา : -</Text>
                      </GridItem>
                      <GridItem w="100%">
                        <Text>จำนวนเงิน : -</Text>
                      </GridItem>
                      <GridItem w="100%">
                        <Text>รหัสอ้างอิง : -</Text>
                      </GridItem>
                    </Grid>
                  )}
                </Center>
                <Box mt={5}>
                  <Center>
                    <Box bgColor={"#000"} position="relative" overflow="hidden">
                      <Image
                        // src={"/images/No-Image.png"}
                        src={
                          imageSlip != null
                            ? `https://shopee-api.deksilp.com/images/shopee/slip/${imageSlip}`
                            : "/images/No-Image.png"
                        }
                        h={"300px"}
                        transition={"300ms"}
                        _hover={{ opacity: 0.5, cursor: "pointer" }}
                        onClick={handleOpenModalImgSlip}
                      />
                    </Box>
                  </Center>
                </Box>
              </Box>
            )}
            <Box mt={5}>
              <Flex
                alignItems="center"
                mt="15px"
                borderTop="1px"
                borderTopColor="black"
                bg="gray.100"
              >
                <Image src="/images/shopping-list.png" h="20px" m="8px" />
                <Text fontWeight="bold" fontSize="20px">
                  รายละเอียดผู้รับ
                </Text>
              </Flex>
              <Grid
                templateRows="repeat(1, 1fr)"
                templateColumns="repeat(3, 1fr)"
                gap={4}
                mt={3}
              >
                <GridItem colSpan={1} textAlign={"end"}>
                  ชื่อผู้รับ :{" "}
                </GridItem>
                <GridItem colSpan={2}>{namePayment}</GridItem>
                <GridItem colSpan={1} textAlign={"end"}>
                  ที่อยู่ผู้รับ :
                </GridItem>
                <GridItem colSpan={2}>{addressReceiverName}</GridItem>
                <GridItem colSpan={1} textAlign={"end"}>
                  เบอร์โทรศัพท์ :
                </GridItem>
                <GridItem colSpan={2}>{phoneNumber}</GridItem>
                <GridItem colSpan={1}></GridItem>
                <GridItem colSpan={2}>
                  <Checkbox
                    isChecked={checkIssueTaxInvoice}
                    onChange={handleIssueTaxInvoice}
                  >
                    ที่อยู่สำหรับออกใบเสร็จ/กำกับภาษีเหมือนที่อยู่ผู้รับ
                  </Checkbox>
                </GridItem>
              </Grid>
            </Box>
            <Box display={checkIssueTaxInvoice ? "none" : "block"}>
              <Flex
                alignItems="center"
                mt="15px"
                borderTop="1px"
                borderTopColor="black"
                bg="gray.100"
              >
                <Image src="/images/home.png" h="20px" m="8px" />
                <Text fontWeight="bold" fontSize="20px">
                  ที่อยู่สำหรับออกใบเสร็จ/กำกับภาษี
                </Text>
              </Flex>
              <Grid
                templateRows="repeat(1, 1fr)"
                templateColumns="repeat(4, 1fr)"
                gap={4}
                p={"1rem 1rem 0.5rem 0rem"}
                alignItems="end"
              >
                <GridItem colSpan={1} textAlign={"end"}>
                  ชื่อผู้รับ :{" "}
                </GridItem>
                <GridItem colSpan={2}>
                  <Input placeholder="ชื่อผู้รับ..." size="sm" />
                </GridItem>
                <GridItem colSpan={1}></GridItem>
                <GridItem colSpan={1} textAlign={"end"}>
                  เบอร์โทรศัพท์ :
                </GridItem>
                <GridItem colSpan={2}>
                  <Input placeholder="เบอร์โทรศัพท์..." size="sm" />
                </GridItem>
                <GridItem colSpan={1}></GridItem>
                <GridItem colSpan={1} textAlign={"end"}>
                  ชื่อบริษัท :
                </GridItem>
                <GridItem colSpan={3}>
                  <Input placeholder="ชื่อบริษัท..." size="sm" />
                </GridItem>
                <GridItem colSpan={1} textAlign={"end"}>
                  ที่อยู่บริษัท :
                </GridItem>
                <GridItem colSpan={3}>
                  <Input placeholder="ที่อยู่บริษัท..." size="sm" />
                </GridItem>
                <GridItem colSpan={1} textAlign={"end"}>
                  ตำบล :{" "}
                </GridItem>
                <GridItem colSpan={1}>
                  <Input placeholder="ตำบล..." size="sm" />
                </GridItem>
                <GridItem colSpan={1} textAlign={"end"}>
                  อำเภอ :{" "}
                </GridItem>
                <GridItem colSpan={1}>
                  <Input placeholder="อำเภอ..." size="sm" />
                </GridItem>
                <GridItem colSpan={1} textAlign={"end"}>
                  จังหวัด :{" "}
                </GridItem>
                <GridItem colSpan={1}>
                  <Input placeholder="จังหวัด..." size="sm" />
                </GridItem>
                <GridItem colSpan={1} textAlign={"end"}>
                  ไปรษณีย์ :{" "}
                </GridItem>
                <GridItem colSpan={1}>
                  <Input placeholder="ไปรษณีย์..." size="sm" />
                </GridItem>
              </Grid>
            </Box>
            <Box>
              <Flex
                alignItems="center"
                mt="15px"
                borderTop="1px"
                borderTopColor="black"
                bg="gray.100"
              >
                <Image src="/images/shopping-list.png" h="20px" m="8px" />
                <Text fontWeight="bold" fontSize="20px">
                  ข้อมูลคำสั่งซื้อ
                </Text>
              </Flex>
              <TableContainer fontSize="17" width={"100%"} mt={3}>
                <Table
                  variant="striped"
                  colorScheme="gray"
                  css={{
                    overflow: "hidden",
                    border: "1px solid black",
                    borderCollapse: "collapse",
                  }}
                >
                  <Thead>
                    <Tr bg={"whitesmoke"}>
                      <Th color={"black"}>เลขคำสั่งซื้อ</Th>
                      <Th color={"black"}>รูปสินค้า</Th>
                      <Th color={"black"}>ชื่อสินค้า</Th>
                      <Th color={"black"}>จำนวน</Th>
                      <Th color={"black"}>ราคา</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {detailOrder.map((detail, index) => {
                      const optionsPriceProduct = {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      };
                      if (detail.option1 === 0 && detail.option2 === 0) {
                        amountProduct = detail.priceProduct;
                      } else if (detail.option1 !== 0 && detail.option2 === 0) {
                        amountProduct = detail.priceProductOption1;
                      } else if (detail.option1 !== 0 && detail.option2 !== 0) {
                        amountProduct = detail.priceProductOption2;
                      }

                      const formattedPriceProduct =
                        amountProduct.toLocaleString(
                          "en-US",
                          optionsPriceProduct
                        );
                      return (
                        <Tr key={index}>
                          <Td>{codeOrder}</Td>
                          <Td>
                            <Image
                              src={
                                detail.option1 === 0
                                  ? `https://shopee-api.deksilp.com/images/shopee/products/${detail.imgProduct}`
                                  : `https://shopee-api.deksilp.com/images/shopee/products/${detail.imgProductOption}`
                              }
                              h="50px"
                              w="50px"
                            />
                          </Td>
                          <Td>{detail.nameProduct}</Td>
                          <Td>{detail.num}</Td>
                          <Td>
                            {detail.option1 === 0 && detail.option2 === 0
                              ? formattedPriceProduct
                              : null}
                            {detail.option1 !== 0 && detail.option2 === 0
                              ? formattedPriceProduct
                              : null}
                            {detail.option1 !== 0 && detail.option2 !== 0
                              ? formattedPriceProduct
                              : null}
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
              <Grid
                templateRows="repeat(1, 1fr)"
                templateColumns="repeat(4, 1fr)"
                gap={4}
                p={"1rem 1.5rem 0rem 0rem"}
                alignItems="end"
              >
                <GridItem colSpan={1} textAlign={"end"}>
                  การชำระเงิน :{" "}
                </GridItem>
                <GridItem colSpan={1}>
                  {nameBank === null ? "เก็บเงินปลายทาง" : nameBank}
                </GridItem>
                <GridItem colSpan={1} textAlign={"end"}>
                  ยอดรวม
                </GridItem>
                <GridItem colSpan={1} textAlign={"end"}>
                  {pricePayment}
                </GridItem>
                <GridItem colSpan={1} textAlign={"end"}>
                  ขนส่ง :{" "}
                </GridItem>
                <GridItem colSpan={1}>รูป</GridItem>
                <GridItem colSpan={1} textAlign={"end"}>
                  ค่าส่ง
                </GridItem>
                <GridItem colSpan={1} textAlign={"end"}>
                  40.00
                </GridItem>
                <GridItem colSpan={1} textAlign={"end"}>
                  วันที่สั่งซื้อ :{" "}
                </GridItem>
                <GridItem colSpan={1}>{dateCreateOrder}</GridItem>
                <GridItem
                  colSpan={1}
                  textAlign={"end"}
                  fontWeight={"bold"}
                  fontSize={"20px"}
                >
                  รวมทั้งสิ้น
                </GridItem>
                <GridItem colSpan={1} textAlign={"end"}>
                  {pricePayment}
                </GridItem>
              </Grid>
            </Box>
            <Box>
              <Flex
                alignItems="center"
                mt="15px"
                borderTop="1px"
                borderTopColor="black"
                bg="gray.100"
              >
                <Image src="/images/shopping-list.png" h="20px" m="8px" />
                <Text fontWeight="bold" fontSize="20px">
                  ประวัติการสั่งซื้อ
                </Text>
              </Flex>
              <TableContainer fontSize="17" width={"100%"} mt={3}>
                <Table
                  variant="striped"
                  colorScheme="gray"
                  css={{
                    overflow: "hidden",
                    border: "1px solid black",
                    borderCollapse: "collapse",
                  }}
                >
                  <Thead>
                    <Tr bg={"whitesmoke"}>
                      <Th color={"black"}>เลขคำสั่งซื้อ</Th>
                      <Th color={"black"}>รูปสินค้า</Th>
                      <Th color={"black"}>ชื่อสินค้า</Th>
                      <Th color={"black"}>จำนวน</Th>
                      <Th color={"black"}>ราคา</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </ModalBody>
          <ModalFooter alignItems={"center"} justifyContent={"center"}>
            <Button
              onClick={() => {
                handleSetStatusOrder(0, idOrder, "ยกเลิก");
              }}
              mr={2}
              bgColor={"red"}
              color={"white"}
            >
              ยกเลิกคำสั่งซื้อ
            </Button>
            <Button
              onClick={() => {
                handleSetStatusOrder(0, idOrder, "กำลังแพ็ค");
              }}
              bgColor={"green"}
              color={"white"}
            >
              ยืนยันคำสั่งซื้อ
            </Button>
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
              <Center>
                <Image
                  src={
                    imageSlip != null
                      ? `https://shopee-api.deksilp.com/images/shopee/slip/${imageSlip}`
                      : "/images/No-Image.png"
                  }
                  // w={"350px"}
                  // h={"520px"}
                  w={"100%"}
                  h={"605px"}
                />
              </Center>
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
      {/* end modal ดูรายละเอียด */}

      <Modal
        closeOnOverlayClick={false}
        isOpen={ModalConfirmSetStatus.isOpen}
        onClose={ModalConfirmSetStatus.onClose}
        isCentered
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
              <Flex
                justifyContent={"center"}
                alignItems={"center"}
                flexDirection={"column"}
              >
                <Image src={"/images/check.png"} w={"100px"} h={"100px"} />
                <Text fontSize={"30px"} fontWeight={"bold"} mt={5}>
                  ยืนยันการแพ็คสินค้าสำเร็จหรือไม่
                </Text>
              </Flex>
            </Box>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Button
              colorScheme="red"
              mr={3}
              onClick={ModalConfirmSetStatus.onClose}
            >
              ยกเลิก
            </Button>
            <Button
              colorScheme="green"
              mr={3}
              onClick={() => {
                handelLogSelect("พร้อมส่ง");
              }}
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
