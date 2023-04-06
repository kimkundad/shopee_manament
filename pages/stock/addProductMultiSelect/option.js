import React, { useState, useEffect } from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
import {
  Box,
  Flex,
  Image,
  Text,
  Input,
  Tag,
  Button,
  Table,
  Tbody,
  Tr,
  Td,
  Thead,
  Icon,
  Spacer,
  Switch,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import Select from "react-select";
import axios from "axios";
import { useRouter } from "next/router";
function option() {
  const router = useRouter();
  const data = router.query;
  async function handleSubmit(event) {
    event.preventDefault();
    const response = await axios.post(
      "http://127.0.0.1:8000/api/addProduct",
      data
    );
  }
  //setting select
  const [div, setDiv] = useState([true]);

  const handleSelectChange = () => {
    setDiv([...div, true]);
  };
  const option = [];
  const [type, setType] = useState([
    { value: "color", label: "สี" },
    { value: "size", label: "ขนาด" },
  ]);
  const colorOptions = [
    { value: "blue", label: "Blue" },
    { value: "purple", label: "Purple" },
    { value: "red", label: "Red" },
    { value: "orange", label: "Orange" },
    { value: "yellow", label: "Yellow" },
    { value: "green", label: "Green" },
  ];

  const sizeOptions = [
    { value: "s", label: "S" },
    { value: "m", label: "M" },
    { value: "xl", label: "Xl" },
    { value: "2xl", label: "2Xl" },
    { value: "3xl", label: "3Xl" },
  ];
  const [selectedOptions, setSelectedOptions] = useState(["", ""]);
  const [filteredType, setFilteredType] = useState(type);

  const handleOnChange = (selectedOption, selectKey) => {
    const newValue = [...selectedOptions];
    newValue[selectKey] = selectedOption;
    setSelectedOptions(newValue);

    let filtered = type;
    if (selectedOption.value === "color") {
      filtered = type.filter((type) => type.value !== "color");
    } else {
      filtered = type.filter((type) => type.value !== "size");
    }

    setFilteredType(filtered);
  };

  //modal
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

  const comfirmSave = () => {
    onOpenForm1();
  };
  const closeModal = () => {
    onCloseForm1();
    onCloseForm2();
  };

  const saveSuccess = () => {
    onCloseForm1();
    onOpenForm2();
  };

  const [selectedOptionsColor, setSelectedOptionsColor] = useState([]);
  const [selectedOptionsSize, setSelectedOptionsSize] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  function handleOptionColor(options) {
    setSelectedOptionsColor(options);
    const size = selectedOptionsSize;
    const newArr = options.map((item) => ({
      ...item,
      size,
    }));
    setDataTable(newArr);
  }
  function handleOptionSize(size) {
    setSelectedOptionsSize(size);
    const newArr = selectedOptionsColor.map((item) => ({
      ...item,
      size,
    }));
    setDataTable(newArr);
  }
  function clearSize() {}
  return (
    <Box>
      <Box>
        <Flex justifyContent="center" p="15px">
          <Link href="/stock/addProductMultiSelect">
            <Button
              bg="red"
              h="25px"
              borderRadius="3xl"
              color="white"
              px="7px"
              leftIcon={<Icon as={BsArrowLeftCircle} color="white" />}
            >
              ย้อนกลับ
            </Button>
          </Link>
          <Spacer />
          <Flex alignItems="center">
            <Image src="/images/addProduct.png" alt="" h="40px" w="40px" />
            <Text pl="10px" fontSize="40px" fontWeight="bold" color="black">
              เพิ่มตัวเลือกสินค้า
            </Text>
          </Flex>
          <Spacer />
          <Link href="/stock">
            <Image src="/images/close.png" alt="" h="20px" w="20px" />
          </Link>
        </Flex>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box px="50px">
          {div.map((item, index) => {
            return item ? (
              <Flex pt="10px" justifyContent="center" key={index}>
                <Text fontSize="24px" px="15px" whiteSpace="nowrap">
                  รูปแบบที่ {index + 1} :
                </Text>
                <Box width="-webkit-fill-available">
                  <Select
                    options={filteredType}
                    pl="15px"
                    placeholder="เลือกรูปแบบ..."
                    onChange={(selectedOption) =>
                      handleOnChange(selectedOption, index)
                    }
                  />
                </Box>
                <Text fontSize="24px" px="15px" whiteSpace="nowrap">
                  ตัวเลือก :
                </Text>
                <Box width="-webkit-fill-available">
                  <Select
                    isMulti
                    options={
                      selectedOptions[index] !== ""
                        ? selectedOptions[index].value === "color"
                          ? colorOptions
                          : sizeOptions
                        : null
                    }
                    onChange={
                      selectedOptions[index] !== ""
                        ? selectedOptions[index].value === "color"
                          ? handleOptionColor
                          : handleOptionSize
                        : option
                    }
                    value={
                      selectedOptions[index] !== ""
                        ? selectedOptions[index].value === "color"
                          ? selectedOptionsColor
                          : selectedOptionsSize
                        : null
                    }
                  />
                </Box>
              </Flex>
            ) : null;
          })}
          <Box pl="115px" pt="15px">
            <Button
              border="2px solid black"
              bg="white"
              leftIcon={<Image src="/images/plusblack.png" alt="" h="15px" />}
              _hover={{}}
              onClick={handleSelectChange}
              isDisabled={div.length > 1}
            >
              เพิ่มรูปแบบ ({div.length}/2)
            </Button>
          </Box>
          <Box pl="115px" pt="15px">
            <Table minWidth="100%" border="1px solid" textAlign="center">
              <Thead>
                <Tr>
                  <Td border="1px solid">สี</Td>
                  <Td border="1px solid">ขนาด</Td>
                  <Td border="1px solid">ราคา</Td>
                  <Td border="1px solid">สต็อกสินค้า</Td>
                  <Td border="1px solid">รหัสสินค้า</Td>
                  <Td border="1px solid">ใช้งาน</Td>
                  <Td border="1px solid">ดำเนินการ</Td>
                </Tr>
              </Thead>
              <Tbody>
                {dataTable.map((item, index) => (
                  <React.Fragment key={item.label}>
                    <Tr>
                      <Td
                        border="1px solid"
                        rowSpan={item.size.length > 0 ? item.size.length : 1}
                      >
                        {item.label}
                      </Td>
                      <Td border="1px solid">
                        {item.size.length > 0 ? item.size[0].label : null}
                      </Td>
                      <Td border="1px solid">
                        <Input placeholder="ระบุราคา" />
                      </Td>
                      <Td border="1px solid">
                        <Input placeholder="ระบุจำนวน" />
                      </Td>
                      <Td border="1px solid">
                        <Input placeholder="ระบุจำนวนสินค้า" />
                      </Td>
                      <Td border="1px solid">
                        <Switch colorScheme="brand" />
                      </Td>
                      <Td border="1px solid">
                        <Image src="/images/trash-bin.png" h="25px" />
                      </Td>
                    </Tr>
                    {item.size.map((subItem, subIndex) => {
                      return subIndex !== 0 ? (
                        <Tr key={`${item.label}-${subIndex}`}>
                          <Td border="1px solid">{subItem.label}</Td>
                          <Td border="1px solid">
                            <Input placeholder="ระบุราคา" />
                          </Td>
                          <Td border="1px solid">
                            <Input placeholder="ระบุจำนวน" />
                          </Td>
                          <Td border="1px solid">
                            <Input placeholder="ระบุจำนวนสินค้า" />
                          </Td>
                          <Td border="1px solid">
                            <Switch colorScheme="brand" />
                          </Td>
                          <Td border="1px solid">
                            <Image src="/images/trash-bin.png" h="25px" />
                          </Td>
                        </Tr>
                      ) : null;
                    })}
                  </React.Fragment>
                ))}
              </Tbody>
            </Table>
          </Box>
          <Flex pl="115px" py="15px" justifyContent="center">
            <Button>ยกเลิก</Button>
            <Button
              ml="10px"
              type="submit"
              bg="red"
              color="white"
              leftIcon={<Image src="/images/save.png" alt="" h="25px" />}
              _hover={{}}
              onClick={() => comfirmSave()}
            >
              บันทึก
            </Button>
          </Flex>
        </Box>
      </form>
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
              <Image src="/images/addproduct.png" alt="" h="120px" w="120px" />
              <Text fontSize="40px" fontWeight="bold">
                ยืนยันการเพิ่มสินค้า
              </Text>
            </Box>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Flex>
              <Button bg="white">ยกเลิก</Button>
              <Button
                bg="red"
                type="submit"
                color="white"
                onClick={() => saveSuccess()}
              >
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
                เพิ่มสินค้าสำเร็จ
              </Text>
            </Box>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Link href="/stock">
              <Button bg="red" color="white" _hover={{}}>
                ไปที่หน้าคลังสินค้า
              </Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default option;
