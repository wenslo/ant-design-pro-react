import React from 'react';
import {Modal} from 'antd';
import {FormType} from "@/enums";
import RoleFrom from "@/pages/system/role/components/RoleForm";


export interface RoleFormProps {
  onCancel: () => void;
  onSubmit: (values: any) => boolean;
  updateModalVisible: boolean;
  entity?: any;
  type: FormType;
}


const CreateModel: React.FC<RoleFormProps> = (props) => {

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
      title="新增角色"
      visible={updateModalVisible}
      okButtonProps={{hidden: true}}
      cancelButtonProps={{hidden: true}}
    >
      <RoleFrom onCancel={onCancel} onSubmit={submit} updateModalVisible={updateModalVisible}
                type={FormType.CREATE}/>
    </Modal>
  );
};

export default CreateModel;
