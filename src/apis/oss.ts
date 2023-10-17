import http from '@/libs/http'

export const getPolicy = () => {
  const args = {
    url: '/api/management/oss/getPolicy',
    method: 'GET'
  }
  return http.request(args)
}