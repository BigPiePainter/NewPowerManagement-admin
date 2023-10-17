import http from '@/libs/http'


export const getExamInfor = () => {
  const args = {
    url: '/api/management/exam-info/get-all-exam-info',
    method: 'GET'
  }
  return http.request(args)
}

export const createExamInfor = (data: any) => {
  const args = {
    url: '/api/management/exam-info/create-exam-info',
    method: 'POST',
    data,
    mode: "json"
  }
  return http.request(args)
}

export const deleteExamInfor = (data: any) => {
  const args = {
    url: '/api/management/exam-info/delete-exam-info',
    method: 'POST',
    data,
    mode: "json"
  }
  return http.request(args)
}
