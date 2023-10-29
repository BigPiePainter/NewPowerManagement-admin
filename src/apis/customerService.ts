import http from '@/libs/http'

export const getCustomerService = () => {
  const args = {
    url: '/api/management/customer-service/page',
    method: 'GET',
  }
  return http.request(args)
}

export const createCustomerService = (data: any) => {
  const args = {
    url: '/api/management/customer-service/create',
    method: 'POST',
    data,
    mode: "json"
  }
  return http.request(args)
}

export const editCustomerService = (data: any) => {
  const args = {
    url: '/api/management/customer-service/edit',
    method: 'POST',
    data,
    mode: "json"
  }
  return http.request(args)
}

export const deleteCustomerService = (data: any) => {
  const args = {
    url: '/api/management/customer-service/delete',
    method: 'POST',
    data,
    mode: "json"
  }
  return http.request(args)
}