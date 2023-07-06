import React from "react";
import Image from "next/image";
import Link from 'next/link'
import ButtonBack from '@/components/button/ButtonBack'
import {
    Box,
    Text,
    HStack,
    Center,
    Button,
    Flex,
    VStack,
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
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Grid,
    GridItem,
    Skeleton,
    Textarea
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { BsPlusLg, BsStar, BsShop, BsFillPencilFill, BsEye } from "react-icons/bs";
import { VscSave } from "react-icons/vsc";
import ListCheck from "@/components/menuList";
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

    const modalViewStore = useDisclosure();
    const modalEditStore = useDisclosure();
    return (
        <>
            {/* Start Card */}
            <Card minWidth={'50px'}>
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
                    <Button leftIcon={<BsShop />} size='sm' colorScheme='red' fontWeight='none' onClick={modalViewStore.onOpen}>
                        รูปแบบร้านค้า
                    </Button>
                    <Button leftIcon={<BsFillPencilFill />} size='sm' ml='4' colorScheme='gray' variant='outline' fontWeight='none' onClick={modalEditStore.onOpen}>
                        แก้ไขข้อมูล
                    </Button>

                </CardFooter>
            </Card>
            {/* End Card */}

            {/* Start Modal button รูปแบบร้านค้า */}
            <Modal size='4xl' isOpen={modalViewStore.isOpen} onClose={modalViewStore.onClose}>
                <ModalOverlay />
                <ModalContent py='10'>
                    <HStack justifyContent={'center'} alignItems="center">
                        <Image width={36} height={36} src={"/images/menu/ร้านค้าของฉัน.png"} />
                        <Text as="b" fontSize="4xl">
                            รูปแบบร้านค้า
                        </Text>
                    </HStack>
                    <ModalCloseButton />
                    <ModalBody py='10'>
                        <SimpleGrid minChildWidth={'250px'} columns={2} spacing={5}>
                            <Skeleton>
                                <Box bg='tomato' height='80px'></Box>
                            </Skeleton>


                            <Box>
                                <SimpleGrid columns={2} textAlign={'right'}>
                                    <Box p='2'>
                                        <Grid templateColumns='repeat(4, 1fr)' gap='4' alignItems="center">
                                            <GridItem colSpan={2} as='b' fontSize='17'>รูปแบบร้านค้า:</GridItem>
                                            <GridItem colSpan={2}>
                                                <Select>
                                                    <option value='option1'>Option 1</option>
                                                    <option value='option2'>Option 2</option>
                                                    <option value='option3'>Option 3</option>
                                                </Select>
                                            </GridItem>
                                        </Grid>
                                    </Box>
                                </SimpleGrid>



                                <SimpleGrid columns={2} textAlign={'right'}>
                                    <Box p='2'>
                                        <Grid templateColumns='repeat(4, 1fr)' gap='4' alignItems="center">
                                            <GridItem colSpan={2} as='b' fontSize='17'>สีหน้าร้าน:</GridItem>
                                            <GridItem colSpan={2}>
                                                <Select placeholder='Select option'>
                                                    <option value='option1'>Option 1</option>
                                                    <option value='option2'>Option 2</option>
                                                    <option value='option3'>Option 3</option>
                                                </Select>
                                            </GridItem>
                                        </Grid>
                                    </Box>
                                    <Box p='2'>
                                        <Grid templateColumns='repeat(4, 1fr)' gap='4' alignItems="center">
                                            <GridItem colSpan={2} as='b' fontSize='17'>สีข้อความหลัก:</GridItem>
                                            <GridItem colSpan={2}>
                                                <Select placeholder='Select option'>
                                                    <option value='option1'>Option 1</option>
                                                    <option value='option2'>Option 2</option>
                                                    <option value='option3'>Option 3</option>
                                                </Select>
                                            </GridItem>
                                        </Grid>
                                    </Box>
                                    <Box p='2'>
                                        <Grid templateColumns='repeat(4, 1fr)' gap='4' alignItems="center">
                                            <GridItem colSpan={2} as='b' fontSize='17'>สีพื้นหลัง</GridItem>
                                            <GridItem colSpan={2}>
                                                <Select placeholder='Select option'>
                                                    <option value='option1'>Option 1</option>
                                                    <option value='option2'>Option 2</option>
                                                    <option value='option3'>Option 3</option>
                                                </Select>
                                            </GridItem>
                                        </Grid>
                                    </Box>
                                    <Box p='2'>
                                        <Grid templateColumns='repeat(4, 1fr)' gap='4' alignItems="center">
                                            <GridItem colSpan={2} as='b' fontSize='17'>สีข้อความรอง</GridItem>
                                            <GridItem colSpan={2}>
                                                <Select placeholder='Select option'>
                                                    <option value='option1'>Option 1</option>
                                                    <option value='option2'>Option 2</option>
                                                    <option value='option3'>Option 3</option>
                                                </Select>
                                            </GridItem>
                                        </Grid>
                                    </Box>
                                </SimpleGrid>


                                <SimpleGrid>
                                    <Box p='2'>
                                        <Grid templateColumns='repeat(8, 1fr)' gap='4' alignItems="center">
                                            <GridItem as='b' fontSize='17' colSpan={2} textAlign={'right'}>เมนูร้านค้า:</GridItem>
                                            <GridItem colSpan={3}>
                                                <Button
                                                    leftIcon={<BsPlusLg />}
                                                    justifyContent={'left'}
                                                    color='black.500'
                                                    borderColor='gray.500'
                                                    variant='outline'
                                                    fontSize='17'
                                                    fontWeight='none'
                                                    w='100%'
                                                >
                                                    สินค้าแนะนำ
                                                </Button>
                                            </GridItem>
                                            <GridItem colSpan={3}>
                                                <Button
                                                    leftIcon={<BsPlusLg />}
                                                    justifyContent={'left'}
                                                    color='black.500'
                                                    borderColor='gray.500'
                                                    variant='outline'
                                                    fontSize='17'
                                                    fontWeight='none'
                                                    w='100%'
                                                >
                                                    หมวดหมู่
                                                </Button>
                                            </GridItem>
                                        </Grid>
                                    </Box>
                                    <Box p='2'>
                                        <Grid templateColumns='repeat(8, 1fr)' gap='4' alignItems="center">
                                            <GridItem colSpan={2}></GridItem>
                                            <GridItem colSpan={3}>
                                                <Button
                                                    leftIcon={<BsPlusLg />}
                                                    justifyContent={'left'}
                                                    color='black.500'
                                                    borderColor='gray.500'
                                                    variant='outline'
                                                    fontSize='17'
                                                    fontWeight='none'
                                                    w='100%'
                                                >
                                                    ป้ายโฆษณา
                                                </Button>
                                            </GridItem>
                                            <GridItem colSpan={3}>
                                                <Button
                                                    leftIcon={<BsPlusLg />}
                                                    justifyContent={'left'}
                                                    color='black.500'
                                                    borderColor='gray.500'
                                                    variant='outline'
                                                    fontSize='17'
                                                    fontWeight='none'
                                                    w='100%'
                                                >
                                                    โปรโมชั่นแนะนำ
                                                </Button>
                                            </GridItem>
                                        </Grid>
                                    </Box>
                                    <Box p='2'>
                                        <Grid templateColumns='repeat(8, 1fr)' gap='4' alignItems="center">
                                            <GridItem colSpan={2}></GridItem>
                                            <GridItem colSpan={3}>
                                                <Button
                                                    leftIcon={<BsPlusLg />}
                                                    justifyContent={'left'}
                                                    color='black.500'
                                                    borderColor='gray.500'
                                                    variant='outline'
                                                    fontSize='17'
                                                    fontWeight='none'
                                                    w='100%'
                                                >
                                                    สินค้าลดราคา
                                                </Button>
                                            </GridItem>
                                            <GridItem colSpan={3}>
                                                <Button
                                                    leftIcon={<BsPlusLg />}
                                                    justifyContent={'left'}
                                                    color='black.500'
                                                    borderColor='gray.500'
                                                    variant='outline'
                                                    fontSize='17'
                                                    fontWeight='none'
                                                    w='100%'
                                                >
                                                    สินค้าแนะนำ
                                                </Button>
                                            </GridItem>
                                        </Grid>
                                    </Box>
                                </SimpleGrid>
                            </Box>


                        </SimpleGrid>
                    </ModalBody>

                    <ModalFooter justifyContent={'center'}>
                        <Button
                            leftIcon={<BsEye />}
                            color='#fe4900'
                            borderColor='#fe4900'
                            borderWidth={2}
                            variant='outline'
                            mr={3}
                        >
                            ดูตัวอย่าง
                        </Button>
                        <Button
                            color='gray.500'
                            borderColor='gray.500'
                            borderWidth={2}
                            variant='outline'
                            mr={3}
                            onClick={modalViewStore.onClose}
                        >
                            ยกเลิก
                        </Button>
                        <Button
                            leftIcon={<VscSave />}
                            bg="#fe4900"
                            color='white'
                            variant='solid'
                            mr={3}
                        >
                            บันทึก
                        </Button>
                    </ModalFooter>


                </ModalContent>
            </Modal>
            {/* End button รูปแบบร้านค้า Modal */}

            {/* Start Modal button แก้ไขข้อมูล */}
            <Modal size='xl' isOpen={modalEditStore.isOpen} onClose={modalEditStore.onClose}>
                <ModalOverlay />
                <ModalContent py='10'>
                    <HStack justifyContent={'center'} alignItems="center">
                        <Image width={36} height={36} src={"/images/menu/ร้านค้าของฉัน.png"} />
                        <Text as="b" fontSize="4xl">
                            แก้ไขข้อมูล
                        </Text>
                    </HStack>
                    <ModalCloseButton />

                    <ModalBody py='10'>
                        <SimpleGrid columns={1} spacing={5} textAlign={'right'}>
                            <Grid templateColumns='repeat(6, 1fr)' gap={4} alignItems="center">
                                <GridItem colSpan={2} as='b' fontSize='17'><Text as='span' color='#fe4900'>* </Text>ชื่อร้านค้า:</GridItem>
                                <GridItem colSpan={3}>
                                    <Input placeholder='ชื่อของร้านค้าของคุณ' />
                                </GridItem>
                            </Grid>

                            <Grid templateColumns='repeat(6, 1fr)' gap={4} alignItems="center">
                                <GridItem colSpan={2} as='b' fontSize='17'><Text as='span' color='#fe4900'>* </Text>รายละเอียด:</GridItem>
                                <GridItem colSpan={3}>
                                    <Textarea
                                        placeholder='รายละเอียดเกี่ยวกับร้านค้าของคุณ'
                                    />
                                </GridItem>
                            </Grid>

                            <Grid templateColumns='repeat(6, 1fr)' gap={4} alignItems="center">
                                <GridItem colSpan={2} as='b' fontSize='17'>รูปโปรไฟล์ร้านค้า:</GridItem>
                                <GridItem colSpan={1}>
                                    <Select>
                                        <option value='option1'>Option 1</option>
                                        <option value='option2'>Option 2</option>
                                        <option value='option3'>Option 3</option>
                                    </Select>
                                </GridItem>
                                <GridItem colSpan={2} align="left">
                                    <Text as='span' color='#fe4900'>* ต้องมีขนาดไม่เกิน 500 MB</Text>
                                </GridItem>
                            </Grid>

                            <Grid templateColumns='repeat(6, 1fr)' gap={4} alignItems="center">
                                <GridItem colSpan={2} as='b' fontSize='17'>รูปโปรไฟล์ร้านค้า:</GridItem>
                                <GridItem colSpan={1}>
                                    <Select>
                                        <option value='option1'>Option 1</option>
                                        <option value='option2'>Option 2</option>
                                        <option value='option3'>Option 3</option>
                                    </Select>
                                </GridItem>
                                <GridItem colSpan={2} align="left">
                                    <Text as='span' color='#fe4900'>* ต้องมีขนาดไม่เกิน 500 MB</Text>
                                </GridItem>
                            </Grid>

                            <Grid templateColumns='repeat(6, 1fr)' gap={4} alignItems="center">
                                <GridItem colSpan={2} as='b' fontSize='17'>รูปแบบร้านค้า:</GridItem>
                                <GridItem colSpan={1}>
                                    <Select>
                                        <option value='option1'>Option 1</option>
                                        <option value='option2'>Option 2</option>
                                        <option value='option3'>Option 3</option>
                                    </Select>
                                </GridItem>
                            </Grid>
                        </SimpleGrid>
                    </ModalBody>

                    <ModalFooter justifyContent={'center'}>
                        <Button
                            leftIcon={<BsEye />}
                            color='#fe4900'
                            borderColor='#fe4900'
                            borderWidth={2}
                            variant='outline'
                            mr={3}
                        >
                            ดูตัวอย่าง
                        </Button>
                        <Button
                            color='gray.500'
                            borderColor='gray.500'
                            borderWidth={2}
                            variant='outline'
                            mr={3}
                            onClick={modalEditStore.onClose}
                        >
                            ยกเลิก
                        </Button>
                        <Button
                            leftIcon={<VscSave />}
                            bg="#fe4900"
                            color='white'
                            variant='solid'
                            mr={3}
                        >
                            บันทึก
                        </Button>
                    </ModalFooter>


                </ModalContent>
            </Modal>
            {/* End Modal button แก้ไขข้อมูล */}

        </>

    );
}


export default function StoreFront() {


    return (
        <>

            <Box px='10' py='5'>
                <Box>
                    <ButtonBack />
                </Box>
                <Box>
                    <Center>
                        <HStack>
                            <Image width={36} height={36} src={"/images/menu/icon-setting.png"} />
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
