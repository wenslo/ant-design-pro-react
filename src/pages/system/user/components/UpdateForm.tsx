import React from 'react';
import { Form, Modal} from 'antd';




const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<> = (props) => {

  const [form] = Form.useForm();

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="规则配置"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
      >
        <a>Test</a>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
