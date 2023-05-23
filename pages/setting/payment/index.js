import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ButtonBack from "@/components/button/ButtonBack";
import {
  Box,
  Text,
  HStack,
  Center,
  Button,
  Spacer,
  Flex,
  Switch,
  VStack,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import {
  BsArrowLeftCircle,
  BsArrowRightCircle,
  BsCashCoin,
} from "react-icons/bs";
import axios from "axios";
import { connect, useDispatch, useSelector } from "react-redux";
export default function Purchase() {
  const userInfo = useSelector((App) => App.userInfo);
  const [activeCOD, setActiveCOD] = useState();

  useEffect(() => {
    async function fetchData() {
      const formdata = new FormData();
      formdata.append("uid", userInfo.data[0]?.id);
      const res = await axios.post(
        `https://api.sellpang.com/api/activeCOD`,
        formdata
      );
      setActiveCOD(res.data.account);
    }
    fetchData();
  }, []);

  const setActive = async (event) => {
    const formdata = new FormData();
    let check = 0;
    if (event.target.checked) {
      check = 1;
    } else {
      check = 0;
    }
    console.log(event.target.checked,check);
    formdata.append("user_id", userInfo.data[0]?.id);
    formdata.append("bankacc_id", activeCOD?.id);
    formdata.append("checked", check);
    formdata.append("type","COD")
    const res = await axios.post(
      `https://api.sellpang.com/api/activeBankAcc`,
      formdata
    );
    setActiveCOD(res.data.banks);
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
              <Image width={36} height={36} src={"/images/menu/ตั้งค่า.png"} />
              <Text as="b" fontSize="4xl" pt={3}>
                {" "}
                ตั้งค่า
              </Text>
            </HStack>
          </Center>
        </Box>
      </Box>

      <Box bg={"#f3f4f6"} pl={10} pt={2} pb={2} borderTop="1px solid">
        <HStack>
          <Icon as={BsCashCoin} boxSize={8} />
          <Text as="b" fontSize="lg">
            {" "}
            ช่องทางการชำระเงิน
          </Text>
        </HStack>
      </Box>

      <Box p={10} minHeight={400}>
        <VStack spacing={5} align="stretch">
          <Box
            p={5}
            borderWidth="2px"
            borderColor={"gray.500"}
            borderRadius="lg"
          >
            <Flex>
              <Box as="span" color="gray.600" fontSize="sm">
                <Text as="b" fontSize="lg">
                  ชำระเงินแบบโอน
                </Text>
              </Box>
              <Spacer />
              <Box as="span" color="gray.600" fontSize="sm">
                <Link href="/setting/payment/eBank">
                  <Icon as={BsArrowRightCircle} boxSize={8} />
                </Link>
              </Box>
            </Flex>
          </Box>

          <Box
            p={5}
            borderWidth="2px"
            borderColor={"gray.500"}
            borderRadius="lg"
          >
            <Flex align={"center"}>
              <Box as="span" color="gray.600" fontSize="sm">
                <Text as="b" fontSize="lg">
                  ชำระเงินแบบเก็บปลายทาง (COD)
                </Text>{" "}
                <br />
                <Text as="b">
                  รับชำระเงินแบบเก็บปลายทาง คลิ๊ก
                  <Link href="/setting/payment/COD" color={"red.500"}>
                    {" "}
                    ตั้งค่าบัญชีรับเงินปลายทาง
                  </Link>
                </Text>
              </Box>
              <Spacer />
              <Box as="span" color="gray.600" fontSize="sm">
                <Switch
                  size="lg"
                  colorScheme="brand"
                  isChecked={activeCOD?.is_active == 1 ? true : false}
                  onChange={setActive}
                />
              </Box>
            </Flex>
          </Box>
        </VStack>
      </Box>
    </>
  );
}
