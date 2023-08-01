import http from '@/libs/http'

export const getStudentHomework = (data: object) => {
    const args = {
        url: '/api/management/student-homework/get-all-student-homework',
        method: 'GET',
        params: data
    }
    
    return http.request(args)
}

