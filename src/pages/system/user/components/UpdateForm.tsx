import React from 'react';
import {Form, Input, Modal} from 'antd';
import {FormValueType} from "@/pages/ListTableList/components/UpdateForm";


export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  entity: any;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};
const FormItem = Form.Item;
const UpdateForm: React.FC<UpdateFormProps> = (props) => {

  const [form] = Form.useForm();
  const {
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    entity,
  } = props;

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="规则配置"
      visible={updateModalVisible}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={entity}
      >
        <FormItem label='登录名'>
          <Input value={entity.username}/>
        </FormItem>
        <FormItem label='昵称'>
          <Input value={entity.nickname}/>
        </FormItem>

      </Form>
    </Modal>
  );
};

export default UpdateForm;
