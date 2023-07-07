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

const DateRangePicker = ({ getDate, id, type }) => {
  useEffect(() => {
    if (type == "dashboard") {
      const start = moment().startOf("day");
      const end = moment().endOf("day");

      const cb = (start, end, label) => {
        $(`#reportrange${id} span`).html(label);
        getDate(start.startOf("day"), end.endOf("day"), id);
      };

      const daterangepickerOptions = {
        startDate: start,
        endDate: end,
        ranges: {
          รายวัน: [moment(), moment()],
          รายสัปดาห์: [moment().subtract(6, "days"), moment()],
          รายเดือน: [moment().startOf("month"), moment().endOf("month")],
          รายปี: [moment().startOf("year"), moment().endOf("year")],
        },
        autoApply: true,
        autoUpdateInput: true,
      };

      $(`#reportrange${id}`).daterangepicker(daterangepickerOptions, cb);

      const reportRangeEl = $(`#reportrange${id}`);
      reportRangeEl.on("apply.daterangepicker", (ev, picker) => {
        cb(picker.startDate, picker.endDate, picker.chosenLabel);
      });

      cb(start, end, "วันนี้");
      $(`#reportrange${id} span`).html("วันนี้");

      return () => {
        // Cleanup when the component is unmounted
        reportRangeEl.data("daterangepicker").remove();
        reportRangeEl.off();
      };
    } else {
      const start = moment().startOf("day");
      const end = moment().endOf("day");

      const cb = (start, end, label) => {
        $(`#reportrange${id} span`).html(label);
        getDate(start.startOf("day"), end.endOf("day"), id);
      };

      const daterangepickerOptions = {
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
        autoUpdateInput: true,
      };

      $(`#reportrange${id}`).daterangepicker(daterangepickerOptions, cb);

      const reportRangeEl = $(`#reportrange${id}`);
      reportRangeEl.on("apply.daterangepicker", (ev, picker) => {
        cb(picker.startDate, picker.endDate, picker.chosenLabel);
      });

      cb(start, end, "วันนี้");
      $(`#reportrange${id} span`).html("วันนี้");

      return () => {
        // Cleanup when the component is unmounted
        reportRangeEl.data("daterangepicker").remove();
        reportRangeEl.off();
      };
    }
  }, []);

  return (
    <Flex id={`reportrange${id}`} h="100%" alignItems="center" pl="15px">
      <Image
        src="/images/calendar.png"
        h="20px"
        w="20px"
        display={type == "dashboard" ? "none" : "block"}
      />
      <span
        className={classNames({
          "pl-4": true,
        })}
      ></span>
    </Flex>
  );
};

export default DateRangePicker;
