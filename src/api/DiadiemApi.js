import axiosClient from "./AxiosClient";
let jwt = window.localStorage.getItem('jwt');
let headers = {
    Authorization: 'Bearer ' + jwt
}

export const getListDiadiem = async()=>{
    const url = "/diadiem"
    try {
        const response = await axiosClient.get(url, {headers})
        return response
    } catch (error) {
        throw error
    }
}

export const insertDiadiem = async (diadiem)=>{
    const url = '/diadiem'
    try {
        const response = await axiosClient.post(url, diadiem, {headers})
        return response
    } catch (error) {
        throw error
    }
}

export const updateDiadiem = async (diadiem) =>{
    const url = '/diadiem'
    try {
        const response = await axiosClient.put(url, diadiem, {headers})
        return response
    } catch (error) {
        throw error
    }
}
export const deleteDiadiem = async (mapt) =>{
    const url = '/diadiem/' + mapt 
    try {
        const response = await axiosClient.delete(url, {headers})
        return response
    } catch (error) {
        throw error
    }
}
