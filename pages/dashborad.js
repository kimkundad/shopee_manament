import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import {
  Flex,
  Text,
  Image,
  Box,
  Grid,
  GridItem,
  Spacer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { Line, Doughnut, Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import faker from "faker";
import Chart from "chart.js/auto";
import ModalLogin from "@/components/ModalLogin";
import axios from "axios";
export default function DashBoard() {
  const [dataTable, setDataTable] = useState([]);
  const [dataPieProducts, setDataPieProducts] = useState([]);
  const [dataPieShops, setDataPieShops] = useState([]);
  const [dataLines, setDataLine] = useState([]);
  const [dataBars, setDataBar] = useState([]);
  const [allStock, setAllStock] = useState(null);
  const [totalSales, setTotalSales] = useState();
  const [totalDelivery, setTotalDelivery] = useState(null);
  useEffect(() => {
    async function fecthdata() {
      const formdata = new FormData();
      let user_id = 3; // ถ้ามี login เปลี่ยนเป็น uid ของคน login
      formdata.append("uid", user_id);
      const res = await axios.post(
        `https://shopee-api.deksilp.com/api/dashboard`,
        formdata
      );
      setDataTable(res.data.data_table);
      setDataPieProducts(res.data.data_chart_pie_products);
      setDataPieShops(res.data.data_chart_pie_shops);
      setDataLine(res.data.data_chart_line);
      setDataBar(res.data.data_chart_bar);
      setAllStock(res.data.all_stock[0].allStock);
      setTotalSales(res.data.total_sales[0].total_sales);
      setTotalDelivery(res.data.total_delivery[0]);
    }
    fecthdata();
  }, []);
  console.log(dataTable);
  console.log(dataPieProducts);
  console.log(dataPieShops);
  console.log(dataLines);
  console.log(dataBars);
  console.log(allStock);
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

  const dataDonutStock = {
    labels: [],
    datasets: [
      {
        label: "# of Votes",
        data: [totalSales, allStock],
        backgroundColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const dataDonutDelivery = {
    labels: [],
    datasets: [
      {
        label: "# of Votes",
        data: [totalDelivery?.sum_payment, totalDelivery?.sum_cash_on_delivery],
        backgroundColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const optionsDonut = {
    cutout: "70%",
  };

  const [textCenterStock, setTextCenterStock] = useState(false);
  const [textCenterDelivery, setTextCenterDelivery] = useState(false);
  useEffect(() => {
    if (allStock !== null && totalDelivery !== null) {
      const stock = {
        id: "textCenter",
        beforeDatasetDraw(chart, args, pluginOptions) {
          const { ctx, data } = chart;
          let sum = parseInt(allStock);
          ctx.save();
          ctx.font = "20px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(
            "จำนวน",
            chart.getDatasetMeta(0).data[0].x,
            chart.getDatasetMeta(0).data[0].y - 10
          );
          ctx.fillText(
            sum?.toLocaleString(),
            chart.getDatasetMeta(0).data[0].x,
            chart.getDatasetMeta(0).data[0].y + 20
          );
        },
      };
      setTextCenterStock(stock);
      const delivery = {
        id: "textCenter",
        beforeDatasetDraw(chart, args, pluginOptions) {
          const { ctx, data } = chart;
          let sum =
            parseInt(totalDelivery.sum_payment) +
            parseInt(totalDelivery.sum_cash_on_delivery);
          ctx.save();
          ctx.font = "20px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(
            "จำนวน",
            chart.getDatasetMeta(0).data[0].x,
            chart.getDatasetMeta(0).data[0].y - 10
          );
          ctx.fillText(
            sum?.toLocaleString(),
            chart.getDatasetMeta(0).data[0].x,
            chart.getDatasetMeta(0).data[0].y + 20
          );
        },
      };
      setTextCenterDelivery(delivery);
    }
  }, [allStock]);

  const dataPieProduct = {
    labels: [],
    datasets: [
      {
        label: "My First Dataset",
        data: [
          dataPieProducts[0]?.total_num,
          dataPieProducts[1]?.total_num,
          dataPieProducts[2]?.total_num,
        ],
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
  const dataPieShop = {
    labels: [],
    datasets: [
      {
        label: "My First Dataset",
        data: [
          dataPieProducts[0]?.total_num,
          dataPieProducts[1]?.total_num,
          dataPieProducts[2]?.total_num,
        ],
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
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.parsed}`;
          },
        },
      },
    },
  };

  const optionsBar = {
    plugins: {
      title: {
        display: true,
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

  const test = [10, 12, 12, 45, 78, 42, 10];
  const dataBar = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: test.map((item) => item),
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Dataset 2",
        data: test.map((item) => item),
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        label: "Dataset 3",
        data: test.map((item) => item),
        backgroundColor: "rgb(53, 162, 235)",
      },
    ],
  };

  const divRef = useRef(null);
  const [divHeight, setDivHeight] = useState(null);

  useLayoutEffect(() => {
    if (divRef.current) {
      setDivHeight(divRef.current.getBoundingClientRect().height);
    }
  }, [divHeight]);

  return (
    <Box bg="gray.100">
      <Box>test</Box>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <Box bg="white" borderRadius="xl">
          <GridItem textAlign="-webkit-center" w="100%" h="300px" p="15px">
            สินค้าขายดี
            <Pie data={dataPieProduct} options={optionsPie} />
          </GridItem>
          <Box p="25px">
            {dataPieProducts?.map((item, index) => {
              return (
                <Flex py="5px" borderBottom="1px solid">
                  <Text>จำนวนขายรวม</Text>
                  <Spacer />
                  <Text>{item.total_num}</Text>
                </Flex>
              );
            })}
          </Box>
        </Box>
        <Box bg="white" borderRadius="xl">
          <GridItem textAlign="-webkit-center" w="100%" h="300px" p="15px">
            ร้านค้าขายดี
            <Pie data={dataPieShop} options={optionsPie} />
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
        {divHeight ? (
          <GridItem
            textAlign="-webkit-center"
            w="100%"
            h={`${divHeight}px`}
            p="15px"
            bg="white"
            overflow="auto"
            borderRadius="xl"
          >
            <Table
              variant="striped"
              colorScheme="gray"
              css={{
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <Thead bg="red">
                <Tr>
                  <Th>
                    <Text>ชื่อร้าน</Text>
                  </Th>
                  <Th>
                    <Text>ยอดขาย</Text>
                  </Th>
                  <Th>
                    <Text>สินค้าขายดี</Text>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {dataTable?.map((item, index) => {
                  return (
                    <Tr>
                      <Td>{item.name_shop}</Td>
                      <Td>{parseFloat(item.total_price).toLocaleString()}</Td>
                      <Td>{item.name_product}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </GridItem>
        ) : null}
        <GridItem
          textAlign="-webkit-center"
          w="100%"
          h="100%"
          p="15px"
          bg="white"
          borderRadius="xl"
          ref={divRef}
        >
          ยอดขายร้านค้า
          <Bar options={optionsBar} data={dataBar} />
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
          <Box h="200px">
            {textCenterStock ? (
              <Doughnut
                data={dataDonutStock}
                options={optionsDonut}
                plugins={[textCenterStock]}
              />
            ) : null}
          </Box>
          <Box>
            <Flex>
              <Text>จำนวนคงเหลือ</Text>
              <Spacer />
              <Text>
                {parseInt(allStock - totalSales).toLocaleString()} ชิ้น
              </Text>
            </Flex>
            <Flex>
              <Text>จำนวนขายออก</Text>
              <Spacer />
              <Text>{parseInt(totalSales).toLocaleString()} ชิ้น</Text>
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
          <Box h="200px">
            <Doughnut
              data={dataDonutDelivery}
              options={optionsDonut}
              plugins={[textCenterStock]}
            />
          </Box>
          <Box>
            <Flex>
              <Text>การจัดส่งพัสดุด่วน</Text>
              <Spacer />
              <Text>{allStock - totalSales} ชิ้น</Text>
            </Flex>
            <Flex>
              <Text>พัสดุลงทะเบียน</Text>
              <Spacer />
              <Text>{totalSales} ชิ้น</Text>
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
          <Box h="200px">
            {textCenterDelivery ? (
              <Doughnut
                data={dataDonutDelivery}
                options={optionsDonut}
                plugins={[textCenterDelivery]}
              />
            ) : null}
          </Box>
          <Box>
            <Flex>
              <Text>โอนเงิน</Text>
              <Spacer />
              <Text>
                {parseInt(totalDelivery?.sum_payment).toLocaleString()} ชิ้น
              </Text>
            </Flex>
            <Flex>
              <Text>เก็บเงินปลายทาง</Text>
              <Spacer />
              <Text>
                {parseInt(totalDelivery?.sum_cash_on_delivery).toLocaleString()}{" "}
                ชิ้น
              </Text>
            </Flex>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}
