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
import { MessengerChat } from "react-messenger-chat-plugin";

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
          <MessengerChat
            pageId="117093431423153"
            language="en_US"
            themeColor={"#000000"}
            bottomSpacing={300}
            loggedInGreeting="loggedInGreeting"
            loggedOutGreeting="loggedOutGreeting"
            greetingDialogDisplay={"show"}
            debugMode={true}
            onMessengerShow={() => {
              console.log("onMessengerShow");
            }}
            onMessengerHide={() => {
              console.log("onMessengerHide");
            }}
            onMessengerDialogShow={() => {
              console.log("onMessengerDialogShow");
            }}
            onMessengerDialogHide={() => {
              console.log("onMessengerDialogHide");
            }}
            onMessengerMounted={() => {
              console.log("onMessengerMounted");
            }}
            onMessengerLoad={() => {
              console.log("onMessengerLoad");
            }}
          />
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
