import axiosClient from "./AxiosClient";
let jwt = window.localStorage.getItem('jwt');
let headers = {
    Authorization: 'Bearer ' + jwt
}


export const getDanhmuc = async ()=>{
    const url = "/danhmuc"
    try {
        const response = await axiosClient.get(url);
        return response
    } catch (error) {
        throw error
    }
}