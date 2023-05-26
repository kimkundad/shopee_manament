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
import moment from "moment";
import axios from "axios";
import DateRangePicker from "@/components/DateRangePicker";

export default function DashBoard() {
  const [dataTable, setDataTable] = useState([]);
  const [dataPieProducts, setDataPieProducts] = useState([]);
  const [dataPieShops, setDataPieShops] = useState([]);
  const [dataLines, setDataLine] = useState([]);
  const [dataBars, setDataBars] = useState([]);
  const [dataShopBars, setDataShopBars] = useState([]);
  const [allStock, setAllStock] = useState(null);
  const [totalSales, setTotalSales] = useState();
  const [totalDelivery, setTotalDelivery] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  const [startDatePie, setStartDatePie] = useState(
    moment().startOf("month").unix()
  );
  const [endDatePie, setEndDatePie] = useState(moment().endOf("month").unix());
  const getDateRangePie = (start, end) => {
    setStartDatePie(start.unix());
    setEndDatePie(end.unix());
  };
  const [startDateBar, setStartDateBar] = useState(
    moment().startOf("day").unix()
  );
  const [endDateBar, setEndDateBar] = useState(moment().endOf("day").unix());
  const getDateRangeBar = (start, end) => {
    setStartDateBar(start.unix());
    setEndDateBar(end.unix());
  };
  useEffect(() => {
    async function fecthdata() {
      const formdata = new FormData();
      let user_id = 8863299; // ถ้ามี login เปลี่ยนเป็น user_code ของคน login
      formdata.append("uid", user_id);
      formdata.append("startDatePie", startDatePie);
      formdata.append("endDatePie", endDatePie);
      formdata.append("startDateBar", startDateBar);
      formdata.append("endDateBar", endDateBar);
      const res = await axios.post(
        `https://api.sellpang.com/api/dashboard`,
        formdata
      );
      setDataTable(res.data.data_table);
      setDataPieProducts(res.data.data_chart_pie_products);
      setDataPieShops(res.data.data_chart_pie_shops);
      setDataLine(res.data.data_chart_line);
      setDataBars(res.data.data_chart_bar);
      setAllStock(res.data.all_stock[0].allStock);
      setTotalSales(res.data.total_sales[0].total_sales);
      setTotalDelivery(res.data.total_delivery[0]);
      setTotalPayment(res.data.total_payment[0]);
      setDataShopBars(res.data.data_shop_bar);
    }
    fecthdata();
  }, []);
  useEffect(() => {
    async function fecthdata() {
      const formdata = new FormData();
      let user_id = 8863299; // ถ้ามี login เปลี่ยนเป็น uid ของคน login
      formdata.append("uid", user_id);
      formdata.append("startDatePie", startDatePie);
      formdata.append("endDatePie", endDatePie);
      formdata.append("startDateBar", startDateBar);
      formdata.append("endDateBar", endDateBar);
      const res = await axios.post(
        `https://api.sellpang.com/api/dashboard`,
        formdata
      );
      setDataTable(res.data.data_table);
      setDataPieProducts(res.data.data_chart_pie_products);
      setDataPieShops(res.data.data_chart_pie_shops);
      setDataLine(res.data.data_chart_line);
      setDataBars(res.data.data_chart_bar);
      setAllStock(res.data.all_stock[0].allStock);
      setTotalSales(res.data.total_sales[0].total_sales);
      setTotalDelivery(res.data.total_delivery[0]);
      setTotalPayment(res.data.total_payment[0]);
      setDataShopBars(res.data.data_shop_bar);
    }
    fecthdata();
  }, [startDateBar, startDatePie]);
  ChartJS.register(ArcElement, Tooltip, Legend);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
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
        label: "",
        data: dataLines.map((element) => element.total_price),
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
        data: [allStock, totalSales],
        backgroundColor: ["rgba(0, 9, 255, 1)", "rgba(213, 213, 213, 1)"],
        borderColor: ["rgba(0, 9, 255, 1)", "rgba(213, 213, 213, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const dataDonutDelivery = {
    labels: [],
    datasets: [
      {
        label: "# of Votes",
        data: [totalDelivery?.sum_sent, totalDelivery?.sum_not_sent],
        backgroundColor: ["rgba(255, 51, 153, 1)", "rgba(213, 213, 213, 1)"],
        borderColor: ["rgba(255, 51, 153, 1)", "rgba(213, 213, 213, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const dataDonutPaymnet = {
    labels: [],
    datasets: [
      {
        label: "# of Votes",
        data: [totalPayment?.sum_payment, totalPayment?.sum_cash_on_delivery],
        backgroundColor: ["rgba(255, 230, 0, 1)", "rgba(213, 213, 213, 1)"],
        borderColor: ["rgba(255, 230, 0, 1)", "rgba(213, 213, 213, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const optionsDonut = {
    cutout: "63%",
  };

  const color = [
    "rgba(0, 9, 255)",
    "rgb(255, 99, 132)",
    "rgba(245, 170, 39, 1)",
    "rgba(245, 217, 39, 1)",
    "rgba(39, 200, 245, 1)",
  ];

  const [textCenterStock, setTextCenterStock] = useState(false);
  const [textCenterDelivery, setTextCenterDelivery] = useState(false);
  const [textCenterPayment, setTextCenterPayment] = useState(false);

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
            parseInt(totalDelivery.sum_sent) +
            parseInt(totalDelivery.sum_not_sent);
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
      const payment = {
        id: "textCenter",
        beforeDatasetDraw(chart, args, pluginOptions) {
          const { ctx, data } = chart;
          let sum =
            parseInt(totalPayment.sum_payment) +
            parseInt(totalPayment.sum_cash_on_delivery);
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
      setTextCenterPayment(payment);
    }
  }, [allStock, totalDelivery]);

  const dataPieShop = {
    labels: [],
    datasets: [
      {
        label: "My First Dataset",
        data: dataPieShops.map((element) => element.total_num),
        backgroundColor: color,
        borderColor: color,
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

  const [dataBar, setDataBar] = useState(false);
  useEffect(() => {
    const labels = [];
    const shop = dataShopBars;

    const shops = shop.map((item) => {
      return { name_shop: item.name_shop, data: [] };
    });
    dataBars?.forEach((item, index) => {
      labels.push(item.month);
      item.data.forEach((subItem) => {
        let shopIndex = shops.findIndex(
          (item) => item.name_shop == subItem.name_shop
        );
        shops[shopIndex].data.push(subItem.total_num);
      });
      shops.forEach((shop) => {
        if (shop.data.length == index) {
          shop.data.push(0);
        }
      });
    });

    const data = shops.map((item, index) => {
      return {
        label: item.name_shop,
        data: item.data,
        backgroundColor: color[index],
      };
    });
    const newDataBar = {
      labels,
      datasets: data,
    };
    setDataBar(newDataBar);
  }, [dataBars]);

  const divRef = useRef(null);
  const [divHeight, setDivHeight] = useState(null);

  useLayoutEffect(() => {
    if (divRef.current) {
      setDivHeight(divRef.current.getBoundingClientRect().height);
    }
  }, [dataBar]);

  const chartRefProduct = useRef(null);
  const chartRefShops = useRef(null);
  useEffect(() => {
    const data = {
      labels: dataPieProducts.map((element) => element.name_product),
      datasets: [
        {
          label: "My First Dataset",
          data: dataPieProducts.map((element) => parseInt(element.total_num)),
          backgroundColor: color,
          borderColor: color,
          borderWidth: 1,
        },
      ],
    };

    const pieLabelLine = {
      id: "pieLabelLine",
      afterDraw(chart, args, options) {
        const {
          ctx,
          chartArea: { top, bottom, left, right, width, height },
        } = chart;

        chart.data.datasets.forEach((dataset, i) => {
          chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
            const { x, y, startAngle, endAngle } = datapoint.getProps([
              "x",
              "y",
              "startAngle",
              "endAngle",
            ]);

            const radius = datapoint.outerRadius;
            const midAngle = (startAngle + endAngle) / 2;
            const x1 = Math.cos(midAngle) * radius + datapoint.x;
            const y1 = Math.sin(midAngle) * radius + datapoint.y;

            const xLine = x1 >= width / 2 ? x1 + 15 : x1 - 15;
            const yLine = y1 >= height / 2 ? y1 + 15 : y1 - 15;
            const extraLine = x1 >= width / 2 ? 15 : -15;

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(xLine, yLine);
            ctx.lineTo(xLine + extraLine, yLine);
            ctx.strokeStyle = dataset.borderColor[index];
            ctx.stroke();

            const textWidth = ctx.measureText(chart.data.labels[index]).width;
            ctx.font = "15px Arial";

            const textXPosition = x1 >= width / 2 ? "left" : "right";
            const plushFivePx = x1 >= width / 2 ? 5 : -5;
            ctx.textAlign = textXPosition;
            ctx.textBaseline = "middle";
            ctx.fillStyle = dataset.borderColor[index];
            ctx.fillText(
              chart.data.labels[index],
              xLine + extraLine + plushFivePx,
              yLine
            );
          });
        });
      },
    };

    const config = {
      type: "pie",
      data,
      options: {
        layout:{
          padding: 20
        },
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
      plugins: [pieLabelLine],
    };
    const chart = new Chart(chartRefProduct.current, config);
    // Clean up the chart when the component unmounts
    return () => {
      chart.destroy();
      
    };
  }, [dataPieProducts,dataPieShops]);

  useEffect(() => {
    const data = {
      labels: dataPieShops?.map((element) => element.name_shop),
      datasets: [
        {
          label: "My First Dataset",
          data: dataPieShops?.map((element) => parseInt(element.total_num)),
          backgroundColor: color,
          borderColor: color,
          borderWidth: 1,
        },
      ],
    };

    const pieShopLabelLine = {
      id: "pieShopLabelLine",
      afterDraw(chart, args, options) {
        const {
          ctx,
          chartArea: { top, bottom, left, right, width, height },
        } = chart;

        chart.data.datasets.forEach((dataset, i) => {
          chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
            const { x, y, startAngle, endAngle } = datapoint.getProps([
              "x",
              "y",
              "startAngle",
              "endAngle",
            ]);

            const radius = datapoint.outerRadius;
            const midAngle = (startAngle + endAngle) / 2;
            const x1 = Math.cos(midAngle) * radius + datapoint.x;
            const y1 = Math.sin(midAngle) * radius + datapoint.y;

            const xLine = x1 >= width / 2 ? x1 + 15 : x1 - 15;
            const yLine = y1 >= height / 2 ? y1 + 15 : y1 - 15;
            const extraLine = x1 >= width / 2 ? 15 : -15;

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(xLine, yLine);
            ctx.lineTo(xLine + extraLine, yLine);
            ctx.strokeStyle = dataset.borderColor[index];
            ctx.stroke();

            const textWidth = ctx.measureText(chart.data.labels[index]).width;
            ctx.font = "15px Arial";

            const textXPosition = x1 >= width / 2 ? "left" : "right";
            const plushFivePx = x1 >= width / 2 ? 5 : -5;
            ctx.textAlign = textXPosition;
            ctx.textBaseline = "middle";
            ctx.fillStyle = dataset.borderColor[index];
            ctx.fillText(
              chart.data.labels[index],
              xLine + extraLine + plushFivePx,
              yLine
            );
          });
        });
      },
    };
    const configShops = {
      type: "pie",
      data,
      options: {
        layout:{
          padding: 20
        },
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
      plugins: [pieShopLabelLine],
    };
    const chart = new Chart(chartRefShops.current, configShops);
    // Clean up the chart when the component unmounts
    return () => {
      chart.destroy();
    };
  }, [dataPieShops]);

  // Clean up the chart when the component unmounts
  return (
    <Box bg="gray.100">
      <Box textAlign="-webkit-right" mb="1.25rem">
        <Box
          border="1px solid"
          borderRadius="md"
          fontSize="21px"
          borderColor="gray.500"
          w="150px"
          bg="white"
        >
          <DateRangePicker
            type="dashboard"
            id="chartPie"
            getDate={getDateRangePie}
          />
        </Box>
      </Box>
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
        <Box bg="white" borderRadius="xl">
          <Text fontSize="28px" p="15px" textAlign="center" fontWeight="bold">
            สินค้าขายดี
          </Text>
          <Box textAlign="-webkit-center" w="100%" height="300px" py="30px">
            {/* <Pie
              id="pieProduct"
              data={dataPieProduct}
              options={optionsPie}
              plugins={pie}
            /> */}
            <canvas ref={chartRefProduct}></canvas>
          </Box>
          <Box p="25px" pb="0px">
            <Grid templateColumns="repeat(2, 1fr)" gap={0}>
              {dataPieProducts?.map((item, index) => {
                return (
                  <GridItem
                    colSpan={
                      dataPieProducts?.length - 1 == index &&
                      dataPieProducts?.length % 2 !== 0
                        ? 2
                        : false
                    }
                    borderBottom={
                      dataPieProducts?.length - 1 == index &&
                      dataPieProducts?.length % 2 !== 0
                        ? "none"
                        : "1px solid"
                    }
                    pt="10px"
                  >
                    <Flex
                      px={
                        dataPieProducts?.length - 1 == index &&
                        dataPieProducts?.length % 2 !== 0
                          ? "35%"
                          : "20%"
                      }
                    >
                      <Box w="20px" h="20px" bg={color[index]} mx="20px"></Box>
                      <Text>จำนวนขายรวม</Text>
                      <Spacer />
                      <Text>{parseInt(item.total_num).toLocaleString()}</Text>
                    </Flex>
                  </GridItem>
                );
              })}
            </Grid>
          </Box>
        </Box>
        <Box bg="white" borderRadius="xl">
          <Box>
            <Text fontSize="28px" p="15px" textAlign="center" fontWeight="bold">
              ร้านค้าขายดี
            </Text>
          </Box>
          <Box textAlign="-webkit-center" w="100%" h="300px">
            {/* <Pie data={dataPieShop} options={optionsPie} /> */}
            <canvas ref={chartRefShops}></canvas>
          </Box>
          <Box p="25px" pb="0px">
            <Grid templateColumns="repeat(2, 1fr)" gap={0}>
              {dataPieShops?.map((item, index) => {
                return (
                  <GridItem
                    colSpan={
                      dataPieShops?.length - 1 == index &&
                      dataPieShops?.length % 2 !== 0
                        ? 2
                        : false
                    }
                    borderBottom={
                      dataPieShops?.length - 1 == index &&
                      dataPieShops?.length % 2 !== 0
                        ? "none"
                        : "1px solid"
                    }
                    pt="10px"
                  >
                    <Flex
                      px={
                        dataPieShops?.length - 1 == index &&
                        dataPieShops?.length % 2 !== 0
                          ? "35%"
                          : "20%"
                      }
                    >
                      <Box w="20px" h="20px" bg={color[index]} mx="20px"></Box>
                      <Text>จำนวนขายรวม</Text>
                      <Spacer />
                      <Text>{parseInt(item.total_num).toLocaleString()}</Text>
                    </Flex>
                  </GridItem>
                );
              })}
            </Grid>
          </Box>
        </Box>
      </Grid>

      <Box
        bg="white"
        textAlign="center"
        w="100%"
        h="500px"
        borderRadius="xl"
        py="60px"
        px="10px"
        my="20px"
      >
        <Text fontSize="28px" fontWeight="bold">
          ยอดขายทั้งหมด
        </Text>
        <Line data={dataLine} options={optionsLine} h="100%" />
      </Box>
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={6}
        mb="20px"
      >
        {divHeight ? (
          <GridItem
            textAlign="-webkit-center"
            w="100%"
            h={`${divHeight}px`}
            p="10px"
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
              h="vh"
            >
              <Thead bg="red">
                <Tr>
                  <Th py="20px">
                    <Text fontSize="24px" color="white">
                      ชื่อร้าน
                    </Text>
                  </Th>
                  <Th py="20px">
                    <Text fontSize="24px" color="white">
                      ยอดขาย
                    </Text>
                  </Th>
                  <Th py="20px">
                    <Text fontSize="24px" color="white">
                      สินค้าขายดี
                    </Text>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {dataTable?.map((item, index) => {
                  return (
                    <Tr fontSize="20px">
                      <Td>{item.name_shop}</Td>
                      <Td>{parseFloat(item.total_price).toLocaleString()}</Td>
                      <Td w="300px">
                        <Text>{item.name_product}</Text>
                      </Td>
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
          justifyContent="center"
          ref={divRef}
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Text
              pl="17%"
              fontSize="28px"
              textAlign="center"
              fontWeight="bold"
              flexGrow={1}
            >
              ยอดขายร้านค้า
            </Text>
            <Box
              border="1px solid"
              borderRadius="md"
              fontSize="21px"
              borderColor="gray.500"
              w="150px"
              bg="white"
            >
              <DateRangePicker
                type="dashboard"
                id="chartBar"
                getDate={getDateRangeBar}
              />
            </Box>
          </Flex>

          {dataBar ? <Bar options={optionsBar} data={dataBar} /> : null}
          <Box p="25px">
            <Grid templateColumns="repeat(2, 1fr)" gap={0}>
              {dataShopBars?.map((item, index) => {
                return (
                  <GridItem
                    colSpan={
                      dataShopBars?.length - 1 == index &&
                      dataShopBars.length % 2 !== 0
                        ? 2
                        : false
                    }
                    borderBottom={
                      dataShopBars?.length - 1 == index &&
                      dataShopBars.length % 2 !== 0
                        ? "none"
                        : "1px solid"
                    }
                    pt="10px"
                  >
                    <Flex
                      px={
                        dataShopBars?.length - 1 == index &&
                        dataShopBars.length % 2 !== 0
                          ? "35%"
                          : "20%"
                      }
                    >
                      <Box w="20px" h="20px" bg={color[index]} mx="20px"></Box>
                      <Text>จำนวนขายรวม</Text>
                      <Spacer />
                      <Text>{parseInt(item.total_num).toLocaleString()}</Text>
                    </Flex>
                  </GridItem>
                );
              })}
            </Grid>
          </Box>
        </GridItem>
      </Grid>
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
        <GridItem
          textAlign="-webkit-center"
          w="100%"
          h="100%"
          p="15px"
          bg="white"
          borderRadius="xl"
        >
          <Text fontSize="28px" textAlign="center" fontWeight="bold">
            สินค้า
          </Text>
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
          <Text fontSize="28px" textAlign="center" fontWeight="bold">
            การจัดส่ง
          </Text>

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
              <Text>พัสดุลงทะเบียน</Text>
              <Spacer />
              <Text>
                {parseInt(totalDelivery?.sum_sent).toLocaleString()} ชิ้น
              </Text>
            </Flex>
            <Flex>
              <Text>พัสดุที่ยังไม่ลงทะเบียน</Text>
              <Spacer />
              <Text>
                {parseInt(totalDelivery?.sum_not_sent).toLocaleString()} ชิ้น
              </Text>
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
          <Text fontSize="28px" textAlign="center" fontWeight="bold">
            การชำระเงิน
          </Text>

          <Box h="200px">
            {textCenterPayment ? (
              <Doughnut
                data={dataDonutPaymnet}
                options={optionsDonut}
                plugins={[textCenterPayment]}
              />
            ) : null}
          </Box>
          <Box>
            <Flex>
              <Text>โอนเงิน</Text>
              <Spacer />
              <Text>
                {parseInt(totalPayment?.sum_payment).toLocaleString()} ชิ้น
              </Text>
            </Flex>
            <Flex>
              <Text>เก็บเงินปลายทาง</Text>
              <Spacer />
              <Text>
                {parseInt(totalPayment?.sum_cash_on_delivery).toLocaleString()}{" "}
                ชิ้น
              </Text>
            </Flex>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}
