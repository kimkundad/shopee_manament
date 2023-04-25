import React from "react";
import {
  Flex,
  Text,
  Image,
  Input,
  Box,
  Spacer,
  Button,
  Wrap,
  HStack,
  WrapItem,
  Select,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Table, useAsyncList, useCollator } from "@nextui-org/react";
import Link from "next/link";
export default function index() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    async function fecthdata() {
      const res = await axios.get(
        "https://shopee-api.deksilp.com/api/getAllShops"
      );
      setShops(res.data.shops);
    }
    fecthdata();
  }, []);

  //pagination
  const [itemsPerPage, setItemPerpages] = useState(5);
  const handleSelectChange = async (event) => {
    await setItemPerpages(event.target.value);
    if (event.target.value > totalPages) {
      setCurrentPage(1);
      setinputValue(1);
    }
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
  let totalPages = 0;
  let startIndex = 0;
  let endIndex = 0;
  let totalItem = 0;
  let currentItems = [];
  if (shops !== null) {
    let item = parseInt(itemsPerPage);
    totalPages = Math.ceil(shops.length / item);
    startIndex = (currentPage - 1) * item;
    endIndex = startIndex + item;
    currentItems = shops.slice(startIndex, endIndex);
    totalItem = shops.length;
  }
  return (
    <Box m="20px">
      <Text borderBottom="1px solid grey" fontSize="30px">
        รายชื่อร้าน
      </Text>
      <Flex pt="10px">
        <Text alignSelf="center" fontSize="24px">
          ร้านค้า ({totalItem})
        </Text>
        <Spacer />
        <Input maxWidth="200px" />
        <Button>sss</Button>
      </Flex>

      <Table
        striped
        sticked
        aria-label="Example table with static content"
        css={{
          height: "auto",
          minWidth: "100%",
          border: "0px",
          boxShadow: "none",
          padding: "16px 0px 16px 0px",
        }}
      >
        <Table.Header bg="red">
          <Table.Column style={{ backgroundColor: "red", color: "white" }}>
            <Text fontSize="21px">ชื่อร้านค้า</Text>
          </Table.Column>
          <Table.Column style={{ backgroundColor: "red", color: "white" }}>
            <Text fontSize="21px">สิทธิ์</Text>
          </Table.Column>
        </Table.Header>
        <Table.Body>
          {shops?.map((item, index) => {
            return (
              <Table.Row
                key={index}
                css={
                  index % 2 !== 0
                    ? { fontSize: "21px", background: "$gray100" }
                    : { fontSize: "21px" }
                }
              >
                <Table.Cell>
                  <Link href={`/chats/${item.id}`}>
                    <Flex>
                      <Image
                        borderRadius="50%"
                        src={`https://shopee-api.deksilp.com/images/shopee/shop/${item.img_shop}`}
                        alt=""
                        w="50px"
                        h="50px"
                      />
                      <Text alignSelf="center" pl="10px">
                        {item.name_shop}
                      </Text>
                    </Flex>
                  </Link>
                </Table.Cell>

                <Table.Cell>
                  <Text>0</Text>
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
            <Text>จำนวนร้านค้า : </Text>
          </WrapItem>
          <WrapItem>
            <Text>{totalItem}</Text>
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
