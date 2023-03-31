import React from 'react'
import Link from "next/link";
import Image from "next/image";
import ListCheck from "@/components/MenuList";
import TableCreateProduct from "./TableCreateProduct"
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
	Textarea,
	useToast,
	Circle

} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { BsPlusLg, BsStar, BsShop, BsFillPencilFill, BsEye, BsTrash3, BsTrash3Fill } from "react-icons/bs";
import { VscSave, VscCopy } from "react-icons/vsc";

function AddCard() {

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

	const toastCopy = useToast({
		position: 'top',
		title: '',
		description: 'คัดลอกลิงค์ สำเร็จแล้ว',
		status: 'success',
		duration: 2000,
		isClosable: true,
		containerStyle: {
			fontSize: '21',
			fontWeight: 'normal',
		},
	})

	const toastDelete = useToast({
		position: 'top',
		title: '',
		description: 'ลบสินค้าเรียบร้อย',
		status: 'error',
		duration: 2000,
		isClosable: true,
		containerStyle: {
			fontSize: '21',
			fontWeight: 'normal',
		},
	})

	function toastIsDelete() {
		onCloseDeleteModal();
		toastDelete();
	}

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
						<Text as='b' fontSize='2xl'>รองเท้าน้องหลาม ขายแพง ส่งไว</Text>
						<SimpleGrid columns={3}>
							<Text fontSize='12'>จำนวนผู้เข้าชม: 5,650</Text>
							<Text fontSize='12'>วันที่สร้าง: 07/05/2566</Text>
							<Text fontSize='12'>แก้ไขล่าสุด: 07/05/2566</Text>
						</SimpleGrid>
					</Box>
				</CardBody>

				<CardFooter justifyContent={'center'}>
					<Button
						leftIcon={<VscCopy />}
						size='sm'
						colorScheme='red'
						variant='outline'
						fontWeight='none'
						borderWidth={2}
						onClick={() => toastCopy()}
					>
						คัดลอกลิงค์
					</Button>
					<Button
						leftIcon={<BsTrash3 />}
						size='sm' ml='4'
						colorScheme='gray'
						variant='outline'
						fontWeight='none'
						onClick={onOpenDeleteModal}
					>
						ลบ
					</Button>
					<Button
						leftIcon={<BsFillPencilFill />}
						size='sm' ml='4'
						colorScheme='red'
						fontWeight='none'
						onClick={onOpenEditModal}
					>
						แก้ไขข้อมูล
					</Button>

				</CardFooter>
			</Card>
			{/* End Card */}



			{/* Start Modal button แก้ไขข้อมูลร้านค้า */}
			<Modal size='xl' isOpen={isOpenEditModal} onClose={onCloseEditModal}>
				<ModalOverlay />
				<ModalContent py='10'>
					<HStack justifyContent={'center'} alignItems="center">
						<Image width={36} height={36} src={"/images/menu/ร้านค้าของฉัน.png"} />
						<Text as="b" fontSize="4xl">
							แก้ไขข้อมูลร้านค้า
						</Text>
					</HStack>
					<ModalCloseButton />

					<ModalBody py='10'>
						<SimpleGrid columns={1} spacing={5} textAlign={'right'}>
							<Grid templateColumns='repeat(6, 1fr)' gap={4} alignItems="center">
								<GridItem colSpan={2} as='b' fontSize='17'><Text as='span' color='#fe4900'>* </Text>ชื่อร้านค้า:</GridItem>
								<GridItem colSpan={3}>
									<Input placeholder='ระบุชื่อร้านค้า' />
								</GridItem>
							</Grid>

							<Grid templateColumns='repeat(6, 1fr)' gap={4} alignItems="center">
								<GridItem colSpan={2} as='b' fontSize='17'><Text as='span' color='#fe4900'>* </Text>รายละเอียด:</GridItem>
								<GridItem colSpan={3}>
									<Textarea
										placeholder='ระบุรายละเอียดร้านค้า'
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
							onClick={onCloseEditModal}
						>
							ยกเลิก
						</Button>
						<Button
							bg="#fe4900"
							color='white'
							variant='solid'
							mr={3}
						>
							ถัดไป
						</Button>
					</ModalFooter>


				</ModalContent>
			</Modal>
			{/* End Modal button แก้ไขข้อมูลร้านค้า */}

			{/* Start Modal Delete Shop */}
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
							onClick={() => toastIsDelete()}
						>
							ยืนยัน
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
			{/* End Modal Delete Shop */}

		</>

	);
}


