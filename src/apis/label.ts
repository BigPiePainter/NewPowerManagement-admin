import http from '@/libs/http'


export const getLabels = () => {
    const args = {
        url: '/api/management/label/get-all-labels',
        method: 'GET',
    }
    return http.request(args)
}

export const createLabel = (data: any) => {
    const args = {
        url: '/api/management/label/create-label',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}

export const deleteLabel = (data: any) => {
    const args = {
        url: '/api/management/label/delete-label',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}
