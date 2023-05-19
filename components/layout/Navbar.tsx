import React from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { Link, Box, Image } from "@chakra-ui/react";
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
          <Image src="/images/user.png" width="40px" height="40px" alt="user" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
