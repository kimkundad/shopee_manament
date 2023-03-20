import React from "react";
import Image from "next/image";
import {
    Box,
    Text,
    HStack,
    Center,
    Button,
    Flex,
    VStack,
    Link,
    Card,
    CardBody,
    Spacer,
    InputGroup,
    Input,
    InputLeftElement,
    Select,
    SimpleGrid,
    CardHeader,
    Heading,
    CardFooter,
    Switch,
    Stack,
    Avatar,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { BsArrowLeftCircle, BsStar, BsShop, BsFillPencilFill } from "react-icons/bs";

import ListCheck from "@/components/MenuList";
const colunm = [
    { label: "วันที่" },
    { label: "ชื่อร้านค้า" },
    { label: "ชื่อสินค้า" },
    { label: "รหัสสินค้า", },
    { label: "ลิงค์ร้านค้า", },
    { label: "เลขคำสั่งชื้อ", },
    { label: "ชื่อลูกค้า", },
    { label: "ที่อยู่", },
    { label: "เบอร์โทรศัพท์", },
    { label: "จำนวนสั่งซื้อ", },
    { label: "ยอดขาย", },
];



function AddCard() {
    return (
        <Card>
            <CardBody align='center'>
                <Flex pb='4'>
                    <Switch size='sm' colorScheme='green' />
                    <Text pl='2' as='span'>เปิด/ปิด เพื่อแสดง</Text>
                    <Spacer />
                    <Icon as={BsStar} boxSize={5} color='gray' />
                </Flex>

                <Image
                    width='350'
                    height='350'
                    src={'/images/my_shop.jpeg'}
                    alt='My Shop Image'
                    borderRadius='20px'
                />
                <Box pos="absolute" left='0' right='0' top='100px'>
                    <Avatar size='2xl' borderColor='white' borderWidth='5px' name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                </Box>

                <Box mt='4'>
                    <Text as='b' fontSize='2xl'>รองเท้าน้องหลาม ส่งไว</Text>
                    <SimpleGrid columns={3}>
                        <Text fontSize='12'>จำนวนผู้เข้าชม: 5,650</Text>
                        <Text fontSize='12'>วันที่สร้าง: 07/05/2566</Text>
                        <Text fontSize='12'>แก้ไขล่าสุด: 07/05/2566</Text>
                    </SimpleGrid>
                </Box>
            </CardBody>

            <CardFooter justifyContent={'center'}>
                <Button leftIcon={<BsShop />} size='sm' colorScheme='red' fontWeight='none'>
                    รูปแบบร้านค้า
                </Button>
                <Button leftIcon={<BsFillPencilFill />} size='sm' ml='4' colorScheme='gray' variant='outline' fontWeight='none'>
                    แก้ไขข้อมูล
                </Button>
            </CardFooter>
        </Card>

    );
}



export default function StoreFront() {
    return (
        <>
            <Box px='10' py='5'>
                <Box>
                    <Button
                        onClick={""}
                        leftIcon={<BsArrowLeftCircle />}
                        size="sm"
                        borderRadius="3xl"
                        color="white"
                        background="#f84c01"
                    >
                        ย้อนกลับ
                    </Button>
                </Box>
                <Box>
                    <Center>
                        <HStack>
                            <Image width={36} height={36} src={"/images/menu/ตั้งค่า.png"} />
                            <Text as="b" fontSize="4xl" pt={3}>
                                ตั้งค่า
                            </Text>
                        </HStack>
                    </Center>
                </Box>
            </Box>

            <Box bg={"#f3f4f6"} px={10} py={2}>
                <HStack>
                    <Flex align={"center"}>
                        <Icon as={BsShop} boxSize={8} />
                        <Text as="b" fontSize="21" pt="2" pl="2">
                            ตั้งค่าหน้าร้าน
                        </Text>
                    </Flex>
                    <Spacer />
                    <Flex>
                        <InputGroup w='250' ml="2">
                            <InputLeftElement
                                pointerEvents="none"
                                children={
                                    <Image width={24} height={24} src={"/images/search.png"} />
                                }
                            />
                            <Input
                                type="text"
                                placeholder="ค้นหารายการ"
                                borderRadius={20}
                                borderColor={"gray"}
                                borderWidth={2}
                                fontSize="21"
                            />
                        </InputGroup>
                        <InputGroup w='250' ml="2">
                            <InputLeftElement
                                pointerEvents="none"
                                children={
                                    <Image width={24} height={24} src={"/images/calendar.png"} />
                                }
                            />
                            <Input
                                type="date"
                                px={2}
                                py={5}
                                borderRadius={20}
                                borderColor={"gray"}
                                borderWidth={2}
                                fontSize={21}
                            />
                        </InputGroup>
                        <Box ml="2" border="2px" borderColor="gray" borderRadius="md">
                            <ListCheck data={colunm} />
                        </Box>
                    </Flex>
                </HStack>
            </Box>



            <Box p={10} minHeight={400}>
                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>

                    <AddCard />
                    <AddCard />
                    <AddCard />
                    <AddCard />
                    <AddCard />


                </SimpleGrid>
            </Box>
        </>
    );
}
