import http from '@/libs/http'




export const getCourseQuestionPackage = (data:any) => {
    const args = {
        url: '/api/management/course-question-package/page-course-question-package',
        method: 'GET',
        params: data
    }
    return http.request(args)
}

export const createCourseQuestionPackage = (data: object) => {
    const args = {
        url: '/api/management/course-question-package/create-course-question-package',
        method: 'GET',
        params: data
    }
    return http.request(args)
}

export const editCourseQuestionPackage = (data: object) => {
    const args = {
        url: '/api/management/course-question-package/edit-course-question-package',
        method: 'GET',
        params: data
    }
    return http.request(args)
}






