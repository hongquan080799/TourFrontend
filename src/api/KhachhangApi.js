import axiosClient from "./AxiosClient";
let jwt = window.localStorage.getItem('jwt');
let headers = {
    Authorization: 'Bearer ' + jwt
}

export const updateKhachhang = async(khachhang)=>{
    const url = '/khachhang'
    try {
        const response  = await axiosClient.put(url, khachhang ,{headers})
        return response
    } catch (error) {
        throw error
    }
}

export const getListKH = async () =>{
    const url = '/khachhang'
    try {
        const response  = await axiosClient.get(url, {headers})
        return response
    } catch (error) {
        throw error
    }
}
export const deleteKh = async (username) =>{
    const params = {
        username
    }
    const url = '/khachhang'
    try {
        const response  = await axiosClient.delete(url, {params ,headers})
        return response
    } catch (error) {
        throw error
    }
}