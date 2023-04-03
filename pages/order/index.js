import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import OrderNavbar from '@/components/layout/OrderNavbar';
import ListCheck from "@/components/MenuList";
import {
    Flex,
    Text,
    Input,
    InputGroup,
    InputLeftElement,
    Box,
    Spacer,
    Button,
    Wrap,
    HStack,
    WrapItem,
    Select,
    Avatar,
    IconButton,
    Checkbox,
    Skeleton,
    Center
} from "@chakra-ui/react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react";

import {
    AddIcon, EditIcon, DeleteIcon, Icon,
    ArrowLeftIcon, ArrowRightIcon, SearchIcon
} from '@chakra-ui/icons';
import { BsClockHistory, BsBoxFill, BsXCircleFill } from "react-icons/bs";
import { FaRegSave } from "react-icons/fa";
import { VscSave } from "react-icons/vsc";

function InsertDataTable() {
    return (
        <Tr>
            <Td px={5} py={2} borderLeftRadius={"10"} textAlign={'center'}>
                <Checkbox
                    size='md'
                    colorScheme='green'
                    defaultChecked
                >
                </Checkbox>
            </Td>
            <Td p={2} textAlign={'center'}>2816464467</Td>
            <Td p={2}>
                <Center>
                    <Skeleton boxSize='10'></Skeleton>
                </Center>
            </Td>
            <Td p={2} textAlign={'center'}>ยาหม่องน้ำ</Td>
            <Td p={2} textAlign={'center'}>London</Td>
            <Td p={2} textAlign={'center'}>085-9985474</Td>
            <Td p={2} textAlign={'center'}>985</Td>
            <Td p={2} textAlign={'center'}>200</Td>
            <Td p={2}>
                <Center>
                    <Image src="/images/banks/bay.png" width={30} height={30} />
                </Center>
            </Td>
            <Td p={2} textAlign={'center'}>
                <Text>16/09/65</Text>
                <Text as='sub'>12:04:15</Text>
            </Td>
            <Td p={2} textAlign={'center'}>AdminMod</Td>
            <Td p={2} borderRightRadius={"10"} textAlign={'center'}>
                <HStack>
                    <IconButton
                        icon={<BsClockHistory />}
                        size='xs'
                        color={'#f84c01'}
                        borderColor={'#f84c01'}
                        aria-label="Edit"
                        variant='outline'
                    />
                    <IconButton
                        icon={<BsBoxFill />}
                        size='xs'
                        color={'#f84c01'}
                        borderColor={'#f84c01'}
                        aria-label="Edit"
                        variant='outline'
                    />
                    <IconButton
                        icon={<BsXCircleFill />}
                        size='xs'
                        color={'#f84c01'}
                        borderColor={'#f84c01'}
                        aria-label="Edit"
                        variant='outline'
                    />
                </HStack>
            </Td>
        </Tr>
    );
}

export default function OrderIndex() {

    const colunm = [
        { label: "ตัวเลือก", },
        { label: "เลขคำสั่งซื้อ", },
        { label: "รูปสินค้า", },
        { label: "ชื่อสินค้า", },
        { label: "ที่อยู่", },
        { label: "เบอร์โทร", },
        { label: "จำนวน", },
        { label: "ยอดสั่งซื้อ", },
        { label: "การชำระเงิน", },
        { label: "วันที่สั่งซื้อ", },
        { label: "ผู้ทำรายการ", },
        { label: "ดำเนินการ", },
    ];

    return (
        <>
            <OrderNavbar />
            <Box p={5}>

                {/* Start Navbar */}
                <Flex>
                    <Box>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <Image src="/images/search.png" width={20} height={20} />
                            </InputLeftElement>
                            <Input
                                borderRadius="3xl"
                                type="text"
                                fontSize="21px"
                                borderColor="gray.500"
                                placeholder="ค้นหารายการ"
                            />
                        </InputGroup>
                    </Box>

                    <Box ml={5}>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <Image src="/images/calendar.png" width={20} height={20} />
                            </InputLeftElement>
                            <Input
                                type="date"
                                borderRadius="3xl"
                                fontSize="21px"
                                borderColor="gray.500"
                                placeholder="เลือกวันที่"
                            />
                        </InputGroup>
                    </Box>

                    <Box ml={5} border="1px" borderColor="red" borderRadius="md">
                        <ListCheck data={colunm} />
                    </Box>

                    <Spacer />
                    <Box borderWidth="1px" borderColor="red" borderRadius="md">
                        <Link href="/">
                            <Button
                                fontSize="21px"
                                leftIcon={<Image src="/images/pluswhite.png" width={10} height={10} />}
                                bg="red"
                                variant="solid"
                                color="white"
                                _hover={{}}
                            >
                                เพิ่มคำสั่งซื้อ
                            </Button>
                        </Link>
                    </Box>
                </Flex>
                {/* End Navbar */}

                {/* Start Table */}
                <Flex mt={10} justifyConten={'space-between'}>
                    <TableContainer fontSize="17" width={'100%'}>
                        <Table variant="striped" colorScheme="gray">
                            <Thead>
                                <Tr bg={"#f84c01"} textAlign={'center'}>
                                    <Th
                                        p={5}
                                        color={"white"}
                                        borderLeftRadius={"10"}
                                        fontSize="15"
                                    >
                                        <Checkbox size='md' colorScheme='green' defaultChecked>
                                        </Checkbox>
                                    </Th>
                                    <Th p={2} textAlign={'center'} color={"white"} fontSize="15">เลขคำสั่งซื้อ</Th>
                                    <Th p={2} textAlign={'center'} color={"white"} fontSize="15">รูปสินค้า</Th>
                                    <Th p={2} textAlign={'center'} color={"white"} fontSize="15">ชื่อผู้รับ</Th>
                                    <Th p={2} textAlign={'center'} color={"white"} fontSize="15">ที่อยู่</Th>
                                    <Th p={2} textAlign={'center'} color={"white"} fontSize="15">เบอร์โทร</Th>
                                    <Th p={2} textAlign={'center'} color={"white"} fontSize="15">จำนวน</Th>
                                    <Th p={2} textAlign={'center'} color={"white"} fontSize="15">ยอดสั่งซื้อ</Th>
                                    <Th p={2} textAlign={'center'} color={"white"} fontSize="15">การชำระเงิน</Th>
                                    <Th p={2} textAlign={'center'} color={"white"} fontSize="15">วันที่สั่งซื้อ</Th>
                                    <Th p={2} textAlign={'center'} color={"white"} fontSize="15">ผู้ทำรายการ</Th>
                                    <Th
                                        p={2}
                                        textAlign={'center'}
                                        color={"white"}
                                        borderRightRadius={"10"}
                                        fontSize="15"
                                    >
                                        ดำเนินการ
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr display={"none"}>
                                    {/* Row Gray */}
                                    <Td borderLeftRadius={"10"}></Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td borderRightRadius={"10"}></Td>
                                </Tr>

                                <InsertDataTable />
                                <InsertDataTable />
                                <InsertDataTable />
                                <InsertDataTable />
                                <InsertDataTable />
                                <InsertDataTable />
                                <InsertDataTable />
                                <InsertDataTable />
                                <InsertDataTable />

                            </Tbody>
                        </Table>
                    </TableContainer>
                </Flex>
                {/* End Table */}

            </Box>
        </>
    )
}
