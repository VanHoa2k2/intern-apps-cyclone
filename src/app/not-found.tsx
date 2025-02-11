"use client";
import { Button, Result } from "antd";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={() => router.push("/")}>
            Back Home
          </Button>
        }
      />
    </>
  );
};

export default NotFound;
