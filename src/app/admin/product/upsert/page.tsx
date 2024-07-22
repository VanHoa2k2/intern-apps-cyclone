"use client";

import {
  Breadcrumb,
  Col,
  ConfigProvider,
  Divider,
  Form,
  Row,
  Upload,
  message,
  notification,
} from "antd";
import {
  FooterToolbar,
  ProForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import styles from "@/styles/admin.module.scss";
import { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import {
  CheckSquareOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import enUS from "antd/lib/locale/en_US";
import { ICategory, IProduct } from "@/types/backend";
import {
  callCreateProduct,
  callFetchCategory,
  callFetchProductById,
  callUpdateProduct,
  callUpdateProductPicture,
} from "@/config/api";
import { v4 as uuidv4 } from "uuid";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

interface IOptionCategory {
  label: string;
  value: string;
}

interface IProductImage {
  name: string;
  uid: string;
}

const ViewUpsertProduct = (props: any) => {
  const router = useRouter();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loadingUpload, setLoadingUpload] = useState<boolean>(false);
  const [dataImage, setDataImage] = useState<IProductImage[]>([]);
  const [filePicture, setFilePicture] = useState<File | undefined>(undefined);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  let params = useSearchParams();

  const id = params?.get("id");

  // let location = useLocation();
  // let params = new URLSearchParams(location.search);
  // const id = params?.get("id");
  const [dataUpdate, setDataUpdate] = useState<IProduct | null>(null);

  const [form] = Form.useForm();
  let optionCategories: IOptionCategory[] = [];

  const handleFetchCategories = async () => {
    const query = `page=1&offset=10`;
    const res = await callFetchCategory(query);
    if (res) setCategories(res);
  };

  useEffect(() => {
    try {
      handleFetchCategories();
    } catch (error) {
      throw error;
    }
  }, []);

  categories.map((category: ICategory) => {
    optionCategories.push({ label: category.name, value: category.id });
  }, []);

  useEffect(() => {
    const init = async () => {
      if (id) {
        const res = await callFetchProductById(id);
        if (res) {
          setDataUpdate(res);
          const resultCategories: any = [];
          res?.categories.map((category: any) => {
            const filterCategories = optionCategories.filter((item) => {
              return item.label === category.name;
            });
            resultCategories.push(filterCategories);
          });

          // Set form fields including the categories field
          form.setFieldsValue({
            ...res,
            categories: resultCategories.flat(),
          });
        }
      }
    };
    init();
    return () => form.resetFields();
  }, [id, categories]);

  const handleUploadFile = async ({ file, onSuccess, onError }: any) => {
    setFilePicture(file);
    setDataImage([
      {
        name: file.name,
        uid: file.uid,
      },
    ]);
    if (onSuccess) onSuccess("ok");
  };

  const onFinish = async (values: any) => {
    if (dataUpdate?.id) {
      //update
      let categories: any = [];
      if (values.categories[0].label) {
        values.categories.map((category: any) => {
          categories.push(category.value);
        });
      }

      const product = {
        name: values.name,
        basePrice: +values.basePrice,
        discountPercentage: values.discountPercentage,
        stock: values.stock,
        description: values.description,
        // categories: values.categories[0].label ? categories : values.categories,
      };

      const res = await callUpdateProduct(product, dataUpdate.id);
      if (!res?.statusCode && !res?.message) {
        if (res?.id && filePicture) {
          const resUpdatePicture = await callUpdateProductPicture(
            filePicture,
            res?.id
          );
          if (!resUpdatePicture?.statusCode && !resUpdatePicture?.message) {
            if (resUpdatePicture?.id) {
              message.success("Cập nhật product thành công");
              router.push("/admin/product");
            }
          } else {
            notification.error({
              message: "Có lỗi xảy ra",
              description: resUpdatePicture.message,
            });
          }
        } else {
          if (res?.id) {
            message.success("Cập nhật product thành công");
            router.push("/admin/product");
          }
        }
      } else {
        notification.error({
          message: "Có lỗi xảy ra",
          description: res.message,
        });
      }
    } else {
      //create;
      const product = {
        name: values.name,
        basePrice: values.basePrice,
        discountPercentage: values.discountPercentage,
        stock: values.stock,
        description: values.description,
        categories: values.categories,
      };
      const res = await callCreateProduct(product);
      if (!res?.statusCode && !res?.message) {
        if (res?.id) {
          const resUpdatePicture = await callUpdateProductPicture(
            filePicture,
            res?.id
          );
          if (!resUpdatePicture?.statusCode && !resUpdatePicture?.message) {
            if (resUpdatePicture?.id) {
              message.success("Tạo mới product thành công");
              router.push("/admin/product");
            }
          } else {
            notification.error({
              message: "Có lỗi xảy ra",
              description: resUpdatePicture.message,
            });
          }
        }
      } else {
        notification.error({
          message: "Có lỗi xảy ra",
          description: res.message,
        });
      }
    }
  };

  const handleRemoveFile = (file: any) => {
    setDataImage([]);
  };

  const handlePreview = async (file: any) => {
    if (!file.originFileObj) {
      setPreviewImage(file.url);
      setPreviewOpen(true);
      setPreviewTitle(
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
      );
      return;
    }
    getBase64(file.originFileObj, (url: string) => {
      setPreviewImage(url);
      setPreviewOpen(true);
      setPreviewTitle(
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
      );
    });
  };

  const getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  return (
    <div className={styles["upsert-job-container"]}>
      <div className={styles["title"]}>
        <Breadcrumb
          separator=">"
          items={[
            {
              title: <Link href="/admin/product">Manage Product</Link>,
            },
            {
              title: "Upsert product",
            },
          ]}
        />
      </div>
      <div>
        <ConfigProvider locale={enUS}>
          <ProForm
            form={form}
            onFinish={onFinish}
            submitter={{
              searchConfig: {
                resetText: "Hủy",
                submitText: (
                  <>{dataUpdate?.id ? "Cập nhật Product" : "Tạo mới Product"}</>
                ),
              },
              onReset: () => router.push("/admin/product"),
              render: (_: any, dom: any) => (
                <FooterToolbar>{dom}</FooterToolbar>
              ),
              submitButtonProps: {
                icon: <CheckSquareOutlined />,
              },
            }}
          >
            <Row gutter={[20, 20]}>
              <Col span={24} md={6}>
                <ProFormText
                  label="Tên sản phẩm"
                  name="name"
                  rules={[
                    { required: true, message: "Vui lòng không bỏ trống" },
                  ]}
                  placeholder="Nhập tên sản phẩm"
                />
              </Col>
              <Col span={24} md={6}>
                <ProFormDigit
                  label="base price"
                  name="basePrice"
                  rules={[
                    { required: true, message: "Vui lòng không bỏ trống" },
                  ]}
                  min={0}
                  placeholder="Nhập base price"
                />
              </Col>

              <Col span={24} md={6}>
                <ProFormDigit
                  label="discount percentage"
                  name="discountPercentage"
                  rules={[
                    { required: true, message: "Vui lòng không bỏ trống" },
                  ]}
                  placeholder="Nhập discount percentage"
                />
              </Col>
              <Col span={24} md={6}>
                <ProFormDigit
                  label="stock"
                  name="stock"
                  rules={[
                    { required: true, message: "Vui lòng không bỏ trống" },
                  ]}
                  placeholder="Nhập stock"
                />
              </Col>
              <Col span={24} md={10}>
                <ProFormText
                  label="description"
                  name="description"
                  rules={[
                    { required: true, message: "Vui lòng không bỏ trống" },
                  ]}
                  placeholder="Nhập description"
                />
              </Col>
              <Col span={24} md={6}>
                <ProFormSelect
                  name="categories"
                  label="Danh mục"
                  options={optionCategories}
                  placeholder="Please select a category"
                  rules={[
                    { required: true, message: "Vui lòng chọn danh mục!" },
                  ]}
                  allowClear
                  mode="multiple"
                  fieldProps={{
                    showArrow: false,
                  }}
                />
              </Col>
              <Col span={8}>
                <Form.Item
                  labelCol={{ span: 24 }}
                  label="Product image"
                  name="image"
                  rules={
                    dataUpdate
                      ? []
                      : [
                          {
                            required: true,
                            message: "Vui lòng không bỏ trống",
                            validator: () => {
                              if (dataImage.length > 0)
                                return Promise.resolve();
                              else return Promise.reject(false);
                            },
                          },
                        ]
                  }
                >
                  <ConfigProvider locale={enUS}>
                    <Upload
                      name="image"
                      listType="picture-card"
                      className="avatar-uploader"
                      maxCount={1}
                      multiple={false}
                      customRequest={handleUploadFile}
                      beforeUpload={beforeUpload}
                      // onChange={handleChange}
                      onRemove={(file) => handleRemoveFile(file)}
                      // onPreview={handlePreview}
                      defaultFileList={
                        dataUpdate?.id
                          ? [
                              {
                                uid: uuidv4(),
                                name: dataUpdate?.picture ?? "",
                                status: "done",
                                url: `http://${dataUpdate?.picture}`,
                              },
                            ]
                          : []
                      }
                    >
                      <div>
                        {loadingUpload ? <LoadingOutlined /> : <PlusOutlined />}
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    </Upload>
                  </ConfigProvider>
                </Form.Item>
              </Col>
            </Row>
            <Divider />
          </ProForm>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default ViewUpsertProduct;
