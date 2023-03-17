import React from "react";
import Image from 'next/image';
import {
    Box, Text, HStack, Center, Input, Button,
    Spacer, Avatar, AvatarBadge, Select, IconButton, Flex, Stack,
    InputGroup, InputLeftElement, Wrap, WrapItem,
    FormControl, FormLabel, Lorem, LinkBox, Grid, GridItem,
    Switch, VStack, InputRightElement, Textarea, ButtonGroup,
    RadioGroup, Radio, StackDivider, Link
} from "@chakra-ui/react"
import {
    AddIcon, EditIcon, DeleteIcon, Icon,
    ArrowLeftIcon, ArrowRightIcon, SearchIcon
} from '@chakra-ui/icons';
import { BsReceipt, BsArrowRightCircle, BsPerson, BsShop, BsCashCoin, BsBell } from "react-icons/bs";
import { FaRegSave } from "react-icons/fa";
import { VscSave } from "react-icons/vsc";

export default function Purchase() {


    return (
        <>

            <Box p='10'>
                <Box>
                    <Center>
                        <HStack>
                            <Image width='36' height='36' src={'/images/menu/ตั้งค่า.png'} />
                            <Text as='b' fontSize='4xl' pt={3}> ตั้งค่า</Text>
                        </HStack>
                    </Center>
                </Box>
            </Box>

            <Box p={10} minHeight={400}>
                <VStack
                    spacing={5}
                    align='stretch'
                >
                    <Box p='5' borderWidth='2px' borderColor='gray.500' borderRadius='lg'>
                        <Flex color='gray.600'>
                            <HStack>
                                <Icon as={BsPerson} boxSize={10} />
                                <Text pt='1' pl='2' as='b' fontSize='21' >โปรไฟล์ของฉัน</Text>
                            </HStack>
                            <Spacer />
                            <Box>
                                <Link href="/setting/profile">
                                    <Icon as={BsArrowRightCircle} boxSize={8} />
                                </Link>
                            </Box>
                        </Flex>
                    </Box>

                    <Box p='5' borderWidth='2px' borderColor='gray.500' borderRadius='lg'>
                        <Flex color='gray.600'>
                            <HStack>
                                <Icon as={BsShop} boxSize={8} />
                                <Text pt='1' pl='2' as='b' fontSize='21' >ตั้งค่าร้าน</Text>
                            </HStack>
                            <Spacer />
                            <Box>
                                <Link href="/setting">
                                    <Icon as={BsArrowRightCircle} boxSize={8} />
                                </Link>
                            </Box>
                        </Flex>
                    </Box>

                    <Box p='5' borderWidth='2px' borderColor='gray.500' borderRadius='lg'>
                        <Flex color='gray.600'>
                            <HStack>
                                <Icon as={BsCashCoin} boxSize={8} />
                                <Text pt='1' pl='2' as='b' fontSize='21' >ช่องทางการชำระเงิน</Text>
                            </HStack>
                            <Spacer />
                            <Box>
                                <Link href="/setting/payment">
                                    <Icon as={BsArrowRightCircle} boxSize={8} />
                                </Link>
                            </Box>
                        </Flex>
                    </Box>

                    <Box p='5' borderWidth='2px' borderColor='gray.500' borderRadius='lg'>
                        <Flex color='gray.600'>
                            <HStack>
                                <Icon as={BsReceipt} boxSize={8} />
                                <Text pt='1' pl='2' as='b' fontSize='21' >ใบเสร็จ/ใบกำกับภาษี</Text>
                            </HStack>
                            <Spacer />
                            <Box>
                                <Link href="/setting">
                                    <Icon as={BsArrowRightCircle} boxSize={8} />
                                </Link>
                            </Box>
                        </Flex>
                    </Box>

                    <Box p='5' borderWidth='2px' borderColor='gray.500' borderRadius='lg'>
                        <Flex color='gray.600'>
                            <HStack>
                                <Icon as={BsBell} boxSize={8} />
                                <Text pt='1' pl='2' as='b' fontSize='21' >แจ้งเตือน</Text>
                            </HStack>
                            <Spacer />
                            <Box>
                                <Link href="/setting">
                                    <Icon as={BsArrowRightCircle} boxSize={8} />
                                </Link>
                            </Box>
                        </Flex>
                    </Box>



                </VStack>
            </Box>

        </>
    );
}