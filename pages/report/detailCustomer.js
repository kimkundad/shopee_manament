import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  Icon,
  Spacer,
  Button,
  Wrap,
  HStack,
  WrapItem,
  Table,
  Tbody,
  Tr,
  Td,
  Grid,
  GridItem,
  Thead,
} from "@chakra-ui/react";
import ListCheck from "@/components/MenuList";
import Link from "next/link";
import { BsArrowLeftCircle } from "react-icons/bs";
function index() {
  return (
    <Box w="100%">
      <Box>
        <Flex justifyContent="center" p="15px">
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
          <Spacer />
          <Flex alignItems="center">
            <Image src="/images/user_red.png" alt="" h="40px" w="40px" />
            <Text pl="10px" fontSize="40px" fontWeight="bold" color="black">
              ข้อมูลลูกค้า
            </Text>
          </Flex>
          <Spacer />
          <Link href="/report">
            <Image src="/images/close.png" alt="" h="20px" w="20px" />
          </Link>
        </Flex>
      </Box>
      <Box px="20px">
        <Flex alignItems="center">
          <Image src="/images/user.png" h="90px" />
          <Box pl="15px">
            <Text fontWeight="bold">อั้นนักเทนนิสระดับโลก</Text>
            <Text>ID User : 1000000 แก้ไขล่าสุด : 12/12/65</Text>
          </Box>
        </Flex>
        <Flex
          alignItems="center"
          mt="15px"
          borderTop="1px"
          borderTopColor="black"
          bg="gray.100"
        >
          <Image src="/images/user_black.png" h="30px" m="10px"/>
          <Text fontWeight="bold">ข้อมูลลูกค้า</Text>
        </Flex>
        <Box pt="15px">
          <Grid px="10%" templateColumns="repeat(6, 1fr)" gap={2}>
            <GridItem colSpan={3}>
              <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                <GridItem>
                  <Text fontWeight="bold" textAlign="end">
                    ที่อยู่ :
                  </Text>
                </GridItem>
                <GridItem>
                  <Text>9/84 sadsadsadasdsadasdsad</Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="bold" textAlign="end">
                    ที่อยู่สำหรับออกใบกำกับภาษี/กำกับภาษี :
                  </Text>
                </GridItem>
                <GridItem>
                  <Text>9/84 sadsadsadasdsadasdsad</Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="bold" textAlign="end">
                    ช่องทางติดต่อ :
                  </Text>
                </GridItem>
                <GridItem>
                  <Text>9/84 sadsadsadasdsadasdsad</Text>
                  <Text>9/84 sadsadsadasdsadasdsad</Text>
                  <Text>9/84 sadsadsadasdsadasdsad</Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="bold" textAlign="end">
                    เบอร์โทรศัพท์ :
                  </Text>
                </GridItem>
                <GridItem>
                  <Text>03030303030</Text>
                </GridItem>
              </Grid>
            </GridItem>
            <GridItem colSpan={3}>
              <Grid templateColumns="repeat(2, 1fr)" gap={2}>
              <GridItem>
                  <Text fontWeight="bold" textAlign="end">
                    เพศ :
                  </Text>
                </GridItem>
                <GridItem>
                  <Text>ชาย</Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="bold" textAlign="end">
                    เริ่มต้นเป็นสมาชิก :
                  </Text>
                </GridItem>
                <GridItem>
                  <Text>10/10/64</Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="bold" textAlign="end">
                    ระดับสมาชิก :
                  </Text>
                </GridItem>
                <GridItem>
                  <Text>Gold</Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="bold" textAlign="end">
                    คะแนนสะสม :
                  </Text>
                </GridItem>
                <GridItem>
                  <Text>800</Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="bold" textAlign="end">
                    อีเมล :
                  </Text>
                </GridItem>
                <GridItem>
                  <Text>test@gmail.com</Text>
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
        </Box>

        <Flex
          alignItems="center"
          mt="15px"
          borderTop="1px"
          borderTopColor="black"
          bg="gray.100"
        >
          <Image src="/images/shopping-list.png" h="30px" m="10px"/>
          <Text fontWeight="bold">ประวัติการสั่งซื้อ</Text>
        </Flex>
        <Box pt="15px">
          <Table minWidth="100%" border="1px solid" textAlign="center">
            <Thead bg="gray.100">
              <Tr>
                <Td border="1px solid">รหัสสินค้า</Td>
                <Td border="1px solid">รูปสินค้า</Td>
                <Td border="1px solid">ชื่อสินค้า</Td>
                <Td border="1px solid">หมายเลขคำสั่งซื้อ</Td>
                <Td border="1px solid">สถานะ</Td>
                <Td border="1px solid">จำนวนสั่งซื้อ</Td>
                <Td border="1px solid">ยอด</Td>
                <Td border="1px solid">วันที่สั่งซื้อ</Td>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td border="1px solid">a</Td>
                <Td border="1px solid">a</Td>
                <Td border="1px solid">a</Td>
                <Td border="1px solid">a</Td>
                <Td border="1px solid">a</Td>
                <Td border="1px solid">a</Td>
                <Td border="1px solid">a</Td>
                <Td border="1px solid">a</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
}

export default index;
