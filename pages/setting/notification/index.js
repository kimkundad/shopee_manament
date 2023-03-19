import React from "react";
import Image from 'next/image';
import {
    Box, Text, HStack, Center, Button,
    Spacer, Flex, Switch, VStack
} from "@chakra-ui/react"
import { Icon } from '@chakra-ui/icons';
import { BsArrowLeftCircle, BsBell } from "react-icons/bs";


export default function Notification() {


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
                    <Icon as={BsBell} boxSize={8} />
                    <Text as='b' fontSize='lg'>แจ้งเตือนออเดอร์</Text>
                </HStack>
            </Box>

            <Box p={10} minHeight={400}>
                <VStack
                    spacing={5}
                    align='stretch'
                >
                    <Box p={5} fontSize='17' color='gray.600' borderWidth='2px' borderColor={'gray.500'} borderRadius='lg'>
                        <Flex align={'center'}>
                            <Box>
                                <Text as='b' fontSize='21'>เปิดการแจ้งเตือนออเดอร์</Text>
                                <br />
                                <Text>ส่งการแจ้งเตือนทุกครั้งเมื่อมีออเดอร์เข้ามา</Text>
                            </Box>
                            <Spacer />
                            <Box>
                                <Switch size='lg' colorScheme='green' />
                            </Box>
                        </Flex>
                    </Box>
                </VStack>
            </Box>

        </>
    );
}