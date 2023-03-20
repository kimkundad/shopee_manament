import React, { useState, useEffect } from "react";
import {
  Flex,
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
  Tfoot,
} from "@chakra-ui/react";
import ListCheck from "@/components/MenuList";
import { Table } from "@nextui-org/react";
import Link from "next/link";
function index() {
  const initialProducts = [
    {
      id: 1,
      date: "15/1/2557",
      nameshop: "aaaa",
      nameproduct: "ssss",
      productId: "5453",
      linkshop: "asdadsa",
      numberInvoice: 2323,
      customername: "uuuu",
      address: "ชลบุรี",
      tel: "085-784-578",
      orderQuantity: 55555,
      sales: 75522,
    },
    {
      id: 2,
      date: "15/1/2557",
      nameshop: "aaaa",
      nameproduct: "ssss",
      productId: "5453",
      linkshop: "asdadsa",
      numberInvoice: 2323,
      customername: "uuuu",
      address: "ชลบุรี",
      tel: "085-784-578",
      orderQuantity: 55555,
      sales: 75522,
    },
    {
      id: 3,
      date: "15/1/2557",
      nameshop: "aaaa",
      nameproduct: "ssss",
      productId: "5453",
      linkshop: "asdadsa",
      numberInvoice: 2323,
      customername: "uuuu",
      address: "ชลบุรี",
      tel: "085-784-578",
      orderQuantity: 55555,
      sales: 75522,
    },
  ];
  const [products, setProducts] = useState(initialProducts);
  const colunm = [
    {
      label: "วันที่",
    },
    {
      label: "ชื่อร้านค้า",
    },
    {
      label: "ชื่อสินค้า",
    },
    {
      label: "รหัสสินค้า",
    },
    {
      label: "ลิงค์ร้านค้า",
    },
    {
      label: "เลขคำสั่งชื้อ",
    },
    {
      label: "ชื่อลูกค้า",
    },
    {
      label: "ที่อยู่",
    },
    {
      label: "เบอร์โทรศัพท์",
    },
    {
      label: "จำนวนสั่งซื้อ",
    },
    {
      label: "ยอดขาย",
    },
  ];

  //pagination
  const [itemsPerPage, setItemPerpages] = useState(5);
  const handleSelectChange = (event) => {
    setItemPerpages(event.target.value);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setinputValue] = useState(1);
  const handleInputChange = (event) => {
    if (
      event.target.value !== "" &&
      event.target.value >= 1 &&
      event.target.value <= totalPages
    ) {
      setCurrentPage(parseInt(event.target.value));
      setinputValue(parseInt(event.target.value));
    } else if (event.target.value === "") {
      setinputValue("");
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setinputValue(page);
  };

  let item = parseInt(itemsPerPage);
  const totalPages = Math.ceil(products.length / item);
  const startIndex = (currentPage - 1) * item;
  const endIndex = startIndex + item;
  const currentItems = products.slice(startIndex, endIndex);

  if (currentPage > totalPages) {
    setCurrentPage(1);
    setinputValue(1);
  }
  
  //sum
  const [sumSales, setSumSales] = useState(1);
  const [sumOrder, setSumOrder] = useState(1);

  useEffect(() => {
    let sum = 0;
    products.forEach((item) => {
      sum += item.sales;
    });
    setSumSales(sum);
  }, []);

  useEffect(() => {
    let sum = 0;
    products.forEach((item) => {
      sum += item.orderQuantity;
    });
    setSumOrder(sum);
  }, []);
  return (
    <Box w="100%">
      <Flex justifyContent="center" alignItems="center">
        <Image src="/images/menu/report.png" alt="" h="40px" w="40px" />
        <Text pl="10px" fontSize="40px" fontWeight="bold" color="red">
          รายงาน
        </Text>
      </Flex>
      <Flex m="10px" pt="10px">
        <Box>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Image src="/images/search.png" h="20px" w="20px" />
            </InputLeftElement>
            <Input
              borderRadius="3xl"
              type="text"
              fontSize="21px"
              borderColor="gray.500"
              placeholder="ค้นหารายการ"
            />
          </InputGroup>
        </Box>
        <Box pl="10px">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Image src="/images/calendar.png" h="20px" w="20px" />
            </InputLeftElement>
            <Input
              type="date"
              borderRadius="3xl"
              fontSize="21px"
              borderColor="gray.500"
              placeholder="เลือกวันที่"
            />
          </InputGroup>
        </Box>
        <Spacer />
        <Box borderWidth="1px" borderColor="red" borderRadius="md">
          <Link href="/">
            <Button
              fontSize="21px"
              leftIcon={<Image src="/images/print.png" h="25px" w="25px" />}
              bg="red"
              variant="solid"
              color="white"
              _hover={{}}
            >
              พิมพ์รายงาน
            </Button>
          </Link>
        </Box>

        <Box ml="5px" border="1px" borderColor="red" borderRadius="md">
          <ListCheck data={colunm} />
        </Box>
      </Flex>
      
      <Table
          striped
          sticked
          aria-label="Example table with static content"
          css={{
            height: "auto",
            minWidth: "100%",
            border: "0px",
            boxShadow: "none"
          }}
        >
          <Table.Header bg="red">
            {colunm.map((item, index) => {
              return (
                <Table.Column
                  style={{ backgroundColor: "red", color: "white" }}
                  key={index}
                  onClick={
                    index == 0 ? (event) => handleAllSwitchChange() : null
                  }
                  css={{ textAlign: "center",
                padding: "0px !important" }}
                >
                  <Text fontSize="21px">{item.label}</Text>
                </Table.Column>
              );
            })}
          </Table.Header>
          <Table.Body>
            {currentItems.map((item, index) => {
              return (
                <Table.Row key={index} css={index % 2 !==0? { fontSize: "21px",background: "$gray100" }:{fontSize: "21px"}}>
                  <Table.Cell css={{ textAlign: "center" }}>
                    {item.date}
                  </Table.Cell>
                  <Table.Cell css={{ textAlign: "center" }}>
                    {item.nameshop}
                  </Table.Cell>
                  <Table.Cell>
                    {item.nameproduct}
                  </Table.Cell>
                  <Table.Cell css={{ textAlign: "center" }}>
                    {item.productId}
                  </Table.Cell>
                  <Table.Cell css={{ textAlign: "center" }}>
                    {item.linkshop}
                  </Table.Cell>
                  <Table.Cell css={{ textAlign: "center" }}>
                    {item.numberInvoice}
                  </Table.Cell>
                  <Table.Cell css={{ textAlign: "center" }}>
                    {item.customername}
                  </Table.Cell>
                  <Table.Cell css={{ textAlign: "center" }}>
                    {item.address}
                  </Table.Cell>
                  <Table.Cell css={{ textAlign: "center" }}>
                    {item.tel}
                  </Table.Cell>
                  <Table.Cell css={{ textAlign: "center" }}>
                    {item.orderQuantity}
                  </Table.Cell>
                  <Table.Cell css={{ textAlign: "center" }}>
                    {item.sales}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>

        <Flex m="10px">
          <Wrap alignSelf="center" fontSize="21px">
            <WrapItem>
              <Text>แสดงผล : </Text>
            </WrapItem>
            <WrapItem>
              <Select size="xs" onChange={handleSelectChange}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </Select>
            </WrapItem>
            <WrapItem>
              <Text>จำนวนสินค้า : </Text>
            </WrapItem>
            <WrapItem>
              <Text>{products.length}</Text>
            </WrapItem>
          </Wrap>
          <Spacer />
          <HStack spacing="2" alignSelf="center" fontSize="21px">
            <Button
              disabled={currentPage === 1 || currentPage < 1}
              onClick={() =>
                handlePageChange(
                  currentPage === 1 ? currentPage : currentPage - 1
                )
              }
              background="white"
              _hover={{}}
            >
              <Image
                src="/images/arrow/left-arrow.png"
                alt=""
                h="15px"
                w="10px"
              />
            </Button>

            <Text>หน้า</Text>
            <Input
              htmlSize={1}
              placeholder={inputValue}
              size="xs"
              onChange={handleInputChange}
              value={inputValue}
            />
            <Text whitespace="nowrap">จาก</Text>
            <Text whitespace="nowrap">{totalPages}</Text>
            <Button
              disabled={currentPage >= totalPages}
              onClick={() =>
                handlePageChange(
                  currentPage === totalPages ? currentPage : currentPage + 1
                )
              }
              background="white"
              _hover={{}}
            >
              <Image
                src="/images/arrow/right-arrow.png"
                alt=""
                h="15px"
                w="10px"
              />
            </Button>
          </HStack>
        </Flex>
    </Box>
  );
}

export default index;
