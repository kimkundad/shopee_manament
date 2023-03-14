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
  Tfoot,
  Tr,
  Th,
  Td,
  HStack,
  TableContainer,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export default function stock() {
  const products = [
    {
      id: "sadasld",
      image: "/images/edit.png",
      name: "dfjshsd",
      quantity: 100,
      cost: 120,
      price: 100,
      created_date: "15/10/2555",
      maker: "asdsa",
    },
    {
      id: "sadasld",
      image: "/images/edit.png",
      name: "dfjshsd",
      quantity: 100,
      cost: 120,
      price: 100,
      created_date: "15/10/2555",
      maker: "asdsa",
    },
    {
      id: "sadasld",
      image: "/images/edit.png",
      name: "dfjshsd",
      quantity: 100,
      cost: 120,
      price: 100,
      created_date: "15/10/2555",
      maker: "asdsa",
    },
    {
      id: "sadasld",
      image: "/images/edit.png",
      name: "dfjshsd",
      quantity: 100,
      cost: 120,
      price: 100,
      created_date: "15/10/2555",
      maker: "asdsa",
    },
    {
      id: "sadasld",
      image: "/images/edit.png",
      name: "dfjshsd",
      quantity: 100,
      cost: 120,
      price: 100,
      created_date: "15/10/2555",
      maker: "asdsa",
    },
    {
      id: "sadasld",
      image: "/images/edit.png",
      name: "dfjshsd",
      quantity: 100,
      cost: 120,
      price: 100,
      created_date: "15/10/2555",
      maker: "asdsa",
    },
    {
      id: "sadasld",
      image: "/images/edit.png",
      name: "dfjshsd",
      quantity: 100,
      cost: 120,
      price: 100,
      created_date: "15/10/2555",
      maker: "asdsa",
    },
  ];
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

  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isCheckedOne, setIsCheckedOne] = useState(
    Array(products.length).fill(false)
  );

  function handleAllSwitchChange() {
    setIsCheckedAll(!isCheckedAll);
    const myArr = Array(products.length).fill(!isCheckedAll);
    setIsCheckedOne(myArr);
  }

  const handleOneSwitchChange = (id) => {
    const newItem = [...isCheckedOne];
    newItem[id] = event.target.checked;
    const allTrue = newItem.every((value) => value === true);
    setIsCheckedOne(newItem);
    if (allTrue) {
      setIsCheckedAll(true);
    } else {
      setIsCheckedAll(false);
    }
  };
  const [itemsPerpage, setItemsPerpage] = useState(1);

  let items = itemsPerpage;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(products.length / items);
  const startIndex = (currentPage - 1) * items;
  const endIndex = startIndex + items;
  const currentItems = products.slice(startIndex, endIndex);


  const displayRange = 5;
  let displayPages = [];

  if (totalPages <= displayRange) {
    for (let i = 1; i <= totalPages; i++) {
      displayPages.push(i);
    }
  } else {
    const middlePage = Math.floor(displayRange / 2);
    let start = currentPage - middlePage;
    let end = currentPage + middlePage;

    if (start < 1) {
      end += Math.abs(start) + 1;
      start = 1;
    }
    if (end > totalPages) {
      start -= end - totalPages;
      end = totalPages;
    }

    if (start === 1) {
      displayPages = [1, 2, 3, 4, 5];
    } else if (end === totalPages) {
      displayPages = [end - 4, end - 3, end - 2, end - 1, end];
    } else {
      displayPages = [start - 1, start, start + 1, end - 1, end];
    }
  }

  const startPage = displayPages[0];
  const endPage = displayPages[displayPages.length - 1];
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
            <Button
              fontSize="21px"
              leftIcon={<Image src="/images/pluswhite.png" h="25px" w="25px" />}
              bg="red"
              variant="solid"
              color="white"
            >
              เพิ่มสินค้า
            </Button>
          </Box>

          <Box ml="5px" border="1px" borderColor="red" borderRadius="md">
            <Menu closeOnSelect={false}>
              <MenuButton
                as={Button}
                bg="white"
                fontSize="21px"
                leftIcon={<Image src="/images/menu.png" h="25px" w="25px" />}
                rightIcon={
                  <Image
                    src="/images/down-filled-triangular-arrow.png"
                    h="10px"
                    w="20px"
                  />
                }
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
                      borderRightRadius={
                        index === colunm.length - 1 ? "md" : ""
                      }
                      fontSize="21px"
                      color="white"
                    >
                      <Box>
                        {item.label}
                        {index == 0 ? (
                          <Switch
                            colorScheme="brand"
                            isChecked={isCheckedAll}
                            onChange={(event) => handleAllSwitchChange()}
                          />
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
                    >
                      <Switch
                        colorScheme="brand"
                        isChecked={isCheckedOne[index]}
                        onChange={(event) => handleOneSwitchChange(index)}
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
          <Flex m="10px" justifyContent="flex-end">
            <HStack mt="4" spacing="2">
              <Button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </Button>
              {startPage > 1 && (
                <>
                  <Button onClick={() => handlePageChange(1)}>1</Button>
                  {startPage > 2 && <Button disabled>...</Button>}
                </>
              )}
              {displayPages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  variant={page === currentPage ? "solid" : "ghost"}
                >
                  {page}
                </Button>
              ))}
              {endPage < totalPages && (
                <>
                  {endPage < totalPages - 1 && <Button disabled>...</Button>}
                  <Button onClick={() => handlePageChange(totalPages)}>
                    {totalPages}
                  </Button>
                </>
              )}
              <Button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </Button>
            </HStack>
          </Flex>
        </TableContainer>
      </Box>
    </>
  );
}
