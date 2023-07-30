import http from '@/libs/http'

export const getClasses = (data: object) => {
    const args = {
        url: '/api/management/class/page-classes',
        method: 'GET',
        params: data
    }
    return http.request(args)
}

export const createClass = (data: any) => {
    const args = {
        url: '/api/management/class/create-class',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}

export const editClasses = (data: any) => {
    const args = {
        url: '/api/management/class/edit-class',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}

export const deleteClasses = (data: any) => {
    const args = {
        url: '/api/management/class/delete-class',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}
