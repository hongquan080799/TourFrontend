import axiosClient from "./AxiosClient";
let jwt = window.localStorage.getItem('jwt');
let headers = {
    Authorization: 'Bearer ' + jwt
}

export const getListPhuongtien = async()=>{
    const url = "/phuongtien"
    try {
        const response = await axiosClient.get(url, {headers})
        return response
    } catch (error) {
        throw error
    }
}

export const insertPhuongtien = async (phuongtien)=>{
    const url = '/phuongtien'
    try {
        const response = await axiosClient.post(url, phuongtien, {headers})
        return response
    } catch (error) {
        throw error
    }
}

export const updatePhuongtien = async (phuongtien) =>{
    const url = '/phuongtien'
    try {
        const response = await axiosClient.put(url, phuongtien, {headers})
        return response
    } catch (error) {
        throw error
    }
}
export const deletePhuongtien = async (mapt) =>{
    const url = '/phuongtien/' + mapt 
    try {
        const response = await axiosClient.delete(url, {headers})
        return response
    } catch (error) {
        throw error
    }
}
