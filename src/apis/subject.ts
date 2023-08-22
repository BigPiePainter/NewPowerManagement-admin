import http from '@/libs/http'

export const getSubjects = () => {
    const args = {
        url: '/api/management/subject/get-all-subjects',
        method: 'GET',
    }
    return http.request(args)
}

export const createSubject = (data:any) => {
    const args = {
        url: '/api/management/subject/create-subject',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}

export const deleteSubject = (data:any) => {
    const args = {
        url: '/api/management/subject/delete-subject',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}



