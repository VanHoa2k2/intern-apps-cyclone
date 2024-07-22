"use client";
import { Button } from "antd";
import styles from "@/styles/client.module.scss";
import { useTranslation } from "react-i18next";
import { useRouter, useSearchParams } from "next/navigation";
import Banner from "@/component/client/shop/Banner";

const CheckoutSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idPurchase = searchParams.get("idPurchase");
  const { t } = useTranslation();
  return (
    <>
      <Banner title={t("Successful purchase!")} />
      <div className={styles["checkout-success"]}>
        <h6>{t("Congratulations on your successful order")}</h6>
        <p>{t("Your order code is")}:</p>
        <h5>{idPurchase}</h5>
        <p>{t("We will contact you as soon as possible")}</p>
        <p>{t("Wish you have a good day")}</p>
        <div className={styles["checkout-btn-wrap"]}>
          <Button onClick={() => router.push("/")}>
            {t("Continue shopping")}
          </Button>
          <Button onClick={() => router.push("/purchase-order")}>
            {t("Order details")}
          </Button>
        </div>
      </div>
    </>
  );
};

export default CheckoutSuccess;
