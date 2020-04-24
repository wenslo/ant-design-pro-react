import React from 'react';
import {Modal} from 'antd';
import {FormType} from "@/enums";
import {RoleFormProps} from "@/pages/system/role/components/CreateModel";
import RoleFrom from "@/pages/system/role/components/RoleForm";

const UpdateModel: React.FC<RoleFormProps> = (props) => {

  const {
    onSubmit: submit,
    onCancel,
    updateModalVisible,
    entity,
  } = props;

  return (

    <Modal
      width={880}
      bodyStyle={{padding: '32px 40px 48px'}}
      destroyOnClose
      title="角色修改"
      visible={updateModalVisible}
      okButtonProps={{hidden: true}}
      cancelButtonProps={{hidden: true}}
    >
      <RoleFrom onCancel={onCancel} onSubmit={submit} updateModalVisible={updateModalVisible} entity={entity}
                type={FormType.UPDATE}/>
    </Modal>
  );
};

export default UpdateModel;
