import axiosConfig from '../axiousConfig'

export const apiGetAllPackages = () =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/package/get/all',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
