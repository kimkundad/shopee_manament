import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ListCheck from "@/components/MenuList";
import orders from "@/data/orders"
import {
	Flex,
	Text,
	Input,
	InputGroup,
	InputLeftElement,
	Box,
	Spacer,
	Button,
	HStack,
	Select,
	Avatar,
	IconButton,
	Checkbox,
	Skeleton,
	Wrap,
	WrapItem,
	Center,
	Badge,
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
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
	Icon,
	ArrowLeftIcon,
	ArrowRightIcon,
	SearchIcon,
} from "@chakra-ui/icons";

import {
	BsAlarm,
	BsBoxSeam,
	BsArrowReturnLeft,
	BsPatchCheckFill,
	BsTruck,
	BsFillClipboardCheckFill,
	BsXOctagonFill,
} from "react-icons/bs";

import { BsClockHistory, BsBoxFill, BsXCircleFill } from "react-icons/bs";
import { FaRegSave } from "react-icons/fa";
import { VscSave } from "react-icons/vsc";

const countOrder = orders.filter(item => item.status === 'ordering').length
const countPacking = orders.filter(item => item.status === 'packing').length
const countReadyShip = orders.filter(item => item.status === 'ready').length
const countDelivering = orders.filter(item => item.status === 'delivering').length
const countDelivered = orders.filter(item => item.status === 'delivered').length
const countRemand = orders.filter(item => item.status === 'remand').length
const countCancel = orders.filter(item => item.status === 'cancel').length

// const [navbarTab, setNavbarTab] = useState("");

const handleNavbar = (tabName) => {
	alert(tabName);
}


function InsertDataTable() {
	return (
		<>
			{orders.map((item) => {
				return (

					<Tr key={item.orderId}>
						<Td px={5} py={2} borderLeftRadius={"10"} textAlign={"center"}>
							<Checkbox size="md" colorScheme="green" defaultChecked></Checkbox>
						</Td>
						<Td p={2} textAlign={"center"}>
							{item.orderId}
						</Td>
						<Td p={2}>
							<Center>
								<Image src={item.imageThumbnail} width={30} height={30} alt='bay' />
							</Center>
						</Td>
						<Td p={2} textAlign={"center"}>
							{item.receiverName}
						</Td>
						<Td p={2} textAlign={"center"}>
							{item.address}
						</Td>
						<Td p={2} textAlign={"center"}>
							{item.phoneNumber}
						</Td>
						<Td p={2} textAlign={"center"}>
							{item.quantity}
						</Td>
						<Td p={2} textAlign={"center"}>
							{item.amount}
						</Td>
						<Td p={2}>
							<Center>
								<Image src={item.bankThumbnail} width={30} height={30} alt='bay' />
							</Center>
						</Td>
						<Td p={2} textAlign={"center"}>
							{item.createAt}
						</Td>
						<Td p={2} textAlign={"center"}>
							{item.orderBy}
						</Td>
						<Td p={2} borderRightRadius={"10"} textAlign={"center"}>
							<HStack>
								<IconButton
									icon={<BsClockHistory />}
									size="xs"
									color={"#f84c01"}
									borderColor={"#f84c01"}
									aria-label="Edit"
									variant="outline"
								/>
								<IconButton
									icon={<BsBoxFill />}
									size="xs"
									color={"#f84c01"}
									borderColor={"#f84c01"}
									aria-label="Edit"
									variant="outline"
								/>
								<IconButton
									icon={<BsXCircleFill />}
									size="xs"
									color={"#f84c01"}
									borderColor={"#f84c01"}
									aria-label="Edit"
									variant="outline"
								/>
							</HStack>
						</Td>
					</Tr>

				)
			})}
		</>
	)
}

