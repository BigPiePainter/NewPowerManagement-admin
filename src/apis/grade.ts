import http from '@/libs/http'

export const getGrades = () => {
    const args = {
        url: '/api/management/grade/get-all-grades',
        method: 'GET',
    }
    return http.request(args)
}