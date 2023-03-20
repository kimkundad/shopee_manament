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
} from "@chakra-ui/react";
import Link from "next/link";
import Select from "react-select";
function option() {
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
      console.log("c");
    } else {
      filtered = type.filter((type) => type.value !== "size");
      console.log("s");
    }
    console.log(filtered);
    setFilteredType(filtered);
  };
  console.log(type);
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
                      : option
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
              <Tr>
                <Td border="1px solid" rowSpan={2}>แดง</Td>
                <Td border="1px solid">s</Td>
                <Td border="1px solid"><Input placeholder="ระบุราคา"/></Td>
                <Td border="1px solid"><Input placeholder="ระบุจำนวน"/></Td>
                <Td border="1px solid"><Input placeholder="ระบุจำนวนสินค้า"/></Td>
                <Td border="1px solid"><Switch colorScheme="brand"/></Td>
                <Td border="1px solid"><Image src="/images/trash-bin.png" h="25px"/></Td>
              </Tr>
              <Tr>
                <Td border="1px solid">m</Td>
                <Td border="1px solid"><Input placeholder="ระบุราคา"/></Td>
                <Td border="1px solid"><Input placeholder="ระบุจำนวน"/></Td>
                <Td border="1px solid"><Input placeholder="ระบุจำนวนสินค้า"/></Td>
                <Td border="1px solid"><Switch colorScheme="brand"/></Td>
                <Td border="1px solid"><Image src="/images/trash-bin.png" h="25px"/></Td>
              </Tr>
              <Tr>
                <Td border="1px solid" rowSpan={2}>ดำ</Td>
                <Td border="1px solid">s</Td>
                <Td border="1px solid"><Input placeholder="ระบุราคา"/></Td>
                <Td border="1px solid"><Input placeholder="ระบุจำนวน"/></Td>
                <Td border="1px solid"><Input placeholder="ระบุจำนวนสินค้า"/></Td>
                <Td border="1px solid"><Switch colorScheme="brand"/></Td>
                <Td border="1px solid"><Image src="/images/trash-bin.png" h="25px"/></Td>
              </Tr>
              <Tr>
                <Td border="1px solid">m</Td>
                <Td border="1px solid"><Input placeholder="ระบุราคา"/></Td>
                <Td border="1px solid"><Input placeholder="ระบุจำนวน"/></Td>
                <Td border="1px solid"><Input placeholder="ระบุจำนวนสินค้า"/></Td>
                <Td border="1px solid"><Switch colorScheme="brand"/></Td>
                <Td border="1px solid"><Image src="/images/trash-bin.png" h="25px"/></Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
}

export default option;
