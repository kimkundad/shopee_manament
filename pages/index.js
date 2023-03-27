import React, { useEffect, useRef } from "react";
import {
  Flex,
  Text,
  Image,
  Box,
  Grid,
  GridItem,
  Spacer,
} from "@chakra-ui/react";
import { Line, Doughnut, Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Table } from "@nextui-org/react";
import faker from "faker";
import Chart from "chart.js/auto";

export default function DashBoard() {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const dataLine = {
    labels: [
      "ม.ค.",
      "ก.พ.",
      "มี.ค.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
    ],
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40, 42, 49, 42, 45, 12],
        fill: false,
        borderColor: "red",
      },
    ],
  };

  const optionsLine = {
    maintainAspectRatio: false,
    aspectRatio: 1.5,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const dataDonut = {
    labels: [],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19],
        backgroundColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const optionsDonut = {
    cutout: "70%",
  };

  const textCenter = {
    id: "textCenter",
    beforeDatasetDraw(chart, args, pluginOptions) {
      const { ctx, data } = chart;
      let sum = 1200;
      ctx.save();
      ctx.font = "bolder 30px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        "จำนวน \n" + sum.toLocaleString(),
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      );
    },
  };

  const dataPie = {
    labels: [],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const optionsPie = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const optionsBar = {
    plugins: {
      title: {
        display: true,
        text: "Chart.js Bar Chart - Stacked",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const dataBar = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Dataset 2",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        label: "Dataset 3",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: "rgb(53, 162, 235)",
      },
    ],
  };
  return (
    <Box bg="gray.100">
      <Box>test</Box>

      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <Box bg="white" borderRadius="xl">
          <GridItem textAlign="-webkit-center" w="100%" h="300px" p="15px">
            สินค้าขายดี
            <Pie data={dataPie} options={optionsPie} />
          </GridItem>
          <Box p="25px">
            <Flex py="5px" borderBottom="1px solid">
              <Text>จำนวนขายรวม</Text>
              <Spacer />
              <Text>4,578</Text>
              <Spacer />
              <Text>จำนวนขายรวม</Text>
              <Spacer />
              <Text>4,578</Text>
            </Flex>
            <Flex py="5px" borderBottom="1px solid">
              <Text>จำนวนขายรวม</Text>
              <Spacer />
              <Text>4,578</Text>
              <Spacer />
              <Text>จำนวนขายรวม</Text>
              <Spacer />
              <Text>4,578</Text>
            </Flex>
            <Flex py="5px" justifyContent="center">
              <Text>จำนวนขายรวม</Text>
              <Text pl="70px">4,578</Text>
            </Flex>
          </Box>
        </Box>
        <Box bg="white" borderRadius="xl">
          <GridItem textAlign="-webkit-center" w="100%" h="300px" p="15px">
            ร้านค้าขายดี
            <Pie data={dataPie} options={optionsPie} />
          </GridItem>
          <Box p="25px">
            <Flex py="5px" borderBottom="1px solid">
              <Text>จำนวนขายรวม</Text>
              <Spacer />
              <Text>4,578</Text>
              <Spacer />
              <Text>จำนวนขายรวม</Text>
              <Spacer />
              <Text>4,578</Text>
            </Flex>
            <Flex py="5px" borderBottom="1px solid">
              <Text>จำนวนขายรวม</Text>
              <Spacer />
              <Text>4,578</Text>
              <Spacer />
              <Text>จำนวนขายรวม</Text>
              <Spacer />
              <Text>4,578</Text>
            </Flex>
            <Flex py="5px" justifyContent="center">
              <Text>จำนวนขายรวม</Text>
              <Text pl="70px">4,578</Text>
            </Flex>
          </Box>
        </Box>
      </Grid>

      <Box
        bg="white"
        textAlign="center"
        w="100%"
        h="500px"
        borderRadius="xl"
        p="30px"
        my="20px"
      >
        ยอดขายทั้งหมด
        <Line data={dataLine} options={optionsLine} />
      </Box>
      <Grid templateColumns="repeat(2, 1fr)" gap={6} mb="20px">
        <GridItem
          textAlign="-webkit-center"
          w="100%"
          h="100%"
          p="15px"
          bg="white"
          borderRadius="xl"
        >
          สินค้าขายดี
          <Table
            aria-label="Example table with static content"
            css={{
              height: "auto",
              minWidth: "100%",
            }}
          >
            <Table.Header>
              <Table.Column>NAME</Table.Column>
              <Table.Column>ROLE</Table.Column>
              <Table.Column>STATUS</Table.Column>
            </Table.Header>
            <Table.Body>
              <Table.Row key="1">
                <Table.Cell>Tony Reichert</Table.Cell>
                <Table.Cell>CEO</Table.Cell>
                <Table.Cell>Active</Table.Cell>
              </Table.Row>
              <Table.Row key="2">
                <Table.Cell>Zoey Lang</Table.Cell>
                <Table.Cell>Technical Lead</Table.Cell>
                <Table.Cell>Paused</Table.Cell>
              </Table.Row>
              <Table.Row key="3">
                <Table.Cell>Jane Fisher</Table.Cell>
                <Table.Cell>Senior Developer</Table.Cell>
                <Table.Cell>Active</Table.Cell>
              </Table.Row>
              <Table.Row key="4">
                <Table.Cell>William Howard</Table.Cell>
                <Table.Cell>Community Manager</Table.Cell>
                <Table.Cell>Vacation</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </GridItem>
        <GridItem
          textAlign="-webkit-center"
          w="100%"
          h="100%"
          p="15px"
          bg="white"
          borderRadius="xl"
        >
          ยอดขายร้านค้า
          <Bar options={optionsBar} data={dataBar} />
        </GridItem>
      </Grid>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem
          textAlign="-webkit-center"
          w="100%"
          h="100%"
          p="15px"
          bg="white"
          borderRadius="xl"
        >
          สินค้า
          <Doughnut
            data={dataDonut}
            options={optionsDonut}
            plugins={[textCenter]}
          />
          <Box>
            <Flex>
              <Text>จำนวนคงเหลือ</Text>
              <Spacer />
              <Text>899 ชิ้น</Text>
            </Flex>
            <Flex>
              <Text>จำนวนขายออก</Text>
              <Spacer />
              <Text>301 ชิ้น</Text>
            </Flex>
          </Box>
        </GridItem>
        <GridItem
          textAlign="-webkit-center"
          w="100%"
          h="100%"
          p="15px"
          bg="white"
          borderRadius="xl"
        >
          การจัดส่ง
          <Doughnut
            data={dataDonut}
            options={optionsDonut}
            plugins={[textCenter]}
          />
          <Box>
            <Flex>
              <Text>การจัดส่งพัสดุด่วน</Text>
              <Spacer />
              <Text>899 ชิ้น</Text>
            </Flex>
            <Flex>
              <Text>พัสดุลงทะเบียน</Text>
              <Spacer />
              <Text>301 ชิ้น</Text>
            </Flex>
          </Box>
        </GridItem>
        <GridItem
          textAlign="-webkit-center"
          w="100%"
          h="100%"
          p="15px"
          bg="white"
          borderRadius="xl"
        >
          การชำระเงิน
          <Doughnut
            data={dataDonut}
            options={optionsDonut}
            plugins={[textCenter]}
          />
          <Box>
            <Flex>
              <Text>โอนเงิน</Text>
              <Spacer />
              <Text>899 ชิ้น</Text>
            </Flex>
            <Flex>
              <Text>เก็บเงินปลายทาง</Text>
              <Spacer />
              <Text>301 ชิ้น</Text>
            </Flex>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}
