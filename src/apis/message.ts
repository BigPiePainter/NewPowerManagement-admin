import http from '@/libs/http'

export const getMessages = (data:any) => {
    const args = {
        url: '/api/management/message/page-messages',
        method: 'GET',
        params: data
    }
    return http.request(args)
}
