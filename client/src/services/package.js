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

export const apiDeletePackage = (index) =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: `/api/v1/package/delete/${index}`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetPublicProvinces = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'https://vapi.vnappmob.com/api/province/'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiGetPublicDistrict = (provinceId) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `https://vapi.vnappmob.com/api/province/district/${provinceId}`
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})