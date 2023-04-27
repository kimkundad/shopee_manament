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
  GridItem,
  Grid,
} from "@chakra-ui/react";
import { TiLocationArrow } from "react-icons/Ti";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import moment from "moment";
import { useRouter } from "next/router";

export default function useChats() {
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const shopId = router.query.id;
  const [userId, setUserId] = useState(null);
  const [room, setRoom] = useState("");
  let date = "";

  const [messages, setMessages] = useState(null);

  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:3000/test");
    setSocket(newSocket);
    newSocket.addEventListener("open", () => {
      console.log("WebSocket connection established");
    });
    newSocket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      setMessages((messages) => {
        const messageIds = messages.map((m) => m.id);
        if (!messageIds.includes(message.id)) {
          return [...messages, message];
        }
        return messages;
      });
    });
    return () => {
      newSocket.close();
    };
  }, []);

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
  const sendMessage = () => {
    event.preventDefault();
    if (text !== "" && userId !== null) {
      // eslint-disable-next-line no-inner-declarations
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

        const newMess = { ...res.data.message[0], type: "message", room };
        socket.send(JSON.stringify(newMess));
        setText("");

        const formdataUserChat = new FormData();
        formdataUserChat.append("shop_id", shopId);
        const userChats = await axios.post(
          "https://shopee-api.deksilp.com/api/getUserChats",
          formdataUserChat
        );
        setUsers(userChats.data.users);
      }
      newMessage();
    }
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  };

  useEffect(() => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (userId !== null) {
      // eslint-disable-next-line no-inner-declarations
      async function fetchData() {
        const formdata = new FormData();
        formdata.append("user_id", userId);
        formdata.append("shop_id", shopId);
        const res = await axios.post(
          `https://shopee-api.deksilp.com/api/getMessage`,
          formdata
        );
        setMessages(res.data.message);
      }
      fetchData();
      const data = { type: "joinRoom", room };
      socket.send(JSON.stringify(data));
    }
  }, [userId]);

  return (
    <Box m="10px" height={`calc(100vh - 137px)`}>
      <Text borderBottom="1px solid grey" fontSize="30px">
        ข้อความ
      </Text>
      <Grid
        templateColumns="repeat(5, 1fr)"
        m="20px"
        border="1px solid"
        borderColor="grey"
        borderRadius="xl"
        height={`calc(100vh - 228px)`}
      >
        <GridItem colSpan={1}>
          <Flex p="20px" borderBottom="1px solid grey" h="96px">
            <Input type="text" placeholder="ค้นหา" />
          </Flex>
          <Box>
            {users?.map((item, index) => {
              const datatime = moment(item.created_at);
              const dateString = datatime.format("MM-DD");
              const timeString = datatime.format("HH:mm");
              return (
                <Flex
                  key={index}
                  p="20px"
                  onClick={(e) => {
                    setUserId(item.id);
                    setRoom(item.id);
                  }}
                  bg={item.user_id == userId ? "gray.200" : "white"}
                  id={item.id}
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
        </GridItem>
        <GridItem colSpan={4} borderLeft="1px solid" borderColor="grey">
          <Box fontSize="24px">
            <Flex p="20px" borderBottom="1px solid grey" h="96px">
              <Image
                borderRadius="50%"
                src={`/images/${users[0]?.avatar}`}
                alt=""
                h="55px "
                w="55px "
              />
              <Text
                fontSize="24px"
                fontWeight="bold"
                alignSelf="center"
                pl="10px"
              >
                {users[0]?.name}
              </Text>
            </Flex>
            <Box
              height={`calc(100vh - 395px)`}
              overflow="auto"
              ref={chatBoxRef}
            >
              <Box px="5px" bg="white" pt="10px" overflow="auto">
                {messages !== null ? (
                  messages.map((item, index) => {
                    const datatime = moment(item.created_at);
                    const dateString = datatime.format("YYYY-MM-DD");
                    const timeString = datatime.format("HH:mm");
                    if (dateString != date) {
                      date = dateString;
                      if (item.recived_id == userId) {
                        return (
                          <Box key={index}>
                            <Flex pt="15px" justifyContent="center">
                              <Box bg="gray.200" borderRadius="xl">
                                <Text px="10px">{dateString}</Text>
                              </Box>
                            </Flex>
                            <Flex direction="row-reverse" pt="10px">
                              <Box
                                mx="5px"
                                px="10px"
                                py="5px"
                                borderRadius="xl"
                                bg="gray.200"
                                alignSelf="center"
                              >
                                {item.message !== null ? (
                                  <Text maxWidth="300px">{item.message}</Text>
                                ) : (
                                  false
                                )}
                                {item.img_message !== null ? (
                                  <Image
                                    src={item.img_message}
                                    alt=""
                                    maxWidth="150px"
                                    py="5px"
                                  />
                                ) : (
                                  false
                                )}
                              </Box>
                              <Box fontSize="10px" alignSelf="flex-end">
                                {item.status == 1 ? (
                                  <Text>อ่านแล้ว</Text>
                                ) : null}
                                <Text>{timeString} น.</Text>
                              </Box>
                            </Flex>
                          </Box>
                        );
                      } else {
                        return (
                          <Box key={index}>
                            <Flex pt="10px" justifyContent="center">
                              <Box bg="gray.200" borderRadius="xl">
                                <Text px="10px">{dateString}</Text>
                              </Box>
                            </Flex>
                            <Flex pt="10px">
                              <Box
                                bg="white"
                                borderRadius="50%"
                                w="35px !important"
                                h="35px !important"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                ml="2"
                              >
                                <Image
                                  borderRadius="50%"
                                  src={`/images/${item.avatar}`}
                                  alt=""
                                  h="35px !important"
                                  w="35px !important"
                                />
                              </Box>
                              <Box
                                mx="5px"
                                px="10px"
                                py="5px"
                                borderRadius="xl"
                                bg="gray.200"
                                alignSelf="center"
                              >
                                {item.message !== null ? (
                                  <Text maxWidth="300px">{item.message}</Text>
                                ) : (
                                  false
                                )}
                                {item.img_message !== null ? (
                                  <Image
                                    src={item.img_message}
                                    alt=""
                                    maxWidth="150px"
                                    py="5px"
                                  />
                                ) : (
                                  false
                                )}
                              </Box>
                              <Text alignSelf="end" fontSize="10px">
                                {timeString} น.
                              </Text>
                            </Flex>
                          </Box>
                        );
                      }
                    } else {
                      if (item.recived_id == userId) {
                        return (
                          <Flex direction="row-reverse" pt="10px" key={index}>
                            <Box
                              mx="5px"
                              px="10px"
                              py="5px"
                              borderRadius="xl"
                              bg="gray.200"
                              alignSelf="center"
                            >
                              {item.message !== null ? (
                                <Text maxWidth="300px">{item.message}</Text>
                              ) : (
                                false
                              )}
                              {item.img_message !== null ? (
                                <Image
                                  src={item.img_message}
                                  alt=""
                                  maxWidth="150px"
                                  py="5px"
                                />
                              ) : (
                                false
                              )}
                            </Box>
                            <Box fontSize="10px" alignSelf="flex-end">
                              {item.status == 1 ? <Text>อ่านแล้ว</Text> : null}
                              <Text>{timeString} น.</Text>
                            </Box>
                          </Flex>
                        );
                      } else {
                        return (
                          <Flex pt="10px" key={index}>
                            <Box
                              bg="white"
                              borderRadius="50%"
                              w="35px !important"
                              h="35px !important"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              ml="2"
                            >
                              <Image
                                borderRadius="50%"
                                src={`/images/${item.avatar}`}
                                alt=""
                                h="35px !important"
                                w="35px !important"
                              />
                            </Box>
                            <Box
                              mx="5px"
                              px="10px"
                              py="5px"
                              borderRadius="xl"
                              bg="gray.200"
                              alignSelf="center"
                            >
                              {item.message !== null ? (
                                <Text maxWidth="300px">{item.message}</Text>
                              ) : (
                                false
                              )}
                              {item.img_message !== null ? (
                                <Image
                                  src={item.img_message}
                                  alt=""
                                  maxWidth="150px"
                                  py="5px"
                                />
                              ) : (
                                false
                              )}
                            </Box>
                            <Text alignSelf="end" fontSize="10px">
                              {timeString} น.
                            </Text>
                          </Flex>
                        );
                      }
                    }
                  })
                ) : (
                  <Box>
                    <Text>ยังไม่เริ่มต้นแชท</Text>
                  </Box>
                )}
              </Box>
            </Box>

            <form onSubmit={sendMessage}>
              <Box className="test" bottom={0}>
                <Box
                  className="test"
                  px="15px"
                  mt="10px"
                  py="8px"
                  bg="white"
                  mr="8px"
                  borderTop="1px solid #efefef"
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
        </GridItem>
      </Grid>
    </Box>
  );
}
