import React, { useRef, useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import { defaultNavItems } from "./defaultNavItems";
import { useOnClickOutside } from "usehooks-ts";
import { useRouter } from "next/router";
import Image from "next/image";
// define a NavItem prop
export type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  iconcurrentpage: React.ReactNode;
};
// add NavItem prop to component prop
type Props = {
  open: boolean;
  navItems?: NavItem[];
  setOpen(open: boolean): void;
};
const Sidebar = ({ open, navItems = defaultNavItems, setOpen }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, (e) => {
    setOpen(false);
  });
  const router = useRouter();
  const currentPath = router.asPath; // returns the current path URL
  const [isHovering, setIsHovering] = useState(-1);

  const handleMouseOver = (index: number) => {
    setIsHovering(index);
  };

  const handleMouseOut = () => {
    setIsHovering(-1);
  };

  return (
    <div
      className={classNames({
        "flex flex-col justify-between items-center": true, // layout
        "bg-white text-zinc-50": true, // colors
        "md:w-full md:sticky md:top-24 md:z-0 top-0 z-20 fixed": true, // positioning
        "md:h-[calc(100vh_-_96px)] h-full w-[300px]": true, // for height and width
        "transition-transform .3s ease-in-out md:-translate-x-0": true, //animations
        "-translate-x-full ": !open, //hide sidebar to the left when closed
        "text-xl": true,
      })}
      ref={ref}
    >
      <nav className="md:sticky top-0 md:top-16 w-full">
        {/* nav items */}
        <ul className="py-7 flex flex-col gap-2 px-5">
          {navItems.map((item, index) => {
            const imageName = isHovering === index ? item.iconcurrentpage : item.icon;
            return currentPath.match(item.href) ? (
              <Link key={index} href={item.href}>
                <li
                  className={classNames({
                    "text-white bg-red-600 text-2xl": true, //colors
                    "flex gap-4 items-center ": true, //layout
                    "transition-colors duration-300": true, //animation
                    "rounded-xl p-2 mx-2 pl-10": true, //self style
                  })}
                >
                  {item.iconcurrentpage} {item.label}
                </li>
              </Link>
            ) : (
              <Link key={index} href={item.href}>
                <li
                  onMouseEnter={() => handleMouseOver(index)}
                  onMouseLeave={() => handleMouseOut()}
                  className={classNames({
                    "text-black hover:bg-red-600 hover:text-white text-2xl": true, //colors
                    "flex gap-4 items-center ": true, //layout
                    "transition-colors duration-300": true, //animation
                    "rounded-xl p-2 mx-2 pl-10": true, //self style
                  })}
                >
                  {imageName} {item.label}
                </li>
              </Link>
            );
          })}
        </ul>
      </nav>
      <div className="ph-2 w-full">
        <div
          className={classNames({
            "text-black": true, //colors
            "flex gap-4 items-center ": true, //layout
            "transition-colors duration-300": true, //animation
            "rounded-xl p-2 mx-2 pl-14 mb-10": true, //self style
          })}
        >
          <div className="flex gap-4 items-center">
            <Image
              src={"/images/menu/ติดต่อทีมงาน.png"}
              height={40}
              width={40}
              alt="profile image"
            />
            <div className="flex flex-col ">
              <Link href="/contact" className="text-black text-2xl">
                ติดต่อทีมงาน
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
