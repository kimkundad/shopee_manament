import React from "react";
import Image from 'next/image';
import {
    Box, Text, HStack, Center, Flex,
    VStack, Button, Spacer, Link
} from "@chakra-ui/react"
import { Icon } from '@chakra-ui/icons';
import { BsArrowLeftCircle, BsArrowRightCircle, BsReceipt } from "react-icons/bs"

export default function Receipt() {


    return (
        <>

            <Box
                p={[5, 10]}
            >
                <Box>
                    <Button
                        onClick={''}
                        leftIcon={<BsArrowLeftCircle />}
                        size='sm'
                        borderRadius="3xl"
                        color='white'
                        background='#f84c01'
                    >
                        ย้อนกลับ
                    </Button >
                </Box>
                <Box>
                    <Center>
                        <HStack>
                            <Image width={36} height={36} src={'/images/menu/ตั้งค่า.png'} />
                            <Text as='b' fontSize='4xl' pt={3}> ตั้งค่า</Text>
                        </HStack>
                    </Center>
                </Box>
            </Box>

            <Box bg={'#f3f4f6'} pl={10} pt={2} pb={2}>
                <HStack>
                    <Icon as={BsReceipt} boxSize={8} />
                    <Text as='b' fontSize='lg'> ใบเสร็จ/ใบกำกับภาษี</Text>
                </HStack>
            </Box>

            <Box p={10} minHeight={400}>
                <VStack
                    spacing={5}
                    align='stretch'
                >
                    <Box p={5} color='gray.600' fontSize='17' borderWidth='2px' borderColor={'gray.500'} borderRadius='lg'>
                        <Flex align={'center'}>
                            <Box>
                                <Text as='b' fontSize='21' >ใบเสร็จ</Text>
                                <br /><Text>ตั้งค่าสำหรับพิมพ์เอกสารใบเสร็จ</Text>
                            </Box>
                            <Spacer />
                            <Box>
                                <Link href="/setting/receipt/bill">
                                    <Icon as={BsArrowRightCircle} boxSize={8} />
                                </Link>
                            </Box>
                        </Flex>
                    </Box>

                    <Box p={5} color='gray.600' fontSize='17' borderWidth='2px' borderColor={'gray.500'} borderRadius='lg'>
                        <Flex align={'center'}>
                            <Box>
                                <Text as='b' fontSize='21' >ใบกำกับภาษี</Text>
                                <br /><Text>ตั้งค่าสำหรับพิมพ์เอกสารใบกำกับภาษี</Text>
                            </Box>
                            <Spacer />
                            <Box>
                                <Link href="/setting/receipt/invoice">
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