import axios, {AxiosRequestConfig} from "axios";

const config: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_API_BASE_URL,
}

export default axios.create(config);