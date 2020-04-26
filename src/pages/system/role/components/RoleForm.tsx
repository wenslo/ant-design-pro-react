import {UserFormProps} from "@/pages/system/user/components/UpdateModel";
import {Button, Form, Input, Radio} from "antd";
import React from "react";
import PermissionPicker from "@/pages/system/role/components/PermissionPicker";

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const FormItem = Form.Item;
const RoleFrom: React.FC<UserFormProps> = props => {
  const [form] = Form.useForm();
  const {
    onSubmit: submit,
    onCancel,
    entity,
  } = props;

  const okHandle = () => {
    form.validateFields().then(fields => {
      submit(fields);
    });
  };
  const permissionHandler = (data: string[]) => {
    form.setFieldsValue({"permission": data});
  };

  return (
    <Form
      {...formLayout}
      form={form}
      initialValues={entity}
    >
      {entity ? (
        <>
          <FormItem name="id" style={{display: 'none'}}>
            <Input type="hidden" readOnly/>
          </FormItem>
        </>
      ) : null}
      <FormItem name='name' label='角色名称'>
        <Input placeholder='请输入角色名称'/>
      </FormItem>
      <FormItem name='description' label='角色描述'>
        <Input placeholder='请输入角色描述'/>
      </FormItem>
      <Form.Item name="enabled" label="启用状态">
        <Radio.Group>
          <Radio key={0} value={false}>禁用</Radio>
          <Radio key={1} value>启用</Radio>
        </Radio.Group>
      </Form.Item>
      <PermissionPicker checkedList={entity ? entity.convertedPermission : {}}
                        pickHandler={permissionHandler}/>
      <div
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }}
      >
        <Button onClick={onCancel} style={{marginRight: 8}}>
          取消
        </Button>
        <Button onClick={okHandle} type="primary">
          提交
        </Button>
      </div>
    </Form>
  );
};
export default RoleFrom;
