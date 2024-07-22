"use client";

import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ProColumns } from "@ant-design/pro-components";
import { Button, Modal, Space, message, notification } from "antd";
import { useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { callDeletePurchase } from "@/config/api";
import DataTable from "@/component/client/data-table";
import { fetchPurchaseAdmin } from "@/redux/slice/purchaseAdminSlice";

const PurchasePage = () => {
  const [modal, contextHolder] = Modal.useModal();
  const tableRef = useRef<ActionType>();

  const isFetching = useAppSelector((state) => state.purchaseAdmin.isFetching);
  const purchases = useAppSelector((state) => state.purchaseAdmin.result);

  const meta = useAppSelector((state) => state.purchaseAdmin);
  const dispatch = useAppDispatch();

  const handleDeletePurchase = async (id: string | undefined) => {
    if (id) {
      try {
        const res = await callDeletePurchase(id);
        message.success("Xóa đơn mua hàng thành công");
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
      // render: (text, record, index, action) => {
      //   return (
      //     <a
      //       href="#"
      //       onClick={() => {
      //         setOpenViewDetail(true);
      //         setDataInit(record);
      //       }}
      //     >
      //       {record.id}
      //     </a>
      //   );
      // },
      hideInSearch: true,
    },
    {
      title: "Product id",
      dataIndex: "productId",
      sorter: true,
    },
    {
      title: "Review note",
      dataIndex: "reviewNote",
      sorter: true,
    },
    {
      title: "Review comment",
      dataIndex: "reviewComment",
      sorter: true,
    },
    {
      title: "Actions",
      hideInSearch: true,
      width: 300,
      render: (_value, entity, _index, _action) => (
        <Space>
          <span
            style={{ cursor: "pointer", margin: "0 10px" }}
            onClick={() => {
              modal.confirm({
                title: "Bạn có chắc chắn muốn xóa đơn mua hàng này ?",
                onOk: () => {
                  handleDeletePurchase(entity.id);
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
        headerTitle="Danh sách đon mua hàng"
        rowKey="id"
        loading={isFetching}
        columns={columns}
        dataSource={purchases}
        request={async (params, sort, filter): Promise<any> => {
          const query = `page=${params.current}&offset=${params.pageSize}`;
          dispatch(fetchPurchaseAdmin(query));
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
              // onClick={() => setOpenModal(true)}
            >
              Thêm mới
            </Button>
          );
        }}
      ></DataTable>
      {/* <ViewDetailUser
        onClose={setOpenViewDetail}
        open={openViewDetail}
        dataInit={dataInit}
        setDataInit={setDataInit}
      /> */}
    </div>
  );
};

export default PurchasePage;
