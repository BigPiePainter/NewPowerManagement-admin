import http from '@/libs/http'

export const getGoodQuestion = (data: any) => {
  const args = {
    url: '/api/management/question-store/page-question',
    method: 'GET',
    params: data
  }
  return http.request(args)
}

export const deleteGoodQuestion = (data: any) => {
  const args = {
    url: '/api/management/question-store/delete-question',
    method: 'POST',
    data,
    mode: "json"
  }
  return http.request(args)
}

export const createGoodQuestion = (data: any) => {
  const args = {
    url: '/api/management/question-store/create-question',
    method: 'POST',
    data,
    mode: "json"
  }
  return http.request(args)
}

export const editGoodQuestion = (data: any) => {
  const args = {
    url: '/api/management/question-store/edit',
    method: 'POST',
    data,
    mode: "json"
  }
  return http.request(args)
}