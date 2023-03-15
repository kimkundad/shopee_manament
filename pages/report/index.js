import React, { useState, useEffect } from "react";
import {
  Link,
  Flex,
  Switch,
  Text,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  Spacer,
  Checkbox,
  Menu,
  MenuButton,
  MenuList,
  Button,
  MenuItem,
  CheckboxGroup,
  Table,
  Thead,
  Tbody,
  Wrap,
  Tr,
  Th,
  Td,
  HStack,
  TableContainer,
  WrapItem,
  Select,
} from "@chakra-ui/react";
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
  return (
    <Box>
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
          <Link href="/stock/addProduct">
            <Button
              fontSize="21px"
              leftIcon={<Image src="/images/print.png" h="25px" w="25px" />}
              bg="red"
              variant="solid"
              color="white"
              _hover={{ bg: "red" }}
            >
              พิมพ์รายงาน
            </Button>
          </Link>
        </Box>

        <Box ml="5px" border="1px" borderColor="red" borderRadius="md">
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
              _hover={{ bg: "white" }}
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
                <MenuItem>
                  <Checkbox
                    value="item1"
                    sx={{
                      ".chakra-checkbox__control": {
                        background: "white !important",
                        borderColor: "black !important",
                        color: "#3FFF33 !important",
                        border: "1px solid",
                      },
                    }}
                  >
                    Item 1
                  </Checkbox>
                </MenuItem>
                <MenuItem>
                  <Checkbox
                    value="item2"
                    sx={{
                      ".chakra-checkbox__control": {
                        background: "white !important",
                        borderColor: "black !important",
                        color: "#3FFF33 !important",
                        border: "1px solid",
                      },
                    }}
                  >
                    Item 2
                  </Checkbox>
                </MenuItem>
                <MenuItem>
                  <Checkbox
                    value="item3"
                    sx={{
                      ".chakra-checkbox__control": {
                        background: "white !important",
                        borderColor: "black !important",
                        color: "#3FFF33 !important",
                        border: "1px solid",
                      },
                    }}
                  >
                    Item 3
                  </Checkbox>
                </MenuItem>
              </CheckboxGroup>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
      <TableContainer height="auto" m="10px">
        <Table>
          <Thead>
            <Tr>
              {colunm.map((item, index) => {
                return (
                  <Th
                    key={index}
                    bg="red"
                    borderLeftRadius={index === 0 ? "md" : ""}
                    borderRightRadius={index === colunm.length - 1 ? "md" : ""}
                    fontSize="21px"
                    color="white"
                  >
                    <Box textAlign="center">
                      <Text>{item.label}</Text>
                    </Box>
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {currentItems.map((item, index) => {
              return (
                <Tr key={index} fontSize="21px">
                  <Td bg={index % 2 !== 0 ? "gray.100" : ""}>{item.date}</Td>
                  <Td bg={index % 2 !== 0 ? "gray.100" : ""}>
                    {item.nameshop}
                  </Td>
                  <Td bg={index % 2 !== 0 ? "gray.100" : ""}>{item.nameproduct}</Td>
                  <Td bg={index % 2 !== 0 ? "gray.100" : ""}>
                  {item.productId}
                  </Td>
                  <Td bg={index % 2 !== 0 ? "gray.100" : ""} display="flex">
                  {item.linkshop}<Image pl="5px" src="/images/copy.png" alt="" h="20px" />
                  </Td>
                  <Td bg={index % 2 !== 0 ? "gray.100" : ""}>{item.numberInvoice}</Td>
                  <Td bg={index % 2 !== 0 ? "gray.100" : ""}>{item.customername}</Td>
                  <Td bg={index % 2 !== 0 ? "gray.100" : ""}>
                    {item.address}
                  </Td>
                  <Td bg={index % 2 !== 0 ? "gray.100" : ""}>{item.tel}</Td>
                  <Td bg={index % 2 !== 0 ? "gray.100" : ""}>{item.orderQuantity}</Td>
                  <Td bg={index % 2 !== 0 ? "gray.100" : ""}>{item.sales}</Td>
                </Tr>
              );
            })}
          </Tbody>
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
              _hover={{ bg: "white" }}
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
            <Text>จาก {totalPages}</Text>
            <Button
              disabled={currentPage >= totalPages}
              onClick={() =>
                handlePageChange(
                  currentPage === totalPages ? currentPage : currentPage + 1
                )
              }
              background="white"
              _hover={{ bg: "white" }}
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
      </TableContainer>
    </Box>
  );
}

export default index;
