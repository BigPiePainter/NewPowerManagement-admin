//api/management/free-order/create
import http from '@/libs/http'

export const freeOrderCreate = (data: any) => {
    const args = {
        url: '/api/management/free-order/create',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}
