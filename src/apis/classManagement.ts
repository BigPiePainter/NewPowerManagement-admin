import http from '@/libs/http'

//班级管理页面增删查找----------------------------------
export const getClasses = (data: any) => {
    const args = {
        url: '/classManagement/getClasses',
        method: 'POST',
        data
    }
    return http.request(args)
}

export const newClass = (data: any) => {
    const args = {
        url: '/classManagement/newClass',
        method: 'POST',
        data
    }
    return http.request(args)
}

export const editClass = (data: any) => {
    const args = {
        url: '/classManagement/editClass',
        method: 'POST',
        data
    }
    return http.request(args)
}

export const deleteClass = (data: any) => {
    const args = {
        url: '/classManagement/deleteClass',
        method: 'POST',
        data
    }
    return http.request(args)
}

//班级详情页面增删查找----------------------------------
export const getClassDetail = (data: any) => {
    const args = {
        url: '/classManagement/getClassDetail',
        method: 'POST',
        data
    }
    return http.request(args)
}