import http from '@/libs/http'

export const getGrades = () => {
    const args = {
        url: '/api/management/student/grades',
        method: 'GET',
    }
    return http.request(args)
}