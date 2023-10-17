
import http from '@/libs/http'

export const createTeacherCourse = (data: any) => {
  const args = {
    url: '/api/management/teacher-course/create',
    method: 'POST',
    data,
    mode: "json"
  }
  return http.request(args)
}

export const getTeacherCourse = (data: object) => {
  const args = {
    url: '/api/management/teacher-course/page-teacher-course',
    method: 'GET',
    params: data
  }
  return http.request(args)
}

export const uploadCouseCover = (data: any) => {
  const args = {
    url: '/api/management/teacher-course/update-cover',
    method: 'POST',
    data,
    mode: "json"
  }
  return http.request(args)
}