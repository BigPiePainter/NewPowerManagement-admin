import http from '@/libs/http'

export const getEquipments = (data: any) => {
    const args = {
        url: '/api/management/client-device/page-client-devices',
        method: 'GET',
        params: data
    }
    return http.request(args)
}