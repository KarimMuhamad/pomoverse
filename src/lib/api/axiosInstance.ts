import axios from 'axios';
import { PUBLIC_API_BASE_URL } from "$env/static/public"

const axiosInstance = axios.create({
  baseURL: PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  withCredentials: true,
})