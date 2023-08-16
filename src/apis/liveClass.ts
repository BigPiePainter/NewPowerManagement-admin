
import http from '@/libs/http'

export const getLiveClasses = (data:object) => {
    const args = {
        url: '/api/management/live-class/page-live-classes',
        method: 'GET',
        params: data
    }
    return http.request(args)
}

export const createLiveClass = (data:any) => {
    const args = {
        url: '/api/management/live-class/create',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}

export const deleteLiveclasses = (data:any) => {
    const args = {
        url: '/api/management/live-class/delete',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}


