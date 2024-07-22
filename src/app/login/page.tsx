"use client";

import { Button, Divider, Form, Input, message, notification } from "antd";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "@/styles/auth.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hook";
import { callLogin } from "@/config/api";
import { fetchAccount, setUserLoginInfo } from "@/redux/slice/accountSlice";

const LoginPage = () => {
  const router = useRouter();
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const isAuthenticated = useAppSelector(
    (state: any) => state?.account?.isAuthenticated
  );
  // const location = useLocation();
  // const params = new URLSearchParams(location.search);
  // const callback = params?.get("callback");

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const validateMessages = {
    required: "${label} không được để trống!",
    types: {
      email: "${label} không hợp lệ!",
    },
  };

  const passwordRules = [
    {
      required: true,
      message: "Mật khẩu không được để trống!",
    },
    {
      min: 8,
      message: "Mật khẩu phải tối thiểu 8 ký tự",
    },
    {
      max: 16,
      message: "Mật khẩu phải tối đa 16 ký tự",
    },
    {
      pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
      message: "Mật khẩu phải có chữ hoa, chữ thường và ký tự đặc biệt",
    },
  ];

  const onFinish = async (values: any) => {
    const { username, password } = values;
    setIsSubmit(true);
    const res = await callLogin(username, password);
    setIsSubmit(false);
    if (!res?.data?.statusCode && !res?.data?.message) {
      dispatch(setUserLoginInfo(res));
      // dispatch(fetchAccount());
      message.success("Đăng nhập tài khoản thành công!");
      router.push("/");
    } else {
      notification.error({
        message: "Đăng nhập thất bại",
        description: res?.data?.message,
      });
    }
  };

  return (
    <div className={styles["login-page"]}>
      <main className={styles.main}>
        <div className={styles.container}>
          <section className={styles.wrapper}>
            <div className={styles.heading}>
              <h2 className={`${styles.text} ${styles["text-large"]}`}>
                Đăng Nhập
              </h2>
              <Divider />
            </div>
            <Form
              name="basic"
              // style={{ maxWidth: 600, margin: '0 auto' }}
              onFinish={onFinish}
              autoComplete="off"
              validateMessages={validateMessages}
            >
              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label="Email"
                name="username"
                rules={[
                  {
                    required: true,
                    type: "email",
                  },
                ]}
                validateTrigger="onSubmit"
              >
                <Input />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label="Mật khẩu"
                name="password"
                rules={passwordRules}
                validateTrigger="onSubmit"
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
              // wrapperCol={{ offset: 6, span: 16 }}
              >
                <Button type="primary" htmlType="submit" loading={isSubmit}>
                  Đăng nhập
                </Button>
              </Form.Item>
              <Divider>Or</Divider>
              <p className="text text-normal">
                Chưa có tài khoản ?
                <span>
                  <Link href="/register"> Đăng Ký </Link>
                </span>
              </p>
            </Form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
