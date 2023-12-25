import axiosConfig from '../axiousConfig'

export const apiGetUser = () =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/user/get/user',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetLeaders = (type) =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/user/get/leaders/${type}`
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
