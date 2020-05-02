import React, {useState} from "react";
import {ActionType, ProColumns} from "@ant-design/pro-table/lib/Table";
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import {
  changeStatus,
  queryUserByPage,
  userDetail,
  userPwdReset,
  userRemove,
  userUpdate
} from "@/pages/system/user/service";
import {Button, Divider, Select, Switch} from "antd";
import UpdateModel from "@/pages/system/user/components/UpdateModel";
import PwdResetModel from "@/pages/system/user/components/PwdResetModel";
import Authorized from "@/utils/Authorized";
import {PlusOutlined} from "@ant-design/icons/lib";
import CreateModel from "@/pages/system/user/components/CreateModel";

const {Option} = Select;
const actionRef = React.createRef<ActionType>();

const switchChange = async (value: boolean, id: number) => {
  await changeStatus({id, enabled: value});
  // @ts-ignore
  actionRef.current.reload();
};
const handleUpdate = async (fields: any) => {
  await userUpdate(fields);
  return true;
};
const handlePwdReset = async (fields: any) => {
  await userPwdReset(fields);
  return true;
};

const TableList: React.FC<{}> = () => {

  const [entity, handleEntity] = useState();
  const [updateModalVisible, handleUpdateModalVisible] = useState();
  const [pwdModelVisible, handlePwdModelVisible] = useState();
  const [createModelVisible, handleCreateModalVisible] = useState();

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
          <Switch defaultChecked={enabled as boolean} checkedChildren="启用" unCheckedChildren="禁用"
                  onChange={(value) => switchChange(value, record.id)}/>
        </>
      ),
    },
    {
      title: '最后修改时间',
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={async () => {
              const detail = await userDetail(record.id);
              handleEntity(null);
              const roles = [];
              detail.roles.forEach((role) => {
                roles.push(role.id);
              });
              detail.roles = roles;
              handleEntity(detail);
              handleUpdateModalVisible(true);
            }}
          >
            修改
          </a>
          <Divider type="vertical"/>
          <a onClick={async () => {
            await userRemove(record.id);
            // @ts-ignore
            actionRef.current.reload();
          }}>
            删除
          </a>
          <Authorized authority={['ADMINISTRATOR']} noMatch={null}>

            <Divider type="vertical"/>
            <a onClick={async () => {
              handleEntity({id: record.id});
              handlePwdModelVisible(true);
            }}>重置密码</a>
          </Authorized>
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
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleCreateModalVisible(true)}>
            <PlusOutlined/> 新建
          </Button>,
        ]}
      />
      {entity ? (
        <>
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
          <PwdResetModel
            onSubmit={async (value: any) => {
              const success = await handlePwdReset(value);
              if (success) {
                handlePwdModelVisible(false);
                handleEntity(null);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }}
            onCancel={() => {
              handlePwdModelVisible(false);
            }}
            id={entity.id}
            visible={pwdModelVisible}
          />
        </>
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
        entity={entity}
        modalVisible={createModelVisible}
      />
    </PageHeaderWrapper>

  )
};

export default TableList;
