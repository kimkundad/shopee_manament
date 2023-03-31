import React from 'react'
import { Wrap, WrapItem, Center, Badge, Text, Icon, Box, HStack } from "@chakra-ui/react"
import { BsAlarm, BsBoxSeam, BsArrowReturnLeft, BsPatchCheckFill, BsTruck, BsFillClipboardCheckFill, BsXOctagonFill } from "react-icons/bs";
import Image from 'next/image';

export default function OrderNavbar() {

    return (
        <>
            <Box pt={10}>
                <Box>
                    <Center>
                        <HStack>
                            <Image width={36} height={36} src={'/images/menu/คำสั่งซื้อ.png'} alt={'รูปคำสั่งซื้อ'} />
                            <Text as='b' fontSize='4xl' color={'#fe4900'} p={3}>คำสั่งซื้อ</Text>
                        </HStack>
                    </Center>
                </Box>


                <Wrap borderColor={'transparent'} position='relative' top='1' justify={'space-between'}>
                    <WrapItem
                        p={3}
                        w='140px'
                        alignItems={'center'}
                        justifyContent={'space-between'}
                        borderColor={'transparent'}
                        borderBottomColor={'red'}
                        borderWidth={4}
                    >
                        <Icon as={BsAlarm} boxSize={5} />
                        <Text as='b' fontSize={17}>ออเดอร์</Text>
                        <Badge
                            boxSize={5}
                            fontSize={15}
                            color={'white'}
                            bg='red.400'
                            textAlign={'center'}
                            borderRadius={'50%'}
                        >
                            10
                        </Badge>
                    </WrapItem>

                    <WrapItem
                        p={3}
                        w='140px'
                        alignItems={'center'}
                        justifyContent={'space-between'}
                    >
                        <Icon as={BsBoxSeam} boxSize={5} />
                        <Text as='b' fontSize={17}>กำลังแพ็ค</Text>
                        <Badge
                            boxSize={5}
                            fontSize={15}
                            color={'white'}
                            bg='blue.400'
                            textAlign={'center'}
                            borderRadius={'50%'}
                        >
                            3
                        </Badge>
                    </WrapItem>

                    <WrapItem
                        p={3}
                        w='140px'
                        alignItems={'center'}
                        justifyContent={'space-between'}
                    >
                        <Icon as={BsTruck} boxSize={5} />
                        <Text as='b' fontSize={17}>พร้อมส่ง</Text>
                        <Badge
                            boxSize={5}
                            fontSize={15}
                            color={'white'}
                            bg='yellow.400'
                            textAlign={'center'}
                            borderRadius={'50%'}
                        >
                            5
                        </Badge>
                    </WrapItem>

                    <WrapItem
                        p={3}
                        w='140px'
                        alignItems={'center'}
                        justifyContent={'space-between'}
                    >
                        <Icon as={BsFillClipboardCheckFill} boxSize={5} />
                        <Text as='b' fontSize={17}>ส่งแล้ว</Text>
                        <Badge
                            boxSize={5}
                            fontSize={15}
                            color={'white'}
                            bg='green.400'
                            textAlign={'center'}
                            borderRadius={'50%'}
                        >
                            7
                        </Badge>
                    </WrapItem>

                    <WrapItem
                        p={3}
                        w='140px'
                        alignItems={'center'}
                        justifyContent={'space-between'}
                    >
                        <Icon as={BsPatchCheckFill} boxSize={5} />
                        <Text as='b' fontSize={17}>ส่งสำเร็จ</Text>
                        <Badge
                            boxSize={5}
                            fontSize={15}
                            color={'white'}
                            bg='purple.400'
                            textAlign={'center'}
                            borderRadius={'50%'}
                        >
                            3
                        </Badge>
                    </WrapItem>

                    <WrapItem
                        p={3}
                        w='140px'
                        alignItems={'center'}
                        justifyContent={'space-between'}
                    >
                        <Icon as={BsArrowReturnLeft} boxSize={5} />
                        <Text as='b' fontSize={17}>ตีกลับ</Text>
                        <Badge
                            boxSize={5}
                            fontSize={15}
                            color={'white'}
                            bg='orange.400'
                            textAlign={'center'}
                            borderRadius={'50%'}
                        >
                            2
                        </Badge>
                    </WrapItem>

                    <WrapItem
                        p={3}
                        w='140px'
                        alignItems={'center'}
                        justifyContent={'space-between'}
                    >
                        <Icon as={BsXOctagonFill} boxSize={5} />
                        <Text as='b' fontSize={17}>ยกเลิก</Text>
                        <Badge
                            boxSize={5}
                            fontSize={15}
                            color={'white'}
                            bg='pink.400'
                            textAlign={'center'}
                            borderRadius={'50%'}
                        >
                            4
                        </Badge>
                    </WrapItem>
                </Wrap>
                <Box bg='gray.200' h='1'></Box>
            </Box>

        </>
    )
}