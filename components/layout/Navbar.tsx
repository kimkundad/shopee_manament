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
type Props = {
  onMenuButtonClick(): void;
};
const Navbar = (props: Props) => {
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
                src="/images/user.png"
                width="40px"
                height="40px"
                alt="user"
              />
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Flex>
                  <Image
                    src="/images/user.png"
                    width="40px"
                    height="40px"
                    alt="user"
                  />
                  <Box>
                    <Text>ชื่อ นามสกุล</Text>
                    <Text>id:jkhkljlk</Text>
                  </Box>
                </Flex>
              </MenuItem>
              <MenuDivider />
              <MenuItem>
                <Flex>
                  <Text>โปรไฟล์ของฉัน</Text>
                </Flex>
              </MenuItem>
              <MenuItem>
                <Flex>
                  <Text>ร้านค้าของฉัน</Text>
                </Flex>
              </MenuItem>
              <MenuItem>
                <Flex>
                  <Text>คำสั่งซื้อ</Text>
                </Flex>
              </MenuItem>
              <MenuItem>
                <Flex>
                  <Text>คลังสินค้า</Text>
                </Flex>
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
