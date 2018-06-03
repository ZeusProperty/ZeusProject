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
    // this.props.dispatch({
    //   type: 'testPage/testType',
    // })
    this.props.dispatch({
      type: 'testPage/getHubData'
    })
  }
  testDispatch = (e) => {
    console.log(this.props.testPage)
    this.props.dispatch({
      type: 'testPage/testReducers',
      payload: ['this', 'is', 'test', '2222'],
    });
  }
  render() {
    console.log('this.props.testPage', this.props.testPage)
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
        <Button onClick={this.testDispatch}>测试 dispatch{this.props.testPage.testData[0]}</Button>
      </PageHeaderLayout>
    );
  }
}
