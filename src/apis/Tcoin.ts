import http from '@/libs/http'

export const changeTcoin = (data:any) => {
    const args = {
        url: '/api/management/t-coin/create-t-coin-record',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}

export const getTcoinRecord = (data: object) => {
    const args = {
        url: '/api/management/t-coin/page-t-coin',
        method: 'GET',
        params: data
    }
    return http.request(args)
}