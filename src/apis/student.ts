import http from '@/libs/http'

//必要参数：页码(pageNum)，页容量(pageSize)，学生类型(type)
export const getStudent = (data: any) => {
    const args = {
        url: '/api/management/student/page-students',
        method: 'GET',
        params:data
    }
    return http.request(args)
}

export const createStudent = (data:any) => {
    const args = {
        url: '/api/management/student/create',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}

export const getAllStudents = () => {
    const args = {
        url: '/api/management/student/get-all-students',
        method: 'GET'
    }
    return http.request(args)
}

export const loadPoint = () => {
    const args = {
        url: '/api/management/student/get-total-points',
        method: 'GET'
    }
    return http.request(args)
}

export const loadTcoins = () => {
    const args = {
        url: '/api/management/student/get-total-t-coins',
        method: 'GET'
    }
    return http.request(args)
}

//--------------只返回有效学生数量--------------------
export const getStudentAmount = () => {
    const args = {
        url: '/api/management/student/count-all-students',
        method: 'GET',
    }
    return http.request(args)
}

//--------------重置学生密码为666666--------------------
export const restStudentPsw = (data:any) => {
    const args = {
        url: '/api/management/student/reset-student-password',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}

//----------------------删除学生-------------------------
export const deleteStudent = (data:any) => {
    const args = {
        url: '/api/management/student/delete-student',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}

//----------------------临时学生转正-------------------------
export const toNormalStudent = (data:any) => {
    const args = {
        url: '/api/management/student/temporary-to-normal',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}


//----------------------编辑学生-------------------------
export const editStudent = (data:any) => {
    const args = {
        url: 'api/management/student/edit',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}