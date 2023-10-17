import http from '@/libs/http'

export const upload = (data: any) => {
  const args = {
    url: '/api/management/upload/upload',
    method: 'POST',
    data,
    mode: "file"
  }
  return http.request(args)
}