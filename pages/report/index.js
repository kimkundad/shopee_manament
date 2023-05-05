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
import axios from "axios";
function index() {
  const [products, setProducts] = useState([]);
  const [column, setColumn] = useState([
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
  ]);
  const [itemsPerPage, setItemPerpages] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setinputValue] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  useEffect(() => {
    async function fecthdata() {
      const res = await axios.post(
        `https://shopee-api.deksilp.com/api/getReports`
      );
      setProducts(res.data.reports);
    }
    fecthdata();
  }, []);

  useEffect(() => {
    let item = parseInt(itemsPerPage);
    setTotalPages(Math.ceil(products?.length / item));
    const startIndex = (currentPage - 1) * item;
    const endIndex = startIndex + item;
    const items = products?.slice(startIndex, endIndex);
    setCurrentItems(items);

    if (currentPage > totalPages) {
      setCurrentPage(1);
      setinputValue(1);
    }
  }, [products, currentPage, itemsPerPage]);
  //pagination
  const handleSelectChange = (event) => {
    setItemPerpages(event.target.value);
  };

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

  //sum
  const [sumSales, setSumSales] = useState(0);
  const [sumOrders, setSumOrders] = useState(0);

  useEffect(() => {
    let sumSale = 0;
    products?.forEach((item) => {
      if (item.type == 1) {
        sumSale += item.price_type_1;
      } else if (item.type == 2) {
        sumSale += item.price_type_2;
      } else if (item.type == 3) {
        sumSale += item.price_type_3;
      }
    });
    setSumSales(sumSale);
    let sumOrder = 0;
    products?.forEach((item) => {
      sumOrder += item.num;
    });
    setSumOrders(sumOrder);
  }, [products]);

  const [selectedColumns, setSelectedColumns] = useState(
    Array(column.length).fill(true)
  );
  const handleColumnChange = (index, isChecked) => {
    const updatedColumns = [...selectedColumns];
    updatedColumns[index] = isChecked;
    setSelectedColumns(updatedColumns);
  };

  const copyLink = async (link) => {
    try {
      await navigator.clipboard.writeText(link);
      console.log("Text copied to clipboard");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  console.log(currentItems);
  if (currentItems.length > 0) {
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
            <Link href="/report/printReport">
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
            <ListCheck
              data={column}
              onChange={handleColumnChange}
              selected={selectedColumns}
            />
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
            boxShadow: "none",
          }}
        >
          <Table.Header bg="red">
            {column?.map((item, index) => {
              return (
                <Table.Column
                  style={{ backgroundColor: "red", color: "white" }}
                  key={index}
                  css={{
                    textAlign: "center",
                    padding: "0px !important",
                  }}
                >
                  <Text fontSize="21px">{item.label}</Text>
                </Table.Column>
              );
            })}
          </Table.Header>
          <Table.Body>
            {currentItems?.map((item, index) => {
              return (
                <Table.Row
                  key={index}
                  css={
                    index % 2 !== 0
                      ? { fontSize: "21px", background: "$gray100" }
                      : { fontSize: "21px" }
                  }
                >
                  <Table.Cell css={{ textAlign: "center" }}>
                    {item.created_at}
                  </Table.Cell>
                  <Table.Cell css={{ textAlign: "center" }}>
                    {item.name_shop}
                  </Table.Cell>
                  <Table.Cell>{item.name_product}</Table.Cell>
                  <Table.Cell css={{ textAlign: "center" }}>
                    {item.sku}
                  </Table.Cell>
                  <Table.Cell css={{ textAlign: "center" }}>
                    {item.url_shop !== undefined ? (
                      <Flex justifyContent="center">
                        <Text>{item.url_shop}</Text>
                        <Image
                          src="/images/copy.png"
                          h="20px"
                          pl="10px"
                          alignSelf="center"
                          onClick={(e) => copyLink(item.url_shop)}
                        />
                      </Flex>
                    ) : null}
                  </Table.Cell>
                  <Table.Cell css={{ textAlign: "center" }}>
                    {item.order_id}
                  </Table.Cell>
                  <Table.Cell css={{ textAlign: "center" }}>
                    <Link href="/report/detailCustomer">{item.name}</Link>
                  </Table.Cell>
                  <Table.Cell css={{ textAlign: "center" }}>
                    {item.province}
                  </Table.Cell>
                  <Table.Cell css={{ textAlign: "center" }}>
                    {item.tel}
                  </Table.Cell>
                  <Table.Cell css={{ textAlign: "center" }}>
                    {item.num}
                  </Table.Cell>
                  <Table.Cell css={{ textAlign: "center" }}>
                    {item.type == 1
                      ? item.price_type_1
                      : item.type == 2
                      ? item.price_type_2
                      : item.price_type_3}
                  </Table.Cell>
                </Table.Row>
              );
            })}
            <Table.Row
              css={
                currentItems.length % 2 !== 0
                  ? { fontSize: "21px", background: "$gray100" }
                  : { fontSize: "21px" }
              }
            >
              <Table.Cell css={{ textAlign: "center", fontWeight: "bold" }}>
                ยอดขาย
              </Table.Cell>
              <Table.Cell css={{ textAlign: "center" }}></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell css={{ textAlign: "center" }}></Table.Cell>
              <Table.Cell css={{ textAlign: "center" }}></Table.Cell>
              <Table.Cell css={{ textAlign: "center" }}></Table.Cell>
              <Table.Cell css={{ textAlign: "center" }}></Table.Cell>
              <Table.Cell css={{ textAlign: "center" }}></Table.Cell>
              <Table.Cell css={{ textAlign: "center" }}></Table.Cell>
              <Table.Cell css={{ textAlign: "center", fontWeight: "bold" }}>
                {sumOrders}
              </Table.Cell>
              <Table.Cell css={{ textAlign: "center", fontWeight: "bold" }}>
                {sumSales}
              </Table.Cell>
            </Table.Row>
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
              <Text>{products?.length}</Text>
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
}

export default index;
