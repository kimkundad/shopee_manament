import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Image,
  Box,
  Icon,
  Spacer,
  Button,
  Table,
  Tbody,
  Tr,
  Td,
  Grid,
  GridItem,
  Thead,
} from "@chakra-ui/react";
import Link from "next/link";
import { BsArrowLeftCircle } from "react-icons/bs";
import axios from "axios";
import { useRouter } from "next/router";
function index() {
  const router = useRouter();
  const data = router.query.id;
  console.log(data);
  const [customer, setCustomer] = useState([]);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (data !== undefined) {
      async function fecthdata() {
        const formdata = new FormData();
        formdata.append("uid", data);
        const res = await axios.post(
          `https://shopee-api.deksilp.com/api/getDetailCutomer`,
          formdata
        );
        setCustomer(res.data.customer[0]);
        setOrders(res.data.orders);
      }
      fecthdata();
    }
  }, [data]);

  console.log(customer, orders);
  return (
    <Box w="100%">
      <Box>
        <Flex justifyContent="center" p="15px">
          <Link href="/report">
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
          <Image
            src={`https://shopee-api.deksilp.com/images/shopee/avatar/${customer.avatar}`}
            h="90px"
            w="90px"
            borderRadius="50%"
          />
          <Box pl="15px">
            <Text fontWeight="bold" fontSize="28px">
              {customer?.user_name?.length > 15 ? customer.user_name?.slice(0, 15) + "..." : customer.user_name}
            </Text>
            <Text fontSize="25px">
              ID User : {customer.uid} แก้ไขล่าสุด : {customer.updated_at}
            </Text>
          </Box>
        </Flex>
        <Flex
          alignItems="center"
          mt="15px"
          borderTop="1px"
          borderTopColor="black"
          bg="gray.100"
        >
          <Image src="/images/user_black.png" h="30px" m="10px" />
          <Text fontWeight="bold" fontSize="25px">
            ข้อมูลลูกค้า
          </Text>
        </Flex>
        <Box pt="15px">
          <Grid
            px="10%"
            templateColumns="repeat(6, 1fr)"
            gap={2}
            fontSize="21px"
          >
            <GridItem colSpan={3}>
              <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                <GridItem>
                  <Text fontWeight="bold" textAlign="end">
                    ที่อยู่ :
                  </Text>
                </GridItem>
                <GridItem>
                  <Text>{customer.address}</Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="bold" textAlign="end">
                    ที่อยู่สำหรับออกใบกำกับภาษี/กำกับภาษี :
                  </Text>
                </GridItem>
                <GridItem>
                  <Text>
                    {customer.address} ตำบล{customer.sub_district} อำเภอ
                    {customer.district} จังหวัด{customer.province}{" "}
                    {customer.postcode}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="bold" textAlign="end">
                    ช่องทางติดต่อ :
                  </Text>
                </GridItem>
                <GridItem></GridItem>
                <GridItem>
                  <Text fontWeight="bold" textAlign="end">
                    เบอร์โทรศัพท์ :
                  </Text>
                </GridItem>
                <GridItem>
                  <Text>{customer.tel}</Text>
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
                  <Text>{customer.created_at}</Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="bold" textAlign="end">
                    ระดับสมาชิก :
                  </Text>
                </GridItem>
                <GridItem>
                  <Text></Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="bold" textAlign="end">
                    คะแนนสะสม :
                  </Text>
                </GridItem>
                <GridItem>
                  <Text></Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="bold" textAlign="end">
                    อีเมล :
                  </Text>
                </GridItem>
                <GridItem>
                  <Text>{customer.email}</Text>
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
          <Image src="/images/shopping-list.png" h="30px" m="10px" />
          <Text fontWeight="bold" fontSize="25px">
            ประวัติการสั่งซื้อ
          </Text>
        </Flex>
        <Box py="15px">
          <Table minWidth="100%" border="1px solid" textAlign="center">
            <Thead bg="gray.100" fontSize="25px">
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
            <Tbody fontSize="21px">
              {orders?.map((item, index) => {
                return (
                  <Tr key={index}>
                    <Td borderColor="black">{item.sku}</Td>
                    <Td borderColor="black">
                      {item.type == 1 ? (
                        <Image
                          h="60px"
                          src={`https://shopee-api.deksilp.com/images/shopee/products/${item.img_product}`}
                          alt=""
                        />
                      ) : (
                        <Image
                          h="60px"
                          src={`https://shopee-api.deksilp.com/images/shopee/products/${item.img_pro_option}`}
                          alt=""
                        />
                      )}
                    </Td>
                    <Td borderColor="black">{item.name_product}</Td>
                    <Td borderColor="black">{item.invoice_id}</Td>
                    <Td borderColor="black">{item.status}</Td>
                    <Td borderColor="black">{item.num}</Td>
                    <Td borderColor="black">
                      {item.type == 1
                        ? item.num * item.price_type_1
                        : item.type == 2
                        ? item.num * item.price_type_2
                        : item.num * item.price_type_3}
                    </Td>
                    <Td borderColor="black">{item.created_at}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
}

export default index;
