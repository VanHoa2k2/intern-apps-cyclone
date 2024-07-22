"use client";
import React, { useEffect, useState } from "react";
import { IProduct } from "@/types/backend";
import { callCreatePurchase, callFetchProductByUrlName } from "@/config/api";
import styles from "@/styles/client.module.scss";
import {
  Button,
  Col,
  Divider,
  Image,
  InputNumber,
  InputNumberProps,
  Row,
  Skeleton,
  Tag,
  message,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useAppSelector } from "@/redux/hook";
import { useTranslation } from "react-i18next";
import Banner from "@/component/client/shop/Banner";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { fetchProduct } from "@/redux/slice/productSlice";
import Link from "next/link";
import ImageNextJS from "next/image";
import CardProduct from "@/component/client/card.product";

const ProductDetailPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [genericProducts, setGenericProducts] = useState<IProduct[]>([]);
  const [productDetail, setProductDetail] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let params = useParams<{ urlName: string }>();

  const [quantity, setQuantity] = useState<number>(1);
  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );

  const dispatch = useDispatch();

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const init = async () => {
      if (params?.urlName) {
        setIsLoading(true);
        const res = await callFetchProductByUrlName(params?.urlName);
        if (res) {
          setProductDetail(res);
        }
        setIsLoading(false);
      }
    };
    init();
  }, [params?.urlName]);

  useEffect(() => {
    const loadInitialProducts = async () => {
      const resultAction = await dispatch(fetchProduct(`page=1&offset=40`));

      if (resultAction.payload.length > 0) {
        const resultProducts = resultAction.payload.filter(
          (product: IProduct) =>
            product?.categories?.some((category: any) =>
              productDetail?.categories?.some(
                (categoryProductDetail: any) =>
                  category.name === categoryProductDetail.name
              )
            )
        );
        setGenericProducts(shuffleArray(resultProducts).slice(0, 3));
      }
    };

    if (productDetail?.categories) {
      loadInitialProducts();
    }
  }, [dispatch, productDetail?.categories]);

  const onChange: InputNumberProps["onChange"] = (value) => {
    setQuantity(value as number);
  };

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      message.warning("Please login to purchase!");
      router.push("/login");
    } else {
      const res = await callCreatePurchase(
        productDetail?.id as string,
        quantity
      );
      if (res?.id) {
        message.success("Successful purchase!");
        router.push(`/checkout-success/?idPurchase=${res?.id}`);
      }
    }
  };

  const price =
    (productDetail?.basePrice as any) -
    ((productDetail?.basePrice as any) *
      (productDetail?.discountPercentage ?? 0)) /
      100;

  return (
    <>
      <Banner title={productDetail?.name as string} />

      <div className={`${styles["container"]} ${styles["product-detail"]}`}>
        {isLoading ? (
          <Skeleton />
        ) : (
          <Row gutter={[20, 20]}>
            {productDetail && productDetail.id && (
              <>
                <Col span={24} md={12}>
                  <Image
                    width={"100%"}
                    src={`http://${productDetail?.picture}`}
                    alt={productDetail?.name}
                  />
                </Col>
                <Col
                  span={24}
                  md={10}
                  className={styles["product-detail-content"]}
                >
                  <div className={styles["product-detail-title"]}>
                    {productDetail?.name}
                  </div>
                  <div className={styles["product-detail-description"]}>
                    <b>{t("Description")}:</b> {productDetail?.description}
                  </div>
                  <div className={styles["product-detail-stock"]}>
                    <b>{t("Stock")}:</b> {productDetail?.stock}
                  </div>
                  <div className={styles["product-detail-category"]}>
                    <b className="mr-3">{t("Category")}:</b>{" "}
                    {productDetail?.categories?.map((category: any, index) => (
                      <Tag color="processing" key={index}>
                        {category.name}
                      </Tag>
                    ))}
                  </div>
                  <div className={styles["product-detail-price"]}>
                    <b className="mr-3">{t("Price: ")} </b>{" "}
                    {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    VNĐ{" "}
                    <span className={styles["product-detail-basePrice"]}>
                      {productDetail?.basePrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      VNĐ
                    </span>
                    <span className="ml-1 flex align-center">
                      <Tag color="warning">
                        -{productDetail?.discountPercentage}%
                      </Tag>
                    </span>
                  </div>

                  <div className={styles["product-detail-quantity"]}>
                    <b>{t("Quantity")}: </b>{" "}
                    <InputNumber
                      min={1}
                      max={productDetail?.stock}
                      defaultValue={quantity}
                      onChange={onChange}
                    />
                  </div>

                  <Button
                    type="primary"
                    shape="round"
                    icon={<ShoppingCartOutlined />}
                    size={"large"}
                    onClick={() => handlePurchase()}
                  >
                    {t("Purchase")}
                  </Button>
                </Col>
              </>
            )}
          </Row>
        )}
        <Divider />
        <div className={`${styles["container"]} ${styles["product-section"]}`}>
          <div className="text-[24px] mb-8">{t("Generic product")}</div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {genericProducts?.map((product: IProduct) => (
              <CardProduct
                key={product.id}
                urlName={product?.urlName}
                name={product?.name}
                basePrice={product?.basePrice}
                picture={product?.picture}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
