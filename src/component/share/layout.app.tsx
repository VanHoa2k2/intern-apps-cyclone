"use client";
import { message } from "antd";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setRefreshTokenAction } from "@/redux/slice/accountSlice";

interface IProps {
  children: React.ReactNode;
}

const LayoutApp = (props: IProps) => {
  const isRefreshToken = useAppSelector(
    (state) => state?.account?.isRefreshToken
  );
  const errorRefreshToken = useAppSelector(
    (state) => state?.account?.errorRefreshToken
  );

  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isRefreshToken === true) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      message.error(errorRefreshToken);
      dispatch(setRefreshTokenAction({ status: false, message: "" }));
      router.push("/login");
    }
  }, [isRefreshToken]);

  return <>{props.children}</>;
};

export default LayoutApp;
