import React from "react";
import { FaBeer } from 'react-icons/fa';
import { Container, Row, Col, Card, Grid, Text, Button } from "@nextui-org/react";
import Image from 'next/image'


export default function Setting() {


  return (
    <>

      <Grid.Container gap={2}>
        <Grid sm={12} md={12} justify="center">
          <Image width={36} height={36} src={'/images/menu/ตั้งค่า.png'} />
          <Text as='b' fontSize='4xl' pt={3}> ตั้งค่า</Text>
        </Grid>

        <Grid sm={12} md={12}>
          <Card css={{ mw: "100%" }}>
            <Card.Header css={{ bg: 'red' }}>
              <Text b color={'white'}><FaBeer />ข้อมูลทั่วไป</Text>
            </Card.Header>
            <Card.Divider />

            <Card.Body css={{ py: "$5" }}>
              <Text>โปรไฟล์ของฉัน</Text>
            </Card.Body>
          </Card>
        </Grid>

        <Grid sm={12} md={12}>
          <Card css={{ mw: "100%" }}>
            <Card.Header css={{ bg: 'red' }}>
              <Text b color={'white'}>ตั้งค่าหน้าร้าน</Text>
            </Card.Header>
            <Card.Divider />

            <Card.Body css={{ py: "$5" }}>
              <Text>แก้ไขข้อมูล</Text>
            </Card.Body>
            <Card.Divider />

            <Card.Body css={{ py: "$5" }}>
              <Text>รูปแบบร้านค้า</Text>
            </Card.Body>
            <Card.Divider />

            <Card.Body css={{ py: "$5" }}>
              <Text>ตกแต่งร้าน</Text>
            </Card.Body>
          </Card>
        </Grid>

        <Grid sm={12} md={12}>
          <Card css={{ mw: "100%" }}>
            <Card.Header css={{ bg: 'red' }}>
              <Text b color={'white'}>ช่องทางการชำระเงิน</Text>
            </Card.Header>
            <Card.Divider />

            <Card.Body css={{ py: "$5" }}>
              <Text>ชำระเงินแบบโอน</Text>
            </Card.Body>
            <Card.Divider />

            <Card.Body css={{ py: "$5" }}>
              <Text>เก็บเงินปลายทาง (COD)</Text>
            </Card.Body>
          </Card>
        </Grid>

        <Grid sm={12} md={12}>
          <Card css={{ mw: "100%" }}>
            <Card.Header css={{ bg: 'red' }}>
              <Text b color={'white'}>แจ้งเตือน</Text>
            </Card.Header>
            <Card.Divider />

            <Card.Body css={{ py: "$5" }}>
              <Text>แจ้งเตือนออเดอร์</Text>
            </Card.Body>
          </Card>
        </Grid>

      </Grid.Container>

    </>
  );
}