import React from "react";
import Image from 'next/image';
import Link from 'next/link';
import ButtonBack from '@/components/button/ButtonBack'
import {
    Box, Text, HStack, Center, Button,
    Flex, VStack, Card, CardBody
} from "@chakra-ui/react";
import { Icon } from '@chakra-ui/icons';
import { BsArrowLeftCircle, BsReceipt } from "react-icons/bs";


export default function Invoice() {


    return (
        <>

            <Box
                p={[5, 10]}
            >
                <Box>
                    <ButtonBack />
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
                    <Text as='b' fontSize='lg'>ใบกำกับภาษี</Text>
                </HStack>
            </Box>

            <Box p={10} minHeight={400}>
                <VStack
                    spacing={5}
                    align='stretch'
                >

                    <Card
                        bg='#f3f4f6'
                        borderRadius={10}
                        borderWidth='2px'
                        borderColor="gray.500"
                        color='gray.600'
                    >
                        <Box px='5' py='2'>
                            <Text as='b' fontSize='21'>เลือกรูปแบบการพิมพ์ใบกำกับภาษี</Text>
                        </Box>

                        <CardBody bg='white' borderBottomRadius='10'>
                            <Flex>
                                <Box align='center'>
                                    <Link href='/setting/receipt'>
                                        <Box
                                            my='5'
                                            p='2'
                                            borderRadius='10'
                                            borderWidth='2px'
                                            borderColor="gray.500"
                                        >
                                            <Image width={150} height={300} src={'/images/exampleInvoice.png'} />
                                        </Box>
                                    </Link>
                                    <Box>
                                        <Text as='b' color='gray.600' fontSize='17' >ค่าเริ่มต้น - ใบกำกับภาษี</Text>
                                    </Box>
                                </Box>
                            </Flex>
                        </CardBody>
                    </Card>

                </VStack>
            </Box>

        </>
    );
}