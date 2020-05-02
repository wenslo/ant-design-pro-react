import React from 'react';
import {Modal} from 'antd';
import UserFrom from "@/pages/system/user/components/UserForm";
import {FormType} from "@/enums";


export interface UserFormProps {
  onCancel: () => void;
  onSubmit: (values: any) => boolean;
  modalVisible: boolean;
  entity?: any;
  type: FormType;
}


const CreateModel: React.FC<UserFormProps> = (props) => {

  const {
    onSubmit: submit,
    onCancel,
    modalVisible,
  } = props;

  return (

    <Modal
      width={640}
      bodyStyle={{padding: '32px 40px 48px'}}
      destroyOnClose
      title="新增用户"
      visible={modalVisible}
      okButtonProps={{hidden: true}}
      cancelButtonProps={{hidden: true}}
    >
      <UserFrom onCancel={onCancel} onSubmit={submit} updateModalVisible={modalVisible}
                type={FormType.CREATE}/>
    </Modal>
  );
};

export default CreateModel;
