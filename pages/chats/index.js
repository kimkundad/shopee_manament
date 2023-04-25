import React from "react";
import {
  Flex,
  Switch,
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
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
export default function index() {
  return (
    <Box m="20px">
      <Text>รายชื่อร้าน</Text>
      <Flex>
        <Text alignSelf="center">ร้านค้า (จำนวน)</Text>
        <Spacer/>
        <Input maxWidth="200px"/>
        <Button>
            sss
        </Button>
      </Flex>
    </Box>
  );
}
