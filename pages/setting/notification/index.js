import React, { useState,useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link'
import ButtonBack from '@/components/button/ButtonBack'
import {
    Box, Text, HStack, Center, Button,
    Spacer, Flex, Switch, VStack
} from "@chakra-ui/react"
import { Icon } from '@chakra-ui/icons';
import { BsArrowLeftCircle, BsBell } from "react-icons/bs";
import { connect, useDispatch, useSelector } from "react-redux";
import axios from "axios";
export default function Notification() {
    const userInfo = useSelector((App) => App.userInfo);
    const [active ,setActive] = useState();

    useEffect(() => {
        async function fecthdata(){
            const formdata = new FormData();
            formdata.append("user_code",userInfo.data[0]?.code_user);
            const res = await axios.post(
                `https://api.sellpang.com/api/getOwnerSetting`,
                formdata
            )
            setActive(JSON.parse(res.data.setting.setting));
        }
        fecthdata();
    },[])

    const activeNoti = (event) => {
        let objs = {"notification": event.target.checked}
        let setting = JSON.stringify(objs)
        async function fecthdata(){
            const formdata = new FormData();
            formdata.append("user_code",userInfo.data[0]?.code_user);
            formdata.append("setting",setting);
            const res = await axios.post(
                `https://api.sellpang.com/api/setNotification`,
                formdata
            )
            setActive(JSON.parse(res.data.setting.setting));
        }
        fecthdata();
    }
    return (
        <>

            <Box
                p={[5, 10]}
            >
                <Box>
                    <ButtonBack />
                </Box>
                <Box>
                    <Center>
                        <HStack>
                            <Image width={36} height={36} src={'/images/menu/ตั้งค่า.png'} />
                            <Text as='b' fontSize='4xl' pt={3}> ตั้งค่า</Text>
                        </HStack>
                    </Center>
                </Box>
            </Box>

            <Box bg={'#f3f4f6'} pl={10} pt={2} pb={2}>
                <HStack>
                    <Icon as={BsBell} boxSize={8} />
                    <Text as='b' fontSize='lg'>แจ้งเตือนออเดอร์</Text>
                </HStack>
            </Box>

            <Box p={10} minHeight={400}>
                <VStack
                    spacing={5}
                    align='stretch'
                >
                    <Box p={5} fontSize='17' color='gray.600' borderWidth='2px' borderColor={'gray.500'} borderRadius='lg'>
                        <Flex align={'center'}>
                            <Box>
                                <Text as='b' fontSize='21'>เปิดการแจ้งเตือนออเดอร์</Text>
                                <br />
                                <Text>ส่งการแจ้งเตือนทุกครั้งเมื่อมีออเดอร์เข้ามา</Text>
                            </Box>
                            <Spacer />
                            <Box>
                                <Switch size='lg' colorScheme='green' isChecked={active?.notification} onChange={(e) => activeNoti(e)}/>
                            </Box>
                        </Flex>
                    </Box>
                </VStack>
            </Box>

        </>
    );
}