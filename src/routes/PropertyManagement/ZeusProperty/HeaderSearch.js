export const renderSimpleForm = () => {
  const { getFieldDecorator } = this.props.form;
  return (
    <Form onSubmit={this.handleSearch} layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="规则编号">
            {getFieldDecorator('no')(<Input placeholder="请输入" />)}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="使用状态">
            {getFieldDecorator('status')(
              <Select placeholder="请选择" style={{ width: '100%' }}>
                <Option value="0">关闭</Option>
                <Option value="1">运行中</Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <span className={styles.submitButtons}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              展开 <Icon type="down" />
            </a>
          </span>
        </Col>
      </Row>
    </Form>
  );
};

export const renderAdvancedForm = () => {
  const { getFieldDecorator } = this.props.form;
  return (
    <Form onSubmit={this.handleSearch} layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="规则编号">
            {getFieldDecorator('no')(<Input placeholder="请输入" />)}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="使用状态">
            {getFieldDecorator('status')(
              <Select placeholder="请选择" style={{ width: '100%' }}>
                <Option value="0">关闭</Option>
                <Option value="1">运行中</Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="调用次数">
            {getFieldDecorator('number')(<InputNumber style={{ width: '100%' }} />)}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="更新日期">
            {getFieldDecorator('date')(
              <DatePicker style={{ width: '100%' }} placeholder="请输入更新日期" />
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="使用状态">
            {getFieldDecorator('status3')(
              <Select placeholder="请选择" style={{ width: '100%' }}>
                <Option value="0">关闭</Option>
                <Option value="1">运行中</Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="使用状态">
            {getFieldDecorator('status4')(
              <Select placeholder="请选择" style={{ width: '100%' }}>
                <Option value="0">关闭</Option>
                <Option value="1">运行中</Option>
              </Select>
            )}
          </FormItem>
        </Col>
      </Row>
      <div style={{ overflow: 'hidden' }}>
        <span style={{ float: 'right', marginBottom: 24 }}>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
            重置
          </Button>
          <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
            收起 <Icon type="up" />
          </a>
        </span>
      </div>
    </Form>
  );
};
