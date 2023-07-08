import http from '@/libs/http'

export const getEquipments = (data: any) => {
    const args = {
        url: '/api/management/client-device/page-client-devices',
        method: 'GET',
        params: data
    }
    return http.request(args)
}

export const cancelEquipments = (data: any) => {
    const args = {
        url: '/api/management/client-device/unbind-device',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}