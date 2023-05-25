import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Box,
  Text,
  HStack,
  Center,
  Input,
  Image,
  Spacer,
  Avatar,
  AvatarBadge,
  Button,
  IconButton,
  Flex,
  Stack,
  InputGroup,
  InputLeftElement,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Lorem,
  LinkBox,
  Grid,
  GridItem,
  Switch,
  VStack,
  ModalCloseButton,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import {
  AddIcon,
  EditIcon,
  DeleteIcon,
  Icon,
  ArrowLeftIcon,
  ArrowRightIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import {
  BsArrowLeftCircle,
  BsArrowRightCircle,
  BsPerson,
  BsCameraFill,
  BsCashCoin,
} from "react-icons/bs";
import { FaRegSave } from "react-icons/fa";
import { VscSave } from "react-icons/vsc";
import axios from "axios";
import { connect, useDispatch, useSelector } from "react-redux";
import { event } from "jquery";
import { useRouter } from "next/router";
export default function Purchase() {
  const [banks, setBanks] = useState(null);
  const userInfo = useSelector((App) => App.userInfo);
  const router = useRouter();

  useEffect(() => {
    if (banks == null) {
      async function fetchData() {
        const formdataBank = new FormData();
        formdataBank.append("user_id", userInfo.data[0]?.id);
        formdataBank.append("type", "setting");
        const bank = await axios.post(
          `https://api.sellpang.com/api/getBank`,
          formdataBank
        );
        setBanks(bank.data.banks);
      }

      fetchData();
    }
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure([]);

  const setActive = async (event) => {
    const formdata = new FormData();
    let check = 0;
    if (event.target.checked) {
      check = 1;
    } else {
      check = 0;
    }
    formdata.append("user_id", userInfo.data[0]?.id);
    formdata.append("bankacc_id", event.target.id);
    formdata.append("checked", check);
    const res = await axios.post(
      `https://api.sellpang.com/api/activeBankAcc`,
      formdata
    );
    setBanks(res.data.banks);
  };

  const [accId, setAccId] = useState();
  const deleteAccount = async () => {
    const formdata = new FormData();
    formdata.append("accId", accId);
    formdata.append("user_id", userInfo.data[0]?.id);
    const res = await axios.post(
      `https://api.sellpang.com/api/delBankAcc`,
      formdata
    );
    setBanks(res.data.banks);
  };

  const edit = (id) => {
    router.push({pathname:`/setting/payment/eBank/edit/${id}`})
  }

  const buttonBack = () => {
    router.push({pathname:"/setting/payment"})
  }
  return (
    <>
      <Box p={5}>
        <Box>
        <Button
            size="sm"
            onClick={() => buttonBack()}
            leftIcon={<BsArrowLeftCircle />}
            borderRadius="20"
            background="#f84c01"
            color="white"
            fontWeight="none"
            fontSize="20px"
          >
            ย้อนกลับ
          </Button>
        </Box>
        <Box>
          <Center>
            <HStack>
              <Image
                width={"50px"}
                height={"50px"}
                src={"/images/menu/ตั้งค่า.png"}
                alt={"ตั้งค่า"}
              />
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
          <Text as="b" fontSize="21">
            {" "}
            ชำระเงินแบบโอน
          </Text>
        </HStack>
      </Box>
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
        gap={10}
        p="30px"
      >
        {banks?.map((item, index) => {
          return (
            <GridItem key={index} w="450px">
              <Box
                p={4}
                borderWidth="2px"
                borderColor={"gray.500"}
                borderRadius="lg"
                /* _hover={{ backgroundColor: "blue.500", color: "white" }} */
              >
                <HStack justifyContent={"center"}>
                  <Box>
                    <Image
                      src={`https://api.sellpang.com/images/shopee/icon_bank/${item?.icon_bank_circle}`}
                      h="100px"
                      w="100px"
                    />
                  </Box>
                  <Spacer />
                  <Box textAlign="center">
                    <Text as="b" fontSize="24" fontWeight="bold">
                      {item.bankaccount_name}
                    </Text>
                    <Text fontSize="24">{item.bankaccount_number}</Text>
                    <Text fontSize="24">{item.name_bank}</Text>
                  </Box>
                  <Spacer />
                  <Box alignSelf="start">
                    <Switch
                      colorScheme="brand"
                      id={item.id}
                      onChange={setActive}
                      size="md"
                      justify={"right"}
                      isChecked={item.is_active == 1 ? true : false}
                    />
                  </Box>
                </HStack>
                <HStack justifyContent="center" pt="15px">
                  <Box w="20%">
                    <Button
                      w="100%"
                      onClick={() => {
                        setAccId(item.id);
                        onOpen();
                      }}
                    >
                      <Image src="/images/binshop.png" w="15px" h="15px" />
                      <Text pl="10px" fontSize="18px">
                        ลบ
                      </Text>
                    </Button>
                  </Box>
                  <Box w="20%">
                    <Button w="100%" bg="red" color="white" onClick={() => edit(item.id)}>
                      <Image src="/images/editshop.png" w="15px" h="15px" />
                      <Text pl="10px" fontSize="18px">
                        แก้ไข
                      </Text>
                    </Button>
                  </Box>
                </HStack>
              </Box>
            </GridItem>
          );
        })}
      </Grid>

      <Box p={10} /* minHeight={400} */>
        <Flex></Flex>

        <Center mt={10}>
          <Link
            href={"/setting/payment/eBank/add"}
            style={{ textDecoration: "none" }}
          >
            <Button
              leftIcon={<AddIcon />}
              borderRadius="3xl"
              color="white"
              fontSize="21"
              background="#f84c01"
            >
              เพิ่มการชำระเงินแบบโอน
            </Button>
          </Link>
        </Center>
      </Box>

      <Modal onClose={onClose} size="md" isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent alignSelf="center" py="20px">
          <ModalBody alignSelf="center">
            <ModalCloseButton />
            <Box textAlign="center">
              <Image src="/images/binred.png" alt="" h="200px" mx="auto" />
              <Text fontWeight="bold" fontSize="35px" pt="10px">
                ยืนยันการลบบัญชี
              </Text>
            </Box>
          </ModalBody>
          <ModalFooter alignSelf="center">
            <HStack justifyContent="center" pt="15px">
              <Box borderRadius="md" border="1px solid">
                <Button
                  w="100%"
                  onClick={() => {
                    onClose();
                  }}
                >
                  <Text fontSize="18px">ยกเลิก</Text>
                </Button>
              </Box>
              <Spacer />
              <Box>
                <Button
                  w="100%"
                  bg="red"
                  color="white"
                  onClick={() => {
                    onClose();
                    deleteAccount();
                  }}
                >
                  <Text fontSize="18px">ยืนยัน</Text>
                </Button>
              </Box>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
