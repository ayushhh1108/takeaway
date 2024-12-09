import axios from 'axios';

const createAPI = () => {
    const customerApiUrl = process.env.REACT_APP_API_BASE_URL;
    // const calculate = '<calculated when request is sent>';
    const headers = {
        'Content-Type': 'application/json',
    };

    const api = axios.create({
        baseURL: customerApiUrl,
        headers,
    });

    api.interceptors.request.use(async (config) => {
        const data = JSON.parse(localStorage.getItem("token"))
        if (
            data
        ) {
            config.headers[`token`] = data;
        }
        return config;
    });

    api.interceptors.response.use(response => {
        return response;
     }, error => {
       if (error.response.status === 401) {
        return error;
       }
       return error;
     })

    // api.interceptors.response.use(
    //     (response) => response,
    //     async (err) => err
    // );
    return api;
};

export default createAPI();