export default function Order() {
	const colunm = [
		{ label: "ตัวเลือก" },
		{ label: "เลขคำสั่งซื้อ" },
		{ label: "รูปสินค้า" },
		{ label: "ชื่อสินค้า" },
		{ label: "ที่อยู่" },
		{ label: "เบอร์โทร" },
		{ label: "จำนวน" },
		{ label: "ยอดสั่งซื้อ" },
		{ label: "การชำระเงิน" },
		{ label: "วันที่สั่งซื้อ" },
		{ label: "ผู้ทำรายการ" },
		{ label: "ดำเนินการ" },
	];

	return (
		<>
			{/* Start Header */}
			<Box pt={10}>
				<Center>
					<HStack>
						<Image width={36} height={36} src={'/images/menu/คำสั่งซื้อ.png'} alt={'รูปคำสั่งซื้อ'} />
						<Text as='b' fontSize='4xl' color={'#fe4900'} p={3}>คำสั่งซื้อ</Text>
					</HStack>
				</Center>
			</Box>
			{/* End Header */}


			{/* Start Menu Navbar */}
			<Box pt={5}>
				<Tabs>
					<TabList>
						<Tab
							_selected={{ borderBottomColor: 'red', borderBottomWidth: '3px' }}
							w='160px'
							onClick={() => handleNavbar('order')}
						>
							<Icon as={BsAlarm} boxSize={5} />
							<Text as='b' fontSize={17} px={4}>ออเดอร์</Text>
							<Badge
								boxSize={5}
								fontSize={15}
								color={'white'}
								bg='red.400'
								textAlign={'center'}
								borderRadius={'50%'}
							>
								{countOrder}
							</Badge>
						</Tab>
						<Tab _selected={{ borderBottomColor: 'red', borderBottomWidth: '3px' }} w='160px'>
							<Icon as={BsBoxSeam} boxSize={5} />
							<Text as='b' fontSize={17} px={4}>กำลังแพ็ค</Text>
							<Badge
								boxSize={5}
								fontSize={15}
								color={'white'}
								bg='blue.400'
								textAlign={'center'}
								borderRadius={'50%'}
							>
								{countPacking}
							</Badge>
						</Tab>
						<Tab _selected={{ borderBottomColor: 'red', borderBottomWidth: '3px' }} w='160px'>
							<Icon as={BsTruck} boxSize={5} />
							<Text as='b' fontSize={17} px={4}>พร้อมส่ง</Text>
							<Badge
								boxSize={5}
								fontSize={15}
								color={'white'}
								bg='yellow.400'
								textAlign={'center'}
								borderRadius={'50%'}
							>
								{countReadyShip}
							</Badge>
						</Tab>
						<Tab _selected={{ borderBottomColor: 'red', borderBottomWidth: '3px' }} w='160px'>
							<Icon as={BsFillClipboardCheckFill} boxSize={5} />
							<Text as='b' fontSize={17} px={4}>ส่งแล้ว</Text>
							<Badge
								boxSize={5}
								fontSize={15}
								color={'white'}
								bg='green.400'
								textAlign={'center'}
								borderRadius={'50%'}
							>
								{countDelivering}
							</Badge>
						</Tab>
						<Tab _selected={{ borderBottomColor: 'red', borderBottomWidth: '3px' }} w='160px'>
							<Icon as={BsPatchCheckFill} boxSize={5} />
							<Text as='b' fontSize={17} px={4}>ส่งสำเร็จ</Text>
							<Badge
								boxSize={5}
								fontSize={15}
								color={'white'}
								bg='purple.400'
								textAlign={'center'}
								borderRadius={'50%'}
							>
								{countDelivered}
							</Badge>
						</Tab>
						<Tab _selected={{ borderBottomColor: 'red', borderBottomWidth: '3px' }} w='160px'>
							<Icon as={BsArrowReturnLeft} boxSize={5} />
							<Text as='b' fontSize={17} px={4}>ตีกลับ</Text>
							<Badge
								boxSize={5}
								fontSize={15}
								color={'white'}
								bg='orange.400'
								textAlign={'center'}
								borderRadius={'50%'}
							>
								{countRemand}
							</Badge>
						</Tab>
						<Tab _selected={{ borderBottomColor: 'red', borderBottomWidth: '3px' }} w='160px'>
							<Icon as={BsXOctagonFill} boxSize={5} />
							<Text as='b' fontSize={17} px={4}>ยกเลิก</Text>
							<Badge
								boxSize={5}
								fontSize={15}
								color={'white'}
								bg='pink.400'
								textAlign={'center'}
								borderRadius={'50%'}
							>
								{countCancel}
							</Badge>
						</Tab>
					</TabList>
				</Tabs>
			</Box>
			{/* End Menu Navbar */}



			{/* Start Navbar */}
			<Box p={5}>
				<Flex>
					<Box>
						<InputGroup>
							<InputLeftElement pointerEvents="none">
								<Image src="/images/search.png" width={20} height={20} alt='' />
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
								<Image src="/images/calendar.png" width={20} height={20} alt='' />
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
								leftIcon={
									<Image src="/images/pluswhite.png" width={10} height={10} alt='' />
								}
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
			</Box>
			{/* End Navbar */}



			{/* Start Table */}
			<Box p={5}>
				<Flex justifyContent={"space-between"}>
					<TableContainer fontSize="17" width={"100%"}>
						<Table variant="striped" colorScheme="gray">
							<Thead>
								<Tr bg={"#f84c01"} textAlign={"center"}>
									<Th
										p={5}
										color={"white"}
										borderLeftRadius={"10"}
										fontSize="15"
									>
										<Checkbox
											size="md"
											colorScheme="green"
											defaultChecked
										></Checkbox>
									</Th>
									<Th p={2} textAlign={"center"} color={"white"} fontSize="15">
										เลขคำสั่งซื้อ
									</Th>
									<Th p={2} textAlign={"center"} color={"white"} fontSize="15">
										รูปสินค้า
									</Th>
									<Th p={2} textAlign={"center"} color={"white"} fontSize="15">
										ชื่อผู้รับ
									</Th>
									<Th p={2} textAlign={"center"} color={"white"} fontSize="15">
										ที่อยู่
									</Th>
									<Th p={2} textAlign={"center"} color={"white"} fontSize="15">
										เบอร์โทร
									</Th>
									<Th p={2} textAlign={"center"} color={"white"} fontSize="15">
										จำนวน
									</Th>
									<Th p={2} textAlign={"center"} color={"white"} fontSize="15">
										ยอดสั่งซื้อ
									</Th>
									<Th p={2} textAlign={"center"} color={"white"} fontSize="15">
										การชำระเงิน
									</Th>
									<Th p={2} textAlign={"center"} color={"white"} fontSize="15">
										วันที่สั่งซื้อ
									</Th>
									<Th p={2} textAlign={"center"} color={"white"} fontSize="15">
										ผู้ทำรายการ
									</Th>
									<Th
										p={2}
										textAlign={"center"}
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
								{/* TODO */}

							</Tbody>
						</Table>
					</TableContainer>
				</Flex>
			</Box>
			{/* End Table */}


		</>
	);
}
