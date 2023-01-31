import Header from "../../components/header/header.component";
import Sidebar from "../../components/sidebar/sidebar.component";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./layout.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getRole,
  getRoles,
  getUsers,
} from "../../store/features/user/user.actions";
import { getDivisions } from "../../store/features/division/division.action";
import {
  getAllByFromDivision,
  getAllByToDivision,
} from "../../store/features/attachment/attachment.actions";

const Layout = () => {
  const { userRole } = useSelector((state) => state.user);
  const { mode } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const MINUTE_MS = 4000;

  useEffect(() => {
    const interval = setInterval(() => {
      if (userRole === "USER") dispatch(getAllByToDivision());
      if (userRole === "USER") dispatch(getAllByFromDivision());
    }, MINUTE_MS);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (userRole === "ADMIN") dispatch(getRoles());
    if (userRole === "ADMIN") dispatch(getUsers(0));
    if (userRole === "USER") dispatch(getAllByToDivision());
    if (userRole === "USER") dispatch(getAllByFromDivision());
    dispatch(getDivisions());
    dispatch(getRole());
  }, []);

  return (
    <>
      <div className="layout">
        <div className="layout__container">
          <header className="layout__header">
            <Header />
          </header>
          <main className="layout__main">
            <Sidebar />
            <div className="layout__main__container">
              <div
                className="layout__main__box"
                style={
                  mode
                    ? {}
                    : {
                        color: "#092c3e",
                        backgroundColor: "#fafafa",
                        transition: "0.5s",
                      }
                }
              >
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
export default Layout;
