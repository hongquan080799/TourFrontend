import axiosClient from "./AxiosClient";
let jwt = window.localStorage.getItem('jwt');
let headers = {
    Authorization: 'Bearer ' + jwt
}


export const getListTour = async(matuyen)=>{
    const url = '/tour'
    const params = {
        matuyen
    }
    try {
        const response = await axiosClient.get(url, {params, headers})
        return response
    } catch (error) {
        throw error
    }
}

export const insertTour = async(tour)=>{
    const url = '/tour'
    try {
        const response = await axiosClient.post(url, tour, {headers})
        return response
    } catch (error) {
        throw error
    }
}

export const deleteTour = async(matour)=>{
    const url = '/tour'
    const params = {
        matour
    }
    try {
        const response = await axiosClient.delete(url, {params, headers})
        return response
    } catch (error) {
        throw error
    }
}

export const updateTour = async(tour)=>{
    const url = '/tour'
    try {
        const response = await axiosClient.put(url, tour, {headers})
        return response
    } catch (error) {
        throw error
    }
}