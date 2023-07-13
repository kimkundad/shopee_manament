import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ButtonBack from "@/components/button/ButtonBack";
import FormData from 'form-data';
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
import { BsArrowLeftCircle, BsBell } from "react-icons/bs";
import { connect, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useToast } from "@chakra-ui/react";


export default function Notification() {
  const userInfo = useSelector((App) => App.userInfo);
  const userAuthen = useSelector((App) => App.authen);
  const [active, setActive] = useState(false);
  const toast = useToast();

  useEffect(() => {
    async function fecthdata() {
        const formdata = new FormData();
        formdata.append("user_id", userInfo?.data[0]?.id);
      const res = await axios.post(
        `https://api.sellpang.com/api/getOwnerSetting`, formdata
        // {
        //   headers: {
        //     Authorization: `Bearer ${userAuthen.token}`,
        //   },
        // }
      );
      //   console.log(res.data);
      if (res.data.setting != null) {
        setActive(JSON.parse(res.data.setting.setting));
      }
    }
    fecthdata();
  }, []);

  const activeNoti = (event) => {
    let objs = { notification: event.target.checked };
    let setting = JSON.stringify(objs);
    async function fecthdata() {
      const formdata = new FormData();
      //   formdata.append("user_code", userInfo.data[0]?.code_user);
      formdata.append("user_id", userInfo?.data[0]?.id);
      formdata.append("setting", setting);
      const res = await axios.post(
        `https://api.sellpang.com/api/setNotification`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${userAuthen.token}`,
          },
        }
      );
      // console.log(JSON.parse(res.data.setting.setting));
      const setting_noti = JSON.parse(res.data.setting.setting);
      if (setting_noti.notification === true) {
        setActive(setting_noti);
        toast({
          position: "top-right",
          title: '"เปิด" สถานะการแจ้งเตือนสำเร็จ',
          description: 'คุณได้ "เปิด" การแจ้งเตือนสำเร็จ',
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        setActive(setting_noti);
        toast({
          position: "top-right",
          title: '"ปิด" สถานะการแจ้งเตือนสำเร็จ',
          description: 'คุณได้ "ปิด" การแจ้งเตือนสำเร็จ',
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
    fecthdata();
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
              <Image width={36} height={36} src={"/images/menu/icon-setting.png"} />
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
          <Icon as={BsBell} boxSize={8} />
          <Text as="b" fontSize="lg">
            แจ้งเตือนออเดอร์
          </Text>
        </HStack>
      </Box>

      <Box p={10} minHeight={400}>
        <VStack spacing={5} align="stretch">
          <Box
            p={5}
            fontSize="17"
            color="gray.600"
            borderWidth="2px"
            borderColor={"gray.500"}
            borderRadius="lg"
          >
            <Flex align={"center"}>
              <Box>
                <Text as="b" fontSize="21">
                  เปิดการแจ้งเตือนออเดอร์
                </Text>
                <br />
                <Text>ส่งการแจ้งเตือนทุกครั้งเมื่อมีออเดอร์เข้ามา</Text>
              </Box>
              <Spacer />
              <Box>
                <Switch
                  size="lg"
                  colorScheme="green"
                  isChecked={active?.notification}
                  onChange={(e) => activeNoti(e)}
                />
              </Box>
            </Flex>
          </Box>
        </VStack>
      </Box>
    </>
  );
}
