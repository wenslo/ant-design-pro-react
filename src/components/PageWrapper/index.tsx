import React, {PureComponent, RefObject} from "react";
import {Form} from "antd";

interface PageWrapperProps {
  onSubmit: (values: any) => void;
  formRef: RefObject<any>;
}


class PageWrapper extends PureComponent<PageWrapperProps> {
  render() {
    const {onSubmit} = this.props;
    // Form -> Search -> Table -> Pagination
    return (
      <>
        <Form
          form={this.props.formRef}
          name="toolbar-name"
          onFinish={onSubmit}
        >
          {this.props.children}
        </Form>
      </>
    );
  }
}

export default PageWrapper;
