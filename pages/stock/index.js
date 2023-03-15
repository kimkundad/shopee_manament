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
  Button,
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
import ListCheck from "@/components/MenuList";
export default function stock() {
  const initialProducts = [
    {
      id: 1,
      image: "/images/edit.png",
      name: "dfjshsd",
      quantity: 100,
      cost: 120,
      price: 100,
      created_date: "15/10/2555",
      maker: "asdsa",
      active: 0,
    },
    {
      id: 2,
      image: "/images/edit.png",
      name: "dfjshsd",
      quantity: 100,
      cost: 120,
      price: 100,
      created_date: "15/10/2555",
      maker: "asdsa",
      active: 0,
    },
    {
      id: 3,
      image: "/images/edit.png",
      name: "dfjshsd",
      quantity: 100,
      cost: 120,
      price: 100,
      created_date: "15/10/2555",
      maker: "asdsa",
      active: 0,
    },
    {
      id: 4,
      image: "/images/edit.png",
      name: "dfjshsd",
      quantity: 100,
      cost: 120,
      price: 100,
      created_date: "15/10/2555",
      maker: "asdsa",
      active: 0,
    },
    {
      id: 5,
      image: "/images/edit.png",
      name: "dfjshsd",
      quantity: 100,
      cost: 120,
      price: 100,
      created_date: "15/10/2555",
      maker: "asdsa",
      active: 0,
    },
    {
      id: 6,
      image: "/images/edit.png",
      name: "dfjshsd",
      quantity: 100,
      cost: 120,
      price: 100,
      created_date: "15/10/2555",
      maker: "asdsa",
      active: 0,
    },
    {
      id: 7,
      image: "/images/edit.png",
      name: "dfjshsd",
      quantity: 100,
      cost: 120,
      price: 100,
      created_date: "15/10/2555",
      maker: "asdsa",
      active: 0,
    },
  ];
  const [products, setProducts] = useState(initialProducts);
  const colunm = [
    {
      label: "เปิด/ปิด",
    },
    {
      label: "รหัสสินค้า",
    },
    {
      label: "รูปสินค้า",
    },
    {
      label: "ชื่อสินค้า",
    },
    {
      label: "สต๊อกสินค้า",
    },
    {
      label: "ต้นทุน",
    },
    {
      label: "ราคา",
    },
    {
      label: "วันที่สร้าง",
    },
    {
      label: "ผู้สร้าง",
    },
    {
      label: "เพิ่มเติม",
    },
  ];

  //setChecked Switch
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  function handleAllSwitchChange() {
    const updatedProducts = products.map((product) => {
      if (!isCheckedAll === true) {
        return { ...product, active: 1 };
      } else {
        return { ...product, active: 0 };
      }
    });
    setIsCheckedAll(!isCheckedAll);
    setProducts(updatedProducts);
  }

  function handleActivateProduct(id) {
    let checkAll = true;
    const updatedProducts = products.map((product) => {
      if (product.id === id && product.active === 0) {
        return { ...product, active: 1 };
      } else if (product.id === id && product.active === 1) {
        return { ...product, active: 0 };
      } else {
        return product;
      }
    });
    updatedProducts.map((products) => {
      if (products.active === 0) {
        return (checkAll = false);
      }
    });
    setIsCheckedAll(checkAll);
    setProducts(updatedProducts);
  }
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
  //sorting colunm
  return (
    <>
      <Box>
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
          <Spacer />
          <Box borderWidth="1px" borderColor="red" borderRadius="md">
            <Link href="/stock/addProduct">
              <Button
                fontSize="21px"
                leftIcon={
                  <Image src="/images/pluswhite.png" h="25px" w="25px" />
                }
                bg="red"
                variant="solid"
                color="white"
                _hover={{ bg: "red" }}
              >
                เพิ่มสินค้า
              </Button>
            </Link>
          </Box>

          <Box ml="5px" border="1px" borderColor="red" borderRadius="md">
          <ListCheck data={colunm} />
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
                      borderRightRadius={
                        index === colunm.length - 1 ? "md" : ""
                      }
                      fontSize="21px"
                      color="white"
                    >
                      <Box textAlign="center">
                        <Text>{item.label}</Text>
                        {index == 0 ? (
                          <Flex>
                            <Switch
                              colorScheme="brand"
                              isChecked={isCheckedAll}
                              onChange={(event) => handleAllSwitchChange()}
                              size="sm"
                            />
                            <Text pl="5px" fontSize="15px">
                              เปิด/ปิดทั้งหมด
                            </Text>
                          </Flex>
                        ) : null}
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
                    <Td
                      bg={index % 2 !== 0 ? "gray.100" : ""}
                      borderLeftRadius="md"
                      textAlign="center"
                    >
                      <Switch
                        colorScheme="brand"
                        isChecked={
                          isCheckedAll ? true : item.active === 0 ? false : true
                        }
                        onChange={(event) => handleActivateProduct(item.id)}
                      />
                    </Td>
                    <Td bg={index % 2 !== 0 ? "gray.100" : ""}>{item.id}</Td>
                    <Td bg={index % 2 !== 0 ? "gray.100" : ""}>
                      <Image src={item.image} h="30px" w="30px" />
                    </Td>
                    <Td bg={index % 2 !== 0 ? "gray.100" : ""}>{item.name}</Td>
                    <Td bg={index % 2 !== 0 ? "gray.100" : ""}>
                      {item.quantity}
                    </Td>
                    <Td bg={index % 2 !== 0 ? "gray.100" : ""}>{item.cost}</Td>
                    <Td bg={index % 2 !== 0 ? "gray.100" : ""}>{item.price}</Td>
                    <Td bg={index % 2 !== 0 ? "gray.100" : ""}>
                      {item.created_date}
                    </Td>
                    <Td bg={index % 2 !== 0 ? "gray.100" : ""}>{item.maker}</Td>
                    <Td
                      bg={index % 2 !== 0 ? "gray.100" : ""}
                      borderRightRadius="md"
                    >
                      <Flex>
                        <Link href="/">
                          <Image src="/images/edit.png" h="25px" />
                        </Link>
                        <Link href="/">
                          <Image
                            pl="7px"
                            src="/images/trash-bin.png"
                            h="25px"
                          />
                        </Link>
                      </Flex>
                    </Td>
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
    </>
  );
}
