import http from '@/libs/http'

export const createTeacher = (data:any) => {
    const args = {
        url: '/api/management/teacher/create',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}

export const getAllTeachers = (data: object) => {
    const args = {
        url: '/api/management/teacher/get-all-teachers',
        method: 'GET',
        params: data
    }
    return http.request(args)
}



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

export const deleteTeacher = (data:any) => {
    const args = {
        url: '/api/management/teacher/delete-teacher',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}

export const resetTeacherPsw = (data:any) => {
    const args = {
        url: '/api/management/teacher/reset-teacher-password',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}


export const editTeachers = (data:any) => {
    const args = {
        url: '/api/management/teacher/edit',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}
