import http from '@/libs/http'

export const getTeachers = (data: object) => {
    const args = {
        url: '/api/management/teacher/page',
        method: 'GET',
        params: data
    }
    return http.request(args)
}