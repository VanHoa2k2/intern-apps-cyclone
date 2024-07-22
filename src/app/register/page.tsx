"use client";
import {
  Button,
  Divider,
  Form,
  Input,
  Row,
  Select,
  message,
  notification,
} from "antd";
import { useState } from "react";
import styles from "../../styles/auth.module.scss";
import { IUser } from "../../types/backend";
import { callRegister } from "../../config/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
const { Option } = Select;

const Register = () => {
  const router = useRouter();
  const [isSubmit, setIsSubmit] = useState(false);

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

  const onFinish = async (values: IUser) => {
    const { name, email, password, address } = values;
    setIsSubmit(true);
    const res = await callRegister(email, password as string, name, address);
    setIsSubmit(false);
    if (!res.statusCode && !res.message) {
      message.success("Đăng ký tài khoản thành công!");
      router.push("/login");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
        duration: 5,
      });
    }
  };

  return (
    <div className={styles["register-page"]}>
      <main className={styles.main}>
        <div className={styles.container}>
          <section className={styles.wrapper}>
            <div className={styles.heading}>
              <h2 className={`${styles.text} ${styles["text-large"]}`}>
                {" "}
                Đăng Ký Tài Khoản{" "}
              </h2>
              <Divider />
            </div>
            <Form<IUser>
              name="basic"
              // style={{ maxWidth: 600, margin: '0 auto' }}
              onFinish={onFinish}
              autoComplete="off"
              validateMessages={validateMessages}
            >
              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label="Họ tên"
                name="name"
                rules={[
                  { required: true, message: "Họ tên không được để trống!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Email không được để trống!" },
                ]}
              >
                <Input type="email" />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label="Mật khẩu"
                name="password"
                rules={passwordRules}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label="Địa chỉ"
                name="address"
                rules={[
                  { required: true, message: "Địa chỉ không được để trống!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
              // wrapperCol={{ offset: 6, span: 16 }}
              >
                <Button type="primary" htmlType="submit" loading={isSubmit}>
                  Đăng ký
                </Button>
              </Form.Item>
              <Divider> Or </Divider>
              <p className="text text-normal">
                {" "}
                Đã có tài khoản ?
                <span>
                  <Link href="/login"> Đăng Nhập </Link>
                </span>
              </p>
            </Form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Register;
