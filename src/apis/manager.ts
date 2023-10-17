import http from '@/libs/http'

export const userInfo = () => {
  const args = {
    url: '/api/management/manager/info',
    method: 'GET',
  }
  return http.request(args)
}

export const userAuthor = (data: any) => {
  const args = {
    url: '/api/management/manager/page-managers',
    method: 'GET',
    params: data
  }
  return http.request(args)
}

export const getManager = (data: any) => {
  const args = {
    url: '/api/management/manager/page-managers',
    method: 'GET',
    params: data
  }
  return http.request(args)
}

export const createManager = (data: any) => {
  const args = {
    url: '/api/management/manager/create-manager',
    method: 'POST',
    data,
    mode: "json"
  }
  return http.request(args)
}

export const eidtManager = (data: any) => {
  const args = {
    url: '/api/management/manager/edit-manager',
    method: 'POST',
    data,
    mode: "json"
  }
  return http.request(args)
}

export const eidtManagerAuthor = (data: any) => {
  const args = {
    url: '/api/management/manager/edit-manager-author',
    method: 'POST',
    data,
    mode: "json"
  }
  return http.request(args)
}

export const deleteManager = (data: any) => {
  const args = {
    url: '/api/management/manager/delete-manager',
    method: 'POST',
    data,
    mode: "json"
  }
  return http.request(args)
}