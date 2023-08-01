import http from '@/libs/http'

export const getStudentQuestions = (data: object) => {
    const args = {
        url: '/api/management/student-question/get-all-mini-lessons',
        method: 'GET',
        params: data
    }
    return http.request(args)
}

