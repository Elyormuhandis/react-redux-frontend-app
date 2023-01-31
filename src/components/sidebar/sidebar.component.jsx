import { NavLink } from "react-router-dom";
import { sidebarData } from "../../data/sidebarData";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi";
import React, { useState } from "react";
import "./sidebar.styles.scss";
import { useSelector } from "react-redux";
import { SidebarItem } from "./sidebar.styles";

const Sidebar = () => {
  const [open, setopen] = useState(false);
  const { kelganFayllar, yuborilganFayllar } = useSelector(
    (state) => state.attachment
  );
  const { mode } = useSelector((state) => state.ui);
  const { userRole } = useSelector((state) => state.user);
  const toggleOpen = () => {
    setopen(!open);
  };
  const inboxCount = kelganFayllar.filter((file) => file.pdtv === false).length;
  const draftCount = kelganFayllar.filter((file) => file.pdtv === true).length;
  const sentCount = yuborilganFayllar.length;

  return (
    <div
      className={open ? "sidenav" : "sidenavClosed"}
      style={
        mode
          ? {}
          : {
              color: "#092c3e",
              borderRightColor: "#08231c",
              backgroundColor: "#fafafa",
              transition: "0.5s",
            }
      }
    >
      <button className="menuBtn" onClick={toggleOpen}>
        {open ? (
          <HiOutlineChevronDoubleLeft
            style={
              mode
                ? {}
                : {
                    color: "#092c3e",
                    transition: "0.5s",
                  }
            }
          />
        ) : (
          <HiOutlineChevronDoubleRight
            style={
              mode
                ? {}
                : {
                    color: "#092c3e",
                    transition: "0.5s",
                  }
            }
          />
        )}
      </button>
      {userRole === "ADMIN"
        ? sidebarData
            .filter(
              (item) =>
                item.link !== "send" &&
                item.link !== "sent" &&
                item.link !== "drafts" &&
                item.link !== "inbox"
            )
            .map((item) => {
              return (
                <NavLink
                  style={
                    mode
                      ? {}
                      : {
                          color: "#092c3e",
                          transition: "0.5s",
                        }
                  }
                  key={item.id}
                  className={({ isActive }) =>
                    isActive ? "sideitem-active" : "sideitem"
                  }
                  to={item.link}
                >
                  <SidebarItem>
                    <span
                      className={
                        `${item.className}` +
                        (open ? " sidebar-icon" : " sidebar-icon-toggle")
                      }
                    >
                      {item.icon}
                    </span>
                  </SidebarItem>
                  <span className={open ? "linkText" : "linkTextClosed"}>
                    {item.text}
                  </span>
                </NavLink>
              );
            })
        : sidebarData
            .filter((item) => item.link !== "dashboard")
            .map((item) => {
              return (
                <NavLink
                  style={
                    mode
                      ? {}
                      : {
                          color: "#092c3e",
                          transition: "0.5s",
                        }
                  }
                  key={item.id}
                  className={({ isActive }) =>
                    isActive ? "sideitem-active" : "sideitem"
                  }
                  to={item.link}
                >
                  <SidebarItem
                    props
                    sentCount={sentCount}
                    inboxCount={inboxCount}
                    draftCount={draftCount}
                  >
                    <span
                      className={
                        `${item.className} sidebar` +
                        (open ? " sidebar-icon" : " sidebar-icon-toggle")
                      }
                    >
                      {item.icon}
                    </span>
                  </SidebarItem>
                  <span className={open ? "linkText" : "linkTextClosed"}>
                    {item.text}
                  </span>
                </NavLink>
              );
            })}
    </div>
  );
};

export default Sidebar;
