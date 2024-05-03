import axios from "axios";
6
const axiosInstance = axios.create({
  baseURL: "https://inqool-interview-api.vercel.app/api",
});

async function getAll(path: string) {
  const resp = await axiosInstance.get(path);
  return resp.data;
}

async function getSingle(path: string) {
  const resp = await axiosInstance.get(path);
  return resp.data;
}

async function postSingle<T>(path: string, payload: T){
  const resp = await axiosInstance.post(path, payload);
  return resp.data;
}

async function updateSingle(path: string, payload: T) {
  const resp = await axiosInstance.patch(path, payload);
  return resp.data;
}

async function deleteSingle(path: string) {
  const resp = await axiosInstance.delete(path);
  return resp.data;
}

const BaseApi = {
  get: axiosInstance.get,
  getAll,
  getSingle,
  post: axiosInstance.post,
  postSingle,
  put: axiosInstance.put,
  updateSingle,
  delete: axiosInstance.delete,
  deleteSingle,
};

export default BaseApi;