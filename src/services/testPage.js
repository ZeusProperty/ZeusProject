import request from '../utils/request';

export async function getTestData() {
  return request('/api/users')
}

export async function testGitHubNewAddress() {
  return request('/users/octocat/gists')
}

export async function loginAccountAdmin() {
  return request('/Property/adminlogin', {
    method: 'POST',
    body: {
      userName: 'xiewenxiu',
      pw: '666666',
    },
  })
}