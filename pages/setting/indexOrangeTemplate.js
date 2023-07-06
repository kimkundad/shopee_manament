import React from "react";
import Image from 'next/image';
import {
    Box, Text, HStack, Center, Input, Button,
    Spacer, Avatar, AvatarBadge, Select, IconButton, Flex, Stack,
    InputGroup, InputLeftElement, Wrap, WrapItem,
    FormControl, FormLabel, Lorem, LinkBox, Grid, GridItem,
    Switch, VStack, InputRightElement, Textarea, ButtonGroup,
    RadioGroup, Radio, StackDivider, Link,
    Card, CardBody, Heading, Divider, CardFooter
} from "@chakra-ui/react"
import {
    AddIcon, EditIcon, DeleteIcon, Icon,
    ArrowLeftIcon, ArrowRightIcon, SearchIcon
} from '@chakra-ui/icons';
import { BsArrowLeftCircle, BsArrowRightCircle, BsPerson, BsCameraFill, BsCashCoin } from "react-icons/bs";
import { FaRegSave } from "react-icons/fa";
import { VscSave } from "react-icons/vsc";

export default function Purchase() {


    return (
        <>

            <Box p='10'>
                <Box>
                    <Center>
                        <HStack>
                            <Image width={36} height={36} src={'/images/menu/icon-setting.png'} />
                            <Text as='b' fontSize='4xl' pt={3}> ตั้งค่า</Text>
                        </HStack>
                    </Center>
                </Box>
            </Box>

            <Box p={10} minHeight={400}>
                <VStack
                    align='stretch'
                    w='100%'
                    spacing='10'
                >
                    <Card
                        bg='#fe2e00'
                        borderRadius={10}
                        borderWidth='2px'
                        borderColor="gray.500"
                    >
                        <HStack px='5' py='2'>
                            <Image width={24} height={24} src={'/images/menu/ตั้งค่า ขาว.png'} />
                            <Text fontSize='21' color='white'>ข้อมูลทั่วไป</Text>
                        </HStack>
                        <CardBody bg='white' pl='12' pr='10' py='2'>
                            <Flex>
                                <Box>
                                    <Text as='b' color='gray.600' fontSize='17' >โปรไฟล์ของฉัน</Text>
                                </Box>
                                <Spacer />
                                <Box>
                                    <Link href="/setting/payment/eBank">
                                        <Icon color='gray.600' as={BsArrowRightCircle} boxSize={6} />
                                    </Link>
                                </Box>
                            </Flex>
                        </CardBody>
                    </Card>

                    <Card
                        bg='#fe2e00'
                        borderRadius={10}
                        borderWidth='2px'
                        borderColor="gray.500"
                    >
                        <HStack px='5' py='2'>
                            <Image width={24} height={24} src={'/images/menu/ร้านค้าของฉัน ขาว.png'} />
                            <Text fontSize='21' color='white'>ตั้งค่าร้านค้า</Text>
                        </HStack>
                        <CardBody bg='white' pl='12' pr='10' py='2'>
                            <Flex>
                                <Box>
                                    <Text as='b' color='gray.600' fontSize='17' >แก้ไขข้อมูล</Text>
                                </Box>
                                <Spacer />
                                <Box>
                                    <Link href="/setting/payment/eBank">
                                        <Icon color='gray.600' as={BsArrowRightCircle} boxSize={6} />
                                    </Link>
                                </Box>
                            </Flex>
                        </CardBody>
                        <Divider />
                        <CardBody bg='white' pl='12' pr='10' py='2'>
                            <Flex>
                                <Box>
                                    <Text as='b' color='gray.600' fontSize='17' >รูปแบบร้านค้า</Text>
                                </Box>
                                <Spacer />
                                <Box>
                                    <Link href="/setting/payment/eBank">
                                        <Icon color='gray.600' as={BsArrowRightCircle} boxSize={6} />
                                    </Link>
                                </Box>
                            </Flex>
                        </CardBody>
                        <Divider />
                        <CardBody bg='white' pl='12' pr='10' py='2'>
                            <Flex>
                                <Box>
                                    <Text as='b' color='gray.600' fontSize='17' >ตกแต่งร้านค้า</Text>
                                </Box>
                                <Spacer />
                                <Box>
                                    <Link href="/setting/payment/eBank">
                                        <Icon color='gray.600' as={BsArrowRightCircle} boxSize={6} />
                                    </Link>
                                </Box>
                            </Flex>
                        </CardBody>
                    </Card>

                    <Card
                        bg='#fe2e00'
                        borderRadius={10}
                        borderWidth='2px'
                        borderColor="gray.500"
                    >
                        <HStack px='5' py='2'>
                            <Image width={24} height={24} src={'/images/menu/คำสั่งซื้อ ขาว.png'} />
                            <Text fontSize='21' color='white'>ช่องทางการชำระเงิน</Text>
                        </HStack>
                        <CardBody bg='white' pl='12' pr='10' py='2'>
                            <Flex>
                                <Box>
                                    <Text as='b' color='gray.600' fontSize='17' >ชำระแบบโอน</Text>
                                </Box>
                                <Spacer />
                                <Box>
                                    <Link href="/setting/payment/eBank">
                                        <Icon color='gray.600' as={BsArrowRightCircle} boxSize={6} />
                                    </Link>
                                </Box>
                            </Flex>
                        </CardBody>
                        <Divider />
                        <CardBody bg='white' pl='12' pr='10' py='2'>
                            <Flex>
                                <Box>
                                    <Text as='b' color='gray.600' fontSize='17' >เก็บเงินปลายทาง (COD)</Text>
                                </Box>
                                <Spacer />
                                <Box>
                                    <Link href="/setting/payment/eBank">
                                        <Icon color='gray.600' as={BsArrowRightCircle} boxSize={6} />
                                    </Link>
                                </Box>
                            </Flex>
                        </CardBody>
                    </Card>

                    <Card
                        bg='#fe2e00'
                        borderRadius={10}
                        borderWidth='2px'
                        borderColor="gray.500"
                    >
                        <HStack px='5' py='2'>
                            <Image width={24} height={24} src={'/images/menu/คลังสินค้า ขาว.png'} />
                            <Text fontSize='21' color='white'>ใบเสร็จ/ใบกำกับภาษี</Text>
                        </HStack>
                        <CardBody bg='white' pl='12' pr='10' py='2'>
                            <Flex>
                                <Box>
                                    <Text as='b' color='gray.600' fontSize='17' >ใบเสร็จ</Text>
                                </Box>
                                <Spacer />
                                <Box>
                                    <Link href="/setting/payment/eBank">
                                        <Icon color='gray.600' as={BsArrowRightCircle} boxSize={6} />
                                    </Link>
                                </Box>
                            </Flex>
                        </CardBody>
                        <Divider />
                        <CardBody bg='white' pl='12' pr='10' py='2'>
                            <Flex>
                                <Box>
                                    <Text as='b' color='gray.600' fontSize='17' >ใบกำกับภาษี</Text>
                                </Box>
                                <Spacer />
                                <Box>
                                    <Link href="/setting/payment/eBank">
                                        <Icon color='gray.600' as={BsArrowRightCircle} boxSize={6} />
                                    </Link>
                                </Box>
                            </Flex>
                        </CardBody>
                    </Card>

                    <Card
                        bg='#fe2e00'
                        borderRadius={10}
                        borderWidth='2px'
                        borderColor="gray.500"
                    >
                        <HStack px='5' py='2'>
                            <Image width={24} height={24} src={'/images/menu/รายงาน ขาว.png'} />
                            <Text fontSize='21' color='white'>แจ้งเตือน</Text>
                        </HStack>
                        <CardBody bg='white' pl='12' pr='10' py='2'>
                            <Flex>
                                <Box>
                                    <Text as='b' color='gray.600' fontSize='17' >แจ้งเตือนออเดอร์</Text>
                                </Box>
                                <Spacer />
                                <Box>
                                    <Link href="/setting/payment/eBank">
                                        <Icon color='gray.600' as={BsArrowRightCircle} boxSize={6} />
                                    </Link>
                                </Box>
                            </Flex>
                        </CardBody>
                    </Card>


                </VStack>
            </Box>

        </>
    );
}