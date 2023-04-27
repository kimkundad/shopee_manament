import React from 'react'
import { useRouter } from 'next/router'
import Image from "next/image";
import {
	Stack,
	IconButton,
	Spacer,
	Button,
	Text,
	Flex,
	SimpleGrid,
	Box,
	Grid,
	GridItem,
	Input,
	InputGroup,
	InputLeftElement,
	FormLabel,
	Checkbox,
	Skeleton,
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	Badge,
} from "@chakra-ui/react";
import {
	AddIcon,
	EditIcon,
	DeleteIcon,
	Icon,
	ArrowLeftIcon,
	ArrowRightIcon,
	SearchIcon,
	CloseIcon,
} from "@chakra-ui/icons";
import {
	BsArrowLeftCircle,
	BsFillCartPlusFill,
	BsHouseDoor,
	BsBuilding,
} from "react-icons/bs";

const DemoProductLists = () => {
	return (
		<>
			<Tr>
				<Td><Checkbox></Checkbox></Td>
				<Td><Image
					src={'/images/demo-03.jpg'}
					width={30}
					height={30}
					alt="bay"
				/></Td>
				<Td>หม้อไฟฟ้า หม้อเอนกประสงค์</Td>
				<Td isNumeric>358.00</Td>
				<Td isNumeric>500</Td>
			</Tr>
		</>
	)
}

