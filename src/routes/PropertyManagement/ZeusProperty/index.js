import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from './zeusProperty.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['闲置', '使用中'];

@connect(({ loading }) => ({
  loading: loading.models.rule,
}))
@Form.create()
export default class ZeusProperty extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };
  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      }, () => {
        console.log(this.state.formValues)
      });

      // dispatch({
      //   type: 'rule/fetch',
      //   payload: values,
      // });
    });
  };
  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };
  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  };
  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    const mdSm = {
      md: 6,
      sm: 24,
    };
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={mdSm.md} sm={mdSm.sm}>
            <FormItem label="资产编号">
              {getFieldDecorator('zcbh')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={mdSm.md} sm={mdSm.sm}>
            <FormItem label="财务编号">
              {getFieldDecorator('cwbh')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={mdSm.md} sm={mdSm.sm}>
            <FormItem label="现使用人">
              {getFieldDecorator('xsyr')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={mdSm.md} sm={mdSm.sm}>
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
  }

  renderAdvancedForm() {
    const { getFieldDecorator } = this.props.form;
    const mdSm = {
      md: 6,
      sm: 24,
    };
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={mdSm.md} sm={mdSm.sm}>
            <FormItem label="资产编号">
              {getFieldDecorator('zcbh')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={mdSm.md} sm={mdSm.sm}>
            <FormItem label="财务编号">
              {getFieldDecorator('cwbh')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={mdSm.md} sm={mdSm.sm}>
            <FormItem label="现使用人">
              {getFieldDecorator('xsyr')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={mdSm.md} sm={mdSm.sm}>
            <FormItem label="使用状态">
              {getFieldDecorator('syzt')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">闲置</Option>
                  <Option value="1">使用中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={mdSm.md} sm={mdSm.sm}>
            <FormItem label="更新日期">
              {getFieldDecorator('date')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入更新日期" />
              )}
            </FormItem>
          </Col>
          <Col md={mdSm.md} sm={mdSm.sm}>
            <FormItem label="使用状态">
              {getFieldDecorator('status1')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">闲置</Option>
                  <Option value="1">使用中</Option>
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
  }
  renderForm() {
    return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }
  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };
  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'rule/fetch',
      payload: params,
    });
  };
  render() {
    const { selectedRows, modalVisible } = this.state;
    const { loading } = this.props;
    const columns = [
      {
        title: '资产编号',
        dataIndex: 'propertyNumber',
      },
      {
        title: '财务编号',
        dataIndex: 'financeNumber',
      },
      {
        title: '采购金额',
        dataIndex: 'money',
      },
      {
        title: '采购日期',
        dataIndex: 'date',
      },
      {
        title: '当前状态',
        dataIndex: 'currentStatus',
        filters: [
          {
            text: status[0],
            value: 0,
          },
          {
            text: status[1],
            value: 1,
          },
        ],
        onFilter: (value, record) => record.currentStatus.toString() === value,
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
      },
      {
        title: '位置',
        dataIndex: 'location',
      },
      {
        title: '使用人',
        dataIndex: 'owner',
      },
      {
        title: '使用部门',
        dataIndex: 'bm',
      },
      {
        title: '操作',
        dataIndex: 'op',
        render: (text, record, index) => {
          return (
            <a
              onClick={() => {
                console.log('审批通过', record.financeNumber);
              }}
            >
              审批
            </a>
          );
        },
      },
    ];

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );
    const data = {
      list: [
        {
          key: 1,
          propertyNumber: 123,
          financeNumber: 'CW00001',
          money: 1122,
          date: 'terwewq',
          currentStatus: '0',
          location: '办公室',
          owner: 'is me',
          bm: '学习部',
        },
        {
          key: 2,
          propertyNumber: 123,
          financeNumber: 'CW00001',
          money: 1122,
          date: 'terwewq',
          currentStatus: '1',
          location: '办公室',
          owner: 'is me',
          bm: '学习部',
        },
      ],
      pagination: {
        current: 1,
        pageSize: 20,
        total: 1,
      },
    };

    return (
      <PageHeaderLayout title="资产管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={false}
              data={data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        {/* <CreateForm {...parentMethods} modalVisible={modalVisible} /> */}
      </PageHeaderLayout>
    );
  }
}
