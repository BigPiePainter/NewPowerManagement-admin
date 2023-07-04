import http from '@/libs/http'

export const getStudent = (data: any) => {
    const args = {
        url: '/api/management/student/page',
        method: 'GET',
        params:data
    }
    return http.request(args)
}

//--------------只返回有效学生数量--------------------
export const getStudentAmount = () => {
    const args = {
        url: '/api/management/student/count',
        method: 'GET',
    }
    return http.request(args)
}