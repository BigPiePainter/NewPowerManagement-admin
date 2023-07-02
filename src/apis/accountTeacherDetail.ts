import http from '@/libs/http'

export const getClasses = (data: any) => {
    const args = {
        url: '/api/management/teacher/page',
        method: 'POST',
        data
    }
    return http.request(args)
}