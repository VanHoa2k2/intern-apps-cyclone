"use client";

import { useAppDispatch } from "@/redux/hook";
import { fetchAccount } from "@/redux/slice/accountSlice";
import React, { useEffect, useRef, useState } from "react";
import Header from "@/component/client/header.client";
import Footer from "@/component/client/footer.client";
import styles from "@/styles/app.module.scss";
import "@/styles/reset.scss";
import { usePathname } from "next/navigation";
import LayoutApp from "../share/layout.app";

interface IProps {
  children: React.ReactNode;
}
const AppContent = (props: IProps) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (pathname === "/login" || pathname === "/register") return;
    dispatch(fetchAccount());
  }, [dispatch, pathname]);

  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rootRef && rootRef.current) {
      rootRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [pathname]);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isSpecialPage =
    pathname.startsWith("/admin") ||
    pathname === "/login" ||
    pathname === "/register";

  return !isSpecialPage
    ? isClient && (
        <LayoutApp>
          <div className="layout-app" ref={rootRef}>
            <Header />
            <div className={styles["content-app"]}>{props.children}</div>
            <Footer />
          </div>
        </LayoutApp>
      )
    : props.children;
};

export default AppContent;
