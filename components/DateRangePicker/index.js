import React, { useEffect, useState } from "react";
import moment from "moment";
import $ from "jquery";
import "daterangepicker/daterangepicker.css";
import "daterangepicker";
import {
  Flex,
  Text,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import classNames from "classnames";

const DateRangePicker = ({ getDate }) => {
  const [label, setLabel] = useState("เลือกวันที่");
  useEffect(() => {
    const start = moment().subtract(29, "days");
    const end = moment();

    const cb = (start, end, label) => {
      $("#reportrange span").html(label);
      getDate(start, end);
      setLabel(label);
    };

    $("#reportrange").daterangepicker(
      {
        startDate: start,
        endDate: end,
        ranges: {
          วันนี้: [moment(), moment()],
          เมื่อวาน: [
            moment().subtract(1, "days"),
            moment().subtract(1, "days"),
          ],
          "7 วันก่อน": [moment().subtract(6, "days"), moment()],
          "30 วันก่อน": [moment().subtract(29, "days"), moment()],
          เดือนนี้: [moment().startOf("month"), moment().endOf("month")],
          เดือนที่แล้ว: [
            moment().subtract(1, "month").startOf("month"),
            moment().subtract(1, "month").endOf("month"),
          ],
          ปีนี้: [moment().startOf("year"), moment().endOf("year")],
        },
        autoApply: true,
        autoClose: true,
      },
      cb
    );

    cb(start, end, "วันนี้");
    $("#reportrange span").html("เลือกวันที่");
  }, []);

  return (
    <Flex id="reportrange" h="100%" alignItems="center" pl="15px">
      <Image src="/images/calendar.png" h="20px" w="20px" />
      <span
        className={classNames({
          "pl-4": true,
        })}
      ></span>
    </Flex>
  );
};

export default DateRangePicker;