const AddOrder = () => {
	const routeBack = useRouter();
	return (
		<>
			{/* Start Header */}
			<Box>
				<Stack direction='row' p={4}>
					<Button
						size={'sm'}
						leftIcon={<BsArrowLeftCircle />}
						borderRadius={20}
						backgroundColor={'#f84c01'}
						color={'white'}
						fontWeight={'none'}
						fontSize={20}
						onClick={() => routeBack.back()}
					>
						ย้อนกลับ
					</Button>
					<Spacer />
					<IconButton
						size={'xs'}
						icon={<CloseIcon />}
						aria-label={'close icon'}
						borderRadius={20}
						color={'white'}
						backgroundColor={'#f84c01'}
						onClick={() => routeBack.back()}
					/>
				</Stack>

				<Flex justifyContent={'center'}>
					<Icon as={BsFillCartPlusFill} boxSize={10} mr={2} color={'#f84c01'} />
					<Text as={'b'} fontSize={'4xl'}>เพิ่มคำสั่งซื้อ</Text>
				</Flex>
			</Box>
			{/* End Header */}


			<SimpleGrid minChildWidth={'240px'} spacing={'20px'} p={4}>
				{/* Start Left Panel */}
				<Box>
					<Flex bgColor={'#f4f4f4'} px={2} pt={2} mb={5} borderTopColor={'black'} borderWidth={2}>
						<Icon as={BsHouseDoor} boxSize={6} mr={2} />
						<Text fontSize={'1.3em'}>ที่อยู่สำหรับออกใบเสร็จ/กำกับภาษี - บุคคลธรรมดา</Text>
					</Flex>
					<Box>


						<Grid templateColumns='repeat(8, 1fr)' gap={2} alignItems={"center"}>
							<GridItem colSpan={2} display={"flex"} justifyContent={"right"}>
								<FormLabel m={0} fontSize={'1.1em'}>ชื่อ - นามสกุล :</FormLabel>
							</GridItem>
							<GridItem colSpan={3} colStart={3} colEnd={6}>
								<Input placeholder='ระบุชื่อ - นามสกุล' fontSize={'1.1em'} />
							</GridItem>
						</Grid>


						<Grid templateColumns='repeat(8, 1fr)' gap={2} alignItems={"center"} mt={2}>
							<GridItem colSpan={2} display={"flex"} justifyContent={"right"}>
								<FormLabel m={0} fontSize={'1.1em'}>เบอร์โทรศัพท์ :</FormLabel>
							</GridItem>
							<GridItem colSpan={3} colStart={3} colEnd={6}>
								<Input placeholder='ระบุเบอร์โทรศัพท์' fontSize={'1.1em'} />
							</GridItem>
						</Grid>


						<Grid templateColumns='repeat(8, 1fr)' gap={2} alignItems={"center"} mt={2}>
							<GridItem colSpan={2} display={"flex"} justifyContent={"right"}>
								<FormLabel m={0} fontSize={'1.1em'}>ช่องทางติดต่อ :</FormLabel>
							</GridItem>
							<GridItem colSpan={3} display={'flex'} alignItems={'center'}>
								<Image
									width={36}
									height={36}
									src={"/images/social/facebook.png"}
									alt="facebook logo"
								/>
								<Input placeholder='Facebook' ml={2} fontSize={'1.1em'} />
							</GridItem>

							<GridItem colSpan={3} display={'flex'} alignItems={'center'}>
								<Image
									width={36}
									height={36}
									src={"/images/social/instagram.png"}
									alt="instagram logo"
								/>
								<Input placeholder='Instagarm' ml={2} fontSize={'1.1em'} />
							</GridItem>

							<GridItem colSpan={3} colStart={3} display={'flex'} alignItems={'center'}>
								<Image
									width={36}
									height={36}
									src={"/images/social/line.png"}
									alt="line logo"
								/>
								<Input placeholder='Line' ml={2} fontSize={'1.1em'} />
							</GridItem>

							<GridItem colSpan={3} display={'flex'} alignItems={'center'}>
								<Image
									width={36}
									height={36}
									src={"/images/social/tik-tok.png"}
									alt="Tiktok logo"
								/>
								<Input placeholder='Tiktok' ml={2} fontSize={'1.1em'} />
							</GridItem>
						</Grid>


						<Grid templateColumns='repeat(8, 1fr)' gap={2} alignItems={"center"} mt={2}>
							<GridItem colSpan={2} display={"flex"} justifyContent={"right"}>
								<FormLabel m={0} fontSize={'1.1em'}>ที่อยู่ลูกค้า :</FormLabel>
							</GridItem>
							<GridItem colSpan={6}>
								<Input placeholder='ระบุที่อยู่ลูกค้า' fontSize={'1.1em'} />
							</GridItem>
						</Grid>


						<Grid templateColumns='repeat(16, 1fr)' gap={2} alignItems={"center"} mt={2}>
							<GridItem colSpan={4} display={"flex"} justifyContent={"right"}>
								<FormLabel m={0} fontSize={'1.1em'}>ตำบล :</FormLabel>
							</GridItem>
							<GridItem colSpan={5}>
								<Input placeholder='ระบุตำบล' fontSize={'1.1em'} />
							</GridItem>
							<GridItem colSpan={2} display={"flex"} justifyContent={"right"}>
								<FormLabel m={0} fontSize={'1.1em'}>อำเภอ :</FormLabel>
							</GridItem>
							<GridItem colSpan={5}>
								<Input placeholder='ระบุอำเภอ' fontSize={'1.1em'} />
							</GridItem>


							<GridItem colSpan={4} display={"flex"} justifyContent={"right"}>
								<FormLabel m={0} fontSize={'1.1em'}>จังหวัด :</FormLabel>
							</GridItem>
							<GridItem colSpan={5}>
								<Input placeholder='ระบุจังหวัด' fontSize={'1.1em'} />
							</GridItem>
							<GridItem colSpan={2} display={"flex"} justifyContent={"right"}>
								<FormLabel m={0} fontSize={'1.1em'}>ไปรษณีย์ :</FormLabel>
							</GridItem>
							<GridItem colSpan={5}>
								<Input placeholder='ระบุไปรษณีย์' fontSize={'1.1em'} />
							</GridItem>
						</Grid>


						<Grid templateColumns='repeat(8, 1fr)' gap={2} alignItems={"center"} mt={2}>
							<GridItem colStart={3} colEnd={9}>
								<Checkbox colorScheme='red'><Text fontSize={'1.1em'}>ที่อยู่สำหรับออกใบเสร็จ/กำกับภาษีเหมือนที่อยู่ลูกค้า</Text></Checkbox>
							</GridItem>
						</Grid>
					</Box>



					<Box mt={10}>
						<Flex bgColor={'#f4f4f4'} px={2} pt={2} mb={5} borderTopColor={'black'} borderWidth={2}>
							<Icon as={BsBuilding} boxSize={6} mr={2} />
							<Text fontSize={'1.3em'}>ที่อยู่สำหรับออกใบเสร็จ/กำกับภาษี - นิติบุคคล</Text>
						</Flex>


						<Grid templateColumns='repeat(8, 1fr)' gap={2} alignItems={"center"}>
							<GridItem colSpan={2} display={"flex"} justifyContent={"right"}>
								<FormLabel m={0} fontSize={'1.1em'}>ชื่อ - นามสกุล :</FormLabel>
							</GridItem>
							<GridItem colStart={3} colEnd={6}>
								<Input placeholder='ระบุชื่อ - นามสกุล' fontSize={'1.1em'} />
							</GridItem>
						</Grid>


						<Grid templateColumns='repeat(8, 1fr)' gap={2} alignItems={"center"} mt={2}>
							<GridItem colSpan={2} display={"flex"} justifyContent={"right"}>
								<FormLabel m={0} fontSize={'1.1em'}>เบอร์โทรศัพท์ :</FormLabel>
							</GridItem>
							<GridItem colStart={3} colEnd={6}>
								<Input placeholder='ระบุเบอร์โทรศัพท์' fontSize={'1.1em'} />
							</GridItem>
						</Grid>


						<Grid templateColumns='repeat(8, 1fr)' gap={2} alignItems={"center"} mt={2}>
							<GridItem colSpan={2} display={"flex"} justifyContent={"right"}>
								<FormLabel m={0} fontSize={'1.1em'}>ชื่อบริษัท :</FormLabel>
							</GridItem>
							<GridItem colSpan={6}>
								<Input placeholder='ระบุชื่อบริษัท' fontSize={'1.1em'} />
							</GridItem>
						</Grid>


						<Grid templateColumns='repeat(8, 1fr)' gap={2} alignItems={"center"} mt={2}>
							<GridItem colSpan={2} display={"flex"} justifyContent={"right"}>
								<FormLabel m={0} fontSize={'1.1em'}>เลขทะเบียนนิติบุคคล :</FormLabel>
							</GridItem>
							<GridItem colStart={3} colEnd={6}>
								<Input placeholder='ระบุเลขทะเบียนนิติบุคคล 13 หลัก' fontSize={'1.1em'} />
							</GridItem>
						</Grid>


						<Grid templateColumns='repeat(8, 1fr)' gap={2} alignItems={"center"} mt={2}>
							<GridItem colSpan={2} display={"flex"} justifyContent={"right"}>
								<FormLabel m={0} fontSize={'1.1em'}>ที่อยู่บริษัท :</FormLabel>
							</GridItem>
							<GridItem colSpan={6}>
								<Input placeholder='ระบุที่อยู่บริษัท' fontSize={'1.1em'} />
							</GridItem>
						</Grid>


						<Grid templateColumns='repeat(16, 1fr)' gap={2} alignItems={"center"} mt={2}>
							<GridItem colSpan={4} display={"flex"} justifyContent={"right"}>
								<FormLabel m={0} fontSize={'1.1em'}>ตำบล :</FormLabel>
							</GridItem>
							<GridItem colSpan={5}>
								<Input placeholder='ระบุตำบล' fontSize={'1.1em'} />
							</GridItem>
							<GridItem colSpan={2} display={"flex"} justifyContent={"right"}>
								<FormLabel m={0} fontSize={'1.1em'}>อำเภอ :</FormLabel>
							</GridItem>
							<GridItem colSpan={5}>
								<Input placeholder='ระบุอำเภอ' fontSize={'1.1em'} />
							</GridItem>

							<GridItem colSpan={4} display={"flex"} justifyContent={"right"}>
								<FormLabel m={0} fontSize={'1.1em'}>จังหวัด :</FormLabel>
							</GridItem>
							<GridItem colSpan={5}>
								<Input placeholder='ระบุจังหวัด' fontSize={'1.1em'} />
							</GridItem>
							<GridItem colSpan={2} display={"flex"} justifyContent={"right"}>
								<FormLabel m={0} fontSize={'1.1em'}>ไปรษณีย์ :</FormLabel>
							</GridItem>
							<GridItem colSpan={5}>
								<Input placeholder='ระบุไปรษณีย์' fontSize={'1.1em'} />
							</GridItem>
						</Grid>
					</Box>
				</Box>
				{/* End Left Panel */}


				{/* Start Right Panel */}
				<Box>
					<Flex bgColor={'#f4f4f4'} px={2} pt={2} mb={5} borderTopColor={'black'} borderWidth={2}>
						<Icon as={BsFillCartPlusFill} boxSize={6} mr={2} />
						<Text fontSize={'1.3em'}>เพิ่มคำสั่งซื้อ</Text>
					</Flex>

					<Box>
						<TableContainer alignItems={"center"} mt={2}>
							{/* Use .table-add-order in glogals.css */}
							<Table className='table-add-order table-header-border' variant='striped' border="2px solid gray" colorScheme='gray' size='sm'>
								<Thead>
									<Tr bgColor={'#f4f4f4'}>
										<Th>สินค้า</Th>
										<Th>ราคา</Th>
										<Th>จำนวน</Th>
										<Th>ยอดรวม</Th>
									</Tr>
								</Thead>
								<Tbody>
									<Tr display={'none'}></Tr>
									<Tr>
										<Td>หม้อไฟฟ้า หม้อเอนกประสงค์</Td>
										<Td isNumeric>179.00</Td>
										<Td>
											<NumberInput size='sm' defaultValue={2} w={'80px'}>
												<NumberInputField fontSize={'1em'} textAlign={'right'} borderRadius={8} />
												<NumberInputStepper>
													<NumberIncrementStepper />
													<NumberDecrementStepper />
												</NumberInputStepper>
											</NumberInput>
										</Td>
										<Td isNumeric>358.00</Td>
									</Tr>
									<Tr>
										<Td>KIREI KIREI โฟมล้างมือ สูตร เบอร์รี โนะ คาโอริ</Td>
										<Td isNumeric>65.00</Td>
										<Td >
											<NumberInput size='sm' defaultValue={2} w={'80px'}>
												<NumberInputField fontSize={'1em'} textAlign={'right'} borderRadius={8} />
												<NumberInputStepper>
													<NumberIncrementStepper />
													<NumberDecrementStepper />
												</NumberInputStepper>
											</NumberInput>
										</Td>
										<Td isNumeric>130.00</Td>
									</Tr>
									<Tr>
										<Td>Furniture ที่วางสบู่ ที่วางสบู่ติดผนัง</Td>
										<Td isNumeric>28.00</Td>
										<Td>
											<NumberInput size='sm' defaultValue={2} w={'80px'}>
												<NumberInputField fontSize={'1em'} textAlign={'right'} borderRadius={8} />
												<NumberInputStepper>
													<NumberIncrementStepper />
													<NumberDecrementStepper />
												</NumberInputStepper>
											</NumberInput>
										</Td>
										<Td isNumeric>56.00</Td>
									</Tr>

								</Tbody>
							</Table>
						</TableContainer>
					</Box>

					<Box mt={2}>
						<Grid templateColumns='repeat(16, 1fr)' gap={2} alignItems={"center"}>
							<GridItem colSpan={7} display={"flex"} justifyContent={"right"}>
								<InputGroup>
									<InputLeftElement
										pointerEvents='none'
										children={<SearchIcon color='gray' />}
									/>
									<Input
										type='text'
										placeholder='ค้นหาสินค้า'
										fontSize={'1.1em'}
										borderColor={'gray'}
										borderWidth={2}
									/>
								</InputGroup>
							</GridItem>
							<GridItem colSpan={4}>
								<Button
									colorScheme='red'
									variant='solid'
									w={'100%'}
									fontWeight={'normal'}
									fontSize={'1.1em'}
								>
									สินค้าชิ้นเดียว
									<Badge
										ml={2}
										boxSize={5}
										fontSize={'1em'}
										color={"red"}
										bg="white"
										textAlign={"center"}
										borderRadius={"50%"}
									>
										6
									</Badge>
								</Button>
							</GridItem>
							<GridItem colSpan={5}>
								<Button
									variant='outline'
									w={'100%'}
									fontWeight={'normal'}
									fontSize={'1.1em'}
									borderColor={'gray'}
									borderWidth={2}
								>
									สินค้าชิ้นมีตัวเลือก
									<Badge
										ml={2}
										boxSize={5}
										fontSize={'1em'}
										color={"white"}
										bg="pink.500"
										textAlign={"center"}
										borderRadius={"50%"}
									>
										2
									</Badge>
								</Button>
							</GridItem>
						</Grid>
					</Box>

					<Box>
						<TableContainer alignItems={"center"} mt={2}>
							{/* Use .table-add-order in glogals.css */}
							<Table className='table-add-order' variant='striped' border="2px solid gray" colorScheme='gray' size='sm'>
								<Thead>
									<Tr bgColor={'#f4f4f4'}>
										<Th><Checkbox defaultChecked></Checkbox></Th>
										<Th>รูปภาพ</Th>
										<Th>สินค้า</Th>
										<Th>ราคา</Th>
										<Th>สต๊อกสินค้า</Th>
									</Tr>
								</Thead>
								<Tbody>
									<Tr display={'none'}></Tr>

									<DemoProductLists />
									<DemoProductLists />
									<DemoProductLists />
									<DemoProductLists />
									<DemoProductLists />
									<DemoProductLists />


								</Tbody>
							</Table>
						</TableContainer>
					</Box>


				</Box>
				{/* End Right Panel */}


			</SimpleGrid>
		</>
	)
}

export default AddOrder