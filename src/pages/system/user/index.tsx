import React, {useRef} from "react";
import {ActionType, ProColumns} from "@ant-design/pro-table/lib/Table";
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import {queryUserByPage} from "@/pages/system/user/service";

const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<any>[] = [
    {
      title: '登录名',
      dataIndex: 'username',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
    },
    {
      title: '启用状态',
      dataIndex: 'enabled',
      valueEnum: {
        false:{text:'禁用',status: 'Default'},
        true:{text:'启用',status: 'Success'}
      }
    },
  ];
  return (
    <PageHeaderWrapper>
      <ProTable<any>
        headerTitle="用户列表"
        actionRef={actionRef}
        rowKey="id"
        request={(params) => queryUserByPage(params)}
        columns={columns}
        rowSelection={{}}
      />

    </PageHeaderWrapper>
  )
};

export default TableList;
