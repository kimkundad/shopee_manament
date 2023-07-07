import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ButtonBack from "@/components/button/ButtonBack";
import {
  Box,
  Text,
  HStack,
  Center,
  Button,
  Flex,
  VStack,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { BsArrowLeftCircle, BsReceipt } from "react-icons/bs";
import { connect, useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { useToast } from "@chakra-ui/react";

export default function index() {
  const userInfo = useSelector((App) => App.userInfo);
  const [typePurchaseOrder, setTypePurchaseOrder] = useState(1);
  const toast = useToast();

  useEffect(() => {
    Axios.get(
      `https://api.sellpang.com/api/getSettingTypePurchaseOrder/${userInfo?.data[0]?.id}`
    ).then(function (response) {
      if (response.data.settingTypePurchaseOrder) {
        setTypePurchaseOrder(response.data.settingTypePurchaseOrder);
      }
    });
  }, []);

  const handleChangeTypePurchaseOrder = (type_purchase_order) => {
    setTypePurchaseOrder(type_purchase_order);
    const data = {
      userId: userInfo?.data[0]?.id,
      typepurchaseorder: type_purchase_order,
    };
    Axios.post(
      `https://api.sellpang.com/api/setSettingTypePurchaseOrder`,
      data
    ).then(function (response) {
      if (response.data.success) {
        toast({
          position: "top-right",
          title: "เปลี่ยนรูปแบบใบคำสั่งซื้อสำเร็จ!",
          description: "คุณได้เปลี่ยนรูปแบบใบคำสั่งซื้อ 'สำเร็จ'",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          position: "top-right",
          title: "เปลี่ยนรูปแบบใบคำสั่งซื้อไม่สำเร็จ!",
          description: "คุณได้เปลี่ยนรูปแบบใบคำสั่งซื้อ 'ไม่สำเร็จ'",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    });
  };

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
            ใบคำสั่งซื้อ
          </Text>
        </HStack>
      </Box>

      <Box p={10} minHeight={400}>
        <VStack spacing={5} align="stretch">
          <Card
            bg="#f3f4f6"
            borderRadius={10}
            borderWidth="2px"
            borderColor="gray.500"
            color="gray.600"
          >
            <Box px="5" py="2">
              <Text as="b" fontSize="21">
                เลือกรูปแบบการพิมพ์ใบคำสั่งซื้อ
              </Text>
            </Box>

            <CardBody bg="white" borderBottomRadius="10">
              <Flex>
                <Box align="center" mr={10}>
                  <Box
                    onClick={() => {
                      handleChangeTypePurchaseOrder(1);
                    }}
                    _hover={{ cursor: "pointer" }}
                  >
                    <Box
                      my="5"
                      p="2"
                      borderRadius="10"
                      borderWidth={typePurchaseOrder === 1 ? "3px" : "2px"}
                      borderColor={
                        typePurchaseOrder === 1 ? "#cd2626" : "gray.500"
                      }
                      _hover={{
                        borderRadius: "10",
                        borderWidth: "3px",
                        borderColor: "#cd2626",
                      }}
                    >
                      <Image
                        width={150}
                        height={300}
                        src={"/images/exampleInvoice.png"}
                      />
                    </Box>
                  </Box>
                  <Box>
                    <Text as="b" color="gray.600" fontSize="17">
                      ค่าเริ่มต้น - ใบคำสั่งซื้อ
                    </Text>
                  </Box>
                </Box>
                <Box align="center" mr={10}>
                  <Box
                    onClick={() => {
                      handleChangeTypePurchaseOrder(2);
                    }}
                    _hover={{ cursor: "pointer" }}
                  >
                    <Box
                      my="5"
                      p="2"
                      borderRadius="10"
                      borderWidth={typePurchaseOrder === 2 ? "3px" : "2px"}
                      borderColor={
                        typePurchaseOrder === 2 ? "#cd2626" : "gray.500"
                      }
                      _hover={{
                        borderRadius: "10",
                        borderWidth: "3px",
                        borderColor: "#cd2626",
                      }}
                    >
                      <Image
                        width={150}
                        height={300}
                        src={"/images/exampleInvoice.png"}
                      />
                    </Box>
                    <Box>
                      <Text as="b" color="gray.600" fontSize="17">
                        รูปแบบที่ 2
                      </Text>
                    </Box>
                  </Box>
                </Box>
                <Box align="center" mr={5}>
                  <Box
                    onClick={() => {
                      handleChangeTypePurchaseOrder(3);
                    }}
                    _hover={{ cursor: "pointer" }}
                  >
                    <Box
                      my="5"
                      p="2"
                      borderRadius="10"
                      borderWidth={typePurchaseOrder === 3 ? "3px" : "2px"}
                      borderColor={
                        typePurchaseOrder === 3 ? "#cd2626" : "gray.500"
                      }
                      _hover={{
                        borderRadius: "10",
                        borderWidth: "3px",
                        borderColor: "#cd2626",
                      }}
                    >
                      <Image
                        width={150}
                        height={300}
                        src={"/images/exampleInvoice.png"}
                      />
                    </Box>
                    <Box>
                      <Text as="b" color="gray.600" fontSize="17">
                        รูปแบบที่ 3
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Flex>
            </CardBody>
          </Card>
        </VStack>
      </Box>
    </>
  );
}
