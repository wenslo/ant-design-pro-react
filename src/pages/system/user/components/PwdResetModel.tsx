import React from 'react';
import {Form, Input, Modal} from 'antd';

const FormItem = Form.Item;

export interface PwdResetModelProps {
  onCancel: () => void;
  onSubmit: (values: any) => boolean;
  visible: boolean;
  id: number;
}

const layout = {
  labelCol: {span: 5},
  wrapperCol: {span: 16},
};

const PwdResetModel: React.FC<PwdResetModelProps> = (props) => {
  const [form] = Form.useForm();

  const {
    onSubmit: submit,
    onCancel: cancel,
    visible,
    id,
  } = props;

  const okHandle = () => {
    form.validateFields().then(fields => {
      // eslint-disable-next-line no-param-reassign
      delete fields.loginPwdR;
      if (submit(fields)) {
        form.resetFields();
      }
    });
  };
  return (
    <Modal
      destroyOnClose
      title="重置密码"
      visible={visible}
      onOk={okHandle}
      onCancel={cancel}
    >
      <Form
        {...layout}
        form={form}
        initialValues={{
          id,
        }}
      >
        <FormItem name="id" style={{display: 'none'}}>
          <Input type="hidden" readOnly/>
        </FormItem>
        <FormItem
          name="password"
          label="登录密码"
          rules={[{required: true}]}
        >
          <Input.Password type="password" placeholder="请输入登录密码"/>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default PwdResetModel;
