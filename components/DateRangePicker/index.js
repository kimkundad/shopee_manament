import React, { useEffect, useState } from "react";
import moment from "moment";
import $ from "jquery";
import "daterangepicker/daterangepicker.css";
import "daterangepicker";
import { Image, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

const DateRangePicker = ({ getDate }) => {
  useEffect(() => {
    const start = moment().subtract(29, "days");
    const end = moment();

    const cb = (start, end,label) => {
      document.getElementById("reportrange").innerHTML =
        label+start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY");
      getDate(start, end);
      console.log(label);
    };

    $("#reportrange").daterangepicker(
      {
        startDate: start,
        endDate: end,
        ranges: {
          "วันนี้": [moment(), moment()],
          "เมื่อวาน": [
            moment().subtract(1, "days"),
            moment().subtract(1, "days"),
          ],
          "7 วันก่อน": [moment().subtract(6, "days"), moment()],
          "30 วันก่อน": [moment().subtract(29, "days"), moment()],
          "เดือนนี้": [moment().startOf("month"), moment().endOf("month")],
          "เดือนที่แล้ว": [
            moment().subtract(1, "month").startOf("month"),
            moment().subtract(1, "month").endOf("month"),
          ],
          "ปีนี้": [moment().startOf("year"), moment().endOf("year")],
        },
      },
      cb
    );

    cb(start, end,'วันนี้');
  }, []);

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <Image src="/images/calendar.png" h="20px" w="20px" />
      </InputLeftElement>
      {/* {startDate}
      {endDate} */}
      <Input
        id="reportrange"
        placeholder="เลือกวันที่"
        readOnly
        type="text"
        borderRadius="3xl"
        fontSize="21px"
        borderColor="gray.500"
      />
    </InputGroup>
  );
};

export default DateRangePicker;
