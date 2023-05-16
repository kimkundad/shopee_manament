import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  Spacer,
  Button,
  Wrap,
  HStack,
  WrapItem,
  Select,
  Skeleton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import ListCheck from "@/components/MenuList";
import Link from "next/link";
import axios from "axios";
import { jsPDF } from "jspdf";
import DBadmanX from "@/components/DBadmanX";
import DBadmanXBold from "@/components/DBadmanXBold";
import autoTable from "jspdf-autotable";
import THSarabunNew from "@/components/THSarabunNew";
import THSarabunNewBold from "@/components/THSarabunNewBold";
function index() {
  const [reports, setReports] = useState([]);
  const [loadingImg, setLoadingImg] = useState(true);
  const [column, setColumn] = useState([
    {
      label: "วันที่",
    },
    {
      label: "ชื่อร้านค้า",
    },
    {
      label: "ชื่อสินค้า",
    },
    {
      label: "รหัสสินค้า",
    },
    {
      label: "ลิงค์ร้านค้า",
    },
    {
      label: "เลขคำสั่งชื้อ",
    },
    {
      label: "ชื่อลูกค้า",
    },
    {
      label: "ที่อยู่",
    },
    {
      label: "เบอร์โทรศัพท์",
    },
    {
      label: "จำนวนสั่งซื้อ",
    },
    {
      label: "ยอดขาย",
    },
  ]);

  const [itemsPerPage, setItemPerpages] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setinputValue] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [search, setSearch] = useState("");
  //sum
  const [sumSales, setSumSales] = useState(0);
  const [sumOrders, setSumOrders] = useState(0);

  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(2000, 4, 9),
    endDate: new Date(2100, 4, 9),
    key: "selection",
  });
  useEffect(() => {
    async function fecthdata() {
      selectedRange.startDate.setHours(0, 0, 0, 0);
      selectedRange.endDate.setHours(23, 59, 59, 999);
      const startDateTimestamp = selectedRange.startDate.getTime();
      const endDateTimestamp = selectedRange.endDate.getTime();
      const formdata = new FormData();
      formdata.append("itemsPerPage", itemsPerPage);
      formdata.append("startDate", startDateTimestamp);
      formdata.append("endDate", endDateTimestamp);
      formdata.append("search", search);
      const res = await axios.post(
        `https://api.sellpang.com/api/getReports`,
        formdata
      );
      setReports(res.data.reports);
      setCurrentItems(res.data.reports.data);
      setTotalPages(res.data.reports.last_page);

      const formdataTotal = new FormData();
      let user_id = 3; // ถ้ามี login เปลี่ยนเป็น uid ของคน login
      formdataTotal.append("uid", user_id);
      const resTotal = await axios.post(
        `https://api.sellpang.com/api/totalOrders`,
        formdataTotal
      );
      setSumSales(resTotal?.data?.total?.total_price);
      setSumOrders(resTotal?.data?.total?.total_num);
    }
    fecthdata();
  }, []);

  useEffect(() => {
    async function fecthdata() {
      selectedRange.startDate.setHours(0, 0, 0, 0);
      selectedRange.endDate.setHours(23, 59, 59, 999);
      const startDateTimestamp = selectedRange.startDate.getTime();
      const endDateTimestamp = selectedRange.endDate.getTime();
      const formdata = new FormData();
      formdata.append("itemsPerPage", itemsPerPage);
      formdata.append("startDate", startDateTimestamp);
      formdata.append("endDate", endDateTimestamp);
      formdata.append("search", search);
      const res = await axios.post(
        `https://api.sellpang.com/api/getReports?page=${currentPage}`,
        formdata
      );
      setReports(res.data.reports);
      setCurrentItems(res.data.reports.data);
      setTotalPages(res.data.reports.last_page);
      if (currentPage > res.data.reports.last_page) {
        setCurrentPage(1);
        setinputValue(1);
      }
    }
    fecthdata();
  }, [currentPage, itemsPerPage, search]);

  const handleSelectChange = (event) => {
    setItemPerpages(event.target.value);
  };

  const handleInputChange = (event) => {
    if (
      event.target.value !== "" &&
      event.target.value >= 1 &&
      event.target.value <= totalPages
    ) {
      setCurrentPage(parseInt(event.target.value));
      setinputValue(parseInt(event.target.value));
    } else if (event.target.value === "") {
      setinputValue("");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setinputValue(page);
  };

  const [selectedColumns, setSelectedColumns] = useState(
    Array(column.length).fill(true)
  );
  const handleColumnChange = (index, isChecked) => {
    const updatedColumns = [...selectedColumns];
    updatedColumns[index] = isChecked;
    setSelectedColumns(updatedColumns);
  };

  const copyLink = async (link) => {
    try {
      await navigator.clipboard.writeText(link);
      console.log("Text copied to clipboard");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const doc = new jsPDF();
  const printPDF = async () => {
    for (let i = 1; i <= totalPages; i++) {
      selectedRange.startDate.setHours(0, 0, 0, 0);
      selectedRange.endDate.setHours(23, 59, 59, 999);
      const startDateTimestamp = selectedRange.startDate.getTime();
      const endDateTimestamp = selectedRange.endDate.getTime();
      const formdata = new FormData();
      formdata.append("itemsPerPage", itemsPerPage);
      formdata.append("startDate", startDateTimestamp);
      formdata.append("endDate", endDateTimestamp);
      formdata.append("search", search);
      const res = await axios.post(
        `https://api.sellpang.com/api/getReports?page=${i}`,
        formdata
      );
      doc.addFileToVFS("DBAdmanX.ttf", DBadmanX);
      doc.addFileToVFS("DB-Adman-X-Bd.ttf", DBadmanXBold);
      doc.addFont("DBAdmanX.ttf", "DBadmanX", "normal");
      doc.addFont("DB-Adman-X-Bd.ttf", "DBadmanXBold", "bold");
      doc.setFont("DBadmanX");
      doc.setFont("DBadmanXBold", "bold");
      // Add recipient's name, address and phone number
      doc.setFontSize(44);
      doc.setTextColor(255, 0, 0);
      let y1 = 11;
      const textWidth1 =
        (doc.getStringUnitWidth("รายงาน") * doc.internal.getFontSize()) /
        doc.internal.scaleFactor;
      const x1 = (doc.internal.pageSize.width - textWidth1 - 14) / 2;
      // Add the image to the PDF document
      doc.addImage("/images/menu/report.png", "JPEG", x1, y1, 10, 10);

      // Calculate the width of the image
      let imgWidth = 10;

      // Add the text to the PDF document, aligned with the right edge of the image
      doc.text("รายงาน", x1 + imgWidth + 5, 10 + 10);

      doc.setFont("DBadmanX", "normal");
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);

      const x2 = doc.internal.pageSize.width - 35;
      doc.text("วันที่ : 12/11/55", x2, 30, { align: "left" });

      const x3 = doc.internal.pageSize.width - 35;
      doc.text("เวลา : 14:12:12 น.", x3, 35, { align: "left" });
      /* const columns = ["วันที่", "ชื่อร้านค้า", "ชื่อสินค้า", "รหัสสินค้า", "ลิงค์ร้านค้า", "เลขคำสั่งชื้อ", "ชื่อลูกค้า", "ที่อยู่", "เบอร์โทรศัพท์", "จำนวนสั่งซื้อ", "ยอดขาย"]; */

      const headers = [
        "วันที่",
        "ชื่อร้านค้า",
        "ชื่อสินค้า",
        "รหัสสินค้า",
        "เลขคำสั่งชื้อ",
        "ชื่อลูกค้า",
        "ที่อยู่",
        "เบอร์โทรศัพท์",
        "จำนวนสั่งซื้อ",
        "ยอดขาย",
      ];

      // Set the table properties
      const tableTop = 40; // Y-coordinate for the top of the table
      const tableLeft = 5; // X-coordinate for the left of the table
      const lineHeight = 10; // Minimum line height for text
      const padding = 2; // Padding for each cell
      // Calculate the cell width based on available space
      const availableWidth = doc.internal.pageSize.getWidth() - tableLeft * 2;
      const cellWidth = availableWidth / headers.length;

      // Set the initial position for the table
      let xPos = tableLeft;
      let yPos = tableTop;

      // Set the font size and style
      doc.setFontSize(10);
      doc.setFont("DBadmanXBold", "bold");
      // Calculate the maximum cell height in each row
      let newArr = [];
      res.data.reports.data.forEach((item, index) => {
        newArr = [
          ...newArr,
          item.type == 1
            ? [
                item.created_at,
                item.name_shop,
                item.name_product,
                item.sku_type_1,
                item.invoice_id,
                item.name,
                item.province,
                item.tel,
                item.num,
                item.price_type_1 * item.num,
              ]
            : item.type == 2
            ? [
                item.created_at,
                item.name_shop,
                item.name_product,
                item.sku_type_2,
                item.invoice_id,
                item.name,
                item.province,
                item.tel,
                item.num,
                item.price_type_2 * item.num,
              ]
            : [
                item.created_at,
                item.name_shop,
                item.name_product,
                item.sku_type_3,
                item.invoice_id,
                item.name,
                item.province,
                item.tel,
                item.num,
                item.price_type_3 * item.num,
              ],
        ];
      });
      newArr = [
        ...newArr,
        ["ยอดขายรวม", "", "", "", "", "", "", "", sumOrders, sumSales],
      ];
      const rowHeights = [];
      newArr.map((row) => {
        let maxHeight = 0; // Maximum height of the current row

        row.forEach((cell) => {
          const cellHeight =
            doc.getTextDimensions(cell, { maxWidth: cellWidth - padding * 2 })
              .h +
            padding * 2;
          maxHeight = Math.max(maxHeight, cellHeight);
        });
        if (maxHeight > 20) {
          maxHeight = maxHeight / 1.5;
        }
        rowHeights.push(maxHeight);
      });
      // Draw the table headers
      headers.forEach((header) => {
        doc.setFillColor(255, 0, 0); // Set fill color for header
        doc.rect(xPos, yPos, cellWidth, lineHeight, "F"); // Draw filled rectangle for header
        doc.setTextColor(255, 255, 255);
        doc.text(header, xPos + padding, yPos + padding + lineHeight / 2); // Draw header text
        xPos += cellWidth; // Move to the next column
      });
      doc.setFontSize(8);
      doc.setFont("DBadmanX", "normal");
      // Draw the table rows
      yPos += lineHeight; // Move to the first row position

      newArr.forEach((row, rowIndex) => {
        const rowHeight = rowHeights[rowIndex]; // Get the calculated height for the current row
        xPos = tableLeft; // Reset the X position for each row
        row.forEach((cell, cellIndex) => {
          let value = cell.toString();
          doc.setTextColor(0, 0, 0);
          if (rowIndex % 2 != 0) {
            doc.setFillColor(255, 255, 255);
          } else {
            doc.setFillColor(238, 238, 238);
          }
          doc.rect(xPos, yPos, cellWidth, rowHeight, "F"); // Draw filled rectangle for cell
          let divide = rowHeight / 10 + rowHeight / 10;
          doc.text(value, xPos + padding, yPos + rowHeight / divide, {
            maxWidth: cellWidth - padding * 2,
            align: "left",
            baseline: "alphabetic",
          }); // Draw cell text

          xPos += cellWidth; // Move to the next column
        });
        yPos += rowHeight; // Move to the next row position
      });
      if(i !== totalPages){
        doc.addPage();
      }
      
    }

    const pdfBlob = doc.output("blob");

    // Create a blob URL
    const url = URL.createObjectURL(pdfBlob);

    // Open the PDF in a new tab
    window.open(url, "_blank");
    const link = document.createElement("a");
    link.href = url;
    link.download = `a.pdf`;
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const [showDateRangePicker, setShowDateRangePicker] = useState(false);
  return (
    <Box w="100%">
      <Flex justifyContent="center" alignItems="center">
        <Image src="/images/menu/report.png" alt="" h="40px" w="40px" />
        <Text pl="10px" fontSize="40px" fontWeight="bold" color="red">
          รายงาน
        </Text>
      </Flex>
      <Flex m="10px" pt="10px">
        <Box>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Image src="/images/search.png" h="20px" w="20px" />
            </InputLeftElement>
            <Input
              borderRadius="3xl"
              type="text"
              fontSize="21px"
              borderColor="gray.500"
              placeholder="ค้นหารายการ"
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Box>
        <Box pl="10px">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Image src="/images/calendar.png" h="20px" w="20px" />
            </InputLeftElement>
            <Input
              placeholder="เลือกวันที่"
              onFocus={() => setShowDateRangePicker(true)}
              readOnly
              type="text"
              borderRadius="3xl"
              fontSize="21px"
              borderColor="gray.500"
            />
          </InputGroup>
          {showDateRangePicker && (
            <div style={{ position: "absolute", border: "1px solid" }}>
              {/* <DateRangePicker
                ranges={[selectedRange]}
                onChange={(ranges) => {
                  setSelectedRange(ranges.selection);
                  setShowDateRangePicker(false);
                }}
                shortcuts={presets}
              /> */}
            </div>
          )}
        </Box>
        <Spacer />
        <Box borderWidth="1px" borderColor="red" borderRadius="md">
          <Button
            fontSize="21px"
            leftIcon={<Image src="/images/print.png" h="25px" w="25px" />}
            bg="red"
            variant="solid"
            color="white"
            _hover={{}}
            onClick={printPDF}
          >
            พิมพ์รายงาน
          </Button>
        </Box>

        <Box ml="5px" border="1px" borderColor="red" borderRadius="md">
          <ListCheck
            data={column}
            onChange={handleColumnChange}
            selected={selectedColumns}
          />
        </Box>
      </Flex>
      <Box id="pdf-content" padding={"0.5rem 1rem 0.5rem 1rem"}>
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
              {column?.map((item, index) => {
                if (selectedColumns[index]) {
                  return (
                    <Th
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        textAlign: "center",
                      }}
                      key={index}
                    >
                      <Text fontSize="21px">{item.label}</Text>
                    </Th>
                  );
                }
              })}
            </Tr>
          </Thead>
          <Tbody>
            {currentItems?.map((item, index) => {
              return (
                <Tr key={index} fontSize="21px">
                  {selectedColumns[0] ? <Td>{item.created_at}</Td> : null}
                  {selectedColumns[1] ? <Td>{item.name_shop}</Td> : null}
                  {selectedColumns[2] ? <Td>{item.name_product}</Td> : null}
                  {selectedColumns[3] ? (
                    <Td>
                      {item.type == 1
                        ? item.sku_type_1
                        : item.type == 2
                        ? item.sku_type_2
                        : item.sku_type_3}
                    </Td>
                  ) : null}
                  {selectedColumns[4] ? (
                    <Td>
                      {item.url_shop !== undefined ? (
                        <Flex justifyContent="center">
                          <Text>{item.url_shop}</Text>
                          <Skeleton
                            h="20px"
                            width="20px"
                            borderRadius="xl"
                            ml="10px"
                            alignSelf="center"
                            display={loadingImg ? "block" : "none"}
                          />
                          <Image
                            src="/images/copy.png"
                            h="20px"
                            pl="10px"
                            alignSelf="center"
                            onClick={(e) => copyLink(item.url_shop)}
                            display={!loadingImg ? "block" : "none"}
                            onLoad={() => setLoadingImg(false)}
                          />
                        </Flex>
                      ) : null}
                    </Td>
                  ) : null}
                  {selectedColumns[5] ? <Td>{item.invoice_id}</Td> : null}
                  {selectedColumns[6] ? (
                    <Td>
                      <Link
                        href={{
                          pathname: "/report/detailCustomer/" + item.uid,
                        }}
                      >
                        {item.customer_name.length > 10
                          ? item.customer_name?.slice(0, 10) + "..."
                          : item.customer_name}
                      </Link>
                    </Td>
                  ) : null}
                  {selectedColumns[7] ? <Td>{item.province}</Td> : null}
                  {selectedColumns[8] ? <Td>{item.tel}</Td> : null}
                  {selectedColumns[9] ? (
                    <Td textAlign="end">{item.num}</Td>
                  ) : null}
                  {selectedColumns[10] ? (
                    <Td textAlign="end">
                      {item.type == 1
                        ? item.price_type_1
                        : item.type == 2
                        ? item.price_type_2
                        : item.price_type_3}
                    </Td>
                  ) : null}
                </Tr>
              );
            })}
            <Tr fontSize="21px">
              {selectedColumns[0] ? <Td fontWeight="bold">ยอดรวม</Td> : null}
              {selectedColumns[1] ? <Td></Td> : null}
              {selectedColumns[2] ? <Td></Td> : null}
              {selectedColumns[3] ? <Td></Td> : null}
              {selectedColumns[4] ? <Td></Td> : null}
              {selectedColumns[5] ? <Td></Td> : null}
              {selectedColumns[6] ? <Td></Td> : null}
              {selectedColumns[7] ? <Td></Td> : null}
              {selectedColumns[8] ? <Td></Td> : null}
              {selectedColumns[9] ? (
                <Td fontWeight="bold" textAlign="end">
                  {sumOrders}
                </Td>
              ) : null}
              {selectedColumns[10] ? (
                <Td fontWeight="bold" textAlign="end">
                  {sumSales}
                </Td>
              ) : null}
            </Tr>
          </Tbody>
        </Table>
      </Box>
      <Flex m="10px">
        <Wrap alignSelf="center" fontSize="21px">
          <WrapItem>
            <Text>แสดงผล : </Text>
          </WrapItem>
          <WrapItem>
            <Select size="xs" onChange={handleSelectChange}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </Select>
          </WrapItem>
          <WrapItem>
            <Text>จำนวนสินค้า : </Text>
          </WrapItem>
          <WrapItem>
            <Text>{reports?.total}</Text>
          </WrapItem>
        </Wrap>
        <Spacer />
        <HStack spacing="2" alignSelf="center" fontSize="21px">
          <Button
            disabled={currentPage === 1 || currentPage < 1}
            onClick={() =>
              handlePageChange(
                currentPage === 1 ? currentPage : currentPage - 1
              )
            }
            background="white"
            _hover={{}}
          >
            <Image
              src="/images/arrow/left-arrow.png"
              alt=""
              h="15px"
              w="10px"
            />
          </Button>

          <Text>หน้า</Text>
          <Input
            htmlSize={1}
            placeholder={inputValue}
            size="xs"
            onChange={handleInputChange}
            value={inputValue}
          />
          <Text whitespace="nowrap">จาก</Text>
          <Text whitespace="nowrap">{totalPages}</Text>
          <Button
            disabled={currentPage >= totalPages}
            onClick={() =>
              handlePageChange(
                currentPage === totalPages ? currentPage : currentPage + 1
              )
            }
            background="white"
            _hover={{}}
          >
            <Image
              src="/images/arrow/right-arrow.png"
              alt=""
              h="15px"
              w="10px"
            />
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}

export default index;
