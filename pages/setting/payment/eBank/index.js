import React, { useState, useEffect } from "react";
import Link from "next/link";
import ButtonBack from "@/components/button/ButtonBack";
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
  InputRightElement,
  Textarea,
  ButtonGroup,
  RadioGroup,
  Radio,
  StackDivider,
  SkeletonCircle,
  AbsoluteCenter,
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
export default function Purchase() {
  const [banks, setBanks] = useState(null);
  const userInfo = useSelector((App) => App.userInfo);
  useEffect(() => {
    if (banks == null) {
      async function fetchData() {
        const formdataBank = new FormData();
        formdataBank.append("user_id", userInfo.data[0]?.id);
        const bank = await axios.post(
          `https://api.sellpang.com/api/getBank`,
          formdataBank
        );
        console.log(bank);
        setBanks(bank.data.banks);
      }

      fetchData();
    }
  }, []);

  return (
    <>
      <Box p={5}>
        <Box>
          <ButtonBack />
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
      <Grid templateColumns="repeat(3, 1fr)" gap={20} p="30px" mx="30px">
        {banks?.map((item, index) => {
          return (
            <GridItem>
              <Box
                p={4}
                borderWidth="2px"
                borderColor={"gray.500"}
                borderRadius="lg"
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
                      size="sm"
                      justify={"right"}
                      colorScheme={"green"}
                      isChecked={item.is_active ? true : false}
                    />
                  </Box>
                </HStack>
              </Box>
            </GridItem>
          );
        })}
      </Grid>

      <Box p={10} minHeight={400}>
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
    </>
  );
}
