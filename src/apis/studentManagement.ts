import http from '@/libs/http'

export const getStudent = (data: any) => {
    const args = {
        url: '/api/management/student/page',
        method: 'GET',
        params:data
    }
    return http.request(args)
}