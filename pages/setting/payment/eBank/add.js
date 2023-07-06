import React, { useState, useEffect } from "react";
import Link from "next/link";
import ButtonBack from "@/components/button/ButtonBack";
import FormData from 'form-data';
import { setTimeout, clearTimeout } from 'timers';
import {
  Box,
  Text,
  HStack,
  Center,
  Input,
  Button,
  Spacer,
  Image,
  AvatarBadge,
  Select,
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
  InputRightElement,
  useDisclosure,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Container,
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
import Upload from "@/components/Dropzone";
import { connect, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
export default function EbankAdd() {
  const router = useRouter();
  const [image, setImage] = useState([]);
  const [bankaccountName, setBankaccountName] = useState(null);
  const [bankaccountNumber, setBankaccountNumber] = useState(null);
  const [branch, setBranch] = useState(null);
  const [bankId, setBankId] = useState(null);
  const [typeDeposit, setTypeDeposit] = useState(null);
  const userInfo = useSelector((App) => App.userInfo);

  const { isOpen, onOpen, onClose } = useDisclosure([]);

  const [banks, setBanks] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`https://api.sellpang.com/api/allBanks`);
      setBanks(res.data.banks);
    }
    fetchData();
  }, []);
  const addNewBankAccount = async () => {
    const formdata = new FormData();
    formdata.append("uid", userInfo.data[0]?.id);
    formdata.append("bank_id", bankId);
    formdata.append("bankaccount_name", bankaccountName);
    formdata.append("bankaccount_number", bankaccountNumber);
    if (image[0]?.name !== undefined) {
      formdata.append("file", image[0]);
    }
    formdata.append("type_deposit", typeDeposit);
    formdata.append("branch", branch);
    formdata.append("type_account", "eBank");
    const res = await axios.post(
      `https://api.sellpang.com/api/addBankAccount`,
      formdata
    );

    if (res.data.status == "success") {
      onOpen();
      setTimeout(() => {
        router.push({pathname:"/setting/payment/eBank"}); // Replace with your desired redirect path
      }, 1000);
    }
  };

  const buttonBack = () => {
    router.push({pathname:"/setting/payment/eBank"})
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
                src={"/images/menu/icon-setting.png"}
                alt="ตั้งค่า"
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
            เพิ่มการชำระเงิน
          </Text>
        </HStack>
      </Box>

      <Box p={10} minHeight={400}>
        <VStack>
          <Container maxW="lg">
            <HStack>
              <Box>
                <Button
                  borderRadius="3xl"
                  borderWidth="2px"
                  borderColor="#f84c01"
                  fontSize="17"
                  color="#f84c01"
                  bg="none"
                  w="40"
                  _hover={{
                    bg: "#f84c01",
                    color: "white",
                  }}
                >
                  บัญชีธนาคาร
                </Button>
              </Box>
              <Spacer />
              <Box>
                <Button
                  borderRadius="3xl"
                  borderWidth="2px"
                  borderColor="gray.400"
                  fontSize="17"
                  color="gray.400"
                  bg="none"
                  w="40"
                >
                  QR PromptPay
                </Button>
              </Box>
            </HStack>
          </Container>

          <Container maxW="md">
            <FormControl mt="10">
              <HStack>
                <Box w="20%">
                  <FormLabel
                    mb="0"
                    fontSize="17"
                    textAlign="right"
                    fontWeight="bold"
                  >
                    ธนาคาร :{" "}
                  </FormLabel>
                </Box>
                <Box w="75%">
                  <Select
                    fontSize="17"
                    placeholder="-- กรุณาเลือกธนาคาร --"
                    onChange={(e) => setBankId(e.target.value)}
                  >
                    {banks?.map((item, index) => {
                      return (
                        <option key={index} value={item.id}>
                          {item.name_bank}
                        </option>
                      );
                    })}
                  </Select>
                </Box>
              </HStack>
              <HStack mt="4">
                <Box w="20%">
                  <FormLabel
                    mb="0"
                    fontSize="17"
                    textAlign="right"
                    fontWeight="bold"
                  >
                    ชื่อบัญชี :{" "}
                  </FormLabel>
                </Box>
                <Box w="75%">
                  <Input
                    w="100%"
                    fontSize="17"
                    placeholder="ระบุชื่อบัญชี"
                    onChange={(e) => setBankaccountName(e.target.value)}
                  />
                </Box>
              </HStack>
              <HStack mt="4">
                <Box w="20%">
                  <FormLabel
                    mb="0"
                    fontSize="17"
                    textAlign="right"
                    fontWeight="bold"
                  >
                    เลขบัญชี :{" "}
                  </FormLabel>
                </Box>
                <Box w="75%">
                  <Input
                    w="100%"
                    fontSize="17"
                    placeholder="ระบุเลขที่บัญชี"
                    onChange={(e) => setBankaccountNumber(e.target.value)}
                  />
                </Box>
              </HStack>
              <HStack mt="4">
                <Box w="20%">
                  <FormLabel
                    mb="0"
                    fontSize="17"
                    textAlign="right"
                    fontWeight="bold"
                  >
                    สาขา :{" "}
                  </FormLabel>
                </Box>
                <Box w="75%">
                  <Input
                    w="100%"
                    fontSize="17"
                    placeholder="ระบุสาขา"
                    onChange={(e) => setBranch(e.target.value)}
                  />
                </Box>
              </HStack>
              <HStack mt="4">
                <Box w="20%">
                  <FormLabel
                    mb="0"
                    fontSize="17"
                    textAlign="right"
                    fontWeight="bold"
                  >
                    ประเภทบัญชี :{" "}
                  </FormLabel>
                </Box>
                <Box w="75%">
                  <Select
                    fontSize="17"
                    placeholder="-- กรุณาเลือกชนิดบัญชี --"
                    onChange={(e) => setTypeDeposit(e.target.value)}
                  >
                    <option value="เงินฝากออมทรัพย์">เงินฝากออมทรัพย์</option>
                    <option value="เงินฝากประจำ">เงินฝากประจำ</option>
                    <option value="เงินฝากกระแสรายวัน">
                      เงินฝากกระแสรายวัน
                    </option>
                  </Select>
                </Box>
              </HStack>
              <HStack mt="4">
                <Box w="20%">
                  <FormLabel
                    mb="0"
                    fontSize="17"
                    textAlign="right"
                    fontWeight="bold"
                  >
                    QR_code :{" "}
                  </FormLabel>
                </Box>
                <Box w="75%">
                  <Upload setImage={setImage} />
                </Box>
              </HStack>
            </FormControl>
          </Container>
        </VStack>

        <HStack justify="center" mt="10">
          <ButtonGroup gap="4">
            <Button colorScheme="gray">ยกเลิก</Button>
            <Button
              leftIcon={<VscSave />}
              background="#f84c01"
              color="white"
              onClick={addNewBankAccount}
            >
              บันทึก
            </Button>
          </ButtonGroup>
        </HStack>
      </Box>

      <Modal onClose={onClose} size="xs" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent alignSelf="center" py="20px">
          <ModalBody alignSelf="center">
            <Box textAlign="center">
              <Image src="/images/check3.png" alt="" h="70px" mx="auto" />
              <Text fontWeight="bold" fontSize="24">
                เพิ่มบัญชีธนาคารสำเร็จ
              </Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
