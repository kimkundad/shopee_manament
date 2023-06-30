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
  InputLeftElement,
  GridItem,
  Grid,
} from "@chakra-ui/react";
import { TiLocationArrow } from "react-icons/Ti";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import moment from "moment";
import { useRouter } from "next/router";
import Pusher from "pusher-js";
import { ArrowLeftIcon, RepeatIcon } from "@chakra-ui/icons";
import { getUserChats } from "@/hooks/getUserChats";
import useSWR from "swr";
import { fetcher } from "@/services/test";

export default function useChats() {
  const [users, setUsers] = useState([]);
  const [detailUser, setDetailUser] = useState([]);
  const router = useRouter();

  const [shopId, setShopId] = useState(router.query.id);

  const [userId, setUserId] = useState(null);
  const [room, setRoom] = useState("");
  let date = "";
  let num = 1;

  const [messages, setMessages] = useState([]);
  const [searchUser, setSearchUser] = useState(null);
  const [message, setMessage] = useState("");
  const [type, setTypee] = useState("shop");
  const [text, setText] = useState("");
  const chatBoxRef = useRef(null);
  let allMessages = [];

  useEffect(() => {
    setShopId(router.query.id);
  }, []);

  const { data: UserChats, isLoading: fetchLoadingUserChats } = getUserChats(
    router.query.id
  );

  // useEffect(() => {
  //   async function fecthdata() {
  //     const formdata = new FormData();
  //     formdata.append("shop_id", shopId);
  //     const res = await axios.post(
  //       "https://api.sellpang.com/api/getUserChats",
  //       formdata
  //     );
  //     setUsers(res.data.users);
  //   }
  //   fecthdata();
  // }, [shopId]);

  const handleChangeRoom = async (item) => {
    async function fetchData() {
      const res = await axios.get(
        `https://api.sellpang.com/api/getMessage2/${item.id}/${router.query.id}/${type}`
      );
      console.log("res?.message-->", res?.data?.message);
      setMessages(res?.data?.message);
    }
    fetchData();

    setUserId(item.id);
    setRoom(item.id + shopId);
    setDetailUser([item]);
  };

  const handleTouch = () => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  };

  const sendMessage = async () => {
    event.preventDefault();
    if (text !== "" && userId !== null) {
      // eslint-disable-next-line no-inner-declarations
      async function newMessage() {
        const formdata = new FormData();
        let user_id = userId;
        let shop_id = shopId;
        formdata.append("recived_id", user_id);
        formdata.append("user_id", user_id);
        formdata.append("shop_id", router.query.id);
        formdata.append("message", text);
        const res = await axios.post(
          `http://127.0.0.1:8000/api/sendMessage`,
          formdata
        );
        setText("");

        async function reload_msg() {
          const res = await axios.get(
            `https://api.sellpang.com/api/getMessage2/${userId}/${router.query.id}/${type}`
          );
          // console.log("res?.message-->", res?.data?.message);
          setMessages(res?.data?.message);
        }
        reload_msg();
      }
      newMessage();
    }
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  };

  useEffect(() => {
    async function fecthdata() {
      if (searchUser !== null) {
        const formdata = new FormData();
        formdata.append("shop_id", shopId);
        formdata.append("name", searchUser);
        const res = await axios.post(
          `https://api.sellpang.com/api/searchUserChats`,
          formdata
        );
        setUsers(res.data.users);
      } else {
      }
    }
    fecthdata();
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages]);

  // useEffect(() => {
  //   if (userId !== null) {
  //     // eslint-disable-next-line no-inner-declarations
  //     async function fetchData() {
  //       console.log(shopId);
  //       const formdata = new FormData();
  //       formdata.append("user_id", userId);
  //       formdata.append("shop_id", shopId);
  //       formdata.append("type", "shop");
  //       const res = await axios.post(
  //         `https://api.sellpang.com/api/getMessage`,
  //         formdata
  //       );
  //       setMessages(res.data.message);
  //     }
  //     fetchData();
  //   }
  // }, [userId]);

  useEffect(() => {
    if (searchUser !== null) {
      async function fecthdata() {
        const formdata = new FormData();
        formdata.append("shop_id", shopId);
        formdata.append("name", searchUser);
        const res = await axios.post(
          `https://api.sellpang.com/api/searchUserChats`,
          formdata
        );
        setUsers(res.data.users);
      }
      fecthdata();
    }
  }, [searchUser]);

  const refreshUserChat = () => {
    async function fecthdata() {
      const formdata = new FormData();
      formdata.append("shop_id", shopId);
      const res = await axios.get(
        `https://api.sellpang.com/api/getUserChats/${router.query.id}`,
        formdata
      );
      setUsers(res.data.users);
    }
    fecthdata();
  };

  Pusher.logToConsole = false;

  const pusher = new Pusher("bf877b740f5cd647307e", {
    cluster: "ap1",
  });

  useEffect(() => {
    // if (!renderAfterCalled.current) {
    if (userId) {
      const channel = pusher.subscribe(
        "chat." + userId + "." + router.query.id
      );
      channel.bind(
        "message." + userId + "." + router.query.id,
        function (data) {
          setMessages((prevMessages) => {
            const newArray = [...prevMessages, data];
            return newArray;
          });
        }
      );
      return () => {
        pusher.unsubscribe("chat." + userId + "." + router.query.id);
      };
    }
    // }
    // renderAfterCalled.current = true;
  }, [userId]);

  const formatDateThai = (dateString, timeString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString("th-TH", options);
    const formattedYear = date.toLocaleDateString("th-TH", { year: "numeric" });
    // const yearThai = Number(formattedYear) + 543;

    return `${formattedDate} ${timeString}`;
  };
  return (
    <Box m="10px" height={`calc(100vh - 137px)`}>
      <Flex alignItems="center">
        <Link href={"/chats"}>
          <Button
            bgColor="red"
            color="white"
            borderRadius="15"
            ml={"20px"}
            mt={"5px"}
            leftIcon={<ArrowLeftIcon h={3} />}
          >
            ย้อนกลับ
          </Button>
        </Link>
        <Grid placeItems="center" flexGrow={1}>
          <Text borderBottom="1px solid grey" fontSize="30px">
            ข้อความ
          </Text>
        </Grid>
      </Flex>
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
            {/* <Input
              type="text"
              placeholder="ค้นหา"
              onChange={(e) => setSearchUser(e.target.value)}
            /> */}
            <InputGroup>
              <InputLeftElement pointerEvents="none" ml={"5px"}>
                <Image src="/images/search.png" h="20px" w="20px" />
              </InputLeftElement>
              <Input
                borderRadius="xl"
                type="text"
                fontSize="18px"
                borderColor="gray.500"
                placeholder="ค้นหา..."
                // value={query || ""}
                onChange={(e) => setSearchUser(e.target.value)}
              />
            </InputGroup>
          </Flex>
          <Box height={"calc(100vh - 395px)"} overflowY={"scroll"}>
            {fetchLoadingUserChats ? (
              <Box></Box>
            ) : (
              <Box>
                {UserChats?.users.map((item, index) => {
                  const datatime = moment(item.created_at);
                  const dateString = datatime.format("MM-DD");
                  const timeString = datatime.format("HH:mm");
                  return (
                    <Flex
                      key={index}
                      p="20px"
                      onClick={(e) => {
                        handleChangeRoom(item);
                      }}
                      bg={item.user_id == userId ? "gray.200" : "white"}
                      id={item.id}
                    >
                      <Image
                        borderRadius="50%"
                        src={`https://api.sellpang.com/images/shopee/avatar/${item.avatar}`}
                        alt=""
                        h="55px "
                        w="55px "
                      />
                      <Box alignSelf="center" pl="10px" w="50%">
                        <Text fontSize="20px" fontWeight="bold" w="">
                          {item.name?.length > 10
                            ? item.name?.slice(0, 10) + "..."
                            : item.name}
                        </Text>
                        <Text fontSize="18px" color="gray">
                          {item.message?.length > 15
                            ? item.message?.slice(0, 15) + "..."
                            : item.message}
                        </Text>
                      </Box>
                      <Spacer />
                      <Box>
                        <Text fontSize="10px">{dateString}</Text>
                      </Box>
                    </Flex>
                  );
                })}
              </Box>
            )}
          </Box>

          <Box className="test" bottom={0}>
            <Box
              className="test"
              px="15px"
              // mt="10px"
              // py="8px"
              pt={"15px"}
              bg="white"
              mr="8px"
              borderTop="1px solid #efefef"
            >
              <Flex justifyContent={"center"}>
                <Button
                  leftIcon={<RepeatIcon />}
                  borderRadius={"15px"}
                  bgColor={"#fced20"}
                  _hover={{ bgColor: "#fff021a3" }}
                  onClick={refreshUserChat}
                >
                  Refresh
                </Button>
              </Flex>
            </Box>
          </Box>
        </GridItem>
        <GridItem colSpan={4} borderLeft="1px solid" borderColor="grey">
          <Box fontSize="24px">
            {userId !== null ? (
              <Flex p="20px" borderBottom="1px solid grey" h="96px">
                <Image
                  borderRadius="50%"
                  src={`https://api.sellpang.com/images/shopee/avatar/${detailUser[0]?.avatar}`}
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
                  {detailUser[0]?.name}
                </Text>
              </Flex>
            ) : (
              <Flex p="20px" h="96px"></Flex>
            )}
            <Box
              height={`calc(100vh - 395px)`}
              overflow="auto"
              ref={chatBoxRef}
            >
              <Box px="5px" bg="white" pb={"10px"} overflow="auto">
                {messages !== null ? (
                  messages.map((item, index) => {
                    const datatime = moment(item.created_at);
                    const dateString = datatime.format("YYYY-MM-DD");
                    const timeString = datatime.format("HH:mm");
                    if (item.user_id == userId) {
                      if (dateString != date) {
                        date = dateString;
                        if (item.recived_id == userId) {
                          return (
                            <Box key={index}>
                              <Flex pt="15px" justifyContent="center">
                                <Box>
                                  <Text px="10px" fontSize={"18px"}>
                                    {formatDateThai(dateString, timeString)}
                                  </Text>
                                </Box>
                              </Flex>
                              <Flex direction="row-reverse" pt="10px">
                                <Box
                                  mx="5px"
                                  px="10px"
                                  py="5px"
                                  borderRadius="xl"
                                  bg="#fbfbfb"
                                  boxShadow="lg"
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
                                <Box fontSize="15px" alignSelf="flex-end">
                                  {item.status == 1 ? (
                                    <Text fontSize="15px">อ่านแล้ว</Text>
                                  ) : null}
                                  <Text fontSize="15px">{timeString} น.</Text>
                                </Box>
                              </Flex>
                            </Box>
                          );
                        } else {
                          return (
                            <Box key={index}>
                              <Flex pt="10px" justifyContent="center">
                                <Box>
                                  <Text px="10px" fontSize={"18px"}>
                                    {formatDateThai(dateString, timeString)}
                                  </Text>
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
                                    src={`https://api.sellpang.com/images/shopee/avatar/${item.avatar}`}
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
                                  bg="#cd2626"
                                  // bg="gray.200"
                                  alignSelf="center"
                                >
                                  {item.message !== null ? (
                                    <Text maxWidth="300px" color={"white"}>
                                      {item.message}
                                    </Text>
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
                                <Text alignSelf="end" fontSize="15px">
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
                                bg="#fbfbfb"
                                boxShadow="lg"
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
                                  <Text fontSize="15px">อ่านแล้ว</Text>
                                ) : null}
                                <Text fontSize="15px">{timeString} น.</Text>
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
                                  src={`https://api.sellpang.com/images/shopee/avatar/${item.avatar}`}
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
                                bg="#cd2626"
                                // bg="gray.200"
                                alignSelf="center"
                              >
                                {item.message !== null ? (
                                  <Text maxWidth="300px" color={"white"}>
                                    {item.message}
                                  </Text>
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
                              <Text alignSelf="end" fontSize="15px">
                                {timeString} น.
                              </Text>
                            </Flex>
                          );
                        }
                      }
                    } else {
                      null;
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
                  // mt="10px"
                  pt="15px"
                  bg="white"
                  mr="8px"
                  borderTop="1px solid #efefef"
                >
                  <Flex alignItems="center">
                    {/* <Image src="/img/plus.png" h="25px" w="25px" /> */}
                    <InputGroup mx="10px">
                      <Input
                        type="text"
                        value={text}
                        placeholder="พิมข้อความ"
                        borderRadius="3xl"
                        border={'2px solid #dc2626'}
                        bgColor={'gray.100'}
                        onChange={(e) => setText(e.target.value)}
                        // onClick={handleTouch}
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
                        style={{ height: "40px", width: "40px", color: "red" }}
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
