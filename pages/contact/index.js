import React from "react";
import Image from 'next/image';
import Link from 'next/link'
import {
    Box, Text, HStack, Center,
    GridItem, Grid, Spacer, Flex, Container, Wrap, VStack,
} from "@chakra-ui/react"
import { Icon } from '@chakra-ui/icons'
import {
    BsFillTelephoneFill, BsMailbox2, BsGeoAltFill,
    BsClockFill, BsShop, BsCashCoin, BsBell
} from "react-icons/bs"

export default function Contact() {


    return (
        <>

            <Box p='10'>
                <Box>
                    <Center>
                        <HStack>
                            <Text as='b' fontSize='4xl' pt={3} color='#f84c01'> ติดต่อเรา</Text>
                        </HStack>
                    </Center>
                </Box>
            </Box>

            <Box pb='10' minHeight={400}>
                <Flex justifyContent={'center'}>
                    <HStack align='top'>

                        <Container p='4'>
                            <Flex>
                                <Box p='4'>
                                    {/* <Icon as={BsGeoAltFill} boxSize={8} /> */}
                                    <Image width={70} height={70} src={'/images/placeholder.png'} />
                                </Box>
                                <Box p='3'>
                                    <Text fontSize='17'>
                                        225/9 ซอยทองหล่อ 10 ถนน สุขุมวิท แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพมหานคร 10110
                                    </Text>
                                </Box>
                            </Flex>
                            <Flex>
                                <Box p='4'>
                                    {/* <Icon as={BsFillTelephoneFill} boxSize={8} /> */}
                                    <Image width={30} height={30} src={'/images/telephone.png'} />
                                </Box>
                                <Box p='3' fontSize='17'>
                                    <Text>087-1352410 (คุณต๊อบ)</Text>
                                </Box>
                            </Flex>
                            <Flex>
                                <Box p='4'>
                                    {/* <Icon as={BsMailbox2} boxSize={8} /> */}
                                    <Image width={30} height={30} src={'/images/gmail.png'} />
                                </Box>
                                <Box p='3' fontSize='17'>
                                    <Text>Contact@gmail.com</Text>
                                </Box>
                            </Flex>
                            <Flex>
                                <Box p='4'>
                                    {/* <Icon as={BsClockFill} boxSize={8} /> */}
                                    <Image width={30} height={30} src={'/images/clock.png'} />
                                </Box>
                                <Box p='3' fontSize='17'>
                                    <Text>เวลาทำการ 09.00 - 18.00 น. <br />ทุกวันจันทร์ - เสาร์</Text>
                                </Box>
                            </Flex>
                        </Container>

                        <Spacer />

                        <Container p='4'>
                            <Flex justifyContent={'center'}>
                                <Image width={300} height={300} src={'/images/demo-qr.png'} alt='QR Code' />
                            </Flex>
                            <Flex justifyContent={'center'} align={'center'}>
                                <Image width={32} height={32} src={'/images/social/line.png'} alt='Logo Line' />
                                <Text as='b' ml='2' fontSize='30'>@sellpang</Text>
                            </Flex>
                        </Container>

                    </HStack>
                </Flex>


            </Box >


            <Grid templateColumns='repeat(5, 1fr)' gap={6} p='5' bg='#fff0f0' borderBottomRadius={10}>
                <GridItem>
                    <VStack p='4'>
                        <Box>
                            <Text fontSize='6xl'>
                                <Image width={150} height={150} src={'/images/logo sellpang.png'} alt='logo sellpang' />
                            </Text>
                        </Box>
                    </VStack>
                </GridItem>
                <GridItem>
                    <VStack p='4'>
                        <Box>
                            <Text as='b' fontSize='22'>เกี่ยวกับเรา</Text>
                            <Text fontSize='20'><Link href='/'>รู้จักกับ Testpang</Link></Text>
                            <Text fontSize='20'><Link href='/'>เริ่มต้นกับ Testpang</Link></Text>
                        </Box>
                    </VStack>
                </GridItem>
                <GridItem>
                    <VStack p='4'>
                        <Box>
                            <Text as='b' fontSize='22'>ซัพพอร์ต</Text>
                            <Text fontSize='20'><Link href='/'>บทความ</Link></Text>
                            <Text fontSize='20'><Link href='/'>คำถามที่พบบ่อย</Link></Text>
                        </Box>
                    </VStack>
                </GridItem>
                <GridItem>
                    <VStack p='4'>
                        <Box>
                            <Text as='b' fontSize='22'>บริษัท</Text>
                            <Text fontSize='20'><Link href='/'>เงื่อนไขการใช้งาน</Link></Text>
                            <Text fontSize='20'><Link href='/'>นโยบายความเป็นส่วนตัว</Link></Text>
                        </Box>
                    </VStack>
                </GridItem>
                <GridItem>
                    <VStack>
                        <Box>
                            <Image width={200} height={200} src={'/images/apple-google.png'} alt='App Store and Google Play' />
                        </Box>
                    </VStack>
                </GridItem>
            </Grid>




        </>
    );
}