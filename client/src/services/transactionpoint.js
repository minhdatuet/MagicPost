import axiosConfig from '../axiousConfig'

export const apiGetAllTransactionPoints = () =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/transactionpoint/get/all',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
