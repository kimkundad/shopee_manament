import React, { Fragment, useEffect, useState, useRef } from "react";
import {
  Flex,
  Text,
  InputRightElement,
  Box,
  InputGroup,
  Input,
  FormControl,
  Button,
  Stack,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { getUserAuthen } from "@/store/slices/authen";
import { connect, useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

export default function index(props) {
  const authen = useSelector((App) => App.authen);
  const router = useRouter();
  const dispatch = useDispatch();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      phone,
      password,
    };
    dispatch(getUserAuthen(user));
    /* props.onClose(); */
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const RegisClick = (e) => {
    setShowRegister(true);
    props.onClose();
  };
  return (
    <Flex justifyContent="center" h="100vh" alignItems="center">
      <Box
        width="400px"
        border="1px solid black"
        borderRadius="xl"
        px="25px"
        height="300px"
      >
        <form>
          <Text fontSize="70px" fontWeight="bold" textAlign="center">
            เข้าสู่ระบบ
          </Text>
          <Input
            // type="number"
            name="phone"
            onChange={onChangePhone}
            placeholder="ชื่อผู้ใช้งาน"
          />

          <InputGroup mt="15px">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={onChangePassword}
              placeholder="รหัสผ่าน"
            />
            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Box textAlign="center" pt="15px">
            <Button mt="15px" bg="red" color="white" onClick={handleSubmit}>
              เข้าสู่ระบบ
            </Button>
          </Box>
        </form>

        {/* <Stack pt={6}>
          <Text align={"center"} fontSize="20px">
            หากคุณยังไม่มีบัญชี?
            <Link
              as={NextLink}
              fontSize="22px"
              href="#"
              onClick={() => RegisClick(props.onClose)}
              color={"blue.400"}
            >
              สมัครใช้งาน
            </Link>
          </Text>
        </Stack> */}
      </Box>
    </Flex>
  );
}
