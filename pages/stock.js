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

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setinputValue] = useState(1);
  const handleInputChange = (event) => {
    console.log(event.target.value);
    if( event.target.value !== "" && event.target.value >=1 && event.target.value <= totalPages){
      setCurrentPage(parseInt(event.target.value));
      setinputValue(parseInt(event.target.value))
    }else if(event.target.value === ""){
      setinputValue('');
    }
    
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setinputValue(page);
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = products.slice(startIndex, endIndex);
  console.log(currentPage);
  console.log('-----');
  console.log(totalPages);
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
                    src="/images/arrow/down-filled-triangular-arrow.png"
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
                    <Td bg={index % 2 !== 0 ? "gray.100" : ""}>
                      {item.id}
                      {index}
                    </Td>
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
            <Wrap alignSelf="center">
              <WrapItem>
                <Text>แสดงผล : </Text>
              </WrapItem>
              <WrapItem>
                <Select size="xs">
                  <option value="option1">10</option>
                  <option value="option2">20</option>
                  <option value="option3">30</option>
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
            <HStack spacing="2" alignSelf="center">
              <Button
                disabled={currentPage === 1 || currentPage < 1}
                onClick={() =>
                  handlePageChange(
                    currentPage === 1 ? currentPage : currentPage - 1
                  )
                }
                background="white"
              >
                <Image
                  src="/images/arrow/left-arrow.png"
                  alt=""
                  h="15px"
                  w="10px"
                />
              </Button>

              <Text>หน้า</Text>
              <Input htmlSize={1} placeholder="1" size="xs" onChange={handleInputChange} value={inputValue}/>
              <Text>จาก {totalPages}</Text>
              <Button
                disabled={currentPage >= totalPages}
                onClick={() =>
                  handlePageChange(
                    currentPage === totalPages ? currentPage : currentPage + 1
                  )
                }
                background="white"
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
