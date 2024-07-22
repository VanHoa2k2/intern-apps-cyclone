"use client";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ProColumns } from "@ant-design/pro-components";
import { Button, Modal, Space, message, notification } from "antd";
import { useState, useRef } from "react";
import { ICategory } from "@/types/backend";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchCategory } from "@/redux/slice/categorySlice";
import { callDeleteCategory } from "@/config/api";
import DataTable from "@/component/client/data-table";
import ModalCategory from "@/component/admin/category/modal.category";

const CategoryPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [dataInit, setDataInit] = useState<ICategory | null | undefined>(null);
  const [modal, contextHolder] = Modal.useModal();
  const tableRef = useRef<ActionType>();

  const isFetching = useAppSelector((state) => state.category.isFetching);
  const categories = useAppSelector((state) => state.category.result);
  const meta = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();

  const handleDeleteCategory = async (id: string | undefined) => {
    if (id) {
      try {
        const res = await callDeleteCategory(id);
        message.success("Xóa danh mục thành công");
        reloadTable();
      } catch (error) {
        notification.error({
          message: "Có lỗi xảy ra",
        });
      }
    }
  };

  const reloadTable = () => {
    tableRef?.current?.reload();
  };

  const columns: ProColumns[] = [
    {
      title: "Id",
      dataIndex: "id",
      width: 400,
      hideInSearch: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Actions",
      hideInSearch: true,
      width: 300,
      render: (_value, entity, _index, _action) => (
        <Space>
          <EditOutlined
            style={{
              fontSize: 20,
              color: "#ffa500",
            }}
            type=""
            onClick={() => {
              setOpenModal(true);
              setDataInit(entity);
            }}
          />
          <span
            style={{ cursor: "pointer", margin: "0 10px" }}
            onClick={() => {
              modal.confirm({
                title: "Bạn có chắc chắn muốn xóa sản phẩm này ?",
                onOk: () => {
                  handleDeleteCategory(entity.id);
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
  //   if (clone.page) clone.page = `/${clone.page}/`;
  //   if (clone.offset) clone.offset = `/${clone.offset}/`;

  //   let temp = queryString.stringify(clone);

  //   return temp;
  // };

  return (
    <div>
      <DataTable
        actionRef={tableRef}
        headerTitle="Danh sách danh mục"
        rowKey="id"
        loading={isFetching}
        columns={columns}
        dataSource={categories}
        request={async (params, sort, filter): Promise<any> => {
          const query = `page=${params.current}&offset=${params.pageSize}`;
          dispatch(fetchCategory(query));
        }}
        scroll={{ x: true }}
        pagination={{
          current: meta.page,
          pageSize: meta.offset,
          showSizeChanger: true,
          total: meta.total,
          showTotal: (total, range) => {
            return (
              <div>
                {" "}
                {range[0]}-{range[1]} trên {total} rows
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
              onClick={() => setOpenModal(true)}
            >
              Thêm mới
            </Button>
          );
        }}
      ></DataTable>
      <ModalCategory
        openModal={openModal}
        setOpenModal={setOpenModal}
        reloadTable={reloadTable}
        dataInit={dataInit}
        setDataInit={setDataInit}
      />
    </div>
  );
};

export default CategoryPage;
