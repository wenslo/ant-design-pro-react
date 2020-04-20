import React, {useRef, useState} from "react";
import {ActionType, ProColumns} from "@ant-design/pro-table/lib/Table";
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import {changeStatus, queryUserByPage, userDetail} from "@/pages/system/user/service";
import {Divider, Switch} from "antd";
import UpdateForm from "@/pages/ListTableList/components/UpdateForm";

const switchChange = async (value: boolean,id:number) => {
  await changeStatus({id, enabled: value});
};
const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const [entity,handleEntity] = useState();
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
      render: (enabled,record) => (
        <>
          <Switch defaultChecked={enabled as boolean} checkedChildren="启用" unCheckedChildren="禁用" onChange={(value) => switchChange(value,record.id)}/>
        </>
      ),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={ async () => {
              const detail = await userDetail(record.id);
              handleEntity(detail);
              console.log("User update")
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <a href="">删除</a>
          <Divider type="vertical" />
          <a href="">重置密码</a>
        </>
      ),
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
      {entity ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
    </PageHeaderWrapper>

  )
};

export default TableList;
