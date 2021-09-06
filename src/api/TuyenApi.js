import axiosClient from "./AxiosClient";
let jwt = window.localStorage.getItem('jwt');
let headers = {
    Authorization: 'Bearer ' + jwt
}


export const getListTuyen =  async()=>{
    const url = "/tuyen"
    try {
        const response = await axiosClient.get(url, {headers})
        return response
    } catch (error) {
        throw error
    }
}

export const getTuyen =  async(matuyen)=>{
    const params = {
        matuyen
    }
    const url = "/tuyen/detail"
    try {
        const response = await axiosClient.get(url, {params, headers})
        return response
    } catch (error) {
        throw error
    }
}

export const insertTuyen =  async(tuyen)=>{
    const url = "/tuyen"
    try {
        const response = await axiosClient.post(url, tuyen, {headers})
        return response
    } catch (error) {
        throw error
    }
}

export const getTourByTuyen = async (matuyen) =>{
    const url = "/tour"
    const params = {
        matuyen
    }
    try {
        const response = await axiosClient.get(url, {headers,params})
        return response
    } catch (error) {
        throw error
    }
}
