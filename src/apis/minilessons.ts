import http from '@/libs/http'

export const getMiniLessons = (data: object) => {
    const args = {
        url: '/api/management/mini-lesson/page-mini-lessons',
        method: 'GET',
        params: data
    }
    return http.request(args)
  }

  export const editMiniLessons = (data:any) => {
    const args = {
        url: '/api/management/mini-lesson/edit-mini-lessons',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
  }

  export const deleteMiniLessons = (data:any) => {
    const args = {
        url: '/api/management/mini-lesson/delete-mini-lessons',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
  }


  
