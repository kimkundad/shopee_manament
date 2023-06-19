import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  HStack,
  Center,
  Input,
  Button,
  Spacer,
  Avatar,
  Select,
  IconButton,
  Flex,
  Stack,
  InputGroup,
  InputLeftElement,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Switch,
  VStack,
  InputRightElement,
  Tooltip,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import Image from "next/image";
import {
  AddIcon,
  EditIcon,
  DeleteIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import Axios from "axios";
import { Table } from "@nextui-org/react";
import { connect, useDispatch, useSelector } from "react-redux";

const colunmThTable = [
  {
    label: "รูปภาพ",
  },
  {
    label: "ชื่อ - นามสกุล",
  },
  {
    label: "E-mail",
  },
  {
    label: "สถานะ",
  },
  {
    label: "สิทธิ์การเข้าถึง",
  },
  {
    label: "วันที่สร้าง",
  },
  {
    label: "เพิ่มเติม",
  },
];

export default function AdminManagement() {
  const userInfo = useSelector((App) => App.userInfo);
  const userAuthen = useSelector((App) => App.authen);
  const modalAdd = useDisclosure();
  const modalEdit = useDisclosure();
  const modalCopy = useDisclosure();
  const modalCopyEdit = useDisclosure();
  const modalSuccess = useDisclosure();
  const modalEditSuccess = useDisclosure();
  const modalDelete = useDisclosure();
  const modalDeleteSuccess = useDisclosure();
  const [inputValueURL, setInputValueURL] = useState("");
  const [inputValueURLEdit, setInputValueURLEdit] = useState("");
  const [userIdAdmin, setUserIdAdmin] = useState("");
  const [userNameAdmin, setUserNameAdmin] = useState("");
  const [getAllUsers, setAllUsers] = useState([]);

  //filter search Date
  const [searchDateSubAdmin, setSearchDateSubAdmin] = useState("");

  // filter search Name
  const [searchName, setSearchName] = useState("");

  // Edit sub admin
  const [userIDSubAdmin, setUserIDSubAdmin] = useState("");
  const [editNameSubAdmin, setEditNameSubAdmin] = useState("");
  const [editEmailSubAdmin, setEditEmailSubAdmin] = useState("");
  const [editPasswordSubAdmin, setEditPasswordSubAdmin] = useState("");
  const [editPerDashboard, setEditPerDashboard] = useState(false);
  const [editPerMyShop, setEditPerMyShop] = useState(false);
  const [editPerStock, setEditStock] = useState(false);
  const [editPerReport, setEditPerReport] = useState(false);
  const [editPerAdminManage, setEditPerAdminManage] = useState(false);
  const [editPerSettings, setEditPerSettings] = useState(false);

  // create sub-admin
  const [createNameSubAdmin, setCreateNameSubAdmin] = useState("");
  const [createEmailSubAdmin, setCreateEmailSubAdmin] = useState("");
  const [createPasswordSubAdmin, setCreatePasswordSubAdmin] = useState("");
  const [perDashboard, setPerDashboard] = useState(false);
  const [perMyShop, setPerMyShop] = useState(false);
  const [perStock, setStock] = useState(false);
  const [perReport, setPerReport] = useState(false);
  const [perAdminManage, setPerAdminManage] = useState(false);
  const [perSettings, setPerSettings] = useState(false);

  console.log('userAuthen', userAuthen)

  // function set data craete sub admin
  const handleSwitchDashboardChange = () => {
    setPerDashboard(!perDashboard);
  };

  const handleSwitchMyShopChange = () => {
    setPerMyShop(!perMyShop);
  };

  const handleSwitchStockChange = () => {
    setStock(!perStock);
  };

  const handleSwitchReportChange = () => {
    setPerReport(!perReport);
  };

  const handleSwitchAdminManageChange = () => {
    setPerAdminManage(!perAdminManage);
  };

  const handleSwitchSettingsChange = () => {
    setPerSettings(!perSettings);
  };

  // function set permission Edit sub admin
  const handleSwitchDashboardEditChange = () => {
    setEditPerDashboard(!editPerDashboard);
  };

  const handleSwitchMyShopEditChange = () => {
    setEditPerMyShop(!editPerMyShop);
  };

  const handleSwitchStockEditChange = () => {
    setEditStock(!editPerStock);
  };

  const handleSwitchReportEditChange = () => {
    setEditPerReport(!editPerReport);
  };

  const handleSwitchAdminManageEditChange = () => {
    setEditPerAdminManage(!editPerAdminManage);
  };

  const handleSwitchSettingsEditChange = () => {
    setEditPerSettings(!editPerSettings);
  };

  const fetchAllUsers = async () => {
    Axios.get("https://api.sellpang.com/api/getAllUsers", {
      headers: {
        Authorization: `Bearer ${userAuthen.token}`,
      },
    }).then(function (
      response
    ) {
      // console.log('response.data.users', response.data.userInfo);
      setAllUsers(response.data.users);
    });
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleAddAdmin = () => {
    const data = {
      owner_admin: userInfo.data[0].id,
      name_sub_admin: createNameSubAdmin,
      email_sub_admin: createEmailSubAdmin,
      password_sub_admin: createPasswordSubAdmin,
      set_permission_dashboard: perDashboard,
      set_permission_my_shop: perMyShop,
      set_permission_stock: perStock,
      set_permission_report: perReport,
      set_permission_admin_manage: perAdminManage,
      set_permission_settings: perSettings,
    };
    Axios.post("https://api.sellpang.com/api/createSubAdmin", data).then(
      function (response) {
        if (response.data.success) {
          fetchAllUsers();
          modalAdd.onClose();
          modalCopy.onOpen();
        }
      }
    );
  };

  const handleEditAdmin = () => {
    const data = {
      userID: userIDSubAdmin,
      name_sub_admin: editNameSubAdmin,
      email_sub_admin: editEmailSubAdmin,
      password_sub_admin: editPasswordSubAdmin,
      set_permission_dashboard: editPerDashboard,
      set_permission_my_shop: editPerMyShop,
      set_permission_stock: editPerStock,
      set_permission_report: editPerReport,
      set_permission_admin_manage: editPerAdminManage,
      set_permission_settings: editPerSettings,
    };
    Axios.post("https://api.sellpang.com/api/updateSubAdmin", data).then(
      function (response) {
        if (response.data.success) {
          fetchAllUsers();
          if (editEmailSubAdmin != "" && editPasswordSubAdmin != "") {
            modalEdit.onClose();
            modalCopyEdit.onOpen();
          } else {
            modalEdit.onClose();
            modalEditSuccess.onOpen();
          }
        }
      }
    );
  };

  const copyUrlAdmin = () => {
    navigator.clipboard.writeText("http://admin.picpang.com/login");
    setInputValueURL("คัดลอกสำเร็จ!");
  };

  const copyUrlAdminEdit = () => {
    navigator.clipboard.writeText("http://admin.picpang.com/login");
    setInputValueURLEdit("คัดลอกสำเร็จ!");
  };

  const copyAllAdmin = () => {
    const accountAdmin =
      "ลิงค์เข้าใช้งาน : http://admin.picpang.com/login\nUsername : " +
      createEmailSubAdmin +
      "\nPassword : " +
      createPasswordSubAdmin;
    navigator.clipboard.writeText(accountAdmin);
    modalCopy.onClose();
    modalSuccess.onOpen();
  };

  const copyAllAdminEdit = () => {
    const accountAdmin =
      "ลิงค์เข้าใช้งาน : http://admin.picpang.com/login\nUsername : " +
      editEmailSubAdmin +
      "\nPassword : " +
      editPasswordSubAdmin;
    navigator.clipboard.writeText(accountAdmin);
    modalCopyEdit.onClose();
    modalEditSuccess.onOpen();
  };

  //pagination
  const [itemsPerPage, setItemPerpages] = useState(5);
  const handleSelectChange = (event) => {
    setItemPerpages(event.target.value);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setinputValue] = useState(1);
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
  let item = parseInt(itemsPerPage);
  const totalPages = Math.ceil(getAllUsers.length / item);
  const startIndex = (currentPage - 1) * item;
  const endIndex = startIndex + item;
  const currentItems = getAllUsers.slice(startIndex, endIndex);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
      setinputValue(1);
    }
  }, [currentPage, totalPages]);

  const handleModalDeleteAdmin = (userID, userName) => {
    setUserIdAdmin(userID);
    setUserNameAdmin(userName);
    modalDelete.onOpen();
  };

  const handleConfirmDeleteAdmin = () => {
    const data = {
      userID: userIdAdmin,
    };

    Axios.post("https://api.sellpang.com/api/deleteSubAdmin", data).then(
      function (response) {
        if (response.data.success) {
          fetchAllUsers();
          modalDelete.onClose();
          modalDeleteSuccess.onOpen();
        }
      }
    );
  };

  // function filter search Date
  const handleSearchDateSubAdmin = (event) => {
    const DateSubAdmin = event.target.value;
    setSearchDateSubAdmin(DateSubAdmin);
    setSearchName("");
    if (DateSubAdmin === "") {
      setSearchDateSubAdmin(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await Axios.get(
        `https://api.sellpang.com/api/getSearchDateSubAdmin?search=${searchDateSubAdmin}`
      );
      setAllUsers(response.data.users);
    };

    if (searchDateSubAdmin !== "") {
      fetchData();
    }
  }, [searchDateSubAdmin]);

  // function filter search Name
  const handleSearchName = (event) => {
    const searchName = event.target.value;
    setSearchName(searchName);
    setSearchDateSubAdmin("");
    if (searchName === "") {
      setSearchName(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await Axios.get(
        `https://api.sellpang.com/api/getSearchName?search=${searchName}`
      );
      setAllUsers(response.data.users);
    };

    if (searchName !== "") {
      fetchData();
    }
  }, [searchName]);

  const handleGetEditSubadmin = (
    userID,
    userName,
    userEmail,
    perDashboard,
    perMyShop,
    perStock,
    perReport,
    perAdminManage,
    perSettings
  ) => {
    setUserIDSubAdmin(userID);
    setEditPasswordSubAdmin("");
    setEditNameSubAdmin(userName);
    setEditEmailSubAdmin(userEmail);
    setEditPerDashboard(perDashboard);
    setEditPerMyShop(perMyShop);
    setEditStock(perStock);
    setEditPerReport(perReport);
    setEditPerAdminManage(perAdminManage);
    setEditPerSettings(perSettings);
    modalEdit.onOpen();
  };

  return (
    <>
      <Box p={[5, 10]}>
        <Box>
          <Center>
            <HStack>
              <Image
                width={42}
                height={42}
                src={"/images/menu/จัดการแอดมิน.png"}
                alt="admin"
              />
              <Text as="b" fontSize="4xl" color="#f84c01" pt={3}>
                {" "}
                จัดการแอดมิน
              </Text>
            </HStack>
          </Center>
        </Box>

        <Box mt={"10"}>
          <HStack>
            <Box>
              <InputGroup>
                <InputLeftElement pointerEvents="none" ml={"5px"}>
                  <Image width={20} height={20} src={"/images/search.png"} />
                </InputLeftElement>
                <Input
                  borderRadius="3xl"
                  type="text"
                  fontSize="21px"
                  borderColor="gray.500"
                  placeholder="ค้นหาชื่อแอดมิน"
                  value={searchName || ""}
                  onChange={handleSearchName}
                />
              </InputGroup>
            </Box>
            <Spacer />
            <Box>
              <InputGroup>
                <InputLeftElement pointerEvents="none" ml={"5px"}>
                  <Image width={20} height={20} src={"/images/calendar.png"} />
                </InputLeftElement>
                <Input
                  type="date"
                  borderRadius="3xl"
                  fontSize="21px"
                  borderColor="gray.500"
                  placeholder="เลือกวันที่"
                  value={searchDateSubAdmin || ""}
                  onChange={handleSearchDateSubAdmin}
                />
              </InputGroup>
            </Box>
            <Button
              onClick={modalAdd.onOpen}
              leftIcon={<AddIcon />}
              background="#f84c01"
              color="white"
            >
              เพิ่มแอดมิน
            </Button>
          </HStack>
        </Box>

        <Box mt={3}>
          <Table
            striped
            sticked
            aria-label="Example table with static content"
            css={{
              height: "auto",
              minWidth: "100%",
              border: "0px",
              boxShadow: "none",
            }}
            css={{ padding: "0px !important" }}
          >
            <Table.Header bg="#ff0000">
              {colunmThTable.map((item, index) => {
                return (
                  <Table.Column
                    style={{ backgroundColor: "#ff0000", color: "white" }}
                    key={index}
                    css={{
                      textAlign: "center",
                      padding: "0px !important",
                      height: "55px",
                    }}
                  >
                    <Text fontSize="21px">{item.label}</Text>
                  </Table.Column>
                );
              })}
            </Table.Header>
            <Table.Body>
              {currentItems.map((item, index) => {
                const dateCreate = new Date(item.user_created_at);
                const formattedDateCreate = dateCreate.toLocaleDateString();
                const permissions = JSON.parse(item.permission);
                return (
                  <Table.Row
                    key={index}
                    css={
                      index % 2 !== 0
                        ? { fontSize: "21px", background: "$gray100" }
                        : { fontSize: "21px" }
                    }
                  >
                    <Table.Cell css={{ textAlign: "center" }}>
                      <Avatar
                        size="md"
                        name="adebayo"
                        src={"/images/" + item.avatar}
                      />
                    </Table.Cell>
                    <Table.Cell css={{ textAlign: "center" }}>
                      {item.user_name}
                    </Table.Cell>
                    <Table.Cell>{item.email}</Table.Cell>
                    <Table.Cell css={{ textAlign: "center" }}>
                      {item.role_name}
                    </Table.Cell>
                    <Table.Cell css={{ textAlign: "center" }}>
                      <Select bg="white">
                        {permissions.set_permission_dashboard == true && (
                          <option value="option1">Dashboard</option>
                        )}
                        {permissions.set_permission_my_shop == true && (
                          <option value="option1">ร้านค้าของฉัน</option>
                        )}
                        {permissions.set_permission_stock == true && (
                          <option value="option1">คลังสินค้า</option>
                        )}
                        {permissions.set_permission_report == true && (
                          <option value="option1">รายงาน</option>
                        )}
                        {permissions.set_permission_admin_manage == true && (
                          <option value="option1">จัดการแอดมิน</option>
                        )}
                        {permissions.set_permission_settings == true && (
                          <option value="option1">ตั้งค่า</option>
                        )}
                      </Select>
                    </Table.Cell>
                    <Table.Cell css={{ textAlign: "center" }}>
                      {formattedDateCreate}
                    </Table.Cell>
                    <Table.Cell>
                      <Flex justifyContent={"center"}>
                        <HStack>
                          <IconButton
                            borderRadius="3xl"
                            colorScheme="blue"
                            aria-label="Edit"
                            icon={<EditIcon />}
                            onClick={() =>
                              handleGetEditSubadmin(
                                item.userID,
                                item.user_name,
                                item.email,
                                permissions.set_permission_dashboard,
                                permissions.set_permission_my_shop,
                                permissions.set_permission_stock,
                                permissions.set_permission_report,
                                permissions.set_permission_admin_manage,
                                permissions.set_permission_settings
                              )
                            }
                          />
                          <IconButton
                            borderRadius="3xl"
                            colorScheme="red"
                            aria-label="Delete"
                            icon={<DeleteIcon />}
                            onClick={() =>
                              handleModalDeleteAdmin(
                                item.userID,
                                item.user_name
                              )
                            }
                          />
                        </HStack>
                      </Flex>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Box>
        <Box>
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
                <Text>จำนวนแอดมิน : </Text>
              </WrapItem>
              <WrapItem>
                <Text>{getAllUsers.length}</Text>
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
                  width={10}
                  height={15}
                  src={"/images/arrow/left-arrow.png"}
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
                  width={10}
                  height={15}
                  src={"/images/arrow/right-arrow.png"}
                />
              </Button>
            </HStack>
          </Flex>
        </Box>

        {/* Start Modal Add New Admin */}
        <Modal
          isOpen={modalAdd.isOpen}
          onClose={modalAdd.onClose}
          closeOnOverlayClick={false}
          size="custom"
        >
          <ModalOverlay />
          <ModalContent width={"500px"} height={"460px"} mt={"160px"}>
            <ModalHeader>
              <Box>
                <Center>
                  <HStack>
                    <Image
                      width={28}
                      height={28}
                      src={"/images/menu/จัดการแอดมิน.png"}
                      alt="admin"
                    />
                    <Text fontSize="3xl">เพิ่มแอดมิน</Text>
                  </HStack>
                </Center>
              </Box>
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

            <ModalBody>
              <FormControl>
                <HStack justify="center">
                  <Box>
                    <FormLabel>Name : </FormLabel>
                  </Box>
                  <Box>
                    <Input
                      placeholder="name..."
                      onChange={(event) =>
                        setCreateNameSubAdmin(event.target.value)
                      }
                    />
                  </Box>
                </HStack>
              </FormControl>

              <FormControl mt={4}>
                <HStack justify="center">
                  <Box>
                    <FormLabel>Email : </FormLabel>
                  </Box>
                  <Box>
                    <Input
                      placeholder="username@gmail.com"
                      onChange={(event) =>
                        setCreateEmailSubAdmin(event.target.value)
                      }
                    />
                  </Box>
                </HStack>
              </FormControl>

              <FormControl mt={4} pr={5}>
                <HStack justify="center">
                  <Box>
                    <FormLabel>Password : </FormLabel>
                  </Box>
                  <Box>
                    <Input
                      type={"password"}
                      placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                      onChange={(event) =>
                        setCreatePasswordSubAdmin(event.target.value)
                      }
                    />
                  </Box>
                </HStack>
              </FormControl>

              <FormControl mt={5} pl={16} pr={5}>
                <Text as="b">สิทธิ์การเข้าถึง</Text>
                <Grid templateColumns="repeat(2, 1fr)" gap={3} mt={4}>
                  <GridItem>
                    <HStack>
                      <Switch
                        id="switch-dashboard"
                        colorScheme={"green"}
                        onChange={handleSwitchDashboardChange}
                      />
                      <Image
                        width={24}
                        height={24}
                        src={"/images/menu/dashboard.png"}
                        alt="dashboard"
                      />
                      <Text>Dashboard</Text>
                    </HStack>
                  </GridItem>
                  <GridItem>
                    <HStack>
                      <Switch
                        id="switch-report"
                        colorScheme={"green"}
                        onChange={handleSwitchReportChange}
                      />
                      <Image
                        width={24}
                        height={24}
                        src={"/images/menu/report.png"}
                        alt="report"
                      />
                      <Text>รายงาน</Text>
                    </HStack>
                  </GridItem>
                  <GridItem>
                    <HStack>
                      <Switch
                        id="switch-shop"
                        colorScheme={"green"}
                        onChange={handleSwitchMyShopChange}
                      />
                      <Image
                        width={24}
                        height={24}
                        src={"/images/menu/ร้านค้าของฉัน.png"}
                        alt="shop"
                      />
                      <Text>ร้านค้าของฉัน</Text>
                    </HStack>
                  </GridItem>
                  <GridItem>
                    <HStack>
                      <Switch
                        id="switch-admin-management"
                        colorScheme={"green"}
                        onChange={handleSwitchAdminManageChange}
                      />
                      <Image
                        width={24}
                        height={24}
                        src={"/images/menu/จัดการแอดมิน.png"}
                        alt="admin"
                      />
                      <Text>จัดการแอดมิน</Text>
                    </HStack>
                  </GridItem>
                  <GridItem>
                    <HStack>
                      <Switch
                        id="switch-store"
                        colorScheme={"green"}
                        onChange={handleSwitchStockChange}
                      />
                      <Image
                        width={24}
                        height={24}
                        src={"/images/menu/คลังสินค้า.png"}
                        alt="stock"
                      />
                      <Text>คลังสินค้า</Text>
                    </HStack>
                  </GridItem>
                  <GridItem>
                    <HStack>
                      <Switch
                        id="switch-setting"
                        colorScheme={"green"}
                        onChange={handleSwitchSettingsChange}
                      />
                      <Image
                        width={24}
                        height={24}
                        src={"/images/menu/ตั้งค่า.png"}
                        alt="setting"
                      />
                      <Text>ตั้งค่า</Text>
                    </HStack>
                  </GridItem>
                </Grid>
              </FormControl>
            </ModalBody>
            <ModalFooter justifyContent={"center"}>
              <Button
                onClick={handleAddAdmin}
                background="#f84c01"
                height={"25px"}
                fontSize={"22px"}
                padding={"1rem 1.5rem"}
                color="white"
                mr={3}
              >
                เพิ่มแอดมิน
              </Button>
              {/* <Button onClick={modalAdd.onClose}>ยกเลิก</Button> */}
            </ModalFooter>
          </ModalContent>
        </Modal>
        {/* End Modal Add New Admin */}

        {/* Start Modal Copy Link */}
        <Modal
          isOpen={modalCopy.isOpen}
          onClose={modalCopy.onClose}
          closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent mt={"150px"}>
            <ModalHeader>
              <Box>
                <Center>
                  <HStack>
                    <Image
                      width={28}
                      height={28}
                      src={"/images/menu/จัดการแอดมิน.png"}
                    />
                    <Text fontSize="3xl">เพิ่มแอดมิน</Text>
                  </HStack>
                </Center>
              </Box>
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

            <ModalBody>
              <VStack>
                <FormControl id="copy-link">
                  <Wrap align="center" justify="center">
                    <WrapItem>
                      <FormLabel m={0}>ลิ้งเข้าใช้งาน : </FormLabel>
                    </WrapItem>
                    <WrapItem>
                      <InputGroup>
                        <Input
                          htmlSize={22}
                          width="auto"
                          placeholder="http://admin.picpang.com/login"
                          value={inputValueURL}
                        />
                        <InputRightElement width="2.5rem">
                          {/* <Button h="1.75rem" size="sm">
                            Copy
                          </Button> */}
                          <Tooltip label="คัดลอกลิงค์" placement="top">
                            <Image
                              width={20}
                              height={20}
                              src={"/images/copyurladmin.png"}
                              onClick={copyUrlAdmin}
                            />
                          </Tooltip>
                        </InputRightElement>
                      </InputGroup>
                    </WrapItem>
                  </Wrap>
                </FormControl>

                <FormControl id="copy-username" pl={7}>
                  <Wrap align="center" justify="center">
                    <WrapItem>
                      <FormLabel m={0}>Email : </FormLabel>
                    </WrapItem>

                    <WrapItem>
                      <Input
                        htmlSize={25}
                        width="auto"
                        placeholder="username@gmail.com"
                        value={createEmailSubAdmin}
                      />
                    </WrapItem>
                  </Wrap>
                </FormControl>

                <FormControl id="copy-password" pl={2}>
                  <Wrap align="center" justify="center">
                    <WrapItem>
                      <FormLabel m={0}>Password : </FormLabel>
                    </WrapItem>

                    <WrapItem>
                      <Input
                        htmlSize={25}
                        width="auto"
                        type={"password"}
                        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                        value={createPasswordSubAdmin}
                      />
                    </WrapItem>
                  </Wrap>
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter mt={1} justifyContent={"center"}>
              <Button
                onClick={copyAllAdmin}
                background="#f84c01"
                color="white"
                ml={5}
                height={"30px"}
                fontSize={"20px"}
                padding={"0rem 1.5rem"}
              >
                คัดลอก
              </Button>
              {/* <Button onClick={modalCopy.onClose}>ยกเลิก</Button> */}
            </ModalFooter>
          </ModalContent>
        </Modal>
        {/* End Modal Copy Link */}

        <Modal
          isOpen={modalSuccess.isOpen}
          onClose={modalSuccess.onClose}
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
                onClick={modalSuccess.onClose}
              >
                ยืนยัน
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* ลบข้อมูลแอดมิน */}
        <Modal
          isOpen={modalDelete.isOpen}
          onClose={modalDelete.onClose}
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
                  src={"/images/binred.png"}
                  alt="คุณต้องการลบแอดมินใช่หรือไม่"
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
                คุณต้องการลบ {userNameAdmin} ใช่หรือไม่
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
                mr={2}
                onClick={handleConfirmDeleteAdmin}
              >
                ยืนยัน
              </Button>
              <Button
                size={"lg"}
                background="white"
                color="black"
                height={"38px"}
                fontSize={"30px"}
                padding={"1.25rem 2.5rem 1rem 2.5rem"}
                border={"3px solid gray"}
                onClick={modalDelete.onClose}
              >
                ยกเลิก
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* ยืนยันลบแอดมิน */}
        <Modal
          isOpen={modalDeleteSuccess.isOpen}
          onClose={modalDeleteSuccess.onClose}
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
                  alt="ลบแอดมินเรียบร้อย"
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
                ลบแอดมินเรียบร้อยแล้ว
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
                onClick={modalDeleteSuccess.onClose}
              >
                ยืนยัน
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Start Modal Edit New Admin */}
        <Modal
          isOpen={modalEdit.isOpen}
          onClose={modalEdit.onClose}
          closeOnOverlayClick={false}
          size="custom"
        >
          <ModalOverlay />
          <ModalContent width={"500px"} height={"460px"} mt={"160px"}>
            <ModalHeader>
              <Box>
                <Center>
                  <HStack>
                    <Image
                      width={28}
                      height={28}
                      src={"/images/menu/จัดการแอดมิน.png"}
                      alt="admin"
                    />
                    <Text fontSize="3xl">แก้ไไขแอดมิน</Text>
                  </HStack>
                </Center>
              </Box>
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

            <ModalBody>
              <FormControl>
                <HStack justify="center">
                  <Box>
                    <FormLabel>Name : </FormLabel>
                  </Box>
                  <Box>
                    <Input
                      placeholder="name..."
                      value={editNameSubAdmin}
                      onChange={(e) => setEditNameSubAdmin(e.target.value)}
                    />
                  </Box>
                </HStack>
              </FormControl>

              <FormControl mt={4}>
                <HStack justify="center">
                  <Box>
                    <FormLabel>Email : </FormLabel>
                  </Box>
                  <Box>
                    <Input
                      placeholder="username@gmail.com"
                      value={editEmailSubAdmin}
                      onChange={(e) => setEditEmailSubAdmin(e.target.value)}
                    />
                  </Box>
                </HStack>
              </FormControl>

              <FormControl mt={4} pr={5}>
                <HStack justify="center">
                  <Box>
                    <FormLabel>Password : </FormLabel>
                  </Box>
                  <Box>
                    <Input
                      type={"password"}
                      // placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                      onChange={(e) => setEditPasswordSubAdmin(e.target.value)}
                    />
                  </Box>
                </HStack>
              </FormControl>

              <FormControl mt={5} pl={16} pr={5}>
                <Text as="b">สิทธิ์การเข้าถึง</Text>
                <Grid templateColumns="repeat(2, 1fr)" gap={3} mt={4}>
                  <GridItem>
                    <HStack>
                      <Switch
                        id="switch-dashboard"
                        colorScheme={"green"}
                        isChecked={editPerDashboard}
                        onChange={handleSwitchDashboardEditChange}
                      />
                      <Image
                        width={24}
                        height={24}
                        src={"/images/menu/dashboard.png"}
                        alt="dashboard"
                      />
                      <Text>Dashboard</Text>
                    </HStack>
                  </GridItem>
                  <GridItem>
                    <HStack>
                      <Switch
                        id="switch-report"
                        colorScheme={"green"}
                        isChecked={editPerReport}
                        onChange={handleSwitchReportEditChange}
                      />
                      <Image
                        width={24}
                        height={24}
                        src={"/images/menu/report.png"}
                        alt="report"
                      />
                      <Text>รายงาน</Text>
                    </HStack>
                  </GridItem>
                  <GridItem>
                    <HStack>
                      <Switch
                        id="switch-shop"
                        colorScheme={"green"}
                        isChecked={editPerMyShop}
                        onChange={handleSwitchMyShopEditChange}
                      />
                      <Image
                        width={24}
                        height={24}
                        src={"/images/menu/ร้านค้าของฉัน.png"}
                        alt="shop"
                      />
                      <Text>ร้านค้าของฉัน</Text>
                    </HStack>
                  </GridItem>
                  <GridItem>
                    <HStack>
                      <Switch
                        id="switch-admin-management"
                        colorScheme={"green"}
                        isChecked={editPerAdminManage}
                        onChange={handleSwitchAdminManageEditChange}
                      />
                      <Image
                        width={24}
                        height={24}
                        src={"/images/menu/จัดการแอดมิน.png"}
                        alt="admin"
                      />
                      <Text>จัดการแอดมิน</Text>
                    </HStack>
                  </GridItem>
                  <GridItem>
                    <HStack>
                      <Switch
                        id="switch-store"
                        colorScheme={"green"}
                        isChecked={editPerStock}
                        onChange={handleSwitchStockEditChange}
                      />
                      <Image
                        width={24}
                        height={24}
                        src={"/images/menu/คลังสินค้า.png"}
                        alt="stock"
                      />
                      <Text>คลังสินค้า</Text>
                    </HStack>
                  </GridItem>
                  <GridItem>
                    <HStack>
                      <Switch
                        id="switch-setting"
                        colorScheme={"green"}
                        isChecked={editPerSettings}
                        onChange={handleSwitchSettingsEditChange}
                      />
                      <Image
                        width={24}
                        height={24}
                        src={"/images/menu/ตั้งค่า.png"}
                        alt="setting"
                      />
                      <Text>ตั้งค่า</Text>
                    </HStack>
                  </GridItem>
                </Grid>
              </FormControl>
            </ModalBody>
            <ModalFooter justifyContent={"center"}>
              <Button
                onClick={handleEditAdmin}
                background="#f84c01"
                height={"25px"}
                fontSize={"22px"}
                padding={"1rem 1.5rem"}
                color="white"
                mr={3}
              >
                บันทึก
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {/* End Modal Edit New Admin */}

        {/* Start Modal EDit Copy Link */}
        <Modal
          isOpen={modalCopyEdit.isOpen}
          onClose={modalCopyEdit.onClose}
          closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent mt={"150px"}>
            <ModalHeader>
              <Box>
                <Center>
                  <HStack>
                    <Image
                      width={28}
                      height={28}
                      src={"/images/menu/จัดการแอดมิน.png"}
                    />
                    <Text fontSize="3xl">แก้ไขแอดมิน</Text>
                  </HStack>
                </Center>
              </Box>
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

            <ModalBody>
              <VStack>
                <FormControl id="copy-link">
                  <Wrap align="center" justify="center">
                    <WrapItem>
                      <FormLabel m={0}>ลิ้งเข้าใช้งาน : </FormLabel>
                    </WrapItem>
                    <WrapItem>
                      <InputGroup>
                        <Input
                          htmlSize={22}
                          width="auto"
                          placeholder="http://admin.picpang.com/login"
                          value={inputValueURLEdit}
                        />
                        <InputRightElement width="2.5rem">
                          {/* <Button h="1.75rem" size="sm">
                            Copy
                          </Button> */}
                          <Tooltip label="คัดลอกลิงค์" placement="top">
                            <Image
                              width={20}
                              height={20}
                              src={"/images/copyurladmin.png"}
                              onClick={copyUrlAdminEdit}
                            />
                          </Tooltip>
                        </InputRightElement>
                      </InputGroup>
                    </WrapItem>
                  </Wrap>
                </FormControl>

                <FormControl id="copy-username" pl={7}>
                  <Wrap align="center" justify="center">
                    <WrapItem>
                      <FormLabel m={0}>Email : </FormLabel>
                    </WrapItem>

                    <WrapItem>
                      <Input
                        htmlSize={25}
                        width="auto"
                        value={editEmailSubAdmin}
                        placeholder="username@gmail.com"
                        // value={createEmailSubAdmin}
                      />
                    </WrapItem>
                  </Wrap>
                </FormControl>

                <FormControl id="copy-password" pl={2}>
                  <Wrap align="center" justify="center">
                    <WrapItem>
                      <FormLabel m={0}>Password : </FormLabel>
                    </WrapItem>

                    <WrapItem>
                      <Input
                        htmlSize={25}
                        width="auto"
                        type={"password"}
                        value={editPasswordSubAdmin}
                        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                        // value={createPasswordSubAdmin}
                      />
                    </WrapItem>
                  </Wrap>
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter mt={1} justifyContent={"center"}>
              <Button
                onClick={copyAllAdminEdit}
                background="#f84c01"
                color="white"
                ml={5}
                height={"30px"}
                fontSize={"20px"}
                padding={"0rem 1.5rem"}
              >
                คัดลอก
              </Button>
              {/* <Button onClick={modalCopy.onClose}>ยกเลิก</Button> */}
            </ModalFooter>
          </ModalContent>
        </Modal>
        {/* End Modal Edit Copy Link */}

        {/* modal edit succees */}
        <Modal
          isOpen={modalEditSuccess.isOpen}
          onClose={modalEditSuccess.onClose}
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
                  alt="แก้ไขแอดมินเรียบร้อย"
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
                แก้ไขแอดมินเรียบร้อยแล้ว
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
                onClick={modalEditSuccess.onClose}
              >
                ยืนยัน
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
}
