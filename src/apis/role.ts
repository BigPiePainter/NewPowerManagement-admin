
import http from '@/libs/http'

export const getAllMenu = () => {
    const args = {
        url: '/api/management/role/all-menu',
        method: 'GET'
    }
    return http.request(args)
}

export const createRole = (data:any) => {
    const args = {
        url: '/api/management/role/create-role',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}

export const getRole = (data:any) => {
    const args = {
        url: '/api/management/role/page-role',
        method: 'GET',
        params:data
    }
    return http.request(args)
}