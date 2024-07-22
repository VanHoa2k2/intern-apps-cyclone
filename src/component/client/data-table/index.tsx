import {
  ParamsType,
  ProTable,
  ProTableProps,
} from "@ant-design/pro-components";
import vi_VN from "antd/locale/vi_VN";
import enUS from "antd/lib/locale/en_US";
import { ConfigProvider } from "antd";
import { locales } from "../../../i18n/i18n";
import { useTranslation } from "react-i18next";

const DataTable = <
  T extends Record<string, any>,
  U extends ParamsType = ParamsType,
  ValueType = "text"
>({
  columns,
  defaultData = [],
  dataSource,
  postData,
  pagination,
  // sticky = { offsetHeader: 50 },
  loading,
  rowKey = (record) => record.id,
  scroll,
  params,
  request,
  search,
  polling,
  toolBarRender,
  headerTitle,
  actionRef,
  dateFormatter = "string",
  rowSelection,
}: ProTableProps<T, U, ValueType>) => {
  const { i18n } = useTranslation();
  const currentLanguage = locales[i18n.language as keyof typeof locales];
  return (
    <ConfigProvider locale={currentLanguage === "VI" ? vi_VN : enUS}>
      <ProTable<T, U, ValueType>
        columns={columns}
        defaultData={defaultData}
        dataSource={dataSource}
        postData={postData}
        pagination={pagination}
        bordered
        // sticky={sticky}
        loading={loading}
        rowKey={rowKey}
        scroll={scroll}
        params={params}
        request={request}
        search={search}
        polling={polling}
        toolBarRender={toolBarRender}
        headerTitle={headerTitle}
        actionRef={actionRef}
        dateFormatter={dateFormatter}
        rowSelection={rowSelection}
      />
    </ConfigProvider>
  );
};

export default DataTable;
