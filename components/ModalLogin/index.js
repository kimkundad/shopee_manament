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
  import user from "@/public/images/user.png";

  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

  import Login from '@/components/ModalLogin/login';

  export default function ModalLogin(props) {

    const authen = useSelector(App => App.authen)
    const router = useRouter()
    const dispatch = useDispatch()

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);  

    const [showLogin, setShowLogin] = useState(false);

   
    
    const {
        isOpen: isOpenForm1,
        onOpen: onOpenForm1,
        onClose: onCloseForm1,
      } = useDisclosure();
      const {
        isOpen: isOpenForm2,
        onOpen: onOpenForm2,
        onClose: onCloseForm2,
      } = useDisclosure();

    const handleClick = () => {
        onCloseForm1();
        onCloseForm2();
        // console.log('--->handleClick')
      };

      const loginClick = () => {
        setShowLogin(true)
        onCloseForm1();
      };

      

    return (
        <>
        {authen?.isAuthenticate === true ?
         (
            <>
            {props?.type === 'avatar' &&
            <Link as={NextLink} href="/profile">
            <Box
              bg="white"
              borderRadius="50%"
              w="7"
              h="7"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mr="2"
              order="1px"
              borderColor="gray.300"
              ids={props.type}
            >
              <Image src={user.src} alt="" h="7" />
            </Box>
            </Link>
            }
            {props?.type === 'card' &&
            <Link as={NextLink} href="/cartShop">
            <Box
                  bg="white"
                  borderRadius="50%"
                  w="7"
                  h="7"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mr="5"
                  border="1px"
                  borderColor="gray.300"
                >
                  <Text>dsadsad</Text>
                </Box>
            </Link>
            }
            {props?.type === 'chat' &&
            <Link as={NextLink} href="/chat">
                <Flex
                textColor="black"
                h="20px !important"
                mr="2"
                borderRadius="xl"
                bg="white"
                alignItems="center"
                mb="8"
                className="setWidth"
                >
                <Image
                    pl="3"
                    borderRadius="50%"
                    src="/img/chat.png"
                    alt=""
                    h="10px"
                />
                <Text className="textBody" px="1">
                    แชทร้านค้า
                </Text>
                </Flex>
            </Link>
            }
            </>
        ):(
            <>
            {props?.type === 'avatar' &&
            <Box onClick={onOpenForm1}
                  bg="white"
                  borderRadius="50%"
                  w="7"
                  h="7"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mr="2"
                  order="1px"
                  borderColor="gray.300"
                  ids={props.type}
                >
                  <Image src={user.src} alt="" h="7" />
            </Box>
            }
            {props?.type === 'card' &&
                <Box onClick={onOpenForm1}
                bg="white"
                borderRadius="50%"
                w="7"
                h="7"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mr="5"
                border="1px"
                borderColor="gray.300"
            >
                <Text>asdsadas</Text>
            </Box>
            }
            {props?.type === 'chat' &&
            <Flex onClick={onOpenForm1}
                textColor="black"
                h="20px !important"
                mr="2"
                borderRadius="xl"
                bg="white"
                alignItems="center"
                mb="8"
                className="setWidth"
            >
                <Image
                pl="3"
                borderRadius="50%"
                src="/img/chat.png"
                alt=""
                h="10px"
                />
                <Text className="textBody" px="1">
                แชทร้านค้า
                </Text>
            </Flex>
            }
            </>
        )
        }
                


        <Modal onClose={onCloseForm1} size="xs" isOpen={isOpenForm1} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader alignSelf="flex-end" pr="10px" pt="10px">
            <Image
              src="/images/cancel.png"
              alt=""
              h="25px"
              w="25px"
              onClick={() => handleClick()}
            />
          </ModalHeader>
          <ModalBody>
            <Box px="5px">
              <Text
                bg="red"
                textAlign="center"
                borderRadius="xl"
                fontSize="25px"
                color="white"
                fontWeight="bold"
                onClick={() => loginClick()}
              >
                ลงชื่อเข้าใช้ด้วยโทรศัพท์
              </Text>
              <Text color="gray.400" textAlign="center">
                ระบบจะจดจำที่อยู่ในการส่งสินค้าเมื่อใช้งานในครั้งต่อไป
              </Text>
              <Text
                mt="15px"
                bg="gray.100"
                textAlign="center"
                borderRadius="xl"
                fontSize="25px"
                fontWeight="bold"
                onClick={() => handleClick()}
              >
                สั่งตอนนี้
              </Text>
              <Text color="gray.400" textAlign="center">
                ต้องกรอกที่อยู่ในการจัดส่งทุกครั้งที่เข้้าใช้งานใหม่
              </Text>
            </Box>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      
      <Login onOpen={showLogin} onClose={() => setShowLogin(false)}/> 
      
        </>
    );

  }