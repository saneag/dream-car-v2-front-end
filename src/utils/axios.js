import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:5000'
})

instance.interceptors.request.use(config => {
    config.headers.Authorization = window.localStorage.getItem('token')
    if (!config.headers.Authorization)
        config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})

export default instance

//!!!MockApi
// axios.get(`https://62a36f1d21232ff9b21fe3d5.mockapi.io/cars?sortBy=${sortBy}&order=${sortOrder ? 'desc' : 'asc'}&&page=${page}&limit=${carsLimit}&search=${search}`)
//     .then(res => {
//         setLoading(false)
//         setCars(res.data)
//         if (page !== 1) {
//             setCarsLimit(12)
//         }
//         setShowReadMore(carsLimit > res.data.length ? false : true)
//     })