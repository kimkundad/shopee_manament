import React from 'react'
import Link from "next/link";
import OrderNavbar from '@/components/layout/OrderNavbar'
import ListCheck from "@/components/MenuList";
import {
    Flex,
    Text,
    Image,
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
    Tfoot,
} from "@chakra-ui/react";

export default function OrderIndex() {

    const colunm = [
        { label: "วันที่", },
        { label: "ชื่อร้านค้า", },
        { label: "ชื่อสินค้า", },
        { label: "รหัสสินค้า", },
        { label: "ลิงค์ร้านค้า", },
        { label: "เลขคำสั่งชื้อ", },
        { label: "ชื่อลูกค้า", },
        { label: "ที่อยู่", },
        { label: "เบอร์โทรศัพท์", },
        { label: "จำนวนสั่งซื้อ", },
        { label: "ยอดขาย", },
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
                                <Image src="/images/search.png" h="20px" w="20px" />
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
                                <Image src="/images/calendar.png" h="20px" w="20px" />
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
                                leftIcon={<Image src="/images/pluswhite.png" boxSize={5} />}
                                bg="red"
                                variant="solid"
                                color="white"
                                _hover={{}}
                            >
                                พิมพ์รายงาน
                            </Button>
                        </Link>
                    </Box>
                </Flex>
                {/* End Navbar */}



            </Box>
        </>
    )
}
