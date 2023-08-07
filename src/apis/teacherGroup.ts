import http from '@/libs/http'

export const  getTeacherGroupTeachers= (data: object) => {
    const args = {
        url: '/api/management/teaching-research-group-teacher/page-group-teachers',
        method: 'GET',
        params: data
    }
    return http.request(args)
}

export const getTeacherGroup = (data: object) => {
    const args = {
        url: '/api/management/teaching-research-group/page-groups',
        method: 'GET',
        params: data
    }
    return http.request(args)
}

export const addTeacherTogroup = (data:any) => {
    const args = {
        url: '/api/management/teaching-research-group-teacher/create-group-teacher',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}


export const createTeacherGroup = (data:any) => {
    const args = {
        url: '/api/management/teaching-research-group/create-group',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}

export const deleteTeacherFromGroup = (data:any) => {
    const args = {
        url: '/api/management/teaching-research-group-teacher/delete-group-teacher',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}


export const editTeacherGroups = (data:any) => {
    const args = {
        url: '/api/management/teaching-research-group/edit-group',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}


export const deleteTeacherGroups = (data:any) => {
    const args = {
        url: '/api/management/teaching-research-group/delete-group',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}

