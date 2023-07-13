import React from "react";
import Image from "next/image";
import Link from "next/link";
import ButtonBack from "@/components/button/ButtonBack";
import {
  Box,
  Text,
  HStack,
  Center,
  Flex,
  VStack,
  Button,
  Spacer,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { BsArrowRightCircle, BsReceipt } from "react-icons/bs";

export default function Receipt() {
  return (
    <>
      <Box p={[5, 10]}>
        <Box>
          <ButtonBack />
        </Box>
        <Box>
          <Center>
            <HStack>
              <Image
                width={36}
                height={36}
                src={"/images/menu/icon-setting.png"}
              />
              <Text as="b" fontSize="4xl" pt={3}>
                {" "}
                ตั้งค่า
              </Text>
            </HStack>
          </Center>
        </Box>
      </Box>

      <Box bg={"#f3f4f6"} pl={10} pt={2} pb={2}>
        <HStack>
          <Icon as={BsReceipt} boxSize={8} />
          <Text as="b" fontSize="lg">
            {" "}
            ใบเสร็จ/ใบกำกับภาษี
          </Text>
        </HStack>
      </Box>

      <Box p={10} minHeight={400}>
        <VStack spacing={5} align="stretch">
          <Link href="/setting/receipt/bill">
            <Box
              p={5}
              color="gray.600"
              fontSize="17"
              borderWidth="2px"
              borderColor={"gray.500"}
              borderRadius="lg"
              _hover={{ borderWidth: '3px', borderColor: '#cd2626', textColor: "#cd2626"}}
            >
              <Flex align={"center"}>
                <Box>
                  <Text as="b" fontSize="21">
                    ใบเสร็จ
                  </Text>
                  <br />
                  <Text>ตั้งค่าสำหรับพิมพ์เอกสารใบเสร็จ</Text>
                </Box>
                <Spacer />
                <Box>
                  <Icon as={BsArrowRightCircle} boxSize={8} />
                </Box>
              </Flex>
            </Box>
          </Link>
          <Link href="/setting/receipt/invoice">
            <Box
              p={5}
              color="gray.600"
              fontSize="17"
              borderWidth="2px"
              borderColor={"gray.500"}
              borderRadius="lg"
              _hover={{ borderWidth: '3px', borderColor: '#cd2626', textColor: "#cd2626"}}
            >
              <Flex align={"center"}>
                <Box>
                  <Text as="b" fontSize="21">
                    ใบกำกับภาษี
                  </Text>
                  <br />
                  <Text>ตั้งค่าสำหรับพิมพ์เอกสารใบกำกับภาษี</Text>
                </Box>
                <Spacer />
                <Box>
                  <Icon as={BsArrowRightCircle} boxSize={8} />
                </Box>
              </Flex>
            </Box>
          </Link>
        </VStack>
      </Box>
    </>
  );
}