export default function ShopIndex() {

	const colunm = [
		{ label: "เรียงตามตัวอักษร", },
		{ label: "เรียงตามวันที่สร้าง", },
		{ label: "เรียงตามวันที่แก้ไข", },
		{ label: "จำนวนผู้เข้าชม", },
	];

	const {
		isOpen: isOpenCreateShopModal,
		onOpen: onOpenCreateShopModal,
		onClose: onCloseCreateShopModal,
	} = useDisclosure()

	const {
		isOpen: isOpenChooseProductModal,
		onOpen: onOpenChooseProductModal,
		onClose: onCloseChooseProductModal,
	} = useDisclosure()

	function handleCreateProductModal() {
		onCloseCreateShopModal();
		onOpenChooseProductModal();
	}

	return (
		<>
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
						{/* <Link href="/"> */}
						<Button
							onClick={onOpenCreateShopModal}
							fontSize="21px"
							leftIcon={<Image src="/images/pluswhite.png" width={20} height={20} />}
							bg="red"
							variant="solid"
							color="white"
							_hover={{}}
						>
							สร้างร้านค้า
						</Button>
						{/* </Link> */}
					</Box>
				</Flex>
				{/* End Navbar */}



			</Box>
			<Box px={10} py={5} minHeight={400}>
				<SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>

					<AddCard />
					<AddCard />
					<AddCard />
					<AddCard />
					<AddCard />

				</SimpleGrid>
			</Box>

			{/* Start Modal button สร้างร้านค้า */}
			<Modal size='xl' isOpen={isOpenCreateShopModal} onClose={onCloseCreateShopModal}>
				<ModalOverlay />
				<ModalContent py='10'>
					<HStack justifyContent={'center'} alignItems="center">
						<Image width={36} height={36} src={"/images/menu/ร้านค้าของฉัน.png"} />
						<Text as="b" fontSize="4xl">
							สร้างร้านค้า
						</Text>
					</HStack>
					<ModalCloseButton />

					<ModalBody py='10'>
						<SimpleGrid columns={1} spacing={5} textAlign={'right'}>
							<Grid templateColumns='repeat(6, 1fr)' gap={4} alignItems="center">
								<GridItem colSpan={2} as='b' fontSize='17'><Text as='span' color='#fe4900'>* </Text>ชื่อร้านค้า:</GridItem>
								<GridItem colSpan={3}>
									<Input placeholder='ระบุชื่อร้านค้า' />
								</GridItem>
							</Grid>

							<Grid templateColumns='repeat(6, 1fr)' gap={4} alignItems="center">
								<GridItem colSpan={2} as='b' fontSize='17'><Text as='span' color='#fe4900'>* </Text>รายละเอียด:</GridItem>
								<GridItem colSpan={3}>
									<Textarea
										placeholder='ระบุรายละเอียดร้านค้า'
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
							onClick={onCloseCreateShopModal}
						>
							ยกเลิก
						</Button>
						<Button
							bg="#fe4900"
							color='white'
							variant='solid'
							mr={3}
							onClick={() => handleCreateProductModal()}
						>

							ถัดไป
						</Button>
					</ModalFooter>


				</ModalContent>
			</Modal>
			{/* End Modal button สร้างร้านค้า */}

			{/* Start Modal เลือกสินค้า */}
			<Modal size='4xl' isOpen={isOpenChooseProductModal} onClose={onCloseChooseProductModal}>
				<ModalOverlay />
				<ModalContent py='10'>
					<HStack justifyContent={'center'} alignItems="center">
						<Image width={36} height={36} src={"/images/addProduct.png"} />
						<Text as="b" fontSize="4xl">
							เลือกสินค้า
						</Text>
					</HStack>
					<ModalCloseButton />

					<ModalBody py='10'>
						<TableCreateProduct />
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
							onClick={onCloseChooseProductModal}
						>
							ยกเลิก
						</Button>
						<Button
							bg="#fe4900"
							color='white'
							variant='solid'
							mr={3}
						>
							สร้างร้านค้า
						</Button>
					</ModalFooter>


				</ModalContent>
			</Modal>
			{/* End Modal เลือกสินค้า */}

		</>
	)
}
