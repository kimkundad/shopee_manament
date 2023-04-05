import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Center,
    Image,
    Text,
    Button,
  } from "@chakra-ui/react";

function index({ isOpen, onClose }) {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={"lg"}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent pt={10} mt={"150px"}>
          <ModalHeader>
            <Center>
              <Image
                width={110}
                height={110}
                src={"/images/check.png"}
                alt="เพิ่มแอดมินเรียบร้อย"
              />
            </Center>
          </ModalHeader>
          <ModalCloseButton
            backgroundColor={"#ff0000"}
            color={"white"}
            borderRadius={"50px"}
            height={"20px"}
            width={"20px"}
            fontSize={"8px"}
            fontWeight={"bold"}
          />
          <ModalBody textAlign={"center"}>
            <Text as="b" fontSize="4xl">
              เพิ่มแอดมินเรียบร้อยแล้ว
            </Text>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Button
              size={"lg"}
              background="#f84c01"
              color="white"
              height={"38px"}
              fontSize={"30px"}
              padding={"1.25rem 2.5rem 1rem 2.5rem"}
              onClick={onClose}
            >
              ยืนยัน
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default index;
