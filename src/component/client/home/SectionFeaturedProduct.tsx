"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/client.module.scss";
import { useDispatch } from "react-redux";
import { fetchProduct } from "@/redux/slice/productSlice";
import { IProduct } from "@/types/backend";
import CardProduct from "../card.product";
import { useTranslation } from "react-i18next";
import { Skeleton } from "antd";

const SectionFeaturedProduct = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const LoadProduct = async () => {
      const resultAction = await dispatch(fetchProduct(`page=1&offset=4`));
      setIsloading(true);

      if (resultAction?.payload) {
        setProducts(resultAction?.payload);
        setIsloading(false);
      }
    };
    LoadProduct();
  }, [dispatch]);
  return (
    <div className={`${styles["container"]} mt-[38px]`}>
      <div className="mb-[45px] text-[32px] font-semibold leading-[110px]">
        {t("Featured Products")}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <Skeleton />
        ) : (
          products.map((product) => (
            <CardProduct
              key={product.id}
              urlName={product?.urlName}
              name={product?.name}
              basePrice={product?.basePrice}
              picture={product?.picture}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SectionFeaturedProduct;
