import http from '@/libs/http'

export const loadAccountsTotal = (data: any) => {
  const args = {
    url: '/workspace/accountsTotalData',
    method: 'POST',
    data
  }
  return http.request(args)
}

export const loadOrderTotal = (data: any) => {
  const args = {
    url: '/workspace/orderTotalData',
    method: 'POST',
    data
  }
  return http.request(args)
}