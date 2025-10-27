import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://sazin-group-construction-ltd-backen-iota.vercel.app/userAction',
/* baseURL: 'https://app-orbit-server-green.vercel.app', */ 
});

export default axiosInstance;
