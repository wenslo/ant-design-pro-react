import React, {useRef, useState} from "react";
import {ActionType, ProColumns} from "@ant-design/pro-table/lib/Table";
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import {Button, Divider, Select, Switch} from "antd";
import {changeStatus, queryRoleByPage, roleDetail, roleRemove, roleUpdate} from "@/pages/system/role/service";
import UpdateModel from "@/pages/system/role/components/UpdateModel";
import {PlusOutlined} from "@ant-design/icons/lib";
import CreateModel from "@/pages/system/role/components/CreateModel";

const {Option} = Select;
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
  const [createModalVisible, handleCreateModalVisible] = useState();
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
      renderFormItem: (item, {defaultRender, ...rest}, form) => {
        const select = (
          <Select key='enabled' placeholder='请选择'>
            <Option key='false' value={false}>禁用</Option>
            <Option key='true' value={true}>启用</Option>
          </Select>
        );
        return select;
      },
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
          <a disabled={record.name === '超级管理员'} onClick={async () => {
            await roleRemove(record.id);
            // @ts-ignore
            actionRef.current.reload();
          }}>删除</a>
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
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleCreateModalVisible(true)}>
            <PlusOutlined/> 新建
          </Button>,
        ]}
      />
      {entity ? (
        <UpdateModel
          onSubmit={async (value: any) => {
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
      <CreateModel
        onSubmit={async (value: any) => {
          const success = await handleUpdate(value);
          if (success) {
            handleCreateModalVisible(false);
            handleEntity(null);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleCreateModalVisible(false);
        }}
        modalVisible={createModalVisible}
      />
    </PageHeaderWrapper>


  )
};

export default TableList;
