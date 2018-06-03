import React, { Component } from 'react';
import styles from './TestPage.less';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Button } from 'antd';

@connect()
export default class TestPage extends Component {
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
      </PageHeaderLayout>
    );
  }
}
