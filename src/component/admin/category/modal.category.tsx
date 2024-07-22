import { ModalForm, ProFormText } from "@ant-design/pro-components";
import { Col, Form, Row, message, notification } from "antd";
import { isMobile } from "react-device-detect";
("../../../config/api");
import { ICategory } from "../../../types/backend";
import { callCreateCategory, callUpdateCategory } from "../../../config/api";

interface IProps {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
  dataInit?: ICategory | null | undefined;
  setDataInit?: (v: any) => void;
  reloadTable: () => void;
}

const ModalCategory = (props: IProps) => {
  const { openModal, setOpenModal, reloadTable, dataInit, setDataInit } = props;
  const [form] = Form.useForm();

  const submitCategory = async (valuesForm: any) => {
    const { name } = valuesForm;
    if (dataInit?.id) {
      //update
      const category = {
        id: dataInit.id,
        name,
      };

      const res = await callUpdateCategory(category.id, category.name);
      if (res) {
        message.success("Cập nhật user thành công");
        handleReset();
        reloadTable();
      } else {
        notification.error({
          message: "Có lỗi xảy ra",
        });
      }
    } else {
      //create
      const res = await callCreateCategory(name);

      if (res.name) {
        message.success("Thêm mới category thành công");
        handleReset();
        reloadTable();
      } else {
        if (res.message)
          notification.error({
            message: "Có lỗi xảy ra",
            description: res?.message,
          });
      }
    }
  };

  const handleReset = async () => {
    form.resetFields();
    // setDataInit(null);
    setOpenModal(false);
  };

  // Usage of DebounceSe

  return (
    <>
      <ModalForm
        title={<>{dataInit?.id ? "Cập nhật User" : "Tạo mới User"}</>}
        open={openModal}
        modalProps={{
          onCancel: () => {
            handleReset();
          },
          afterClose: () => handleReset(),
          destroyOnClose: true,
          width: isMobile ? "100%" : 400,
          keyboard: false,
          maskClosable: false,
          okText: <>{dataInit?.id ? "Cập nhật" : "Tạo mới"}</>,
          cancelText: "Hủy",
        }}
        scrollToFirstError={true}
        preserve={false}
        form={form}
        onFinish={submitCategory}
        initialValues={dataInit?.id ? dataInit : {}}
      >
        <Row gutter={16}>
          <Col lg={24} md={24} sm={24} xs={24}>
            <ProFormText
              label="Tên danh mục"
              name="name"
              rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
              placeholder="Tên danh mục"
            />
          </Col>
        </Row>
      </ModalForm>
    </>
  );
};

export default ModalCategory;
