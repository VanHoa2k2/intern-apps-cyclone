"use client";

import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { ActionType, ProColumns } from "@ant-design/pro-components";
import { Button, Space, message, notification, Modal, Upload } from "antd";
import { useRef, useState } from "react";
import { fetchProduct } from "@/redux/slice/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { callDeleteProduct, callUpdateProductPicture } from "@/config/api";
import noImageAvailable from "@/assets/image/no-image-available.jpg";
import styles from "@/styles/admin.module.scss";
import { IProduct } from "@/types/backend";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import DataTable from "@/component/client/data-table";
import Image from "next/image";

const ProductPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<IProduct>();
  const [filePicture, setFilePicture] = useState([]);
  const tableRef = useRef<ActionType>();
  const [modal, contextHolder] = Modal.useModal();
  const isFetching = useAppSelector((state) => state.product.isFetching);
  const products = useAppSelector((state) => state.product.result);
  const meta = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { t } = useTranslation();

  const handleDeleteProduct = async (id: string | undefined) => {
    if (id) {
      try {
        const res = await callDeleteProduct(id);
        message.success(t("Product deletion successful"));
        reloadTable();
      } catch (error) {
        notification.error({
          message: "Có lỗi xảy ra",
        });
      }
    }
  };

  const handleChangeClick = (record: any) => {
    setCurrentProduct(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setFilePicture([]);
    // setCurrentProduct(undefined);
  };

  const handleChangeFile = async ({ file, onSuccess, onError }: any) => {
    setFilePicture(file);
    if (onSuccess) onSuccess("ok");
  };

  const handleUpload = async () => {
    const resUpdatePicture = await callUpdateProductPicture(
      filePicture,
      currentProduct?.id as string
    );
    if (!resUpdatePicture?.statusCode && !resUpdatePicture?.message) {
      if (resUpdatePicture?.id) {
        message.success(t("Updated product images successfully"));
        setIsModalVisible(false);
        dispatch(fetchProduct(`page=1&offset=10`));
      }
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: resUpdatePicture.message,
      });
    }
  };

  const reloadTable = () => {
    tableRef?.current?.reload();
  };

  const columns: ProColumns[] = [
    {
      title: "Id",
      dataIndex: "id",
      sorter: true,
      hideInSearch: true,
    },
    {
      title: t("Name"),
      dataIndex: "name",
    },

    {
      title: t("Url name"),
      dataIndex: "urlName",
      sorter: true,
      hideInSearch: true,
    },
    {
      title: t("Base price"),
      dataIndex: "basePrice",
      sorter: true,
      hideInSearch: true,
      render: (_value, entity, _index, _action) =>
        `${entity.basePrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ`,
    },
    {
      title: t("Discount percentage"),
      dataIndex: "discountPercentage",
      sorter: true,
      hideInSearch: true,
    },
    {
      title: t("Stock"),
      dataIndex: "stock",
      sorter: true,
      hideInSearch: true,
    },
    {
      title: t("Description"),
      dataIndex: "description",
      sorter: true,
      hideInSearch: true,
    },
    {
      title: t("Picture"),
      dataIndex: "picture",
      sorter: true,
      hideInSearch: true,
      render: (_value, entity, _index, _action) => (
        <div className={styles["picture-product-wrap"]}>
          <Image
            src={entity.picture ? `http://${entity.picture}` : noImageAvailable}
            alt={entity.name}
            width={100}
            height={80}
            className={styles["picture-product"]}
          />
          <div
            className={styles["btn-update-picture-product"]}
            onClick={() => handleChangeClick(entity)}
          >
            <UploadOutlined /> Change
          </div>
        </div>
      ),
    },
    {
      title: t("Actions"),
      hideInSearch: true,
      width: 50,
      render: (_value, entity, _index, _action) => (
        <Space>
          <EditOutlined
            style={{
              fontSize: 20,
              color: "#ffa500",
            }}
            type=""
            onClick={() => {
              router.push(`/admin/product/upsert?id=${entity.id}`);
            }}
          />
          <span
            style={{ cursor: "pointer", margin: "0 10px" }}
            onClick={() => {
              modal.confirm({
                title: t("Are you sure you want to delete this product?"),
                onOk: () => {
                  handleDeleteProduct(entity.id);
                },
              });
            }}
          >
            <DeleteOutlined
              style={{
                fontSize: 20,
                color: "#ff4d4f",
              }}
            />
          </span>
          {contextHolder}
        </Space>
      ),
    },
  ];

  // const buildQuery = (params: any, sort: any, filter: any) => {
  //   const clone = { ...params };
  //   if (clone.name) clone.name = `/${clone.name}/i`;
  //   if (clone.salary) clone.salary = `/${clone.salary}/i`;
  //   if (clone?.level?.length) {
  //     clone.level = clone.level.join(",");
  //   }

  //   let temp = queryString.stringify(clone);

  //   let sortBy = "";
  //   if (sort && sort.name) {
  //     sortBy = sort.name === "ascend" ? "sort=name" : "sort=-name";
  //   }
  //   if (sort && sort.salary) {
  //     sortBy = sort.salary === "ascend" ? "sort=salary" : "sort=-salary";
  //   }
  //   if (sort && sort.createdAt) {
  //     sortBy =
  //       sort.createdAt === "ascend" ? "sort=createdAt" : "sort=-createdAt";
  //   }
  //   if (sort && sort.updatedAt) {
  //     sortBy =
  //       sort.updatedAt === "ascend" ? "sort=updatedAt" : "sort=-updatedAt";
  //   }

  //   //mặc định sort theo updatedAt
  //   if (Object.keys(sortBy).length === 0) {
  //     temp = `${temp}&sort=-updatedAt`;
  //   } else {
  //     temp = `${temp}&${sortBy}`;
  //   }

  //   return temp;
  // };

  return (
    <div>
      <DataTable
        actionRef={tableRef}
        headerTitle={t("List of products")}
        rowKey="id"
        loading={isFetching}
        columns={columns}
        dataSource={products}
        request={async (params, sort, filter): Promise<any> => {
          if (params.name) {
            setTimeout(() => {
              const query = `page=${params.current}&offset=${params.pageSize}${
                params.name && `&productName=${params.name}`
              }`;
              dispatch(fetchProduct(query));
            }, 1000);
          } else {
            const query = `page=${params.current}&offset=${params.pageSize}`;
            dispatch(fetchProduct(query));
          }
        }}
        scroll={{ x: true }}
        pagination={{
          current: meta.current,
          pageSize: meta.pageSize,
          showSizeChanger: true,
          total: meta.total,
          showTotal: (total, range) => {
            return (
              <div>
                {" "}
                {range[0]}-{range[1]} {t("out of")} {total} (t{"rows"})
              </div>
            );
          },
        }}
        rowSelection={false}
        toolBarRender={(_action, _rows): any => {
          return (
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => router.push("product/upsert")}
            >
              {t("Add new")}
            </Button>
          );
        }}
      />
      <Modal
        title="Upload New Picture"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="upload" type="primary" onClick={() => handleUpload()}>
            {t("Save")}
          </Button>,
        ]}
      >
        <Upload
          beforeUpload={() => false}
          onChange={handleChangeFile}
          maxCount={1}
          multiple={false}
          defaultFileList={
            currentProduct?.id
              ? [
                  {
                    uid: uuidv4(),
                    name: currentProduct?.picture ?? "",
                    status: "done",
                    url: `http://${currentProduct?.picture}`,
                  },
                ]
              : undefined
          }
        >
          <Button icon={<UploadOutlined />}>{t("Select Image")}</Button>
        </Upload>
      </Modal>
    </div>
  );
};

export default ProductPage;
