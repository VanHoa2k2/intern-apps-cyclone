"use client";

import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import LayoutApp from "@/component/share/layout.app";
import ProtectedRoute from "@/component/share/protected-route";
import { useAppDispatch } from "@/redux/hook";
import { fetchAccount } from "@/redux/slice/accountSlice";
import NavbarAdmin from "@/component/admin/NavbarAdmin";
import HeaderAdmin from "@/component/admin/HeaderAdmin";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);

  const [collapsed, setCollapsed] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    isMounted && (
      <LayoutApp>
        <Layout style={{ minHeight: "100vh" }} className="layout-admin">
          <NavbarAdmin collapsed={collapsed} setCollapsed={setCollapsed} />
          <Layout>
            <HeaderAdmin collapsed={collapsed} setCollapsed={setCollapsed} />
            <Content style={{ padding: "15px" }}>
              <ProtectedRoute>{children}</ProtectedRoute>
            </Content>
          </Layout>
        </Layout>
      </LayoutApp>
    )
  );
}
