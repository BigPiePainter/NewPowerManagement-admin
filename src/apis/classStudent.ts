import http from '@/libs/http'

//班级管理页面增删查找----------------------------------
export const getClassesStudent = (data: object) => {
    const args = {
        url: '/api/management/class-student/page-class-students',
        method: 'GET',
        params: data
    }
    return http.request(args)
}

export const createClassStudent = (data: any) => {
    const args = {
        url: '/api/management/class-student/create-class-student',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}

export const deleteClassStudent = (data: any) => {
    const args = {
        url: '/api/management/class-student/delete-class-student',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}




