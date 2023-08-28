import http from '@/libs/http'

export const getOrder = (data: object) => {
    const args = {
        url: '/api/management/order/page-orders',
        method: 'GET',
        params: data
    }
    return http.request(args)
}

export const cancelOrder = (data:any) => {
    const args = {
        url: '/api/management/order/delete-order',
        method: 'POST',
        data,
        mode: "json"
    }
    
    return http.request(args)
}

export const getOrderNumber = (data: object) => {
    const args = {
        url: '/api/management/order/count-order',
        method: 'GET',
        params: data
    }
    return http.request(args)
}

export const getOrderAmount = (data: object) => {
    const args = {
        url: '/api/management/order/sum-order-income',
        method: 'GET',
        params: data
    }
    return http.request(args)
}