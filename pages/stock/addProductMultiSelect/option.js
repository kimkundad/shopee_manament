import React, { useState, useEffect } from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
import {
  Box,
  Flex,
  Image,
  Text,
  Wrap,
  Tag,
  Button,
  TagLabel,
  TagCloseButton,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  Icon,
  Spacer,
  InputLeftElement,
} from "@chakra-ui/react";
import Link from "next/link";
import Select from "react-select";
function option(props) {
  const [div, setDiv] = useState([true]);

  const handleSelectChange = () => {
    setDiv([...div, true]);
  };

  const colorOptions = [
    { value: "blue", label: "Blue" },
    { value: "purple", label: "Purple" },
    { value: "red", label: "Red" },
    { value: "orange", label: "Orange" },
    { value: "yellow", label: "Yellow" },
    { value: "green", label: "Green" },
  ];

  const size = [
    { value: "s", label: "s" },
    { value: "m", label: "m" },
    { value: "xl", label: "Xl" },
    { value: "2xl", label: "2Xl" },
    { value: "3xl", label: "3Xl" },
  ];
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOnChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    console.log("aaaa");
  };
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
      <Box px="100px">
        {div.map((item, index) => {
          return item ? (
            <Flex pt="10px" justifyContent="center" key={index}>
              <Text fontSize="24px" whiteSpace="nowrap">
                รูปแบบที่ {index + 1} :
              </Text>
              <Select maxW="300px" pl="15px" placeholder="เลือกรูปแบบ...">
                <option value="สี">สี</option>
                <option value="ขนาด">ขนาด</option>
              </Select>
              <Text fontSize="24px" px="15px" whiteSpace="nowrap">
                ตัวเลือก :
              </Text>
              <Box width="-webkit-fill-available">
                <Select isMulti options={index === 0 ? colorOptions : size} />
              </Box>
            </Flex>
          ) : null;
        })}
        <Box pl="100px" pt="15px">
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
        <Box></Box>
      </Box>
    </Box>
  );
}

export default option;
