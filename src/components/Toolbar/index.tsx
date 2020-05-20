import React, {PureComponent} from "react";
import {Button, Col, Row} from "antd";

interface ToolbarProps {
}


class Toolbar extends PureComponent<ToolbarProps> {
  render() {
    return (
      <>
        {this.props.children}
        <Row>
          <Col span={24} style={{textAlign: 'right'}}>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
            <Button
              style={{margin: '0 8px'}}
              onClick={() => {
              }}
            >
              重置
            </Button>
          </Col>
        </Row>
      </>
    );
  }
}

export default Toolbar;
