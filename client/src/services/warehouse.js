import axiosConfig from '../axiousConfig'

export const apiGetAllWarehouses = () =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/warehouse/get/all',
        })
        console.log(response)
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
