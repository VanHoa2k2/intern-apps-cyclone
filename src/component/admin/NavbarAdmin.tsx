"use client";
import { Layout, Menu, MenuProps, message } from "antd";
import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import {
  BlockOutlined,
  BugOutlined,
  LogoutOutlined,
  ProductOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { useAppDispatch } from "@/redux/hook";
import { setLogoutAction } from "@/redux/slice/accountSlice";
import { useRouter } from "next/navigation";

const { Content, Footer, Sider } = Layout;

interface NavbarAdminProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

const NavbarAdmin = (props: NavbarAdminProps) => {
  const { collapsed, setCollapsed } = props;
  const [activeMenu, setActiveMenu] = useState("/admin/product");
  const [menuItems, setMenuItems] = useState<MenuProps["items"]>([]);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    dispatch(setLogoutAction({}));
    message.success("Đăng xuất thành công");
    router.push("/login");
  };

  useEffect(() => {
    const full = [
      {
        label: (
          <Link href="/admin/product">
            <b>Product</b>
          </Link>
        ),
        key: "/admin/product",
        icon: <ProductOutlined />,
      },

      {
        label: (
          <Link href="/admin/category">
            <b>Category</b>
          </Link>
        ),
        key: "/admin/category",
        icon: <BlockOutlined />,
      },

      {
        label: (
          <Link href="/admin/purchase">
            <b>Purchase</b>
          </Link>
        ),
        key: "/admin/purchase",
        icon: <BiPurchaseTagAlt />,
      },
    ];

    if (isMobile) {
      full.push({
        label: (
          <label style={{ cursor: "pointer" }} onClick={() => handleLogout()}>
            Đăng xuất
          </label>
        ),
        key: "logout",
        icon: <LogoutOutlined />,
      });
    }

    setMenuItems(full);
  }, []);

  return (
    <>
      {!isMobile ? (
        <Sider
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div style={{ height: 32, margin: 16, textAlign: "center" }}>
            <BugOutlined /> ADMIN
          </div>
          <Menu
            selectedKeys={[activeMenu]}
            mode="inline"
            items={menuItems}
            onClick={(e) => setActiveMenu(e.key)}
          />
        </Sider>
      ) : (
        <Menu
          selectedKeys={[activeMenu]}
          items={menuItems}
          onClick={(e) => setActiveMenu(e.key)}
          mode="horizontal"
        />
      )}
    </>
  );
};

export default NavbarAdmin;
