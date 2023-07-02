import http from '@/libs/http'

export const getTeachers = (data: any) => {
    const args = {
        url: '/api/management/teacher/page',
        method: 'GET',
        data
    }
    return http.request(args)
}