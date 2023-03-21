import React from "react";
import Image from 'next/image';
import Link from 'next/link'
import ButtonBack from '@/components/button/ButtonBack'
import {
    Box, Text, HStack, Center, Input, Button,
    Spacer, Avatar, AvatarBadge, Select, IconButton, Flex, Stack,
    InputGroup, InputLeftElement, Wrap, WrapItem,
    FormControl, FormLabel, Lorem, LinkBox, Grid, GridItem,
    Switch, VStack, InputRightElement, Textarea, ButtonGroup,
    RadioGroup, Radio, StackDivider, SkeletonCircle,
    AbsoluteCenter, Container,
} from "@chakra-ui/react"
import {
    AddIcon, EditIcon, DeleteIcon, Icon,
    ArrowLeftIcon, ArrowRightIcon, SearchIcon
} from '@chakra-ui/icons';
import { BsArrowLeftCircle, BsArrowRightCircle, BsPerson, BsCameraFill, BsCashCoin } from "react-icons/bs";
import { FaRegSave } from "react-icons/fa";
import { VscSave } from "react-icons/vsc";

export default function EbankAdd() {


    return (
        <>

            <Box
                p={5}
            >
                <Box>
                    <ButtonBack />
                </Box>
                <Box>
                    <Center>
                        <HStack>
                            <Image width={36} height={36} src={'/images/menu/ตั้งค่า.png'} alt='ตั้งค่า' />
                            <Text as='b' fontSize='4xl' pt={3}> ตั้งค่า</Text>
                        </HStack>
                    </Center>
                </Box>
            </Box>

            <Box bg={'#f3f4f6'} pl={10} pt={2} pb={2}>
                <HStack>
                    <Icon as={BsCashCoin} boxSize={8} />
                    <Text as='b' fontSize='21'> เพิ่มการชำระเงิน</Text>
                </HStack>
            </Box>

            <Box p={10} minHeight={400}>

                <VStack>
                    <Container maxW='lg'>
                        <HStack>
                            <Box>
                                <Button
                                    borderRadius="3xl"
                                    borderWidth='2px'
                                    borderColor='#f84c01'
                                    fontSize='17'
                                    color='#f84c01'
                                    bg='none'
                                    w='40'
                                    _hover={{
                                        bg: "#f84c01",
                                        color: 'white',
                                    }}
                                >
                                    บัญชีธนาคาร
                                </Button>
                            </Box>
                            <Spacer />
                            <Box>
                                <Button
                                    borderRadius="3xl"
                                    borderWidth='2px'
                                    borderColor='gray.400'
                                    fontSize='17'
                                    color='gray.400'
                                    bg='none'
                                    w='40'
                                >
                                    QR PromptPay
                                </Button>
                            </Box>
                        </HStack>
                    </Container>

                    <Container maxW='md'>
                        <FormControl mt='10'>
                            <HStack>
                                <Box w='20%'>
                                    <FormLabel mb='0' fontSize='17' textAlign='right'>ธนาคาร : </FormLabel>
                                </Box>
                                <Box w='75%'>
                                    <Select fontSize='17'>
                                        <option value='option1'>ไทยพาณิชน์</option>
                                        <option value='option2'>กสิกรไทย</option>
                                        <option value='option3'>กรุงศรีอยุธยา</option>
                                    </Select>
                                </Box>
                            </HStack>
                            <HStack mt='4'>
                                <Box w='20%'>
                                    <FormLabel mb='0' fontSize='17' textAlign='right'>ชื่อบัญชี : </FormLabel>
                                </Box>
                                <Box w='75%'>
                                    <Input w='100%' fontSize='17' placeholder='ระบุชื่อบัญชี' />
                                </Box>
                            </HStack>
                            <HStack mt='4'>
                                <Box w='20%'>
                                    <FormLabel mb='0' fontSize='17' textAlign='right'>เลขบัญชี : </FormLabel>
                                </Box>
                                <Box w='75%'>
                                    <Input w='100%' fontSize='17' placeholder='ระบุเลขที่บัญชี' />
                                </Box>
                            </HStack>
                            <HStack mt='4'>
                                <Box w='20%'>
                                    <FormLabel mb='0' fontSize='17' textAlign='right'>สาขา : </FormLabel>
                                </Box>
                                <Box w='75%'>
                                    <Input w='100%' fontSize='17' placeholder='ระบุสาขา' />
                                </Box>
                            </HStack>
                            <HStack mt='4'>
                                <Box w='20%'>
                                    <FormLabel mb='0' fontSize='17' textAlign='right'>ประเภทบัญชี : </FormLabel>
                                </Box>
                                <Box w='75%'>
                                    <Input w='100%' fontSize='17' placeholder='ประเภทบัญชี' />
                                </Box>
                            </HStack>
                        </FormControl>

                    </Container>
                </VStack>




                <HStack justify='center' mt='10'>
                    <ButtonGroup gap='4'>
                        <Button colorScheme='gray'>ยกเลิก</Button>
                        <Button leftIcon={<VscSave />} background='#f84c01' color='white'>บันทึก</Button >
                    </ButtonGroup>
                </HStack>
            </Box>


        </>
    );
}