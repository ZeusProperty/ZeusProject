import React, { Component } from 'react';
import styles from './TestPage.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

export default class TestPage extends Component {
  render() {
    return (
      <PageHeaderLayout>
        <div className={styles.testClass}>this is test page!~</div>
      </PageHeaderLayout>
    );
  }
}
