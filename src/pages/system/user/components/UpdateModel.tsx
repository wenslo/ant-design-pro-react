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
    entity,
  } = props;

  return (

    <Modal
      width={640}
      bodyStyle={{padding: '32px 40px 48px'}}
      destroyOnClose
      title="用户修改"
      visible={updateModalVisible}
      okButtonProps={{hidden: true}}
      cancelButtonProps={{hidden: true}}
    >
      <UserFrom onCancel={onCancel} onSubmit={submit} updateModalVisible={updateModalVisible} entity={entity}
                type={FormType.UPDATE}/>
    </Modal>
  );
};

export default UpdateModel;
