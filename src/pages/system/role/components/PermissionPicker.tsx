import React, {PureComponent} from "react";
import {Checkbox, Form, Row} from "antd";
import {getAllPermission} from "@/pages/system/role/service";
import CheckboxGroup, {CheckboxValueType} from "antd/es/checkbox/Group";

interface PermissionPickerProps {
  checkedList: Map<string, string[]>,
  pickHandler: (data: string[]) => void;
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
    const {checkedPermission, permissionMap, indeterminateMap, checkAllMap} = this.state;
    const {pickHandler} = this.props;
    checkedPermission[group] = checkedList;
    const target = new Map<string, string[]>();
    Object.assign(target, checkedPermission);
    if (!!checkedPermission[group].length && checkedPermission[group].length < permissionMap[group].length) {
      indeterminateMap[group] = true;
    } else {
      indeterminateMap[group] = false;
    }
    if (checkedPermission[group].length === permissionMap[group].length) {
      checkAllMap[group] = true;
    } else {
      checkAllMap[group] = false;
    }
    this.setState({
      checkedPermission: target,
      indeterminateMap,
      checkAllMap
    });
    pickHandler(this.resultAdapter(checkedPermission));
  };

  onCheckAllChange = (e: any, group: string) => {
    const {checked} = e.target;
    const {checkedPermission, permissionMap, indeterminateMap, checkAllMap} = this.state;
    const {pickHandler} = this.props;
    indeterminateMap[group] = false;
    const target = new Map<string, string[]>();
    if (checked) {
      checkAllMap[group] = true;
      const permissionArray = [];
      // eslint-disable-next-line guard-for-in,no-restricted-syntax
      for (const permissionMapElementKey in permissionMap[group]) {
        permissionArray.push(permissionMap[group][permissionMapElementKey].value);
      }
      checkedPermission[group] = permissionArray;
      Object.assign(target, checkedPermission);
    } else {
      checkAllMap[group] = false;
      checkedPermission[group] = [];
      Object.assign(target, checkedPermission);
    }
    this.setState({
      checkedPermission: target,
      checkAllMap,
      indeterminateMap
    });
    pickHandler(this.resultAdapter(checkedPermission));
  };

  resultAdapter = (checkedResult: Map<string, string[]>): string[] => {
    const resultArray: string[] = [];
    Object.keys(checkedResult).forEach((key) => {
      // eslint-disable-next-line guard-for-in,no-restricted-syntax
      for (const checkedResultElementKey in checkedResult[key]) {
        resultArray.push(checkedResult[key][checkedResultElementKey]);
      }
    });
    return resultArray;
  };

  render() {
    const {permissionMap, checkedPermission, indeterminateMap, checkAllMap} = this.state;
    return (
      <Form.Item key='permission' label="角色选择">
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
