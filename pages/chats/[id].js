import React from "react";
import {
  Flex,
  Text,
  Image,
  Input,
  Box,
  Spacer,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { TiLocationArrow } from "react-icons/Ti";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import moment from "moment";
import { useRouter } from "next/router";
import ChatBox from "@/components/ChatBox";
import WebSocket from 'ws'
export default function useChats() {
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const shopId = router.query.id;
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    async function fecthdata() {
      const formdata = new FormData();
      formdata.append("shop_id", shopId);
      const res = await axios.post(
        "https://shopee-api.deksilp.com/api/getUserChats",
        formdata
      );
      setUsers(res.data.users);
    }
    fecthdata();
  }, [shopId]);

  const [text, setText] = useState("");
  const handleTouch = () => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  };
  const chatBoxRef = useRef(null);

  const [lastMessage, setLastMessage] = useState(null);
  const sendMessage = () => {
    event.preventDefault();
    if (text !== "" && userId !== null) {
      async function newMessage() {
        const formdata = new FormData();
        let user_id = userId;
        let shop_id = shopId;
        formdata.append("recived_id", user_id);
        formdata.append("user_id", user_id);
        formdata.append("shop_id", shop_id);
        formdata.append("message", text);
        const res = await axios.post(
          `https://shopee-api.deksilp.com/api/sendMessage`,
          formdata
        );
        setText("");
        setLastMessage(res.data.message);
      }
      newMessage();
    }
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  };

  useEffect(() => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [chatBoxRef?.current?.scrollHeight]);

  return (
    <Box m="10px">

      <Text borderBottom="1px solid grey" fontSize="30px">
        รายชื่อร้าน
      </Text>
      <Flex m="20px">
        <Box border="1px solid" borderColor="gray.300">
          {users?.map((item, index) => {
            const datatime = moment(item.created_at);
            const dateString = datatime.format("MM-DD");
            const timeString = datatime.format("HH:mm");
            return (
              <Flex
                key={index}
                p="20px"
                w="15vw"
                onClick={(e) => setUserId(item.user_id)}
                bg={item.user_id == userId ? "gray.200" : "white"}
              >
                <Image
                  borderRadius="50%"
                  src={`/images/${item.avatar}`}
                  alt=""
                  h="55px "
                  w="55px "
                />
                <Box alignSelf="center" pl="10px">
                  <Text fontSize="20px" fontWeight="bold">
                    {item.name}
                  </Text>
                  <Text fontSize="18px" color="gray">
                    {item.message}
                  </Text>
                </Box>
                <Spacer />
                <Box>
                  <Text>{dateString}</Text>
                </Box>
              </Flex>
            );
          })}
        </Box>
        <Box
          w="-webkit-fill-available"
          border="1px solid"
          borderColor="gray.300"
        >
          <Box h="70vh" overflow="auto" ref={chatBoxRef}>
            <ChatBox
              userId={userId}
              shop_id={shopId}
              lastMessage={lastMessage}
            />
          </Box>

          <form onSubmit={sendMessage}>
            <Box className="test" bottom={0}>
              <Box
                className="test"
                px="15px"
                mt="10px"
                py="8px"
                bg="white"
                borderTop="1px solid #efefef"
                w="-webkit-fill-available"
              >
                <Flex alignItems="center">
                  <Image src="/img/plus.png" h="25px" w="25px" />
                  <InputGroup mx="10px">
                    <Input
                      type="text"
                      value={text}
                      placeholder="พิมข้อความ"
                      borderRadius="3xl"
                      onChange={(e) => setText(e.target.value)}
                      onClick={handleTouch}
                    />
                    <InputRightElement>
                      <Image src="/img/emoji.png" alt="" h="25px" />
                    </InputRightElement>
                  </InputGroup>
                  <Button
                    type="submit"
                    bg="white"
                    padding="0px"
                    w="35px"
                    h="35px"
                  >
                    <TiLocationArrow
                      style={{ height: "35px", width: "35px" }}
                    />
                  </Button>
                </Flex>
              </Box>
            </Box>
          </form>
        </Box>
      </Flex>
    </Box>
  );
}
