import http from '@/libs/http'

export const getGrades = () => {
  const args = {
    url: '/api/management/grade/get-all-grades',
    method: 'GET',
  }
  return http.request(args)
}

export const createGrades = (data: any) => {
  const args = {
    url: '/api/management/grade/create-grade',
    method: 'POST',
    data,
    mode: "json"
  }
  return http.request(args)
}

export const deleteGrades = (data: any) => {
  const args = {
    url: '/api/management/grade/delete-grade',
    method: 'POST',
    data,
    mode: "json"
  }
  return http.request(args)
}

export const UpdataExamDay = (data: any) => {
  const args = {
    url: '/api/management/grade/set-day-remaining-exams',
    method: 'POST',
    data,
    mode: "json"
  }
  return http.request(args)
}


