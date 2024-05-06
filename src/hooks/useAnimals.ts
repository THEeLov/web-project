import { CreateAnimal, UpdateAnimal } from "../api/types";
import "../api/baseApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AnimalApi from "../api/animalsApi";

export const useAnimal = (id: string) => {
  const { data } = useQuery({
    queryKey: ["animal"],
    queryFn: () => AnimalApi.getSingle(id),
  });

  return { data };
};

export const useAnimals = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["animals"],
    queryFn: () => AnimalApi.getAll(),
  });

  return { data, isLoading };
};

export const useAnimalCreate = () => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: (payload: CreateAnimal) => AnimalApi.createSingle(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["animals"]});
    },
  });

  return { mutateAsync };
};

export const useAnimalUpdate = (id: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: (payload: UpdateAnimal) => AnimalApi.updateSingle(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["animals"]});
    },
  });

  return { mutateAsync };
};

export const useAnimalDelete = (id: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: () => AnimalApi.deleteSingle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["animals"]});
    },
  });

  return { mutateAsync };
};
