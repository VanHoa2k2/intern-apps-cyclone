"use client";
import React from "react";
import Banner from "@/component/client/shop/Banner";
import Product from "@/component/client/shop/Product";
import { useTranslation } from "react-i18next";

const ShopPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Banner title={t("Shop")} />
      <Product />
    </>
  );
};

export default ShopPage;
