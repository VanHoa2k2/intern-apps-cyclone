"use client";

import { useAppDispatch } from "@/redux/hook";
import { fetchAccount } from "@/redux/slice/accountSlice";
import React, { memo, useEffect, useRef, useState } from "react";
import Header from "@/component/client/header.client";
import styles from "@/styles/app.module.scss";
import "@/styles/reset.scss";
import { usePathname } from "next/navigation";
import LayoutApp from "../share/layout.app";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
import { locales } from "@/i18n/i18n";
const Footer = dynamic(() => import("@/component/client/footer.client"), {
  ssr: false,
});
interface IProps {
  children: React.ReactNode;
}
const AppContent = (props: IProps) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const { t, i18n } = useTranslation();
  const currentLanguage = locales[i18n.language as keyof typeof locales];

  useEffect(() => {
    if (pathname === "/login" || pathname === "/register") return;
    dispatch(fetchAccount());
  }, [dispatch, pathname]);

  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    rootRef.current?.scrollIntoView({ behavior: "smooth" });
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
            <Header t={t} i18n={i18n} currentLanguage={currentLanguage} />
            <div className={styles["content-app"]}>{props.children}</div>
            <Footer t={t} />
          </div>
        </LayoutApp>
      )
    : props.children;
};

export default memo(AppContent);
