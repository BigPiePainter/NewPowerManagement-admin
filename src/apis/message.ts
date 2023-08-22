import http from '@/libs/http'

export const getMessages = (data:any) => {
    const args = {
        url: '/api/management/message/page-messages',
        method: 'GET',
        params: data
    }
    return http.request(args)
}

export const createMessage = (data:any) => {
    const args = {
        url: '/api/management/message/create-messages',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}

export const deleteMessage = (data:any) => {
    const args = {
        url: '/api/management/message/delete-message',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}