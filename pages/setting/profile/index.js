import React from "react";
import Image from 'next/image';
import {
    Box, Text, HStack, Center, Input, Button,
    Spacer, Avatar, AvatarBadge, Select, IconButton, Flex, Stack,
    InputGroup, InputLeftElement, Wrap, WrapItem,
    FormControl, FormLabel, Lorem, LinkBox, Grid, GridItem,
    Switch, VStack, InputRightElement, Textarea, ButtonGroup,
    RadioGroup, Radio,
} from "@chakra-ui/react"
import {
    AddIcon, EditIcon, DeleteIcon, Icon,
    ArrowLeftIcon, ArrowRightIcon, SearchIcon
} from '@chakra-ui/icons';
import { BsArrowLeftCircle, BsPerson, BsCameraFill } from "react-icons/bs";
import { FaRegSave } from "react-icons/fa";
import { VscSave } from "react-icons/vsc";

export default function Profile() {


    return (
        <>

            <Box
                p={[5, 10]}
            >
                <Box>
                    <Button size='sm' onClick={''} leftIcon={<BsArrowLeftCircle />} background='#f84c01' color='white'>ย้อนกลับ</Button >
                </Box>
                <Box>
                    <Center>
                        <HStack>
                            <Image width={42} height={42} src={'/images/menu/ตั้งค่า.png'} />
                            <Text as='b' fontSize='4xl'> ตั้งค่า</Text>
                        </HStack>
                    </Center>
                </Box>
            </Box>

            <Box bg={'#f3f4f6'} pl={10} pt={2} pb={2}>
                <HStack>
                    <Icon as={BsPerson} boxSize={8} />
                    <Text pt='1' pl='2' as='b' fontSize='21' > โปรไฟล์ของฉัน</Text>
                </HStack>
            </Box>

            <Box pt={10} pb={10}>
                <Grid
                    templateColumns='repeat(3, 1fr)'
                    gap={2}
                >
                    <GridItem>
                        <Center>
                            <Avatar size='2xl' name='Segun Adebayo' src='https://bit.ly/sage-adebayo'>
                                <AvatarBadge
                                    boxSize={10}
                                    borderColor="#f84c01"
                                    bg='white'
                                    borderWidth={2}

                                >
                                    <Icon as={BsCameraFill} boxSize={6} color={'#f84c01'} />
                                </AvatarBadge>
                            </Avatar>
                        </Center>
                    </GridItem>


                    <GridItem pr={10}>
                        <FormControl>
                            <HStack justify='right'>
                                <Box>
                                    <FormLabel>ชื่อ-นามสกุล : </FormLabel>
                                </Box>
                                <Box>
                                    <Input placeholder='Christian Nwamba' />
                                </Box>
                            </HStack>

                            <HStack justify='right' mt={2}>
                                <Box>
                                    <FormLabel>เพศ : </FormLabel>
                                </Box>
                                <Box>
                                    <RadioGroup defaultValue='2'>
                                        <Stack spacing={5} direction='row'>
                                            <Radio colorScheme='green' value='1'>ชาย</Radio>
                                            <Radio colorScheme='green' value='2'>หญิง</Radio>
                                            <Radio colorScheme='green' value='3'>อื่นๆ</Radio>
                                            <Radio colorScheme='green' value='4'>ไม่ระบุ</Radio>
                                        </Stack>
                                    </RadioGroup>
                                </Box>

                            </HStack>

                            <HStack justify='right' mt={2}>
                                <Box>
                                    <FormLabel>ที่อยู่ : </FormLabel>
                                </Box>
                                <Box>
                                    <Textarea placeholder='26985 Brighton Lane, Lake Forest, CA 92630' />
                                </Box>
                            </HStack>

                            <HStack justify='right' mt={2}>
                                <Box>
                                    <FormLabel>ตำบล : </FormLabel>
                                </Box>
                                <Box>
                                    <Input placeholder='ตำบล' />
                                </Box>
                            </HStack>

                            <HStack justify='right' mt={2}>
                                <Box>
                                    <FormLabel>อำเภอ : </FormLabel>
                                </Box>
                                <Box>
                                    <Input placeholder='อำเภอ' />
                                </Box>
                            </HStack>

                            <HStack justify='right' mt={2}>
                                <Box>
                                    <FormLabel>จังหวัด : </FormLabel>
                                </Box>
                                <Box>
                                    <Input placeholder='จังหวัด' />
                                </Box>
                            </HStack>

                            <HStack justify='right' mt={2}>
                                <Box>
                                    <FormLabel>ไปรษณีย์ : </FormLabel>
                                </Box>
                                <Box>
                                    <Input placeholder='รหัสไปรษณีย์' />
                                </Box>
                            </HStack>

                            <HStack justify='right' mt={2}>
                                <Box>
                                    <FormLabel>ประเทศ : </FormLabel>
                                </Box>
                                <Box>
                                    <Input placeholder='ประเทศ' />
                                </Box>
                            </HStack>

                        </FormControl>

                    </GridItem>


                    <GridItem pr={10}>

                        <FormControl>
                            <HStack justify='right'>
                                <Box>
                                    <FormLabel>เบอร์โทร : </FormLabel>
                                </Box>
                                <Box>
                                    <Input placeholder='xxx-xxxx-xxx' />
                                </Box>
                            </HStack>

                            <HStack justify='right' mt={2}>
                                <Box>
                                    <FormLabel>อีเมลล์ : </FormLabel>
                                </Box>
                                <Box>
                                    <Input placeholder='Christian_N@gmail' />
                                </Box>
                            </HStack>

                            <HStack justify='right' mt={2}>
                                <Box>
                                    <FormLabel>
                                        <Image width={36} height={36} src={'/images/social/facebook.png'} />
                                    </FormLabel>
                                </Box>
                                <Box>
                                    <Input placeholder='facebook' />
                                </Box>
                            </HStack>

                            <HStack justify='right' mt={2}>
                                <Box>
                                    <FormLabel>
                                        <Image width={36} height={36} src={'/images/social/line.png'} />
                                    </FormLabel>
                                </Box>
                                <Box>
                                    <Input placeholder='LINE' />
                                </Box>
                            </HStack>

                            <HStack justify='right' mt={2}>
                                <Box>
                                    <FormLabel>
                                        <Image width={36} height={36} src={'/images/social/instagram.png'} />
                                    </FormLabel>
                                </Box>
                                <Box>
                                    <Input placeholder='Instagram' />
                                </Box>
                            </HStack>

                            <HStack justify='right' mt={2}>
                                <Box>
                                    <FormLabel>
                                        <Image width={36} height={36} src={'/images/social/twitter.png'} />
                                    </FormLabel>
                                </Box>
                                <Box>
                                    <Input placeholder='Twitter' />
                                </Box>
                            </HStack>

                            <HStack justify='right' mt={2}>
                                <Box>
                                    <FormLabel>
                                        <Image width={36} height={36} src={'/images/social/tik-tok.png'} />
                                    </FormLabel>
                                </Box>
                                <Box>
                                    <Input placeholder='Tik-Tok' />
                                </Box>
                            </HStack>

                            <HStack justify='right' mt={2}>
                                <Box>
                                    <FormLabel>
                                        <Image width={36} height={36} src={'/images/social/youtube.png'} />
                                    </FormLabel>
                                </Box>
                                <Box>
                                    <Input placeholder='Youtube' />
                                </Box>
                            </HStack>



                        </FormControl>

                    </GridItem>
                </Grid>
                <HStack justify='center' mt={10}>
                    <ButtonGroup gap='4'>
                        <Button colorScheme='gray'>ยกเลิก</Button>
                        <Button onClick={''} leftIcon={<VscSave />} background='#f84c01' color='white'>บันทึก</Button >
                    </ButtonGroup>
                </HStack>
            </Box>

        </>
    );
}