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
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Table } from "@nextui-org/react"; // icons
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
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };
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
        <Box m="10px">
          <Table
            striped
            sticked
            aria-label="Example table with static content"
            css={{
              height: "auto",
              minWidth: "100%",
              border: "0px",
              fontSize: "21px",
              borderCollapse: "collapse",
              padding: "10px",
            }}
          >
            <Table.Header bg="red">
              {colunm.map((item, index) => {
                return (
                  <Table.Column
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      fontSize: "21px",
                    }}
                    key={index}
                    onClick={
                      index == 0 ? (event) => handleAllSwitchChange() : null
                    }
                  >
                    <Text>{item.label}</Text>

                    {index == 0 ? (
                      <Switch colorScheme="brand" isChecked={isCheckedAll} />
                    ) : null}
                  </Table.Column>
                );
              })}
            </Table.Header>
            <Table.Body>
              {products.map((item, index) => {
                return (
                  <Table.Row
                    key={index}
                    css={
                      index % 2 !== 0
                        ? {
                            background: "$gray100 !important",
                            position: "none !important",
                          }
                        : { position: "none !important" }
                    }
                  >
                    <Table.Cell>
                      <Switch
                        colorScheme="brand"
                        isChecked={isCheckedOne[index]}
                        onChange={(event) => handleOneSwitchChange(index)}
                      />
                    </Table.Cell>
                    <Table.Cell>{item.id}</Table.Cell>
                    <Table.Cell>
                      <Image src={item.image} h="30px" w="30px" />
                    </Table.Cell>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{item.quantity}</Table.Cell>
                    <Table.Cell>{item.cost}</Table.Cell>
                    <Table.Cell>{item.price}</Table.Cell>
                    <Table.Cell>{item.created_date}</Table.Cell>
                    <Table.Cell>{item.maker}</Table.Cell>
                    <Table.Cell>
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
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Box>
      </Box>
    </>
  );
}
