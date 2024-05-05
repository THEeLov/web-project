import BaseApi from "./baseApi";
import { Animal, CreateAnimal, UpdateAnimal } from "./types";

const ANIMALS_PREFIX = "/animals";

async function getSingle(id: string): Promise<Animal> {
  return BaseApi.getSingle(`${ANIMALS_PREFIX}/${id}`);
}

async function getAll(): Promise<Animal[]> {
  return BaseApi.getAll(ANIMALS_PREFIX);
}

async function createSingle(payload: CreateAnimal): Promise<CreateAnimal> {
  return BaseApi.postSingle(ANIMALS_PREFIX, payload);
}

async function updateSingle(id: string, payload: UpdateAnimal): Promise<Animal> {
  return BaseApi.updateSingle(`${ANIMALS_PREFIX}/${id}`, payload);
}

async function deleteSingle(id: string): Promise<void> {
  return BaseApi.deleteSingle(`${ANIMALS_PREFIX}/${id}`);
}

const AnimalApi = {
  getSingle,
  getAll,
  createSingle,
  updateSingle,
  deleteSingle
};

export default AnimalApi;
