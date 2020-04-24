import React, {useRef, useState} from "react";
import {ActionType, ProColumns} from "@ant-design/pro-table/lib/Table";
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import {Divider, Switch} from "antd";
import {changeStatus, queryRoleByPage, roleDetail, roleUpdate} from "@/pages/system/role/service";
import {FormValueType} from "@/pages/ListTableList/components/UpdateForm";
import UpdateModel from "@/pages/system/role/components/UpdateModel";

const switchChange = async (value: boolean, id: number) => {
  await changeStatus({id, enabled: value});
};
const handleUpdate = async (fields: any) => {
  await roleUpdate(fields);
  return true;
};


const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const [entity, handleEntity] = useState();
  const [updateModalVisible, handleUpdateModalVisible] = useState();
  const columns: ProColumns<any>[] = [
    {
      title: '角色名称',
      dataIndex: 'name',
    },
    {
      title: '角色描述',
      dataIndex: 'description',
    },
    {
      title: '启用状态',
      dataIndex: 'enabled',
      render: (enabled, record) => (
        <>
          <Switch disabled={record.name === '超级管理员'} defaultChecked={enabled as boolean} checkedChildren="启用"
                  unCheckedChildren="禁用"
                  onChange={(value) => switchChange(value, record.id)}/>
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
            disabled={record.name === '超级管理员'}
            onClick={async () => {
              const detail = await roleDetail(record.id);
              handleEntity(null);
              handleEntity(detail);
              handleUpdateModalVisible(true);
            }}
          >
            修改
          </a>
          <Divider type="vertical"/>
          <a disabled={record.name === '超级管理员'} href="">删除</a>
        </>
      ),
    },
  ];
  return (
    <PageHeaderWrapper>
      <ProTable<any>
        headerTitle="角色列表"
        actionRef={actionRef}
        rowKey="id"
        request={(params) => queryRoleByPage(params)}
        columns={columns}
        rowSelection={{}}
      />
      {entity ? (
        <UpdateModel
          onSubmit={async (value: FormValueType) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              handleEntity(null);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
          }}
          entity={entity}
          updateModalVisible={updateModalVisible}
        />
      ) : null}
    </PageHeaderWrapper>


  )
};

export default TableList;
