import {connect} from "@@/plugin-dva/exports";
import {ConnectState} from "@/models/connect";
import React, {PureComponent} from "react";
import {FormType} from "@/enums";
import {EnumItem} from "@/models/user";
import {Select} from "antd";

const {Option} = Select;

/**
 * 后端枚举属性
 */
interface EnumRenderProps {
  // 枚举所属组
  group: String,
  // 枚举所属表单类型
  formType: FormType,
  // 字典回调，用户form设值
  changeCallback: (result: string) => void;
  // 登录时从后台获取缓存下来的枚举集合
  enums?: Map<string, EnumItem[]>;
  placeholder?: string
}

class EnumRender extends PureComponent<EnumRenderProps> {
  render() {
    const {group, formType, changeCallback: callback, enums, placeholder} = this.props;


    const select = (
      <Select showSearch
              placeholder={placeholder || '请选择'}
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {enums[group].map((it: EnumItem) => (
          <Option value={it.value}>{it.label}</Option>
        ))}
      </Select>
    );
    return (
      select
    )
  }
}

export default connect(({user}: ConnectState) => ({
  enums: user.enums,
}))(EnumRender);

