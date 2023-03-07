import classNames from "classnames";
import React, { PropsWithChildren, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = (props: PropsWithChildren) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="grid min-h-screen grid-rows-header bg-zinc-100">
      <div>
        <Navbar onMenuButtonClick={() => setSidebarOpen((prev) => !prev)} />
      </div>

      <div className="grid md:grid-cols-sidebar ">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div
          className={classNames({
            "bg-gray-100 rounded-[20px]": true,
          })}
        >
          <div
            className={classNames({
              "m-5 bg-white rounded-[20px]": true,
            })}
          >
            <div className="">{props.children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
