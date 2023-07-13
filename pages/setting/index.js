import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Text,
  HStack,
  Center,
  VStack,
  Spacer,
  Flex,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import {
  BsReceipt,
  BsArrowRightCircle,
  BsPerson,
  BsShop,
  BsCashCoin,
  BsBell,
} from "react-icons/bs";
import { useSelector } from "react-redux";

export default function Setting() {
  const userInfo = useSelector((App) => App.userInfo);
  return (
    <>
      <Box p="10">
        <Box>
          <Center>
            <HStack>
              <Image
                width="36"
                height="36"
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

      <Box p={10} minHeight={400}>
        <VStack spacing={5} align="stretch">
          {userInfo && userInfo.data && userInfo.data.length > 0 && userInfo.data[0].is_subadmin === 0 && (
            <Link href="/setting/profile">
              <Box
                p="5"
                borderWidth="2px"
                borderColor="gray.500"
                borderRadius="lg"
                _hover={{ borderColor: "#cd2626", borderWidth: "3px", textColor: '#cd2626' }}
              >
                <Flex>
                  <HStack>
                    <Icon as={BsPerson} boxSize={10} />
                    <Text pt="1" pl="2" as="b" fontSize="21">
                      โปรไฟล์ของฉัน
                    </Text>
                  </HStack>
                  <Spacer />
                  <Box>
                    <Icon as={BsArrowRightCircle} boxSize={8} />
                  </Box>
                </Flex>
              </Box>
            </Link>
          )}
          {/* <Box p='5' borderWidth='2px' borderColor='gray.500' borderRadius='lg'>
                        <Flex color='gray.600'>
                            <HStack>
                                <Icon as={BsShop} boxSize={8} />
                                <Text pt='1' pl='2' as='b' fontSize='21' >ตั้งค่าร้าน</Text>
                            </HStack>
                            <Spacer />
                            <Box>
                                <Link href="/setting/store">
                                    <Icon as={BsArrowRightCircle} boxSize={8} />
                                </Link>
                            </Box>
                        </Flex>
                    </Box> */}
          <Link href="/setting/payment">
            <Box
              p="5"
              borderWidth="2px"
              borderColor="gray.500"
              borderRadius="lg"
              _hover={{ borderColor: "#cd2626", borderWidth: "3px", textColor: '#cd2626' }}
            >
              <Flex>
                <HStack>
                  <Icon as={BsCashCoin} boxSize={8} />
                  <Text pt="1" pl="2" as="b" fontSize="21">
                    ช่องทางการชำระเงิน
                  </Text>
                </HStack>
                <Spacer />
                <Box>
                  <Icon as={BsArrowRightCircle} boxSize={8} />
                </Box>
              </Flex>
            </Box>
          </Link>

          <Link href="/setting/purchaseOrder">
            <Box
              p="5"
              borderWidth="2px"
              borderColor="gray.500"
              borderRadius="lg"
              _hover={{ borderColor: "#cd2626", borderWidth: "3px", textColor: '#cd2626' }}
            >
              <Flex>
                <HStack>
                  <Icon as={BsReceipt} boxSize={8} />
                  <Text pt="1" pl="2" as="b" fontSize="21">
                    ใบคำสั่งซื้อ
                  </Text>
                </HStack>
                <Spacer />
                <Box>
                  <Icon as={BsArrowRightCircle} boxSize={8} />
                </Box>
              </Flex>
            </Box>
          </Link>

          <Link href="/setting/receipt">
            <Box
              p="5"
              borderWidth="2px"
              borderColor="gray.500"
              borderRadius="lg"
              _hover={{ borderColor: "#cd2626", borderWidth: "3px", textColor: '#cd2626' }}
            >
              <Flex>
                <HStack>
                  <Icon as={BsReceipt} boxSize={8} />
                  <Text pt="1" pl="2" as="b" fontSize="21">
                    ใบเสร็จ/ใบกำกับภาษี
                  </Text>
                </HStack>
                <Spacer />
                <Box>
                  <Icon as={BsArrowRightCircle} boxSize={8} />
                </Box>
              </Flex>
            </Box>
          </Link>

          <Link href="/setting/notification">
            <Box
              p="5"
              borderWidth="2px"
              borderColor="gray.500"
              borderRadius="lg"
              _hover={{ borderColor: "#cd2626", borderWidth: "3px", textColor: '#cd2626' }}
            >
              <Flex>
                <HStack>
                  <Icon as={BsBell} boxSize={8} />
                  <Text pt="1" pl="2" as="b" fontSize="21">
                    แจ้งเตือน
                  </Text>
                </HStack>
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
