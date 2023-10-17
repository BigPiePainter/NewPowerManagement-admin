import http from '@/libs/http'

export const getMiniLessons = (data: any) => {
  const args = {
    url: '/api/management/mini-lesson/page-mini-lessons',
    method: 'GET',
    params: data
  }
  return http.request(args)
}

export const editMiniLessons = (data: any) => {
  const args = {
    url: '/api/management/mini-lesson/edit-mini-lessons',
    method: 'POST',
    data,
    mode: "json"
  }
  return http.request(args)
}

export const getMiniLesson = (data: any) => {
  const args = {
    url: '/api/management/mini-lesson/page-mini-lesson',
    method: 'GET',
    params: data
  }
  return http.request(args)
}

export const deleteMiniLessons = (data: any) => {
  const args = {
    url: '/api/management/mini-lesson/delete-mini-lessons',
    method: 'POST',
    data,
    mode: "json"
  }
  return http.request(args)
}

export const addMiniLessons = (data: any) => {
  const args = {
    url: '/api/management/mini-lesson/create-question',
    method: 'POST',
    data,
    mode: "json"
  }
  return http.request(args)
}


export const deleteMiniLesson = (data: any) => {
  const args = {
    url: '/api/management/mini-lesson/delete-mini-lesson',
    method: 'POST',
    data,
    mode: "json"
  }
  return http.request(args)
}