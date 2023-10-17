import http from '@/libs/http'

export const getAllHomeworks = (data: object) => {
  const args = {
    url: '/api/management/homework/page-homework',
    method: 'GET',
    params: data
  }
  return http.request(args)
}

export const shareHomeworkToParents = (data: any) => {
  const args = {
    url: '/api/management/homework/share-homework',
    method: 'POST',
    data,
    mode: "json"
  }
  return http.request(args)
}