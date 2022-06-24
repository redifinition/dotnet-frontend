import request from '@/utils/request'

export function getList(params) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}
