import http from '@/libs/http'

export const getSubjects = () => {
    const args = {
        url: '/api/management/subject/get-all-subjects',
        method: 'GET',
    }
    return http.request(args)
}
