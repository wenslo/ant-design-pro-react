import React, {PureComponent} from "react";
import {Checkbox, Form, Row} from "antd";
import {getAllPermission} from "@/pages/system/role/service";
import CheckboxGroup, {CheckboxValueType} from "antd/es/checkbox/Group";

interface PermissionPickerProps {
  checkedList: Map<string, string[]>,
  pickHandler: () => string[];
}

class PermissionPicker extends PureComponent<PermissionPickerProps> {

  state = {
    indeterminateMap: new Map<string, boolean>(),
    checkAllMap: new Map<string, boolean>(),
    permissionMap: new Map<string, string[]>(),
    checkedPermission: new Map<string, string[]>(),
  };

  componentDidMount(): void {
    getAllPermission().then(data => {
      const {checkedList} = this.props;
      this.setState({
        permissionMap: data,
        checkedPermission: checkedList
      });
      const indeterminateMap = new Map<string, boolean>();
      Object.keys(checkedList).forEach((key) => {
        indeterminateMap[key] = checkedList[key].length > 0;
      });
      this.setState({indeterminateMap});
    });
  };

  onChange = (checkedList: Array<CheckboxValueType>, group: string) => {
    console.log(`checkedList is ${checkedList}; group is ${group}`);
    const {checkedPermission, permissionMap} = this.state;
    checkedPermission[group] = checkedList;
    const target = new Map<string, string[]>();
    Object.assign(target, checkedPermission);
    const indeterminateMap = new Map<string, boolean>();
    if (!!checkedPermission[group].length && checkedPermission[group].length < permissionMap[group].length) {
      indeterminateMap[group] = true;
    } else {
      indeterminateMap[group] = false;
    }

    const checkAllMap = new Map<string, boolean>();
    if (checkedPermission[group].length === permissionMap[group].length) {
      checkAllMap[group] = true;
    } else {
      checkAllMap[group] = false;
    }
    this.setState({
      checkedPermission: target,
      indeterminateMap,
      checkAllMap
      // checkAll: checkedList[group].length === permissionMap[group].length,
    })
  };

  onCheckAllChange = (e: any, group: string) => {
    console.log(`e is ${e}; group is ${group}`)
    // this.setState({
    // indeterminate: false,
    // checkAll: e.target.checked,
    // });
  };


  render() {
    const {permissionMap, checkedPermission, indeterminateMap, checkAllMap} = this.state;
    return (
      <Form.Item key='permission' name="permission" label="角色选择">
        {Object.keys(permissionMap).map((item) => (
          <Row style={{marginBottom: 10}} key={item}>
            <Checkbox
              indeterminate={indeterminateMap[item]}
              onChange={(e: any) => this.onCheckAllChange(e, item)}
              checked={checkAllMap[item]}
            >
              {item}
            </Checkbox>
            <br/>
            <CheckboxGroup
              options={permissionMap[item]}
              value={checkedPermission[item]}
              onChange={(checkedValue: Array<CheckboxValueType>) => this.onChange(checkedValue, item)}
            />
          </Row>
        ))}
      </Form.Item>
    );
  }
}

export default PermissionPicker;
