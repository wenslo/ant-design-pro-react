import React from 'react';
import {Modal} from 'antd';
import {FormValueType} from "@/pages/ListTableList/components/UpdateForm";
import UserFrom from "@/pages/system/user/components/UserForm";
import {FormType} from "@/enums";


export interface UserFormProps {
  onCancel: () => void;
  onSubmit: (values: FormValueType) => boolean;
  updateModalVisible: boolean;
  entity?: any;
  type: FormType;
}


const UpdateModel: React.FC<UserFormProps> = (props) => {

  const {
    onSubmit: submit,
    onCancel,
    updateModalVisible,
  } = props;

  return (

    <Modal
      width={640}
      bodyStyle={{padding: '32px 40px 48px'}}
      destroyOnClose
      title="新增用户"
      visible={updateModalVisible}
      okButtonProps={{hidden: true}}
      cancelButtonProps={{hidden: true}}
    >
      <UserFrom onCancel={onCancel} onSubmit={submit} updateModalVisible={updateModalVisible}
                type={FormType.CREATE}/>
    </Modal>
  );
};

export default UpdateModel;
