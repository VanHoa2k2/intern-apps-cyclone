"use client";

import { Avatar, Button, Dropdown, message, Space } from "antd";
import React, { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { isMobile } from "react-device-detect";
import styles from "@/styles/admin.module.scss";
import { useTranslation } from "react-i18next";
import { locales } from "@/i18n/i18n";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Link from "next/link";
import { setLogoutAction } from "@/redux/slice/accountSlice";
import { useRouter } from "next/navigation";

interface HeaderAdminProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

const HeaderAdmin = (props: HeaderAdminProps) => {
  const { collapsed, setCollapsed } = props;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const user = useAppSelector((state) => state?.account?.user);

  const { t, i18n } = useTranslation();
  const currentLanguage = locales[i18n.language as keyof typeof locales];

  const changeLanguage = (lng: "en" | "vi") => {
    i18n.changeLanguage(lng);
  };

  const handleLogout = async () => {
    dispatch(setLogoutAction({}));
    message.success("Đăng xuất thành công");
    router.push("/login");
  };

  const itemsDropdown = [
    {
      label: <Link href={"/"}>{t("Home")}</Link>,
      key: "home",
    },
    {
      label: (
        <label style={{ cursor: "pointer" }} onClick={() => handleLogout()}>
          {t("Log out")}
        </label>
      ),
      key: "logout",
    },
  ];

  return (
    <>
      {!isMobile && (
        <div
          className="admin-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginRight: 20,
          }}
        >
          <Button
            type="text"
            icon={
              collapsed
                ? React.createElement(MenuUnfoldOutlined)
                : React.createElement(MenuFoldOutlined)
            }
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          <div className={styles["header-content-right"]}>
            <div className={styles["lng"]}>
              <div
                className={
                  currentLanguage === "EN"
                    ? `${styles["lng-en"]} ${styles["active"]}`
                    : styles["lng-en"]
                }
                onClick={() => changeLanguage("en")}
              >
                EN
              </div>
              <div
                className={
                  currentLanguage === "VI"
                    ? `${styles["lng-vi"]} ${styles["active"]}`
                    : styles["lng-vi"]
                }
                onClick={() => changeLanguage("vi")}
              >
                VI
              </div>
            </div>

            <Dropdown menu={{ items: itemsDropdown }} trigger={["click"]}>
              <Space style={{ cursor: "pointer" }}>
                {user?.name}
                <Avatar> {user?.name?.substring(0, 2)?.toUpperCase()} </Avatar>
              </Space>
            </Dropdown>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderAdmin;
