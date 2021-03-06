import { getTestData, testGitHubNewAddress, loginAccountAdmin } from '../services/testPage';

export default {
  namespace: 'testPage',

  state: {
    a: '333',
    testData: [1, 2, 3],
  },

  effects: {
    // *testType({ payload }, { call, put }) {
    //   const response = yield call(getTestData)
    //   console.log('response==================>>>>>', response)
    //   yield put({
    //     type: 'testReducers',
    //     payload: response,
    //   })
    // },
    *getAccountAdmin({ payload }, { call, put }) {
      console.log('payload==>>');
      const response = yield call(loginAccountAdmin);
      console.log('用户登陆了', response);
    },
    *getHubData({ payload }, { call, put }) {
      const response = yield call(testGitHubNewAddress);
      console.log('testGitHubNewAddress1', response);
      console.log('testGitHubNewAddress2', response);
    },
  },

  reducers: {
    testReducers(state, action) {
      console.log(state, action);
      return {
        a: '333',
        testData: [1, 2, 3],
        testData: action.payload,
      };
    },
  },
};
