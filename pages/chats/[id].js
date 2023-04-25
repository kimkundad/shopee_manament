import React from "react";
import {
  Flex,
  Text,
  Image,
  Input,
  Box,
  Spacer,
  Button,
  Wrap,
  HStack,
  WrapItem,
  Select,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import moment from "moment";
import { useRouter } from "next/router";
import ChatBox from "@/components/ChatBox";
export default function useChats() {
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const id = router.query.id;
  useEffect(() => {
    async function fecthdata() {
      const formdata = new FormData();
      formdata.append("shop_id", id);
      const res = await axios.post(
        "https://shopee-api.deksilp.com/api/getUserChats",
        formdata
      );
      setUsers(res.data.users);
    }
    fecthdata();
  }, [id]);
  return (
    <Box>
      <Text borderBottom="1px solid grey" fontSize="30px">
        รายชื่อร้าน
      </Text>
      <Flex m="20px">
        <Box border="1px solid" borderColor="gray.300" w="max-content">
          {users?.map((item, index) => {
            const datatime = moment(item.created_at);
            const dateString = datatime.format("MM-DD");
            const timeString = datatime.format("HH:mm");
            return (
              <Flex key={index} pt="10px">
                <Image
                  borderRadius="50%"
                  src={`/images/${item.avatar}`}
                  alt=""
                  h="70px "
                  w="70px "
                />
                <Box alignSelf="center" pl="10px">
                  <Text fontSize="20px" fontWeight="bold">
                    {item.name}
                  </Text>
                  <Text fontSize="18px" color="gray">
                    {item.message}
                  </Text>
                </Box>
              </Flex>
            );
          })}
        </Box>
        <Box w="-webkit-fill-available">
          <ChatBox />
        </Box>
      </Flex>
    </Box>
  );
}
