import http from '@/libs/http'

export const getTeachers = (data: object) => {
    const args = {
        url: '/api/management/teacher/page-teachers',
        method: 'GET',
        params: data
    }
    return http.request(args)
}

export const getTeachersCount = () => {
    const args = {
        url: '/api/management/teacher/count-all-teachers',
        method: 'GET'
    }
    return http.request(args)
}
