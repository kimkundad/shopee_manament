import React, { useEffect, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import {
  Flex,
  Box,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Text,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { connect, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
import { getUserLogout } from "@/store/slices/authen";
import { newOrder } from "@/hooks/notification";
type Props = {
  onMenuButtonClick(): void;
};
const Navbar = (props: Props) => {
  const userInfo = useSelector((App) => App.userInfo);
  const userAuthen = useSelector((App) => App.authen);
  const dispatch = useDispatch();
  const router = useRouter();

  const { data: count } = newOrder(
    userInfo.data !== null ? userInfo.data[0]?.code_user : null
  );

  useEffect(() => {
    if (userAuthen?.token == null) {
      router.push({ pathname: "/" });
    }
  }, []);

  const editProfile = () => {
    router.push({ pathname: "/setting/profile" });
  };

  const logout = () => {
    router.push({ pathname: "/" });
    dispatch(getUserLogout());
  };

  const [notification, setNotification] = useState([]);
  const getNoti = async () => {
    const res = await axios.get(
      `https://api.sellpang.com/api/getNoti/${
        userInfo.data !== null ? userInfo.data[0]?.code_user : null
      }/${userInfo.data !== null ? userInfo.data[0]?.id : null}`
    );
    console.log(res.data);
    setNotification(res.data.noti);
  };

  const readNoti = async (type) => {
    const formdata = new FormData();
    formdata.append(
      "user_code",
      userInfo.data !== null ? userInfo.data[0]?.code_user : null
    );
    formdata.append("type_noti", type);
    const res = await axios.post(
      `https://api.sellpang.com/api/readNoti`,
      formdata
    );
    if (type == "new_order") {
      router.push("/order");
    }
  };
  return userAuthen?.token !== null ? (
    <nav
      className={classNames({
        "bg-white text-zinc-500": true, // colors
        "flex items-center": true, // layout
        "w-full fixed z-10 h-24": true, //positioning & styling
      })}
    >
      <Box>
        <Image src="/images/logo sellpang.png" width="100px" height="100px" />
      </Box>
      <div className="flex-grow"></div>
      <button className="md:hidden" onClick={props.onMenuButtonClick}>
        <Bars3Icon className="h-6 w-6" />
      </button>
      <div
        className={classNames({
          "px-3 flex": true,
        })}
      >
        <div className="px-2">
          <Link href="/setting">
            <Image
              src="/images/settings.png"
              width="40px"
              height="40px"
              alt="setting"
            />
          </Link>
        </div>
        <div className="px-2">
          <Menu>
            <MenuButton transition="all 0.2s" onClick={getNoti}>
              <Image
                src="/images/แจ้งเตือน.png"
                width="36px"
                height="36px"
                alt="notification"
              />
              {count?.count > 0 ? (
                <Box
                  pos="absolute"
                  top="14px"
                  right="72px"
                  borderRadius="50%"
                  border="1px solid"
                  w="20px"
                  h="20px"
                  textAlign="center"
                  bg="red"
                  borderColor="red"
                >
                  <Text color="white">{count?.count}</Text>
                </Box>
              ) : null}
            </MenuButton>
            <MenuList>
              {notification?.map((item, index) => {
                return (
                  <MenuItem onClick={(e) => readNoti(item.type_noti)}>
                    <Flex alignItems="center">
                      <Image src="/images/cart.png" w="30px" h="30px" />
                      <Box pl="10px">
                        <Text fontWeight={item.is_seen == 0 ? "bold" : "none"}>
                          {item.type_noti == "new_order"
                            ? "มีคำสั่งซื้อใหม่"
                            : null}
                        </Text>
                        <Text fontWeight={item.is_seen == 0 ? "bold" : "none"}>
                          หมายเลขคำสั่งซื้อ : {item.invoice_id}
                        </Text>
                      </Box>
                    </Flex>
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
        </div>
        <div className="px-2">
          <Menu>
            <MenuButton
              transition="all 0.2s"
              borderRadius="50%"
              borderWidth="1px"
              _hover={{ bg: "gray.400" }}
              _expanded={{ bg: "blue.400" }}
              _focus={{ boxShadow: "outline" }}
            >
              <Image
                src={userInfo.data[0]?.avatar === null ? '/images/user.png' : `https://api.sellpang.com/images/shopee/avatar/${userInfo.data[0]?.avatar}`}
                width="40px"
                height="40px"
                alt="user"
                borderRadius="50%"
              />
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Flex>
                  <Image
                    src={userInfo.data[0]?.avatar === null ? '/images/user.png' : `https://api.sellpang.com/images/shopee/avatar/${userInfo.data[0]?.avatar}`}
                    width="50px"
                    height="50px"
                    alt="user"
                    borderRadius="50%"
                  />
                  <Box pl="10px">
                    <Text>{userInfo.data[0]?.name}</Text>
                    <Text>id: {userInfo.data[0]?.code_user}</Text>
                  </Box>
                </Flex>
              </MenuItem>
              <MenuDivider />
              <MenuItem width="-webkit-fill-available" onClick={editProfile}>
                <Flex>
                  <Image
                    src="/images/user_profile.png"
                    alt=""
                    w="20px"
                    h="20px"
                  />
                  <Text pl="5px">โปรไฟล์ของฉัน</Text>
                </Flex>
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={logout}>
                <Flex width="initial">ออกจากระบบ</Flex>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </nav>
  ) : null;
};

export default Navbar;
