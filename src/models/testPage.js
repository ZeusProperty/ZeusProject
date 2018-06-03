import { getTestData } from '../services/testPage';

export default {
  namespace: 'testPage',

  state: {
    testData: [1,2,3],
  },

  effects: {
    *testType({ payload }, { call, put }) {
      const response = yield call(getTestData)
      console.log('response==================>>>>>', response)
      yield put({
        type: 'testReducers',
        payload: response,
      })
    },
  },

  reducers: {
    testReducers(state, action) {
      console.log(state, action)
      return {
        ...state,
        testData: action.payload,
      };
    },
  },
};
