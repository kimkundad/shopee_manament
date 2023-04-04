import React from "react";
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
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import Image from "next/image";
import {
	AddIcon,
	EditIcon,
	DeleteIcon,
	ArrowLeftIcon,
	ArrowRightIcon,
	SearchIcon,
} from "@chakra-ui/icons";
import { BsArrowLeftCircle, BsTrash3Fill, BsCameraFill } from "react-icons/bs";

export default function AdminIndex() {

	const {
		isOpen: isOpenAddModal,
		onOpen: onOpenAddModal,
		onClose: onCloseAddModal,
	} = useDisclosure();

	const {
		isOpen: isOpenCopyModal,
		onOpen: onOpenCopyModal,
		onClose: onCloseCopyModal,

	} = useDisclosure();

	const {
		isOpen: isOpenSuccessModal,
		onOpen: onOpenSuccessModal,
		onClose: onCloseSuccessModal,
	} = useDisclosure();

	const {
		isOpen: isOpenEditModal,
		onOpen: onOpenEditModal,
		onClose: onCloseEditModal,
	} = useDisclosure();

	const {
		isOpen: isOpenDeleteModal,
		onOpen: onOpenDeleteModal,
		onClose: onCloseDeleteModal,
	} = useDisclosure();

	function handleModals(isModal) {
		console.log(isModal)
		if (isModal === 'openCopy') {
			onOpenCopyModal();
			onCloseAddModal();
		} else if (isModal == 'openSuccess') {
			onOpenSuccessModal();
			onCloseCopyModal();
		}
	}

	return (
		<>
			<Box p="10">

				{/* Start Header */}
				<Box>
					<Center>
						<HStack>
							<Image
								width={42}
								height={42}
								src={"/images/menu/จัดการแอดมิน.png"}
								alt="admin"
							/>
							<Text as="b" fontSize="4xl" color="#f84c01" pt={3}>
								{" "}
								จัดการแอดมิน
							</Text>
						</HStack>
					</Center>
				</Box>
				{/* End Header */}

				{/* Start Navbar */}
				<Box mt={10}>
					<HStack>
						<InputGroup width="auto">
							<InputLeftElement
								pointerEvents="none"
								children={<SearchIcon color="gray.300" />}
							/>
							<Input type="text" placeholder="ค้นหารายการ" />
						</InputGroup>
						<Spacer />
						<Input
							width="auto"
							placeholder="เลือกวันที่"
							size="md"
							type="datetime-local"
						/>
						<Button
							onClick={onOpenAddModal}
							leftIcon={<AddIcon />}
							background="#f84c01"
							color="white"
						>
							เพิ่มแอดมิน
						</Button>
					</HStack>
				</Box>
				{/* End Navbar */}

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
										รูปภาพ
									</Th>
									<Th color={"white"} fontSize="15">ชื่อ - นามสกุล</Th>
									<Th color={"white"} fontSize="15">Email</Th>
									<Th color={"white"} fontSize="15">สถานะ</Th>
									<Th color={"white"} fontSize="15">สิทธิ์การเข้าถึง</Th>
									<Th color={"white"} fontSize="15">วันที่สร้าง</Th>
									<Th
										color={"white"}
										borderRightRadius={"10"}
										fontSize="15"
									>
										เพิ่มเติม
									</Th>
								</Tr>
							</Thead>
							<Tbody>
								<Tr display={"none"}>
									{" "}
									{/* Row Gray */}
									<Td borderLeftRadius={"10"}></Td>
									<Td></Td>
									<Td></Td>
									<Td></Td>
									<Td></Td>
									<Td></Td>
									<Td borderRightRadius={"10"}></Td>
								</Tr>

								<Tr>
									{" "}
									{/* Row White */}
									<Td borderLeftRadius={"10"}>
										<Avatar
											size="md"
											name="adebayo"
											src="https://bit.ly/sage-adebayo"
										/>
									</Td>
									<Td>Segun Adebayo</Td>
									<Td>Segun_Adebayo@gmail.com</Td>
									<Td>Admin</Td>
									<Td>ร้านค้าของฉัน/คลังสินค้า</Td>
									<Td>25/02/2566</Td>
									<Td borderRightRadius={"10"}>
										<HStack>
											<IconButton
												onClick={onOpenEditModal}
												borderRadius="3xl"
												colorScheme="blue"
												aria-label="Edit"
												icon={<EditIcon />}
											/>
											<IconButton
												onClick={onOpenDeleteModal}
												borderRadius="3xl"
												colorScheme="red"
												aria-label="Delete"
												icon={<DeleteIcon />}
											/>
										</HStack>
									</Td>
								</Tr>

								<Tr>
									{" "}
									{/* Row Gray */}
									<Td borderLeftRadius={"10"}>
										<Avatar
											size="md"
											name="adebayo"
											src="https://bit.ly/dan-abramov"
										/>
									</Td>
									<Td>Dan Abrahmov</Td>
									<Td>Dan_Abrahmov@gmail.com</Td>
									<Td>Super Admin</Td>
									<Td>ทุกเมนู</Td>
									<Td>12/01/2565</Td>
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
									{" "}
									{/* Row White */}
									<Td borderLeftRadius={"10"} borderColor="white">
										<Avatar
											size="md"
											name="adebayo"
											src="https://bit.ly/kent-c-dodds"
										/>
									</Td>
									<Td>Kent Dodds</Td>
									<Td>Kent_Dodds@gmail.com</Td>
									<Td>Admin</Td>
									<Td>คลังสินค้า/รายงาน</Td>
									<Td>01/04/2565</Td>
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
									{" "}
									{/* Row Gray */}
									<Td borderLeftRadius={"10"}>
										<Avatar
											size="md"
											name="adebayo"
											src="https://bit.ly/code-beast"
										/>
									</Td>
									<Td>Christian Nwamba</Td>
									<Td>Christian_Nwamba@gmail.com</Td>
									<Td>Admin</Td>
									<Td>คลังสินค้า/รายงาน</Td>
									<Td>16/02/2565</Td>
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
				</Box>
				{/* End Table */}

				{/* Start Pagination */}
				<Box mt={10}>
					<HStack>
						<Wrap>
							<WrapItem>
								<Text>แสดงผล:</Text>
							</WrapItem>
							<WrapItem>
								<Select size="xs">
									<option value="option1">10</option>
									<option value="option2">20</option>
									<option value="option3">30</option>
								</Select>
							</WrapItem>
						</Wrap>

						<Spacer />

						<Stack direction="row">
							<Wrap>
								<WrapItem>
									<IconButton
										aria-label="Previous page"
										icon={<ArrowLeftIcon />}
										size={"xs"}
									/>
								</WrapItem>
								<WrapItem>
									<Text>หน้า</Text>
								</WrapItem>
								<WrapItem>
									<Input
										htmlSize={2}
										textAlign="center"
										placeholder="1"
										size="xs"
									/>
								</WrapItem>
								<WrapItem>
									<Text>จาก 5</Text>
								</WrapItem>
								<WrapItem>
									<IconButton
										aria-label="Next page"
										icon={<ArrowRightIcon />}
										size={"xs"}
									/>
								</WrapItem>
							</Wrap>
						</Stack>
					</HStack>
				</Box>
				{/* End Pagination */}

				{/* Start Modal Add New Admin */}
				<Modal isOpen={isOpenAddModal} onClose={onCloseAddModal}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>
							<Box mt={10} mb={5}>
								<Center>
									<HStack>
										<Image
											width={28}
											height={28}
											src={"/images/menu/จัดการแอดมิน.png"}
											alt="admin"
										/>
										<Text as="b" fontSize="4md">
											เพิ่มแอดมิน
										</Text>
									</HStack>
								</Center>
							</Box>
						</ModalHeader>
						<ModalCloseButton />

						<ModalBody>
							<FormControl>
								<HStack justify="center">
									<Box>
										<FormLabel>Username : </FormLabel>
									</Box>
									<Box>
										<Input placeholder="username@gmail.com" />
									</Box>
								</HStack>
							</FormControl>

							<FormControl mt={4}>
								<HStack justify="center">
									<Box>
										<FormLabel>Password : </FormLabel>
									</Box>
									<Box>
										<Input
											type={"password"}
											placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
										/>
									</Box>
								</HStack>
							</FormControl>

							<FormControl mt={10} pl={5} pr={5}>
								<Text as="b">สิทธิ์การเข้าถึง</Text>
								<Grid templateColumns="repeat(2, 1fr)" gap={3} mt={4}>
									<GridItem>
										<HStack>
											<Switch id="switch-dashboard" colorScheme={"green"} />
											<Image
												width={24}
												height={24}
												src={"/images/menu/dashboard.png"}
												alt="dashboard"
											/>
											<Text>Dashboard</Text>
										</HStack>
									</GridItem>
									<GridItem>
										<HStack>
											<Switch id="switch-report" colorScheme={"green"} />
											<Image
												width={24}
												height={24}
												src={"/images/menu/report.png"}
												alt="report"
											/>
											<Text>รายงาน</Text>
										</HStack>
									</GridItem>
									<GridItem>
										<HStack>
											<Switch id="switch-shop" colorScheme={"green"} />
											<Image
												width={24}
												height={24}
												src={"/images/menu/ร้านค้าของฉัน.png"}
												alt="shop"
											/>
											<Text>ร้านค้าของฉัน</Text>
										</HStack>
									</GridItem>
									<GridItem>
										<HStack>
											<Switch
												id="switch-admin-management"
												colorScheme={"green"}
											/>
											<Image
												width={24}
												height={24}
												src={"/images/menu/จัดการแอดมิน.png"}
												alt="admin"
											/>
											<Text>จัดการแอดมิน</Text>
										</HStack>
									</GridItem>
									<GridItem>
										<HStack>
											<Switch id="switch-store" colorScheme={"green"} />
											<Image
												width={24}
												height={24}
												src={"/images/menu/คลังสินค้า.png"}
												alt="stock"
											/>
											<Text>คลังสินค้า</Text>
										</HStack>
									</GridItem>
									<GridItem>
										<HStack>
											<Switch id="switch-setting" colorScheme={"green"} />
											<Image
												width={24}
												height={24}
												src={"/images/menu/ตั้งค่า.png"}
												alt="setting"
											/>
											<Text>ตั้งค่า</Text>
										</HStack>
									</GridItem>
								</Grid>
							</FormControl>
						</ModalBody>
						<ModalFooter mt={10}>
							<Button
								onClick={() => handleModals('openCopy')}
								background="#f84c01"
								color="white"
								mr={3}
							>
								เพิ่มแอดมิน
							</Button>
							<Button onClick={onCloseAddModal}>ยกเลิก</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
				{/* End Modal Add New Admin */}

				{/* Start Modal Copy Link */}
				<Modal isOpen={isOpenCopyModal} onClose={onCloseCopyModal}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>
							<Box mt={10} mb={5}>
								<Center>
									<HStack>
										<Image
											width={28}
											height={28}
											src={"/images/menu/จัดการแอดมิน.png"}
										/>
										<Text as="b" fontSize="4md">
											เพิ่มแอดมิน
										</Text>
									</HStack>
								</Center>
							</Box>
						</ModalHeader>
						<ModalCloseButton />

						<ModalBody>
							<VStack p={[0, 5]}>
								<FormControl id="copy-link">
									<Wrap align="center" float={"right"}>
										<WrapItem>
											<FormLabel m={0}>ลิ้งเข้าใช้งาน : </FormLabel>
										</WrapItem>
										<WrapItem>
											<InputGroup>
												<Input
													htmlSize={22}
													width="auto"
													placeholder="http://admin.picpang.com/login"
												/>
												<InputRightElement width="4.5rem">
													<Button h="1.75rem" size="sm">
														Copy
													</Button>
												</InputRightElement>
											</InputGroup>
										</WrapItem>
									</Wrap>
								</FormControl>

								<FormControl id="copy-username">
									<Wrap align="center" float={"right"}>
										<WrapItem>
											<FormLabel m={0}>Username : </FormLabel>
										</WrapItem>

										<WrapItem>
											<Input
												htmlSize={25}
												width="auto"
												placeholder="username@gmail.com"
											/>
										</WrapItem>
									</Wrap>
								</FormControl>

								<FormControl id="copy-password">
									<Wrap align="center" float={"right"}>
										<WrapItem>
											<FormLabel m={0}>Password : </FormLabel>
										</WrapItem>

										<WrapItem>
											<Input
												htmlSize={25}
												width="auto"
												type={"password"}
												placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
											/>
										</WrapItem>
									</Wrap>
								</FormControl>
							</VStack>
						</ModalBody>
						<ModalFooter mt={10}>
							<Button
								onClick={() => handleModals('openSuccess')}
								background="#f84c01"
								color="white"
								mr={3}
							>
								คัดลอก
							</Button>
							<Button onClick={onCloseCopyModal}>ยกเลิก</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
				{/* End Modal Copy Link */}

				{/* Start Modal Success */}
				<Modal isOpen={isOpenSuccessModal} onClose={onCloseSuccessModal}>
					<ModalOverlay />
					<ModalContent py={20}>
						<ModalHeader>
							<Center>
								<Image
									width={110}
									height={110}
									src={"/images/menu/ร้านค้าของฉัน.png"}
									alt="เพิ่มแอดมินเรียบร้อย"
								/>
							</Center>
						</ModalHeader>
						<ModalCloseButton />
						<ModalBody textAlign={"center"}>
							<Text as="b" fontSize="2xl">
								เพิ่มแอดมินเรียบร้อยแล้ว
							</Text>
						</ModalBody>

						<ModalFooter justifyContent={"center"}>
							<Button
								size={"lg"}
								background="#f84c01"
								color="white"
								mt={10}
								onClick={onCloseSuccessModal}
							>
								ยืนยัน
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
				{/* End Modal Success */}

				{/* Start Modal Edit */}
				<Modal isOpen={isOpenEditModal} onClose={onCloseEditModal}>
					<ModalOverlay />
					<ModalContent p={4}>
						<ModalHeader>
							<Flex my={2} justifyContent={'center'} gap={2}>
								<Image
									width={28}
									height={28}
									src={"/images/menu/จัดการแอดมิน.png"}
								/>
								<Text as="b" fontSize="21">
									แก้ไขแอดมิน
								</Text>
							</Flex>
						</ModalHeader>
						<ModalCloseButton />

						<ModalBody>
							<Grid templateColumns='repeat(8, 1fr)' gap={2} alignItems="center">
								<GridItem colSpan={8} pb={5} align={'center'}>
									<Avatar size='2xl' name='Segun Adebayo' src='https://bit.ly/sage-adebayo' alt='demo'>
										<Link href={'/'}>
											<AvatarBadge
												boxSize={10}
												borderColor="#f84c01"
												bg='white'
												borderWidth={2}

											>
												<Icon as={BsCameraFill} boxSize={6} color={'#f84c01'} />
											</AvatarBadge>
										</Link>
									</Avatar>
								</GridItem>

								<GridItem colSpan={2} textAlign={'right'}>
									<Text as='b' fontSize={17}>ชื่อ - นามสกุล :</Text>
								</GridItem>
								<GridItem colSpan={6}>
									<FormControl>
										<Input placeholder='กรอก ชื่อ - นามสกุล ของคุณ' />
									</FormControl>
								</GridItem>

								<GridItem colSpan={2} textAlign={'right'}>
									<Text as='b' fontSize={17}>อีเมลล์ :</Text>
								</GridItem>
								<GridItem colSpan={6}>
									<FormControl>
										<Input type='email' placeholder='example@gmail.com' />
									</FormControl>
								</GridItem>

								<GridItem colSpan={2} textAlign={'right'}>
									<Text as='b' fontSize={17}>สถานะ :</Text>
								</GridItem>
								<GridItem colSpan={6}>
									<FormControl>
										<Select>
											<option value='option1'>Super Admin</option>
											<option value='option2'>Admin</option>
										</Select>
									</FormControl>
								</GridItem>

								<GridItem colSpan={2} textAlign={'right'} alignSelf='stretch' >
									<Text as='b' fontSize={17} >สิทธิ์การเข้าถึง :</Text>
								</GridItem>
								<GridItem colSpan={6}>
									<FormControl>
										<Grid templateColumns='repeat(4, 1fr)' gap={4}>
											<GridItem colSpan={2} display={'flex'} alignItems={'center'}>
												<Switch id='switch-all' colorScheme='green' mr={2} />
												<FormLabel htmlFor='switch-all' mb='0'>
													ทุกเมนู
												</FormLabel>
											</GridItem>

											<GridItem colSpan={2} display={'flex'} alignItems={'center'}>
												<Switch id='switch-my-shop' colorScheme='green' mr={2} />
												<FormLabel htmlFor='switch-my-shop' mb='0'>
													ร้าค้าของฉัน
												</FormLabel>
											</GridItem>

											<GridItem colSpan={2} display={'flex'} alignItems={'center'}>
												<Switch id='switch-store' colorScheme='green' mr={2} />
												<FormLabel htmlFor='switch-store' mb='0'>
													คลังสินค้า
												</FormLabel>
											</GridItem>

											<GridItem colSpan={2} display={'flex'} alignItems={'center'}>
												<Switch id='switch-report' colorScheme='green' mr={2} />
												<FormLabel htmlFor='switch-report' mb='0'>
													รายงาน
												</FormLabel>
											</GridItem>
										</Grid>
									</FormControl>
								</GridItem>
							</Grid>
						</ModalBody>
						<ModalFooter mt={5}>
							<Button mr={3} onClick={onCloseEditModal}>ยกเลิก</Button>
							<Button
								onClick={onCloseEditModal}
								background="#f84c01"
								color="white"
							>
								บันทึก
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
				{/* End Modal Edit */}

				{/* Start Modal Delete */}
				<Modal isOpen={isOpenDeleteModal} onClose={onCloseDeleteModal}>
					<ModalOverlay />
					<ModalContent p={5}>
						<ModalHeader display={'flex'} justifyContent={'center'}>
							<Circle size="110px" bg="#f84c01" color="white" >
								<BsTrash3Fill fontSize={50} />
							</Circle>
						</ModalHeader>
						<ModalCloseButton />
						<ModalBody textAlign={"center"}>
							<Text as="b" fontSize="2xl">
								คุณแน่ใจหรือไม่ ?
							</Text>
							<Text fontSize="21">
								ทำการลบ <Text as='b' color={'#f84c01'}>Segun Adebayo</Text> ออกจากแอดมิน
							</Text>
						</ModalBody>
						<ModalFooter>
							<Button mr={3} onClick={onCloseDeleteModal}>ยกเลิก</Button>
							<Button
								background="#f84c01"
								color="white"
								onClick={onCloseDeleteModal}
							>
								ยืนยัน
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
				{/* End Modal Delete */}
			</Box>
		</>
	);
}
