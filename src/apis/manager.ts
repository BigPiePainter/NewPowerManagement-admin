import http from '@/libs/http'

export const userInfo = () => {
    const args = {
        url: '/api/management/manager/info',
        method: 'GET',
    }
    return http.request(args)
  }