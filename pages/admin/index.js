import React from 'react'
import Link from 'next/link'
import {
  Box, Text, HStack, Center, Input, Button,
  Spacer, Avatar, Select, IconButton, Flex, Stack,
  InputGroup, InputLeftElement, Wrap, WrapItem,
  FormControl, FormLabel, Grid, GridItem,
  Switch, VStack, InputRightElement,
} from "@chakra-ui/react"
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import Image from 'next/image'
import {
  AddIcon, EditIcon, DeleteIcon,
  ArrowLeftIcon, ArrowRightIcon, SearchIcon
} from '@chakra-ui/icons';

export default function AdminManagement() {

  // const modalAdd = useDisclosure();
  // const modalCopy = useDisclosure()
  // const modalSuccess = useDisclosure()
  let {
    isOpen: isOpenAddModal,
    onOpen: onOpenAddModal,
    onClose: onCloseAddModal
  } = useDisclosure()

  let {
    isOpen: isOpenCopyModal,
    onOpen: onOpenCopyModal,
    onClose: onCloseCopyModal
  } = useDisclosure()

  const {
    isOpen: isOpenSuccessModal,
    onOpen: onOpenSuccessModal,
    onClose: onCloseSuccessModal
  } = useDisclosure()

  // console.log(modalAdd);
  // console.log(modalCopy);
  // console.log(modalSuccess);
  // console.log('------------------------')

  if (isOpenCopyModal === true) isOpenAddModal = false;
  if (isOpenSuccessModal === true) isOpenCopyModal = false;


  return (
    <>

      <Box p='10'>

        <Box>
          <Center>
            <HStack>
              <Image width={42} height={42} src={'/images/menu/จัดการแอดมิน.png'} alt='admin' />
              <Text as='b' fontSize='4xl' color='#f84c01' pt={3}> จัดการแอดมิน</Text>
            </HStack>
          </Center>
        </Box>

        <Box mt={'10'}>
          <HStack>
            <InputGroup width='auto'>
              <InputLeftElement
                pointerEvents='none'
                children={<SearchIcon color='gray.300' />}
              />
              <Input type='text' placeholder='ค้นหารายการ' />
            </InputGroup>
            <Spacer />
            <Input width='auto' placeholder='เลือกวันที่' size='md' type="datetime-local" />
            <Button onClick={onOpenAddModal} leftIcon={<AddIcon />} background='#f84c01' color='white'>เพิ่มแอดมิน</Button >
          </HStack>
        </Box>

        <Box mt={10}>
          <TableContainer fontSize='17'>
            <Table variant='striped' colorScheme='gray'>
              <Thead >
                <Tr bg={'#f84c01'}>
                  <Th color={'white'} borderLeftRadius={'10'} fontSize='15' py='8'>รูปภาพ</Th>
                  <Th color={'white'} fontSize='15'>ชื่อ - นามสกุล</Th>
                  <Th color={'white'} fontSize='15'>Email</Th>
                  <Th color={'white'} fontSize='15'>สถานะ</Th>
                  <Th color={'white'} fontSize='15'>สิทธิ์การเข้าถึง</Th>
                  <Th color={'white'} fontSize='15'>วันที่สร้าง</Th>
                  <Th color={'white'} borderRightRadius={'10'} fontSize='15'>เพิ่มเติม</Th>
                </Tr>
              </Thead>
              <Tbody>


                <Tr display={'none'}> {/* Row Gray */}
                  <Td borderLeftRadius={'10'}></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td borderRightRadius={'10'}></Td>
                </Tr>


                <Tr> {/* Row White */}
                  <Td borderLeftRadius={'10'}><Avatar size='md' name='adebayo' src='https://bit.ly/sage-adebayo' /></Td>
                  <Td>Segun Adebayo</Td>
                  <Td>Segun_Adebayo@gmail.com</Td>
                  <Td>Admin</Td>
                  <Td>ร้านค้าของฉัน/คลังสินค้า</Td>
                  <Td>25/02/2566</Td>
                  <Td borderRightRadius={'10'}>
                    <HStack>
                      <IconButton
                        borderRadius="3xl"
                        colorScheme='blue'
                        aria-label='Edit'
                        icon={<EditIcon />}
                      />
                      <IconButton
                        borderRadius="3xl"
                        colorScheme='red'
                        aria-label='Delete'
                        icon={<DeleteIcon />}
                      />
                    </HStack>
                  </Td>
                </Tr>


                <Tr> {/* Row Gray */}
                  <Td borderLeftRadius={'10'}><Avatar size='md' name='adebayo' src='https://bit.ly/dan-abramov' /></Td>
                  <Td>Dan Abrahmov</Td>
                  <Td>Dan_Abrahmov@gmail.com</Td>
                  <Td>Super Admin</Td>
                  <Td>ทุกเมนู</Td>
                  <Td>12/01/2565</Td>
                  <Td borderRightRadius={'10'}>
                    <HStack>
                      <IconButton
                        borderRadius="3xl"
                        colorScheme='blue'
                        aria-label='Edit'
                        icon={<EditIcon />}
                      />
                      <IconButton
                        borderRadius="3xl"
                        colorScheme='red'
                        aria-label='Delete'
                        icon={<DeleteIcon />}
                      />
                    </HStack>
                  </Td>
                </Tr>


                <Tr> {/* Row White */}
                  <Td borderLeftRadius={'10'} borderColor='white'><Avatar size='md' name='adebayo' src='https://bit.ly/kent-c-dodds' /></Td>
                  <Td>Kent Dodds</Td>
                  <Td>Kent_Dodds@gmail.com</Td>
                  <Td>Admin</Td>
                  <Td>คลังสินค้า/รายงาน</Td>
                  <Td>01/04/2565</Td>
                  <Td borderRightRadius={'10'}>
                    <HStack>
                      <IconButton
                        borderRadius="3xl"
                        colorScheme='blue'
                        aria-label='Edit'
                        icon={<EditIcon />}
                      />
                      <IconButton
                        borderRadius="3xl"
                        colorScheme='red'
                        aria-label='Delete'
                        icon={<DeleteIcon />}
                      />
                    </HStack>
                  </Td>
                </Tr>


                <Tr> {/* Row Gray */}
                  <Td borderLeftRadius={'10'}><Avatar size='md' name='adebayo' src='https://bit.ly/code-beast' /></Td>
                  <Td>Christian Nwamba</Td>
                  <Td>Christian_Nwamba@gmail.com</Td>
                  <Td>Admin</Td>
                  <Td>คลังสินค้า/รายงาน</Td>
                  <Td>16/02/2565</Td>
                  <Td borderRightRadius={'10'}>
                    <HStack>
                      <IconButton
                        borderRadius="3xl"
                        colorScheme='blue'
                        aria-label='Edit'
                        icon={<EditIcon />}
                      />
                      <IconButton
                        borderRadius="3xl"
                        colorScheme='red'
                        aria-label='Delete'
                        icon={<DeleteIcon />}
                      />
                    </HStack>
                  </Td>
                </Tr>
              </Tbody>

            </Table>
          </TableContainer>
        </Box>

        <Box mt={'10'}>
          <HStack>

            <Wrap>
              <WrapItem>
                <Text>แสดงผล:</Text>
              </WrapItem>
              <WrapItem>
                <Select size='xs' >
                  <option value='option1'>10</option>
                  <option value='option2'>20</option>
                  <option value='option3'>30</option>
                </Select>
              </WrapItem>
            </Wrap>

            <Spacer />

            <Stack direction='row'>
              <Wrap>
                <WrapItem>
                  <IconButton
                    aria-label='Previous page'
                    icon={<ArrowLeftIcon />}
                    size={'xs'}
                  />
                </WrapItem>
                <WrapItem>
                  <Text>หน้า</Text>
                </WrapItem>
                <WrapItem>
                  <Input htmlSize={2} textAlign='center' placeholder='1' size='xs' />
                </WrapItem>
                <WrapItem>
                  <Text>จาก 5</Text>
                </WrapItem>
                <WrapItem>
                  <IconButton
                    aria-label='Next page'
                    icon={<ArrowRightIcon />}
                    size={'xs'}
                  />
                </WrapItem>
              </Wrap>
            </Stack>

          </HStack>
        </Box>

        {/* Start Modal Add New Admin */}
        <Modal
          isOpen={isOpenAddModal}
          onClose={onCloseAddModal}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Box mt={10} mb={5}>
                <Center>
                  <HStack>
                    <Image width={28} height={28} src={'/images/menu/จัดการแอดมิน.png'} alt='admin' />
                    <Text as='b' fontSize='4md' >เพิ่มแอดมิน</Text>
                  </HStack>
                </Center>
              </Box>
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <FormControl>
                <HStack justify='center'>
                  <Box>
                    <FormLabel>Username : </FormLabel>
                  </Box>
                  <Box>
                    <Input placeholder='username@gmail.com' />
                  </Box>
                </HStack>
              </FormControl>

              <FormControl mt={4}>
                <HStack justify='center'>
                  <Box>
                    <FormLabel>Password : </FormLabel>
                  </Box>
                  <Box>
                    <Input type={"password"} placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;' />
                  </Box>
                </HStack>
              </FormControl>

              <FormControl mt={10} pl={5} pr={5}>
                <Text as='b'>สิทธิ์การเข้าถึง</Text>
                <Grid templateColumns='repeat(2, 1fr)' gap={3} mt={4}>
                  <GridItem>
                    <HStack>
                      <Switch id='switch-dashboard' colorScheme={'green'} />
                      <Image width={24} height={24} src={'/images/menu/dashboard.png'} alt='dashboard' />
                      <Text>Dashboard</Text>
                    </HStack>
                  </GridItem>
                  <GridItem>
                    <HStack>
                      <Switch id='switch-report' colorScheme={'green'} />
                      <Image width={24} height={24} src={'/images/menu/report.png'} alt='report' />
                      <Text>รายงาน</Text>
                    </HStack>
                  </GridItem>
                  <GridItem>
                    <HStack>
                      <Switch id='switch-shop' colorScheme={'green'} />
                      <Image width={24} height={24} src={'/images/menu/ร้านค้าของฉัน.png'} alt='shop' />
                      <Text>ร้านค้าของฉัน</Text>
                    </HStack>
                  </GridItem>
                  <GridItem>
                    <HStack>
                      <Switch id='switch-admin-management' colorScheme={'green'} />
                      <Image width={24} height={24} src={'/images/menu/จัดการแอดมิน.png'} alt='admin' />
                      <Text>จัดการแอดมิน</Text>
                    </HStack>
                  </GridItem>
                  <GridItem>
                    <HStack>
                      <Switch id='switch-store' colorScheme={'green'} />
                      <Image width={24} height={24} src={'/images/menu/คลังสินค้า.png'} alt='stock' />
                      <Text>คลังสินค้า</Text>
                    </HStack>
                  </GridItem>
                  <GridItem>
                    <HStack>
                      <Switch id='switch-setting' colorScheme={'green'} />
                      <Image width={24} height={24} src={'/images/menu/ตั้งค่า.png'} alt='setting' />
                      <Text>ตั้งค่า</Text>
                    </HStack>
                  </GridItem>
                </Grid>
              </FormControl>
            </ModalBody>
            <ModalFooter mt={10}>
              <Button onClick={onOpenCopyModal} background='#f84c01' color='white' mr={3}>
                เพิ่มแอดมิน
              </Button>
              <Button onClick={onCloseAddModal}>ยกเลิก</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {/* End Modal Add New Admin */}

        {/* Start Modal Copy Link */}
        <Modal
          isOpen={isOpenCopyModal}
          onClose={onCloseCopyModal}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Box mt={10} mb={5}>
                <Center>
                  <HStack>
                    <Image width={28} height={28} src={'/images/menu/จัดการแอดมิน.png'} />
                    <Text as='b' fontSize='4md' >เพิ่มแอดมิน</Text>
                  </HStack>
                </Center>
              </Box>
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody>

              <VStack p={[0, 5]}>
                <FormControl id="copy-link">
                  <Wrap align='center' float={'right'}>
                    <WrapItem>
                      <FormLabel m={0}>ลิ้งเข้าใช้งาน : </FormLabel>
                    </WrapItem>
                    <WrapItem>
                      <InputGroup>
                        <Input htmlSize={22} width='auto' placeholder='http://admin.picpang.com/login' />
                        <InputRightElement width='4.5rem'>
                          <Button h='1.75rem' size='sm'>
                            Copy
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </WrapItem>
                  </Wrap>
                </FormControl>

                <FormControl id="copy-username">
                  <Wrap align='center' float={'right'}>
                    <WrapItem>
                      <FormLabel m={0}>Username : </FormLabel>
                    </WrapItem>

                    <WrapItem>
                      <Input htmlSize={25} width='auto' placeholder='username@gmail.com' />
                    </WrapItem>
                  </Wrap>
                </FormControl>

                <FormControl id="copy-password">
                  <Wrap align='center' float={'right'}>
                    <WrapItem>
                      <FormLabel m={0}>Password : </FormLabel>
                    </WrapItem>

                    <WrapItem>
                      <Input htmlSize={25} width='auto' type={"password"} placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;' />
                    </WrapItem>
                  </Wrap>

                </FormControl>
              </VStack>


            </ModalBody>
            <ModalFooter mt={10}>
              <Button onClick={onOpenSuccessModal} background='#f84c01' color='white' mr={3} >
                คัดลอก
              </Button>
              <Button onClick={onCloseCopyModal}>ยกเลิก</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {/* End Modal Copy Link */}


        <Modal
          isOpen={isOpenSuccessModal}
          onClose={onCloseSuccessModal}
        >
          <ModalOverlay />
          <ModalContent pt={20} pb={20}>
            <ModalHeader>
              <Center>
                <Image width={110} height={110} src={'/images/menu/ร้านค้าของฉัน.png'} alt='เพิ่มแอดมินเรียบร้อย' />
              </Center>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody textAlign={'center'}>
              <Text as='b' fontSize='2xl' >เพิ่มแอดมินเรียบร้อยแล้ว</Text>
            </ModalBody>

            <ModalFooter justifyContent={'center'}>

              <Button size={'lg'} background='#f84c01' color='white' mt={10} onClick={onCloseSuccessModal}>
                ยืนยัน
              </Button>

            </ModalFooter>
          </ModalContent>
        </Modal>

      </Box>

    </>
  )
}
