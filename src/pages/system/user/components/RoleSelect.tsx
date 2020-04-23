import React, {PureComponent} from "react";
import {Form, Select} from "antd";
import {getAllRole} from "@/pages/system/user/service";

const {Option} = Select;

class RoleSelect extends PureComponent {

  state = {
    roles: []
  };

  componentDidMount(): void {
    getAllRole().then(data => {
      this.setState({roles: data});
    });
  }

  render() {
    return (
      <Form.Item name="roles" label="角色选择">
        <Select
          mode="multiple"
          style={{width: '100%'}}
          placeholder="请选择角色"
        >
          {this.state.roles.map((role) => {
            return <Option key={role.id} value={role.id}>{role.name}</Option>
          })}
        </Select>
      </Form.Item>
    );
  }
}

export default RoleSelect;
