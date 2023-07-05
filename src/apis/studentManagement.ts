import http from '@/libs/http'

//必要参数：页码(pageNum)，页容量(pageSize)，学生类型(type)
export const getStudent = (data: any) => {
    const args = {
        url: '/api/management/student/page-students',
        method: 'GET',
        params:data
    }
    return http.request(args)
}

//--------------只返回有效学生数量--------------------
export const getStudentAmount = () => {
    const args = {
        url: '/api/management/student/count-all-students',
        method: 'GET',
    }
    return http.request(args)
}