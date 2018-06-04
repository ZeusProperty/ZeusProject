// import { getTestData, testGitHubNewAddress } from '../services/testPage';

export default {
  namespace: 'zeusProperty',

  state: {
    loading: false,
    data: [1, 2, 3],
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
    // *getHubData({ payload }, { call, put }) {
    //   const response = yield call(testGitHubNewAddress)
    //   console.log('testGitHubNewAddress', response)
    // },
  },

  reducers: {
    // testReducers(state, action) {
    //   console.log(state, action)
    //   return {
    //     ...state,
    //     testData: action.payload,
    //   };
    // },
  },
};
