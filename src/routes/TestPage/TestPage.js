import React, { Component } from 'react';
import styles from './TestPage.less';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Button } from 'antd';

@connect(({ testPage }) => ({
  testPage,
}))
export default class TestPage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'testPage/testType',
    })
  }
  testDispatch = (e) => {
    console.log(this.props.testPage)
    this.props.dispatch({
      type: 'testPage/testReducers',
      payload: ['this', 'is', 'test'],
    });
  }
  render() {
    return (
      <PageHeaderLayout>
        <div className={styles.testClass}>this is test page!~</div>
        <Button type="primary" onClick={() => {
          this.props.dispatch({
            type: 'error/query',
            payload: {
              code: 401,
            }
          })
        }}>测试是否有权限登录</Button>
        <Button onClick={this.testDispatch}>测试 dispatch</Button>
      </PageHeaderLayout>
    );
  }
}
