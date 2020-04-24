import React, {PureComponent} from "react";
import {Checkbox, Form, Row} from "antd";
import {getAllPermission} from "@/pages/system/role/service";
import CheckboxGroup, {CheckboxValueType} from "antd/es/checkbox/Group";


class PermissionPicker extends PureComponent {

  state = {
    checkedList: new Map<string, boolean>(),
    indeterminate: new Map<string, boolean>(),// default true
    checkAll: new Map<string, boolean>(),// default false
    permissionMap: new Map<string, string[]>(),

  };

  componentDidMount(): void {
    getAllPermission().then(data => {
      this.setState({permissionMap: data});
      console.log(this.state.permissionMap);
    });
  };

  onChange = (checkedList: Array<CheckboxValueType>) => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length,
    })
  };

  onCheckAllChange = (e: any) => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  render() {
    const {permissionMap} = this.state;
    return (
      <Form.Item name="permissions" label="角色选择">
        {Object.keys(permissionMap).map((item) => (
          <Row style={{marginBottom: 10}}>
            <Checkbox
              indeterminate={this.state.indeterminate}
              onChange={this.onCheckAllChange}
              checked={this.state.checkAll}
            >
              {item}
            </Checkbox>
            <br/>
            <CheckboxGroup
              options={permissionMap[item]}
              value={this.state.checkedList}
              onChange={this.onChange}
            />
          </Row>

        ))}


      </Form.Item>
    );
  }
}

export default PermissionPicker;
