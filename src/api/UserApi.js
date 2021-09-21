import axiosClient from "./AxiosClient";
let jwt = window.localStorage.getItem('jwt');
let headers = {
    Authorization: 'Bearer ' + jwt
}

//loginRequest username password
export const getLogin = async (loginRequest)=>{
    const url = '/login'
    try {
        const response = await axiosClient.post(url,loginRequest)
        if(response != null){
            window.localStorage.setItem('jwt',response.jwt)
        }
        return response
    } catch (error) {
        throw error
    }
}

export const getLoginFacebook = async (token)=>{
    const url = '/socialLogin';
    const requestBody = {
        token:token,
        type:'facebook'
    }
    try {
        const response = await axiosClient.post(url,requestBody);
        if(response != null){
            window.localStorage.setItem('jwt',response.jwt)
        }
        return response
    } catch (error) {
        console.log(error)
        return null
    }
}


export const getLoginGoogle = async (token)=>{
    const url = '/socialLogin';
    const requestBody = {
        token:token,
        type:'google'
    }
    try {
        const response = await axiosClient.post(url,requestBody);
        if(response != null){
            window.localStorage.setItem('jwt',response.jwt)
        }
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getUser = async ()=>{
    const url = "/user/"
    try {
        jwt = window.localStorage.getItem('jwt');
        headers = {
            Authorization: 'Bearer ' + jwt
        }
        const response = await axiosClient.get(url,{headers})
        return response
    } catch (error) {
        throw error
    }
}

export const getRegister = async (register)=>{
    const url = "/register"
    try {
        const response = await axiosClient.post(url, register);
        return response;
    } catch (error) {
        throw error
    }
}
export const changePassword = async (password) =>{
    const url = "/taikhoan/changePassword";
    const data = {
        username:'',
        password
    }
    try {
        const response = await axiosClient.put(url, data, {headers})
        return response
    } catch (error) {
        throw error
    }
}
export const updateAccount = async (userUpdate) =>{
    const url = "/taikhoan"
    try {
        const response = await axiosClient.put(url, userUpdate, {headers})
        return response
    } catch (error) {
        throw error
    }
}
