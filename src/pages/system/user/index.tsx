import React from "react";
import {ProColumns} from "@ant-design/pro-table/lib/Table";
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import {changeStatus, userDetail, userUpdate} from "@/pages/system/user/service";
import {Divider, Select, Switch} from "antd";
import UpdateModel from "@/pages/system/user/components/UpdateModel";
import {defaultPageable} from "@/enums";
import {connect, Dispatch} from 'umi';
import {ConnectProps, SystemUserModelState} from "@@/plugin-dva/connect";

const {Option} = Select;
const switchChange = async (value: boolean, id: number) => {
  await changeStatus({id, enabled: value});
};
const handleUpdate = async (fields: any) => {
  await userUpdate(fields);
  return true;
};

interface UserTableProps extends ConnectProps {
  dispatch: Dispatch;
}

class UserTableList extends React.PureComponent<UserTableProps> {

  state = {
    entity: {},
    updateModalVisible: false,
  };


  // componentDidMount(): void {
  //   const {dispatch} = this.props;
  //   dispatch({
  //     type: 'systemUser/fetchUserList',
  //     payload: defaultPageable,
  //   })
  // }

  queryPage(params: any) {
    const {dispatch, systemUser} = this.props;
    dispatch({
      type: 'systemUser/fetchUserList',
      payload: params,
    });
    return systemUser.pageData;
  }

  render() {
    const {entity, updateModalVisible} = this.state;
    const {dispatch} = this.props;
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
                this.setState({entity: null});

                const roles = [];
                detail.roles.forEach((role) => {
                  roles.push(role.id);
                });
                detail.roles = roles;
                this.setState({entity: detail, updateModalVisible: true});
              }}
            >
              修改
            </a>
            <Divider type="vertical"/>
            <a href="">删除</a>
            <Divider type="vertical"/>
            <a href="">重置密码</a>
          </>
        ),
      },
    ];
    return (
      <PageHeaderWrapper>
        <ProTable<any>
          headerTitle="用户列表"
          rowKey="id"
          request={(params) => this.queryPage(params)}
          columns={columns}
          rowSelection={{}}
        />
        {entity ? (
          <UpdateModel
            onSubmit={async (value: any) => {
              const success = await handleUpdate(value);
              if (success) {
                this.setState({entity: null, updateModalVisible: false});
                dispatch({
                  type: 'systemUser/fetchUserList',
                  payload: defaultPageable,
                })
              }
            }}
            onCancel={() => {
              this.setState({updateModalVisible: false});
            }}
            entity={entity}
            updateModalVisible={updateModalVisible}
          />
        ) : null}
      </PageHeaderWrapper>
    )
  }
}

export default connect(({systemUser}: SystemUserModelState) => ({
  systemUser
}))(UserTableList);

