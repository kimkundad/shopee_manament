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
  Skeleton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import ListCheck from "@/components/MenuList";
import Link from "next/link";
import axios from "axios";
function index() {
  const [products, setProducts] = useState([]);
  const [loadingImg, setLoadingImg] = useState(true);
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
  const [search, setSearch] = useState("");
  //sum
  const [sumSales, setSumSales] = useState(0);
  const [sumOrders, setSumOrders] = useState(0);
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
    const newArr = [...products];
    const filteredData = newArr.filter((item) =>
      Object.values(item).join(" ").toLowerCase().includes(search.toLowerCase())
    );
    setTotalPages(Math.ceil(filteredData?.length / item));
    const startIndex = (currentPage - 1) * item;
    const endIndex = startIndex + item;
    const items = filteredData?.slice(startIndex, endIndex);
    setCurrentItems(items);

    if (currentPage > totalPages) {
      setCurrentPage(1);
      setinputValue(1);
    }

    let sumSale = 0;
    filteredData?.forEach((item) => {
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
    filteredData?.forEach((item) => {
      sumOrder += item.num;
    });
    setSumOrders(sumOrder);
  }, [products, currentPage, itemsPerPage, search]);
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
              onChange={(e) => setSearch(e.target.value)}
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
      <Box padding={"0.5rem 1rem 0.5rem 1rem"}>
        <Table
          variant="striped"
          colorScheme="gray"
          css={{
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <Thead bg="red">
            <Tr>
              {column?.map((item, index) => {
                if (selectedColumns[index]) {
                  return (
                    <Th
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        textAlign: "center",
                      }}
                      key={index}
                    >
                      <Text fontSize="21px">{item.label}</Text>
                    </Th>
                  );
                }
              })}
            </Tr>
          </Thead>
          <Tbody>
            {currentItems?.map((item, index) => {
              return (
                <Tr key={index} fontSize="21px">
                  {selectedColumns[0] ? <Td>{item.created_at}</Td> : null}
                  {selectedColumns[1] ? <Td>{item.name_shop}</Td> : null}
                  {selectedColumns[2] ? <Td>{item.name_product}</Td> : null}
                  {selectedColumns[3] ? <Td>{item.sku}</Td> : null}
                  {selectedColumns[4] ? (
                    <Td>
                      {item.url_shop !== undefined ? (
                        <Flex justifyContent="center">
                          <Text>{item.url_shop}</Text>
                          <Skeleton
                            h="20px"
                            width="20px"
                            borderRadius="xl"
                            ml="10px"
                            alignSelf="center"
                            display={loadingImg ? "block" : "none"}
                          />
                          <Image
                            src="/images/copy.png"
                            h="20px"
                            pl="10px"
                            alignSelf="center"
                            onClick={(e) => copyLink(item.url_shop)}
                            display={!loadingImg ? "block" : "none"}
                            onLoad={() => setLoadingImg(false)}
                          />
                        </Flex>
                      ) : null}
                    </Td>
                  ) : null}
                  {selectedColumns[5] ? <Td>{item.invoice_id}</Td> : null}
                  {selectedColumns[6] ? (
                    <Td>
                      <Link
                        href={{
                          pathname: "/report/detailCustomer/" + item.uid,
                        }}
                      >
                        {item.customer_name.length > 10
                          ? item.customer_name?.slice(0, 10) + "..."
                          : item.customer_name}
                      </Link>
                    </Td>
                  ) : null}
                  {selectedColumns[7] ? <Td>{item.province}</Td> : null}
                  {selectedColumns[8] ? <Td>{item.tel}</Td> : null}
                  {selectedColumns[9] ? (
                    <Td textAlign="end">{item.num}</Td>
                  ) : null}
                  {selectedColumns[10] ? (
                    <Td textAlign="end">
                      {item.type == 1
                        ? item.price_type_1
                        : item.type == 2
                        ? item.price_type_2
                        : item.price_type_3}
                    </Td>
                  ) : null}
                </Tr>
              );
            })}
            <Tr fontSize="21px">
              {selectedColumns[0] ? <Td fontWeight="bold">ยอดรวม</Td> : null}
              {selectedColumns[1] ? <Td></Td> : null}
              {selectedColumns[2] ? <Td></Td> : null}
              {selectedColumns[3] ? <Td></Td> : null}
              {selectedColumns[4] ? <Td></Td> : null}
              {selectedColumns[5] ? <Td></Td> : null}
              {selectedColumns[6] ? <Td></Td> : null}
              {selectedColumns[7] ? <Td></Td> : null}
              {selectedColumns[8] ? <Td></Td> : null}
              {selectedColumns[9] ? (
                <Td fontWeight="bold" textAlign="end">
                  {sumOrders}
                </Td>
              ) : null}
              {selectedColumns[10] ? (
                <Td fontWeight="bold" textAlign="end">
                  {sumSales}
                </Td>
              ) : null}
            </Tr>
          </Tbody>
        </Table>
      </Box>
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

export default index;
