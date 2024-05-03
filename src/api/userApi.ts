import axios from "axios";
import BaseApi from "./baseApi";
import { useQuery, useMutation } from "@tanstack/react-query";
import { User, CreateUser, UpdateUser, UpdateAnimal } from "./types";

const USERS_PREFIX = "/users";

async function getSingle(id: string): Promise<User> {
  return BaseApi.getSingle(`${USERS_PREFIX}/${id}`);
}

async function getAll(): Promise<User[]> {
  return BaseApi.getAll(USERS_PREFIX);
}

async function createSingle(payload: CreateUser): Promise<CreateUser> {
  return BaseApi.postSingle(USERS_PREFIX, payload);
}

async function updateSingle(id: string, payload: UpdateUser): Promise<User> {
  return BaseApi.updateSingle(`${USERS_PREFIX}/${id}`, payload);
}

async function deleteSingle(id: string) {
  return BaseApi.deleteSingle<Product>(`${PRODUCTS_PREFIX}/${id}`);
}

const UserApi = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  seed
};

export default UserApi;
