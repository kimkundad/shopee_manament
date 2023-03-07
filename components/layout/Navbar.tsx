import React from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import Image from "next/image";
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
      <div className="font-bold text-6xl text-red-600">LOGO</div>
      <div className="flex-grow"></div>
      <button className="md:hidden" onClick={props.onMenuButtonClick}>
        <Bars3Icon className="h-6 w-6" />
      </button>
      <div className={classNames({
        "px-3 flex":true
      })}>
        <div className="px-2">
          <Image
            src="/images/settings.png"
            width={40}
            height={40}
            alt="setting"
          />
        </div>
        <div className="px-2">
          <Image
            src="/images/แจ้งเตือน.png"
            width={36}
            height={36}
            alt="notification"
          />
        </div>
        <div className="px-2">
          <Image src="/images/user.png" width={40} height={40} alt="user" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
