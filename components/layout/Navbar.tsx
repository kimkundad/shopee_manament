import React, { useEffect } from "react";
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
  console.log(count);

  useEffect(() => {
    if (userAuthen?.token == null) {
      router.push({pathname:"/"});
    }
  }, []);

  const editProfile = () => {
    router.push({pathname:"/setting/profile"});
  };

  const logout = () => {
    router.push({pathname:"/"});
    dispatch(getUserLogout());
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
          <Image
            src="/images/settings.png"
            width="40px"
            height="40px"
            alt="setting"
          />
        </div>
        <div className="px-2">
          <Menu>
            <MenuButton
              transition="all 0.2s"
            >
              <Image
                src="/images/แจ้งเตือน.png"
                width="36px"
                height="36px"
                alt="notification"
              />
              <Box
                pos="absolute"
                top="14px"
                right="72px"
                borderRadius="50%"
                border="1px solid"
                w="20px"
                h="20px"
                textAlign="center"
                bg="green"
              >
                {/* <Text>{count.count}</Text> */}
              </Box>
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Flex>
                  <Image
                    src={`https://api.sellpang.com/images/shopee/avatar/${userInfo.data[0]?.avatar}`}
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
                src={`https://api.sellpang.com/images/shopee/avatar/${userInfo.data[0]?.avatar}`}
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
                    src={`https://api.sellpang.com/images/shopee/avatar/${userInfo.data[0]?.avatar}`}
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
