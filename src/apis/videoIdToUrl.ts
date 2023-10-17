import http from '@/libs/http'

export const videoToUrl = (data: any) => {
  const args = {
    url: '/api/management/video-id-to-url/url',
    method: 'GET',
    params: data
  }
  return http.request(args)
}