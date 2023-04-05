import React, { useState, useEffect } from "react";
import {
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
  Wrap,
  HStack,
  WrapItem,
  Select,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import ListCheck from "@/components/MenuList";
import { Table, useAsyncList, useCollator } from "@nextui-org/react";
import Link from "next/link";
import axios from "axios";
export default function stock() {
  const [products, setProducts] = useState(null);
  useEffect(() => {
    async function fetchData() {
      let checkAll = true;
      const res = await axios.get("https://shopee-api.deksilp.com/api/getAllProduct");
      setProducts(res.data);
      if (res.data.product.length > 0) {
        res.data.product.map((products) => {
          if (products.active === 0) {
            return (checkAll = false);
          }
        });
        setIsCheckedAll(checkAll);
      }
    }

    fetchData();
  }, []);
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
    async function fetchData() {
      const res = await axios.put(
        `https://shopee-api.deksilp.com/api/setActiveAllProduct/?checked=${!isCheckedAll}`
      );
      setProducts(res.data);
      setIsCheckedAll(!isCheckedAll);
    }
    fetchData();
  }

  const handleActivateProduct = (event) => {
    async function fetchData() {
      const res = await axios.put(
        `https://shopee-api.deksilp.com/api/setActiveProduct/?id=${event.target.id}&checked=${event.target.checked}`
      );
      setProducts(res.data);
      setIsCheckedAll(
        res.data.product.every((product) => product.active === 1)
      );
    }
    fetchData();
  }
 
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
  if (products !== null) {
    let item = parseInt(itemsPerPage);
    totalPages = Math.ceil(products.product.length / item);
    startIndex = (currentPage - 1) * item;
    endIndex = startIndex + item;
    currentItems = products.product.slice(startIndex, endIndex);
    totalItem = products.product.length;
  }

  //active button
  const {
    isOpen: isOpenForm1,
    onOpen: onOpenForm1,
    onClose: onCloseForm1,
  } = useDisclosure();
  const {
    isOpen: isOpenForm2,
    onOpen: onOpenForm2,
    onClose: onCloseForm2,
  } = useDisclosure();

  const [id, setId] = useState(null);
  const comfirmDelete = (id) => {
    onOpenForm1();
    setId(id);
  };
  const closeModal = () => {
    setId(null);
    onCloseForm1();
    onCloseForm2();
  };

  //delete product
  function deleteProduct() {
    async function fetchData() {
      const res = await axios.post(
        `https://shopee-api.deksilp.com/api/deleteProduct/${id}`
      );
      setProducts(res.data);
      setIsCheckedAll(
        res.data.product.every((product) => product.active === 1)
      );
    }

    fetchData();
    onCloseForm1();
    onOpenForm2();
    setId(null);
  }

  //sorting colunm

  return (
    <>
      <Box w="100%">
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
                _hover={{}}
              >
                เพิ่มสินค้า
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
            boxShadow: "none",
          }}
        >
          <Table.Header bg="red">
            {colunm.map((item, index) => {
              return (
                <Table.Column
                  style={{ backgroundColor: "red", color: "white" }}
                  key={index}
                  onClick={index == 0 ? () => handleAllSwitchChange() : null}
                  css={{ textAlign: "center", padding: "0px !important" }}
                >
                  <Text fontSize="21px">{item.label}</Text>
                  {index == 0 ? (
                    <Flex justifyContent="center">
                      <Switch
                        colorScheme="brand"
                        isChecked={isCheckedAll}
                        onChange={() => handleAllSwitchChange()}
                        size="sm"
                      />
                      <Text pl="5px" fontSize="15px">
                        เปิด/ปิดทั้งหมด
                      </Text>
                    </Flex>
                  ) : null}
                </Table.Column>
              );
            })}
          </Table.Header>
          <Table.Body>
            {currentItems.map((item, index) => {
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
                    <Switch
                      colorScheme="brand"
                      isChecked={isCheckedAll ? true : item.active === 0 ? false : true}
                      onChange={handleActivateProduct}
                      id={item.id}
                    />
                  </Table.Cell>
                  <Table.Cell css={{ textAlign: "center" }}>
                    {item.id}
                  </Table.Cell>
                  <Table.Cell>
                    <Center>
                      <Image src={item.img_product} h="30px" w="30px" />
                    </Center>
                  </Table.Cell>
                  <Table.Cell css={{ textAlign: "center" }}>
                  {item.name_product.length > 10
                            ? item.name_product.substr(0, 10) + "..."
                            : item.name_product}
                  </Table.Cell>
                  <Table.Cell css={{ textAlign: "center" }}>
                    {item.stock}
                  </Table.Cell>
                  <Table.Cell css={{ textAlign: "center" }}>
                    {item.cost}
                  </Table.Cell>
                  <Table.Cell css={{ textAlign: "center" }}>
                    {item.price}
                  </Table.Cell>
                  <Table.Cell css={{ textAlign: "center" }}>
                    {item.created_at}
                  </Table.Cell>
                  <Table.Cell css={{ textAlign: "center" }}>
                    {item.maker}
                  </Table.Cell>
                  <Table.Cell css={{ textAlign: "center" }}>
                    <Flex justifyContent="center" w="70px">
                      <Link href="/">
                        <Image src="/images/edit.png" h="25px" />
                      </Link>
                      <Image
                        pl="7px"
                        src="/images/trash-bin.png"
                        h="25px"
                        onClick={() => comfirmDelete(item.id)}
                      />
                    </Flex>
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
        <Modal onClose={onCloseForm1} size="md" isOpen={isOpenForm1} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader alignSelf="flex-end" pr="10px" pt="10px">
              <Image
                src="/images/close.png"
                alt=""
                h="25px"
                w="25px"
                onClick={() => closeModal()}
              />
            </ModalHeader>
            <ModalBody>
              <Box textAlign="-webkit-center">
                <Image src="/images/binred.png" alt="" h="120px" w="120px" />
                <Text fontSize="40px" fontWeight="bold">
                  ยืนยันการลบสินค้า
                </Text>
              </Box>
            </ModalBody>
            <ModalFooter justifyContent="center">
              <Flex>
                <Button bg="white">ยกเลิก</Button>
                <Button bg="red" color="white" onClick={deleteProduct}>
                  ยืนยัน
                </Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Modal onClose={onCloseForm2} size="xs" isOpen={isOpenForm2} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader alignSelf="flex-end" pr="10px" pt="10px">
              <Image
                src="/images/close.png"
                alt=""
                h="25px"
                w="25px"
                onClick={() => closeModal()}
              />
            </ModalHeader>
            <ModalBody>
              <Box textAlign="-webkit-center">
                <Image src="/images/check.png" alt="" h="120px" w="120px" />
                <Text fontSize="40px" fontWeight="bold">
                  ลบสินค้าสำเร็จ
                </Text>
              </Box>
            </ModalBody>
            <ModalFooter justifyContent="center">
              <Link href="/stock">
                <Button
                  bg="red"
                  color="white"
                  _hover={{}}
                  onClick={() => closeModal()}
                >
                  ไปที่หน้าคลังสินค้า
                </Button>
              </Link>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
}
