import http from '@/libs/http'

export const getStudentCouse = (data: object) => {
  const args = {
    url: '/api/management/student-course/get-all-student-course',
    method: 'GET',
    params: data
  }
  return http.request(args)
}