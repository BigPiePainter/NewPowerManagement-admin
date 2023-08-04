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
        params:data
    }
    return http.request(args)
  }