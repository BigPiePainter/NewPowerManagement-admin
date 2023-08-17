import http from '@/libs/http'

export const getCourseCategory = () => {
    const args = {
        url: '/api/management/course-category/get-all-course-category',
        method: 'GET',
    }
    return http.request(args)
}

export const createCourseCategory = (data: any) => {
    const args = {
        url: '/api/management/course-category/create-course-category',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}

export const editCourseCategory = (data: any) => {
    const args = {
        url: '/api/management/course-category/edit-course-category',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}

export const deleteCourseCategory = (data: any) => {
    const args = {
        url: '/api/management/course-category/delete-course-category',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}


