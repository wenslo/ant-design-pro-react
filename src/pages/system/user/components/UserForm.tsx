import {UserFormProps} from "@/pages/system/user/components/UpdateModel";
import {Button, Form, Input, Radio} from "antd";
import React from "react";
import RoleSelect from "@/pages/system/user/components/RoleSelect";

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const FormItem = Form.Item;
const UserFrom: React.FC<UserFormProps> = props => {
  const [form] = Form.useForm();
  const {
    onSubmit:submit,
    onCancel,
    entity,
  } = props;

  const okHandle = () => {
    form.validateFields().then(fields => {
      if(fields.roles ){
        console.log('roles size > 0')
        const roles = [];
        fields.roles = fields.roles.forEach((it) =>{
          roles.push({id:it});
        });
        fields.roles = roles;
      }
      submit(fields);
    });
  };

  return (
    <Form
      {...formLayout}
      form={form}
      initialValues={entity}
    >
      {entity ? (
        <>
          <FormItem name="id" style={{ display: 'none' }}>
            <Input type="hidden" readOnly />
          </FormItem>
        </>
      ) : null}
      <FormItem name='username'label='登录名'>
        <Input placeholder='请输入登录名'/>
      </FormItem>
      <FormItem name='nickname' label='昵称'>
        <Input placeholder='请输入昵称'/>
      </FormItem>
      <Form.Item name="enabled" label="启用状态">
        <Radio.Group>
          <Radio value={false}>禁用</Radio>
          <Radio value>启用</Radio>
        </Radio.Group>
      </Form.Item>
      <RoleSelect/>
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
        <Button onClick={onCancel} style={{ marginRight: 8 }}>
          取消
        </Button>
        <Button onClick={okHandle} type="primary">
          提交
        </Button>
      </div>
    </Form>
  );
};
export default UserFrom;
