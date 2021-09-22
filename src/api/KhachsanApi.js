import axiosClient from "./AxiosClient";
let jwt = window.localStorage.getItem('jwt');
let headers = {
    Authorization: 'Bearer ' + jwt
}

export const getListKhachsan = async()=>{
    const url = "/khachsan"
    try {
        const response = await axiosClient.get(url, {headers})
        return response
    } catch (error) {
        throw error
    }
}

export const insertKhachsan = async (khachsan)=>{
    const url = '/khachsan'
    try {
        const response = await axiosClient.post(url, khachsan, {headers})
        return response
    } catch (error) {
        throw error
    }
}

export const updateKhachsan = async (khachsan) =>{
    const url = '/khachsan'
    try {
        const response = await axiosClient.put(url, khachsan, {headers})
        return response
    } catch (error) {
        throw error
    }
}
export const deleteKhachsan= async (mapt) =>{
    const url = '/khachsan/' + mapt 
    try {
        const response = await axiosClient.delete(url, {headers})
        return response
    } catch (error) {
        throw error
    }
}
