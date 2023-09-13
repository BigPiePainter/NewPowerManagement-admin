import http from '@/libs/http'

export const getStudentPackages = (data: object) => {
    const args = {
        url: '/api/management/student-course-question-package/student-packages',
        method: 'GET',
        params: data
    }
    return http.request(args)
}