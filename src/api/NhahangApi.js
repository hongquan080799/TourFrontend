import axiosClient from "./AxiosClient";
let jwt = window.localStorage.getItem('jwt');
let headers = {
    Authorization: 'Bearer ' + jwt
}

export const getListNhahang = async()=>{
    const url = "/nhahang"
    try {
        const response = await axiosClient.get(url, {headers})
        return response
    } catch (error) {
        throw error
    }
}

export const insertNhahang = async (nhahang)=>{
    const url = '/nhahang'
    try {
        const response = await axiosClient.post(url, nhahang, {headers})
        return response
    } catch (error) {
        throw error
    }
}

export const updateNhahang = async (nhahang) =>{
    const url = '/nhahang'
    try {
        const response = await axiosClient.put(url, nhahang, {headers})
        return response
    } catch (error) {
        throw error
    }
}
export const deleteNhahang= async (mapt) =>{
    const url = '/nhahang/' + mapt 
    try {
        const response = await axiosClient.delete(url, {headers})
        return response
    } catch (error) {
        throw error
    }
}
