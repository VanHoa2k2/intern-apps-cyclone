"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Input,
  List,
  Modal,
  Row,
  Skeleton,
  Space,
  message,
} from "antd";
import { IPurchase } from "../../types/backend";
import styles from "../../styles/client.module.scss";
import { useDispatch } from "react-redux";
import { fetchPurchase } from "../../redux/slice/purchaseSlice";
import { useAppSelector } from "../../redux/hook";
import { FaRegStar, FaStar } from "react-icons/fa"; // Import icons
import { callReviewPurchaseProduct } from "../../config/api";
import { useTranslation } from "react-i18next";
import Banner from "@/component/client/shop/Banner";

const PurchaseOrder = () => {
  const [purchases, setPurchases] = useState<IPurchase[]>([]);
  const [selectedPurchase, setSelectedPurchase] = useState<IPurchase | null>(
    null
  );
  const [isReviewModalVisible, setIsReviewModalVisible] =
    useState<boolean>(false);
  const [reviewNote, setReviewNote] = useState<number | null>(null);
  const [reviewComment, setReviewComment] = useState<string>("");

  const isFetchingPurchase = useAppSelector(
    (state) => state.purchase.isFetching
  );

  const { t } = useTranslation();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPurchases = async () => {
      const resultActionPurchase = await dispatch(
        fetchPurchase(`page=1&offset=30`)
      );
      const purchasesResult = resultActionPurchase?.payload;
      if (purchasesResult) {
        setPurchases(purchasesResult);
      }
    };

    fetchPurchases();
  }, [dispatch]);

  const handleReviewClick = (purchase: IPurchase) => {
    setSelectedPurchase(purchase);
    setReviewNote(purchase.reviewNote ?? null);
    setReviewComment(purchase.reviewComment ?? "");
    setIsReviewModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsReviewModalVisible(false);
    setSelectedPurchase(null);
    setReviewNote(null);
    setReviewComment("");
  };

  const handleReviewSubmit = async () => {
    const res = await callReviewPurchaseProduct(
      selectedPurchase?.id as string,
      reviewNote as number,
      reviewComment
    );

    if (res?.id) {
      message.success("Review success!");
      const resultActionPurchase = await dispatch(
        fetchPurchase(`page=1&offset=30`)
      );
      const purchasesResult = resultActionPurchase?.payload;
      if (purchasesResult) {
        setPurchases(purchasesResult);
      }
      handleModalCancel();
    }
  };

  // Function to render stars and handle click
  const renderStars = (
    note: number | null,
    handleClick?: (note: number) => void
  ) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={styles["star"]}
          onClick={handleClick ? () => handleClick(i) : undefined}
        >
          {i <= (note ?? 0) ? <FaStar color="#ffc107" /> : <FaRegStar />}
        </span>
      );
    }
    return stars;
  };

  return (
    <>
      <Banner title={t("Purchase order")} />
      <div className={`${styles["container"]} ${styles["purchase-order"]}`}>
        <h2 className={styles["purchase-order-title"]}>
          {t("Purchase order")}
        </h2>
        {isFetchingPurchase ? (
          <Skeleton />
        ) : (
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={purchases}
            renderItem={(purchase) => (
              <List.Item>
                <Card
                  title={purchase.product?.name}
                  className={styles["purchase-card"]}
                >
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <p>
                        {t("Amount")}: {purchase.amount}
                      </p>
                      <p>
                        {t("Total Price")}: {purchase.totalPrice} $
                      </p>
                      <p>
                        {t("Purchase Date")}:{" "}
                        {new Date(purchase.createdAt).toLocaleDateString()}
                      </p>
                    </Col>
                    <Col span={12}>
                      <label>{t("Rating")}:</label>
                      {purchase.reviewNote ? (
                        <div
                          id="reviewNote"
                          className={styles["stars-container"]}
                        >
                          {renderStars(purchase.reviewNote)}
                        </div>
                      ) : (
                        <p>You have not rated the product yet</p>
                      )}
                      {purchase?.reviewComment && (
                        <p>{purchase.reviewComment}</p>
                      )}
                    </Col>
                    <Col span={24}>
                      <Button onClick={() => handleReviewClick(purchase)}>
                        {t("Review")}
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </List.Item>
            )}
          />
        )}

        <Modal
          title={t("Review Product")}
          visible={isReviewModalVisible}
          onCancel={handleModalCancel}
          onOk={handleReviewSubmit}
        >
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div className="review-wrap">
              <label htmlFor="reviewNote">{t("Rating")}:</label>
              <div id="reviewNote" className={styles["stars-container"]}>
                {renderStars(reviewNote, setReviewNote)}
              </div>
            </div>
            <div>
              <label htmlFor="reviewComment">{t("Comment")}:</label>
              <Input.TextArea
                id="reviewComment"
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                rows={4}
              />
            </div>
          </Space>
        </Modal>
      </div>
    </>
  );
};

export default PurchaseOrder;
