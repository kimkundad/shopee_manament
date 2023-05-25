import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import moment from "moment";
import DateRangePicker from "@/components/DateRangePicker";
import {
  Flex,
  Text,
  Image,
  Box,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";

export default function test() {
  const { isOpen, onOpen, onClose } = useDisclosure([]);
  const [startDatePie, setStartDatePie] = useState(
    moment().startOf("day").unix()
  );
  const [endDatePie, setEndDatePie] = useState(moment().endOf("day").unix());
  const getDateRangePie = (start, end) => {
    setStartDatePie(start.unix());
    setEndDatePie(end.unix());
  };

  const click = () => {
    onOpen();
  }
  return (
    <Flex justifyContent="end" mb="1.25rem">
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
        <Box w="500px">

        </Box>
          
        <Button onClick={click}>
          open
        </Button>
        <Modal onClose={onClose} size="xs" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent alignSelf="center" py="20px">
          <ModalBody alignSelf="center">
            <Box textAlign="center">
              <Image src="/images/check3.png" alt="" h="70px" mx="auto" />
              <Text fontWeight="bold" fontSize="24">
                เพิ่มบัญชีธนาคารสำเร็จ
              </Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      </Flex>
  );
}
