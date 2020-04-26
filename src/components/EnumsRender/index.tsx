import {connect} from "@@/plugin-dva/exports";
import {ConnectState} from "@/models/connect";
import React, {PureComponent} from "react";
import {EnumItem} from "@/models/user";
import {Radio, Select} from "antd";
import {EnumRenderType} from "@/enums";

const {Option} = Select;

/**
 * 后端枚举属性
 */
interface EnumRenderProps {
  // 枚举所属组
  group: String,
  // 字典回调，用户form设值
  changeCallback: (result: string) => void;
  // 登录时从后台获取缓存下来的枚举集合
  enums?: Map<string, EnumItem[]>;
  // 如果为Select的话的提示词
  placeholder?: string;
  // 修改时的默认词
  value?: string;
  renderType: EnumRenderType;
}

class EnumRender extends PureComponent<EnumRenderProps> {


  componentDidMount(): void {
    // 组件初始化时，先执行回调，保证form表单数据的正确性
    const {value, changeCallback} = this.props;
    if (value) {
      changeCallback(value);
    }
  }


  render() {
    const {group, changeCallback, enums, placeholder, value, renderType} = this.props;
    const select = (
      <Select showSearch
              placeholder={placeholder || '请选择'}
              optionFilterProp="children"
              defaultValue={value}
              onChange={(changedValue) => changeCallback(changedValue)}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {enums[group].map((it: EnumItem) => (
          <Option key={it.origin} value={it.value}>{it.label}</Option>
        ))}
      </Select>
    );
    const radio = (
      <Radio.Group defaultValue={value}
                   onChange={(e) => changeCallback(e.target.value)}
      >
        {enums[group].map((it: EnumItem) => (
          <Radio key={it.origin} value={it.value}>{it.label}</Radio>
        ))}
      </Radio.Group>
    );
    if (renderType === EnumRenderType.SELECT) {
      return (radio)
    }
    if (renderType === EnumRenderType.RADIO) {
      return (select)
    }
    return (
      select
    )
  }
}

export default connect(({user}: ConnectState) => ({
  enums: user.enums,
}))(EnumRender);

