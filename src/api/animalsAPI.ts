import axios from 'axios';
import { useQuery, useMutation } from "@tanstack/react-query";

const axiosInstance = axios.create({
  baseURL: 'https://inqool-interview-api.vercel.app/api/animals'
})

