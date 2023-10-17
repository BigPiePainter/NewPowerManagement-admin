import http from '@/libs/http'

export const userLogin = (data: any) => {
  const args = {
    url: '/api/management/login/login',
    method: 'POST',
    data,
    mode: "json"
  }
  return http.request(args)
}