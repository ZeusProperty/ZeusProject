import request from '../utils/request';

export async function getTestData() {
  return request('/api/users')
}
