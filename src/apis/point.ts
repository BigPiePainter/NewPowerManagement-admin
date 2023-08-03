import http from '@/libs/http'

export const getPointInfor = (data: object) => {
    const args = {
        url: '/api/management/point/page-points',
        method: 'GET',
        params:data
    }
    return http.request(args)
  }


  export const changePoint = (data:any) => {
    const args = {
        url: '/api/management/point/create-point-record',
        method: 'POST',
        data,
        mode: "json"
    }

    return http.request(args)
}


 