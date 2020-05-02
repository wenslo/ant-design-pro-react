import React from 'react';
import {Modal} from 'antd';
import {FormType} from "@/enums";
import RoleFrom from "@/pages/system/role/components/RoleForm";


export interface RoleFormProps {
  onCancel: () => void;
  onSubmit: (values: any) => boolean;
  modalVisible: boolean;
  entity?: any;
  type: FormType;
}


const CreateModel: React.FC<RoleFormProps> = (props) => {

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
      title="新增角色"
      visible={modalVisible}
      okButtonProps={{hidden: true}}
      cancelButtonProps={{hidden: true}}
    >
      <RoleFrom onCancel={onCancel} onSubmit={submit} updateModalVisible={modalVisible}
                type={FormType.CREATE}/>
    </Modal>
  );
};

export default CreateModel;
