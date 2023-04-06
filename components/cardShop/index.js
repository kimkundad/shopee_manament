import React, { useLayoutEffect, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
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
  ModalCloseButton,
  useDisclosure,
  Link,
  Card,
  CardBody,
  Heading,
  FormControl,
  FormLabel,
  Textarea,
  Grid,
  GridItem,
  InputRightElement,
  Lorem,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Checkbox,
} from "@chakra-ui/react";
import ModalEditStep1 from "@/components/modalEditShop/modalEditStep1";
import Axios from "axios";

function index(product) {
  const modalEdit = useDisclosure();
  // const modalEditNextStep = useDisclosure();
  const modalDelete = useDisclosure();
  const modalConfirmDelete = useDisclosure();
  // const modalConfirmEdit = useDisclosure();
  // const modalConfirmEditSuccess = useDisclosure();
  const [bookmarks, setBookmarks] = useState({});
  const [deleteShopID, setDeleteShopID] = useState("");
  const [deleteNameShop, setDeleteNameShop] = useState("");

  const handleConfirmDelete = () => {
    const data = {
      shopID: deleteShopID,
    }

    Axios.post("https://shopee-api.deksilp.com/api/DeleteShop", data).then(function (
      response
    ) {
      if (response.data.success) {
        modalDelete.onClose();
        modalConfirmDelete.onOpen();
        product.statusDelete(true);
      }
    });
  };

  const toggleBookmark = (productId) => {
    setBookmarks((prevBookmarks) => {
      return {
        ...prevBookmarks,
        [productId]: !prevBookmarks[productId],
      };
    });
  };

  const [modalStates, setModalStates] = useState({});

  const toggleModal = (shopId) => {
    setModalStates((prevState) => ({
      ...prevState,
      [shopId]: !prevState[shopId],
    }));
    console.log(modalStates);
  };

  const [copiedShopUrl, setCopiedShopUrl] = useState(null);

  const handleCopyClick = (shopUrl) => () => {
    navigator.clipboard.writeText(shopUrl);
    setCopiedShopUrl(shopUrl);
  };

  const handleDeleteShop = (nameShop,shopID) => {
    setDeleteShopID(shopID);
    setDeleteNameShop(nameShop);
    modalDelete.onOpen();
  };

  return (
    <>
      {product.Shops.map((shops) => {
        const isBookmarked = bookmarks[shops.id] || false;
        const dateCreate = new Date(shops.created_at);
        const formattedDateCreate = dateCreate.toLocaleDateString();
        const dateUpdate = new Date(shops.updated_at);
        const formattedDateUpdate = dateUpdate.toLocaleDateString();
        let shopName = shops.name_shop.slice(0, 30);
        if (shops.name_shop.length > 30) {
          shopName += "..."; // add ellipsis if product name contains more than maxLength words
        } // set maximum length of product name
        const modalState = modalStates[shops.id] || false;
        return (
          <React.Fragment key={shops.id}>
            <Card maxW="sm" mb={"10px"} boxShadow="base" width={"23rem"}>
              <CardBody>
                <Box>
                  <Flex alignItems="center">
                    <Switch colorScheme="brand" size="sm" mr={"5px"} />
                    เปิด/ปิดเพื่อแสดง
                    <Spacer />
                    <Image
                      src={
                        isBookmarked ? "/images/star2.png" : "/images/star1.png"
                      }
                      h="20px"
                      w="20px"
                      onClick={() => toggleBookmark(shops.id)}
                    />
                  </Flex>
                </Box>
                <Box>
                  <Image
                    src={
                      "https://shopee-api.deksilp.com/images/shopee/cover_img_shop/" +
                      shops.cover_img_shop
                    }
                    pos="relative"
                    mt={"5px"}
                    borderRadius="lg"
                    boxShadow="md"
                    height={"185px"}
                  />
                  <Image
                    src={
                      "https://shopee-api.deksilp.com/images/shopee/shop/" +
                      shops.img_shop
                    }
                    pos="absolute"
                    top={"22%"}
                    left={"33%"}
                    borderRadius={"100%"}
                    width={"125px"}
                    height={"125px"}
                    border={"5px solid white"}
                  />
                </Box>
                <Box mt={"5px"}>
                  <Text fontSize="3xl" fontWeight={"bold"} textAlign="center">
                    {shopName}
                  </Text>
                  <Flex justifyContent={"space-around"}>
                    <Text fontSize="sm">จำนวนผู้เข้าชม : 5,980</Text>
                    <Text fontSize="sm">
                      วันที่สร้าง : {formattedDateCreate}
                    </Text>
                    <Text fontSize="sm">
                      แก้ไขล่าสุด : {formattedDateUpdate}
                    </Text>
                  </Flex>
                </Box>
                <Box mt={"0.75rem"}>
                  <Flex justifyContent={"space-around"}>
                    <Button
                      bgColor={"white"}
                      border={"2px solid red"}
                      height={"30px"}
                      onClick={handleCopyClick(shops.url_shop)}
                    >
                      <Image
                        src="/images/copyshop.png"
                        width={"20px"}
                        height={"20px"}
                      />
                      <Text ml={"8px"} fontSize="xl" color={"#ff0000"}>
                        {copiedShopUrl === shops.url_shop
                          ? "คัดลอกสำเร็จ!"
                          : "คัดลอกลิงค์"}
                      </Text>
                    </Button>
                    <Button
                      bgColor={"white"}
                      border={"2px solid black"}
                      height={"30px"}
                      onClick={() => {
                        handleDeleteShop(shopName,shops.id);
                      }}
                    >
                      <Image
                        src="/images/binshop.png"
                        width={"18px"}
                        height={"18px"}
                      />
                      <Text ml={"8px"} fontSize="xl">
                        ลบ
                      </Text>
                    </Button>
                    <Button
                      bgColor={"#ff0000"}
                      // border={"2px solid black"}
                      height={"30px"}
                      onClick={() => {
                        toggleModal(shops.id);
                      }}
                    >
                      <Image
                        src="/images/editshop.png"
                        width={"18px"}
                        height={"18px"}
                      />
                      <Text ml={"8px"} fontSize="xl" color={"white"}>
                        แก้ไข
                      </Text>
                    </Button>
                  </Flex>
                </Box>
              </CardBody>
            </Card>
            <ModalEditStep1
              isOpen={modalState}
              onClose={() => {
                toggleModal(shops.id);
              }}
              Shops={shops}
            />
          </React.Fragment>
        );
      })}
      {/* {product.Products.map((product) => (
        
      ))} */}

      {/* Modal Delete ลบร้านค้า */}
      <Modal
        closeOnOverlayClick={false}
        onClose={modalDelete.onClose}
        size={"lg"}
        isOpen={modalDelete.isOpen}
      >
        <ModalOverlay />
        <ModalContent top={"20%"}>
          <ModalHeader></ModalHeader>
          <ModalCloseButton
            color={"white"}
            bgColor={"#ff0000"}
            borderRadius={"50px"}
            width={"20px"}
            height={"20px"}
            fontSize={"9px"}
          />
          <ModalBody>
            <Flex flexDirection={"column"} alignItems={"center"}>
              <Image
                src="/images/binDeleteAlert.png"
                width={"125px"}
                // height={"35px"}
                mr={"10px"}
              />
              <Text fontSize={"4xl"} fontWeight={"bold"} mt={"20px"}>
                ยืนยันการลบร้านค้า {deleteNameShop}
              </Text>
            </Flex>
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            <Button
              onClick={modalDelete.onClose}
              bgColor={"white"}
              color={"gray"}
              border={"2px solid gray"}
              px={"2rem"}
              height={"35px"}
              mr={"10px"}
            >
              ยกเลิก
            </Button>
            <Button
              onClick={handleConfirmDelete}
              bgColor={"#ff0000"}
              color={"white"}
              px={"2rem"}
              height={"35px"}
            >
              ยืนยัน
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* End Modal Delete ลบร้านค้า */}

      {/* Modal confirm Delete success */}
      <Modal
        closeOnOverlayClick={false}
        onClose={modalConfirmDelete.onClose}
        size={"lg"}
        isOpen={modalConfirmDelete.isOpen}
      >
        <ModalOverlay />
        <ModalContent top={"20%"}>
          <ModalHeader></ModalHeader>
          <ModalCloseButton
            color={"white"}
            bgColor={"#ff0000"}
            borderRadius={"50px"}
            width={"20px"}
            height={"20px"}
            fontSize={"9px"}
          />
          <ModalBody>
            <Flex flexDirection={"column"} alignItems={"center"}>
              <Image
                src="/images/checkshop.png"
                width={"130px"}
                // height={"35px"}
                mr={"10px"}
              />
              <Text fontSize={"5xl"} fontWeight={"bold"} mt={"20px"}>
                ลบร้านค้าเสร็จสิ้น
              </Text>
            </Flex>
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            <Button
              onClick={modalConfirmDelete.onClose}
              bgColor={"#ff0000"}
              color={"white"}
              px={"2rem"}
              height={"35px"}
            >
              ไปที่หน้าร้านค้า
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* End Modal confirm Delete success */}
    </>
  );
}

export default index;
