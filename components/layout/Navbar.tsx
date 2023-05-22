import React from "react";
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
} from "@chakra-ui/react";
import Link from "next/link";
import { connect, useDispatch, useSelector } from "react-redux";
type Props = {
  onMenuButtonClick(): void;
};
const Navbar = (props: Props) => {
  const userInfo = useSelector((App) => App.userInfo);
  return (
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
          <Image
            src="/images/แจ้งเตือน.png"
            width="36px"
            height="36px"
            alt="notification"
          />
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
                  />
                  <Box pl="10px">
                    <Text>{userInfo.data[0]?.name}</Text>
                    <Text>id: {userInfo.data[0]?.id}</Text>
                  </Box>
                </Flex>
              </MenuItem>
              <MenuDivider />
              <MenuItem>
                <Link href="/setting/profile" w="100%">
                  <Flex>
                    <Image
                      src="/images/user_profile.png"
                      alt=""
                      w="20px"
                      h="20px"
                    />
                    <Text pl="5px">โปรไฟล์ของฉัน</Text>
                  </Flex>
                </Link>
              </MenuItem>
              <MenuDivider />
              <MenuItem>
                <Flex>
                  <Text>ออกจากระบบ</Text>
                </Flex>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
