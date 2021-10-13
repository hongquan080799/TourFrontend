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

export const insertTour = async(tour, matuyen)=>{
    const url = '/tour'
    const params = {
        matuyen
    }
    try {
        const response = await axiosClient.post(url, tour, {headers, params})
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

export const getTourById = async(matour)=>{
    const url = `/tour/${matour}`
    try {
        const response = await axiosClient.get(url, {headers})
        return response
    } catch (error) {
        throw error
    }
}

export const dattour = async(dattour)=>{
    const url = "/dattour"
    try {
        const response = await axiosClient.post(url, dattour, {headers})
        return response
    } catch (error) {
        throw error
    }
}

export const getListDatourByUser = async()=>{
    const url = "/dattour/self"
    try {
        const res = await axiosClient.get(url, {headers})
        return res
    } catch (error) {
        throw error
    }
}


export const getListDatour = async()=>{
    const url = "/dattour"
    try {
        const res = await axiosClient.get(url, {headers})
        return res
    } catch (error) {
        throw error
    }
}