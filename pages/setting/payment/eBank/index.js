import React from "react";
import Image from 'next/image';
import Link from "next/link";
import {
    Box, Text, HStack, Center, Input, Button,
    Spacer, Avatar, AvatarBadge, Select, IconButton, Flex, Stack,
    InputGroup, InputLeftElement, Wrap, WrapItem,
    FormControl, FormLabel, Lorem, LinkBox, Grid, GridItem,
    Switch, VStack, InputRightElement, Textarea, ButtonGroup,
    RadioGroup, Radio, StackDivider, SkeletonCircle, AbsoluteCenter
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

            <Box
                p={5}
            >
                <Box>
                    <Button

                        leftIcon={<BsArrowLeftCircle />}
                        size='sm'
                        borderRadius="3xl"
                        fontSize='17'
                        color='white'
                        background='#f84c01'
                    >
                        ย้อนกลับ
                    </Button >
                </Box>
                <Box>
                    <Center>
                        <HStack>
                            <Image width={36} height={36} src={'/images/menu/ตั้งค่า.png'} alt={'ตั้งค่า'} />
                            <Text as='b' fontSize='4xl' pt={3}> ตั้งค่า</Text>
                        </HStack>
                    </Center>
                </Box>
            </Box>

            <Box bg={'#f3f4f6'} pl={10} pt={2} pb={2}>
                <HStack>
                    <Icon as={BsCashCoin} boxSize={8} />
                    <Text as='b' fontSize='21'> ชำระเงินแบบโอน</Text>
                </HStack>
            </Box>

            <Box p={10} minHeight={400}>
                <Flex>
                    <Box w='100%' p='5'>
                        <Box p={4} borderWidth='2px' borderColor={'gray.500'} borderRadius='lg'>
                            <HStack>
                                <Spacer />
                                <Box>
                                    <Switch size='sm' justify={'right'} colorScheme={'green'} />
                                </Box>
                            </HStack>
                            <HStack justifyContent={'center'}>
                                <Box>
                                    <SkeletonCircle startColor='red.500' endColor='blue.500' size='20' />
                                </Box>
                                <Box textAlign='center'>
                                    <Text as='b' fontSize='21'>แมลง เต่าทอง</Text>
                                    <Text fontSize='17'>124-5-60789-1</Text>
                                    <Text fontSize='17' >ธนาคารใด ๆ แห่งประเทศไทย</Text>
                                </Box>
                            </HStack>
                        </Box>
                    </Box>

                    <Spacer />

                    <Box w='100%' p='5'>
                        <Box p={4} borderWidth='2px' borderColor={'gray.500'} borderRadius='lg'>
                            <HStack>
                                <Spacer />
                                <Box>
                                    <Switch size='sm' justify={'right'} colorScheme={'green'} />
                                </Box>
                            </HStack>
                            <HStack justifyContent={'center'}>
                                <Box>
                                    <SkeletonCircle startColor='green.500' endColor='green.500' size='20' />
                                </Box>
                                <Box textAlign='center'>
                                    <Text as='b' fontSize='21'>แมลง เต่าทอง</Text>
                                    <Text fontSize='17'>124-5-60789-1</Text>
                                    <Text fontSize='17' >ธนาคารใด ๆ แห่งประเทศไทย</Text>
                                </Box>
                            </HStack>
                        </Box>
                    </Box>

                    <Spacer />

                    <Box w='100%' p='5'>
                        <Box p={4} borderWidth='2px' borderColor={'gray.500'} borderRadius='lg'>
                            <HStack>
                                <Spacer />
                                <Box>
                                    <Switch size='sm' justify={'right'} colorScheme={'green'} />
                                </Box>
                            </HStack>
                            <HStack justifyContent={'center'}>
                                <Box>
                                    <SkeletonCircle startColor='blue.500' endColor='red.500' size='20' />
                                </Box>
                                <Box textAlign='center'>
                                    <Text as='b' fontSize='21'>แมลง เต่าทอง</Text>
                                    <Text fontSize='17'>124-5-60789-1</Text>
                                    <Text fontSize='17'>ธนาคารใด ๆ แห่งประเทศไทย</Text>
                                </Box>
                            </HStack>
                        </Box>
                    </Box>
                </Flex>

                <Center mt={10}>
                    <Link href={'/setting/payment/eBank/add'} style={{ textDecoration: 'none' }}>
                        <Button
                            leftIcon={<AddIcon />}
                            borderRadius="3xl"
                            color='white'
                            fontSize='21'
                            background='#f84c01'
                        >
                            เพิ่มการชำระเงินแบบโอน
                        </Button >
                    </Link>
                </Center>
            </Box>


        </>
    );
}