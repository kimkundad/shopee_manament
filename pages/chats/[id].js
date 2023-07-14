import React from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Download from "yet-another-react-lightbox/plugins/download";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";
import FormData from "form-data";
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
  FormControl,
  FormLabel,
  IconButton,
  Icon,
  Textarea,
} from "@chakra-ui/react";
import { TiLocationArrow, TiImage, TiTimes } from "react-icons/ti";
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
import { createObjectURL, revokeObjectURL } from "blob-util";

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
  const [selectedFile, setSelectedFile] = useState([]);
  // const [selectedImage, setSelectedImage] = useState(null);
  const [imagesLightBox, setImagesLightBox] = useState(null);
  const [previewFile, setPreviewFile] = useState([]);
  const [open, setOpen] = useState(false);
  const [imagesChat, setImagesChat] = useState([]);
  const [preload, setPreload] = useState(10);
  const [infinite, setInfinite] = useState(false);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFile((selectFiles) => {
      const updatedFiles = [...selectFiles];
      updatedFiles.push(...files);
      return updatedFiles;
    });
    // setSelectedFile(files);

    const filePreviews = files.map((file) => createObjectURL(file));
    setPreviewFile((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.push(...filePreviews);
      return updatedFiles;
    });
    // setPreviewFile(filePreviews);
    // สามารถทำสิ่งอื่น ๆ กับไฟล์ที่เลือกได้ต่อจากนี้
  };

  const handleFileDelete = (index) => {
    const updatedFiles = [...selectedFile];
    updatedFiles.splice(index, 1);
    setSelectedFile(updatedFiles);

    const updatedFiles2 = [...previewFile];
    updatedFiles2.splice(index, 1);
    setPreviewFile(updatedFiles2);
  };

  useEffect(() => {
    setShopId(router.query.id);
  }, []);

  const {
    data: UserChats,
    isLoading: fetchLoadingUserChats,
    mutateUserChats,
  } = getUserChats(router.query.id);
  // useEffect(() => {
  //   async function fecthdata() {
  //     const formdata = new FormData();
  //     formdata.append("shop_id", shopId);
  //     const res = await axios.get(
  //       `https://api.sellpang.com/api/getUserChats/${router.query.id}`,
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
      setMessages(res?.data?.message);
      axios
        .get(
          `https://api.sellpang.com/api/getImagesMessage/${item.id}/${router.query.id}`
        )
        .then(function (response) {
          if (response.data.img_chat) {
            setImagesChat(response.data.img_chat);
          }
        });
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
    if (userId !== null) {
      // eslint-disable-next-line no-inner-declarations
      async function newMessage() {
        const formdata = new FormData();
        let user_id = userId;
        let shop_id = shopId;
        formdata.append("recived_id", user_id);
        formdata.append("user_id", user_id);
        formdata.append("shop_id", router.query.id);
        formdata.append("message", text);
        selectedFile.forEach((file, index) => {
          formdata.append(`image[${index}]`, file);
        });
        const res = await axios.post(
          `https://api.sellpang.com/api/sendMessage`,
          formdata
        );
        setText("");
        setSelectedFile([]);
        setPreviewFile([]);
        function reload_img() {
          axios
            .get(
              `https://api.sellpang.com/api/getImagesMessage/${userId}/${router.query.id}`
            )
            .then(function (response) {
              if (response.data.img_chat) {
                setImagesChat(response.data.img_chat);
              }
            });
        }
        async function reload_msg() {
          const res = await axios.get(
            `https://api.sellpang.com/api/getMessage2/${userId}/${router.query.id}/${type}`
          );
          // console.log("res?.message-->", res?.data?.message);
          setMessages(res?.data?.message);
        }
        reload_img();
        reload_msg();
        setHeightMessage(38)
        setLineTextareaMessage(null)
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

  // useEffect(() => {
  //   async function fecthdata() {
  //     if (searchUser !== null) {
  //       const formdata = new FormData();
  //       formdata.append("shop_id", shopId);
  //       formdata.append("name", searchUser);
  //       const res = await axios.post(
  //         `https://api.sellpang.com/api/searchUserChats`,
  //         formdata
  //       );
  //       setUsers(res.data.users);
  //     }
  //   }
  //   fecthdata();
  // }, [searchUser]);

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
          mutateUserChats();
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

  const reorderImages = (index) => {
    const selectedImage = imagesChat[index];
    const updatedImages = [
      selectedImage,
      ...imagesChat.filter((_, i) => i !== index),
    ];

    setImagesLightBox(updatedImages);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const [lineTextareaMessage, setLineTextareaMessage] = useState(null);
  const [calLineHeight, setCalLineHeight] = useState(null);
  const [heightMessage, setHeightMessage] = useState(38);
  const handleInputMessage = (e) => {
    const lines = e.target.value.split("\n");
    const lineCount = lines.length;
    setLineTextareaMessage(lineCount);
    if (lineCount > 1) {

      // กรณีเกิน 3 บรรทัด ให้ปรับแก้ความสูงของ textarea ได้ตามต้องการ
      // ตัวอย่างเช่น คำนวณและกำหนด rows ให้สอดคล้องกับข้อความที่มีอยู่
      const lineHeight = 20; // สมมติว่าสูงของแต่ละบรรทัดเท่ากับ 20px
      const rows = Math.min(6, lineCount); // กำหนดจำนวนแถวสูงสุดที่ยอมรับ (เช่น 6 แถว)

      e.target.rows = rows; // ปรับแก้ความสูงของ textarea ให้ตรงกับข้อความที่มีอยู่
      // e.target.style.height = `120px`; // ปรับแก้ความสูงของ textarea ใน CSS
      // e.target.style.height = `${lineHeight * rows}px`; // ปรับแก้ความสูงของ textarea ใน CSS
      setHeightMessage(lineHeight * rows)
      setCalLineHeight(lineHeight * rows)
    } else if (e.target.value == "") {

      e.target.rows = 1; // ปรับแก้ความสูงของ textarea ให้ตรงกับข้อความที่มีอยู่
      // e.target.style.height = `38px`; // ปรับแก้ความสูงของ textarea ใน CSS
      setHeightMessage(38)
    }

    setText(e.target.value);
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
          <Box height={"calc(100vh - 326px)"} overflowY={"scroll"}>
            {fetchLoadingUserChats ? (
              <Box></Box>
            ) : (
              <Box>
                {UserChats?.users
                .filter(item => searchUser === null || item.name.toLowerCase().includes(searchUser.toLowerCase()))
                .map((item, index) => {
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
                        {item.sender_id == null ? (
                          <Text fontSize="18px" color="gray">
                            You :{" "}
                            {item.message?.length > 15
                              ? item.message?.slice(0, 15) + "..."
                              : item.message}
                          </Text>
                        ) : (
                          <Text fontSize="18px" color="gray">
                            {item.message?.length > 15
                              ? item.message?.slice(0, 15) + "..."
                              : item.message}
                          </Text>
                        )}
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
              height={
                previewFile.length != 0 && lineTextareaMessage < 1
                  ? `calc(100vh - 490px)`
                  : lineTextareaMessage > 1 && previewFile.length == 0
                  ? `calc(100vh - ${398 + calLineHeight - 40}px)`
                  : lineTextareaMessage > 1 && previewFile.length != 0
                  ? `calc(100vh - ${398 + calLineHeight + 95 - 40}px)`
                  : `calc(100vh - 395px)`
              }
              overflow="auto"
              ref={chatBoxRef}
            >
              <Box px="5px" bg="white" pb={"10px"} overflow="auto">
                {messages.length != 0 ? (
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
                                  bg={
                                    item.img_message !== null ? "" : "#cd2626"
                                  }
                                  boxShadow={
                                    item.img_message !== null ? "" : "lg"
                                  }
                                  alignSelf="center"
                                >
                                  {item.message !== null ? (
                                    <Text
                                      whiteSpace="pre-wrap"
                                      maxWidth="500px"
                                      color={"white"}
                                      fontSize={"20px"}
                                    >
                                      {item.message}
                                    </Text>
                                  ) : (
                                    false
                                  )}
                                  {item.img_message !== null ? (
                                    <Image
                                      src={`https://api.sellpang.com/images/shopee/img_message/${item.img_message}`}
                                      alt=""
                                      // maxWidth="200px"
                                      maxHeight="200px"
                                      py="5px"
                                      borderRadius={"10px"}
                                      _hover={{
                                        cursor: "pointer",
                                        opacity: "0.8",
                                      }}
                                      onClick={() => {
                                        const selectedIndex =
                                          imagesChat.findIndex(
                                            (image) =>
                                              image.img_message ===
                                              item.img_message
                                          );
                                        reorderImages(selectedIndex);
                                        setOpen(true);
                                      }}
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
                                  bg="#e4e6eb"
                                  // bg="gray.200"
                                  alignSelf="center"
                                >
                                  {item.message !== null ? (
                                    <Text
                                      whiteSpace="pre-wrap"
                                      maxWidth="500px"
                                      color={"#050505"}
                                      fontSize={"20px"}
                                    >
                                      {item.message}
                                    </Text>
                                  ) : (
                                    false
                                  )}
                                  {item.img_message !== null ? (
                                    <Image
                                      src={`https://api.sellpang.com/images/shopee/img_message/${item.img_message}`}
                                      alt=""
                                      // maxWidth="200px"
                                      maxHeight="200px"
                                      py="5px"
                                      _hover={{
                                        cursor: "pointer",
                                        opacity: "0.8",
                                      }}
                                      onClick={() => {
                                        const selectedIndex =
                                          imagesChat.findIndex(
                                            (image) =>
                                              image.img_message ===
                                              item.img_message
                                          );
                                        reorderImages(selectedIndex);
                                        setOpen(true);
                                      }}
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
                                bg={item.img_message !== null ? "" : "#cd2626"}
                                boxShadow={
                                  item.img_message !== null ? "" : "lg"
                                }
                                alignSelf="center"
                              >
                                {item.message !== null ? (
                                  <Text
                                    whiteSpace="pre-wrap"
                                    maxWidth="500px"
                                    color={"white"}
                                    fontSize={"20px"}
                                  >
                                    {item.message}
                                  </Text>
                                ) : (
                                  false
                                )}
                                {item.img_message !== null ? (
                                  <Image
                                    src={`https://api.sellpang.com/images/shopee/img_message/${item.img_message}`}
                                    alt=""
                                    // maxWidth="200px"
                                    maxHeight="200px"
                                    py="5px"
                                    borderRadius={"15px"}
                                    _hover={{
                                      cursor: "pointer",
                                      opacity: "0.8",
                                    }}
                                    onClick={() => {
                                      const selectedIndex =
                                        imagesChat.findIndex(
                                          (image) =>
                                            image.img_message ===
                                            item.img_message
                                        );
                                      reorderImages(selectedIndex);
                                      setOpen(true);
                                    }}
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
                                bg="#e4e6eb"
                                // bg="gray.200"
                                alignSelf="center"
                              >
                                {item.message !== null ? (
                                  <Text
                                    whiteSpace="pre-wrap"
                                    maxWidth="500px"
                                    color={"#050505"}
                                    fontSize={"20px"}
                                  >
                                    {item.message}
                                  </Text>
                                ) : (
                                  false
                                )}
                                {item.img_message !== null ? (
                                  <Image
                                    src={`https://api.sellpang.com/images/shopee/img_message/${item.img_message}`}
                                    alt=""
                                    // maxWidth="200px"
                                    maxHeight="200px"
                                    py="5px"
                                    _hover={{
                                      cursor: "pointer",
                                      opacity: "0.8",
                                    }}
                                    onClick={() => {
                                      const selectedIndex =
                                        imagesChat.findIndex(
                                          (image) =>
                                            image.img_message ===
                                            item.img_message
                                        );
                                      reorderImages(selectedIndex);
                                      setOpen(true);
                                    }}
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
                <Lightbox
                  plugins={[Thumbnails, Download, Zoom, Counter]}
                  open={open}
                  close={() => {
                    setOpen(false);
                  }}
                  carousel={{ preload, finite: true }}
                  slides={imagesLightBox?.map((image) => ({
                    src: `https://api.sellpang.com/images/shopee/img_message/${image.img_message}`,
                  }))}
                />
              </Box>
            </Box>

            {previewFile.length != 0 && (
              <Box
                className="test"
                px="15px"
                pt="15px"
                bg="white"
                mr="8px"
                borderTop="1px solid #efefef"
              >
                <Flex>
                  {previewFile.map((prefiles, index) => {
                    return (
                      <Box
                        key={index}
                        position="relative"
                        display="inline-block"
                      >
                        <Image
                          src={prefiles}
                          position="relative"
                          w={"80px"}
                          h={"80px"}
                          border={"1px solid gray"}
                          borderRadius={"10px"}
                          p={1}
                          mr={"10px"}
                        />
                        <IconButton
                          position="absolute"
                          top="-8px"
                          right="3px"
                          size="xs"
                          fontSize="xl"
                          borderRadius={"20px"}
                          icon={<Icon as={TiTimes} boxSize={6} />}
                          colorScheme="red"
                          onClick={() => handleFileDelete(index)}
                        />
                      </Box>
                    );
                  })}
                </Flex>
              </Box>
            )}

            <form onSubmit={sendMessage}>
              <Box className="test" bottom={0}>
                <Box
                  className="test"
                  px="15px"
                  pt="15px"
                  bg="white"
                  mr="8px"
                  borderTop={previewFile.length == 0 ? "1px solid #efefef" : ""}
                >
                  <Flex alignItems="center">
                    <label htmlFor="fileInput" mr="10px">
                      <TiImage
                        style={{
                          height: "40px",
                          width: "40px",
                          color: "red",
                          cursor: "pointer",
                        }}
                      />
                      <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                        multiple
                      />
                    </label>
                    <InputGroup flex="1" mx="10px">
                      {/* <Input
                        type="text"
                        value={text}
                        placeholder="พิมข้อความ"
                        borderRadius="3xl"
                        border="none"
                        bgColor="gray.100"
                        onChange={(e) => setText(e.target.value)}
                      /> */}
                      <Textarea
                        value={text}
                        placeholder="พิมข้อความ"
                        borderRadius="3xl"
                        border="none"
                        bgColor="gray.100"
                        resize={"none"}
                        onChange={handleInputMessage}
                        onKeyPress={handleKeyPress}
                        height={`${heightMessage}px`}
                        rows={1}
                      />
                      <InputRightElement>
                        <Image src="/img/emoji.png" alt="" h="25px" />
                      </InputRightElement>
                    </InputGroup>
                    <Button
                      type="button"
                      bg="white"
                      padding="0px"
                      w="35px"
                      h="35px"
                      onClick={sendMessage}
                    >
                      <TiLocationArrow
                        style={{
                          height: "50px",
                          width: "50px",
                          color: "red",
                          marginBottom: "5px",
                        }}
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
