import http from '@/libs/http'

export const getGoodQuestionPackage = (data: any) => {
    const args = {
        url: '/api/management/course-question-package/page-course-question-package',
        method: 'GET',
        params:data
    }
    return http.request(args)
}


export const createGoodQuestionPack = (data:any) => {
    const args = {
        url: '/api/management/course-question-package/create-course-question-package',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}


export const editGoodQuestionPack = (data:any) => {
    const args = {
        url: '/api/management/course-question-package/edit-course-question-package',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}


export const addGoodQuestionToPack = (data:any) => {
    const args = {
        url: '/api/management/question-package-question/create-question',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}



export const getGoodQuestions = (data: any) => {
    const args = {
        url: '/api/management/question-package-question/page-question',
        method: 'GET',
        params:data
    }
    return http.request(args)
}
