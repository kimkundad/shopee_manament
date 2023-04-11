import React, { Fragment, useEffect, useState, useRef } from 'react'
import { connect, useDispatch, useSelector} from 'react-redux'
import { useRouter } from 'next/router'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Center,
    useDisclosure,
    Box,
    Text,
    Image,
    Input,
    Flex,
    Spacer,
    Button,
    FormControl,
    InputGroup,
    InputLeftElement,
    SimpleGrid,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    HStack,
    Stack,
    useColorModeValue,
    Link ,
    InputRightElement,
  } from "@chakra-ui/react";
  import NextLink from 'next/link'
  import { postRegis } from '@/store/slices/register'
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

  export default function ModalRegis(props) {

    const authen = useSelector(App => App.authen)
    const router = useRouter()
    const dispatch = useDispatch()

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordconfirmation] = useState('');

    const [showPassword, setShowPassword] = useState(false);  

    const onChangePhone = (e) => {
        setPhone(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onChangeConPassword = (e) => {
        setPasswordconfirmation(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            phone,
            password,
            password_confirmation
          }
          dispatch(postRegis(user))
          props.onClose()
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>

      <Modal size="xs" onClose={props.onClose} isOpen={props.onOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader alignSelf="flex-end" pr="10px" pt="10px">
            <Image
              src="/img/cancel.png"
              alt=""
              h="25px"
              w="25px"
              onClick={props.onClose}
            />
          </ModalHeader>
          <ModalBody>
            <Box px="5px">
              <FormControl>
                <Text fontSize="24px" fontWeight="bold">
                  กรอกเบอร์โทรศัพท์
                </Text>
                <Input bg="gray.100" type="number" name="phone" onChange={onChangePhone}/>
                <Flex mt="15px">
                  <Text fontSize="24px" fontWeight="bold">
                   รหัสผ่าน
                  </Text>
                </Flex>

                <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} name="password" onChange={onChangePassword} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Flex mt="15px">
                  <Text fontSize="24px" fontWeight="bold">
                   รหัสผ่าน
                  </Text>
                </Flex>

                <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} name="password_confirmation" onChange={onChangeConPassword} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                        onChangeConPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              </FormControl>

              <Box textAlign="center">
                <Button mt="15px" bg="red" color="white" onClick={handleSubmit}>
                  สมัครสมาชิก
                </Button>
              </Box>
              
            </Box>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
        </>
    );

  }