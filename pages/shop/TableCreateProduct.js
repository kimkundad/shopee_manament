import React from 'react'
import { useState } from 'react';
import Link from "next/link";
import {
    Box,
    Text,
    HStack,
    Center,
    Input,
    Button,
    Spacer,
    Avatar,
    AvatarBadge,
    Select,
    IconButton,
    Flex,
    Stack,
    InputGroup,
    InputLeftElement,
    Wrap,
    WrapItem,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Switch,
    VStack,
    InputRightElement,
    Icon,
    Circle,
    Skeleton,
    Checkbox
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
    AddIcon,
    EditIcon,
    DeleteIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    SearchIcon,
} from "@chakra-ui/icons";
import { BsArrowLeftCircle, BsTrash3Fill, BsCameraFill } from "react-icons/bs";

export default function TableCreateProduct() {

    // const [checkedItems, setCheckedItems] = useState([false, false, false, false]);
    const [checkedItems, setCheckedItems] = useState(Array(4).fill(false));

    const allChecked = checkedItems.every(Boolean)
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked
    console.log(checkedItems);

    return (
        <>
            {/* Start Table */}
            <Box mt={10}>
                <TableContainer fontSize="17">
                    <Table variant="striped" colorScheme="gray">
                        <Thead>
                            <Tr bg={"#f84c01"}>
                                <Th
                                    color={"white"}
                                    borderLeftRadius={"10"}
                                    fontSize="15"
                                    py="8"
                                >
                                    <Checkbox
                                        isChecked={allChecked}
                                        isIndeterminate={isIndeterminate}
                                        onChange={(e) => setCheckedItems([e.target.checked, e.target.checked, e.target.checked, e.target.checked])}
                                    >
                                        เลือกทั้งหมด
                                    </Checkbox>
                                </Th>
                                <Th color={"white"} fontSize="15">รหัสสินค้า</Th>
                                <Th color={"white"} fontSize="15">รูปสินค้า</Th>
                                <Th color={"white"} fontSize="15">ชื่อสินค้า</Th>
                                <Th color={"white"} fontSize="15">ราคา</Th>
                                <Th
                                    color={"white"}
                                    borderRightRadius={"10"}
                                    fontSize="15"
                                >
                                    สต๊อคสินค้า
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr display={"none"}>
                                {/* Row Gray - Blank data using set next rows to white row */}
                                <Td borderLeftRadius={"10"}></Td>
                                <Td></Td>
                                <Td></Td>
                                <Td></Td>
                                <Td></Td>
                                <Td borderRightRadius={"10"}></Td>
                            </Tr>

                            <Tr>
                                {/* Row White */}
                                <Td borderLeftRadius={"10"}>
                                    <Checkbox
                                        isChecked={checkedItems[0]}
                                        // FIXME 
                                        onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1], checkedItems[2], checkedItems[3]])}
                                    />
                                </Td>
                                <Td>001</Td>
                                <Td><Skeleton boxSize={14} /></Td>
                                <Td>แก้วเยติ</Td>
                                <Td>145.00</Td>
                                <Td borderRightRadius={"10"}>
                                    <HStack>
                                        <IconButton
                                            onClick={''}
                                            borderRadius="3xl"
                                            colorScheme="blue"
                                            aria-label="Edit"
                                            icon={<EditIcon />}
                                        />
                                        <IconButton
                                            onClick={''}
                                            borderRadius="3xl"
                                            colorScheme="red"
                                            aria-label="Delete"
                                            icon={<DeleteIcon />}
                                        />
                                    </HStack>
                                </Td>
                            </Tr>

                            <Tr>
                                {/* Row Gray */}
                                <Td borderLeftRadius={"10"}>
                                    <Checkbox
                                        isChecked={checkedItems[1]}
                                        onChange={(e) => setCheckedItems()}
                                    />
                                </Td>
                                <Td>002</Td>
                                <Td><Skeleton boxSize={14} /></Td>
                                <Td>แปรงสีฟัน</Td>
                                <Td>200.00</Td>
                                <Td borderRightRadius={"10"}>
                                    <HStack>
                                        <IconButton
                                            borderRadius="3xl"
                                            colorScheme="blue"
                                            aria-label="Edit"
                                            icon={<EditIcon />}
                                        />
                                        <IconButton
                                            borderRadius="3xl"
                                            colorScheme="red"
                                            aria-label="Delete"
                                            icon={<DeleteIcon />}
                                        />
                                    </HStack>
                                </Td>
                            </Tr>

                            <Tr>
                                {/* Row White */}
                                <Td borderLeftRadius={"10"} borderColor="white">
                                    <Checkbox
                                        isChecked={checkedItems[2]}
                                        onChange={(e) => setCheckedItems()}
                                    />
                                </Td>
                                <Td>003</Td>
                                <Td><Skeleton boxSize={14} /></Td>
                                <Td>รองเท้า</Td>
                                <Td>199.00</Td>
                                <Td borderRightRadius={"10"}>
                                    <HStack>
                                        <IconButton
                                            borderRadius="3xl"
                                            colorScheme="blue"
                                            aria-label="Edit"
                                            icon={<EditIcon />}
                                        />
                                        <IconButton
                                            borderRadius="3xl"
                                            colorScheme="red"
                                            aria-label="Delete"
                                            icon={<DeleteIcon />}
                                        />
                                    </HStack>
                                </Td>
                            </Tr>

                            <Tr>
                                {/* Row Gray */}
                                <Td borderLeftRadius={"10"}>
                                    <Checkbox
                                        isChecked={checkedItems[3]}
                                        onChange={(e) => setCheckedItems([e.target.checked, checkedItems[4]])}
                                    />
                                </Td>
                                <Td>004</Td>
                                <Td><Skeleton boxSize={14} /></Td>
                                <Td>เสื้อกล้าม</Td>
                                <Td>500.00</Td>
                                <Td borderRightRadius={"10"}>
                                    <HStack>
                                        <IconButton
                                            borderRadius="3xl"
                                            colorScheme="blue"
                                            aria-label="Edit"
                                            icon={<EditIcon />}
                                        />
                                        <IconButton
                                            borderRadius="3xl"
                                            colorScheme="red"
                                            aria-label="Delete"
                                            icon={<DeleteIcon />}
                                        />
                                    </HStack>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box >
            {/* End Table */}
        </>
    )
}
