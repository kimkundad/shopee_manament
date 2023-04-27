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
	FormLabel,
	Checkbox,
	Skeleton,
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

const AddOrder = () => {
	const routeBack = useRouter();
	return (
		<>
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

			<SimpleGrid minChildWidth={'240px'} spacing={'20px'} p={4}>
				<Box>
					<Box>
						<Flex bgColor={'gray.100'} px={2} pt={2} mb={5} borderTopColor={'black'} borderWidth={2}>
							<Icon as={BsHouseDoor} boxSize={6} mr={2} />
							<Text fontSize={'1.3em'}>ที่อยู่สำหรับออกใบเสร็จ/กำกับภาษี - บุคคลธรรมดา</Text>
						</Flex>


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
						<Flex bgColor={'gray.100'} px={2} pt={2} mb={5} borderTopColor={'black'} borderWidth={2}>
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




				<Box>
					<Box>
						<Flex bgColor={'gray.100'} px={2} pt={2} mb={5} borderTopColor={'black'} borderWidth={2}>
							<Icon as={BsFillCartPlusFill} boxSize={6} mr={2} />
							<Text fontSize={'1.3em'}>เพิ่มคำสั่งซื้อ</Text>
						</Flex>

						<Grid templateColumns='repeat(8, 1fr)' gap={2} alignItems={"center"} mt={2}>
							<GridItem colSpan={8}>
								<Stack>
									<Skeleton height='40px' />
									<Skeleton height='40px' />
									<Skeleton height='40px' />
									<Skeleton height='40px' />
									<Skeleton height='40px' />
								</Stack>
							</GridItem>
						</Grid>
					</Box>
				</Box>
			</SimpleGrid>
		</>
	)
}

export default AddOrder