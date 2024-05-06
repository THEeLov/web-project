import { CreateUser, UpdateUser } from "../api/types";
import UserApi from "../api/userApi";
import "../api/baseApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useUser = (id: string) => {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => UserApi.getSingle(id),
  });

  return { data };
};

export const useUsers = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => UserApi.getAll(),
  });

  return { data, isLoading };
};

export const useUserCreate = () => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: (payload: CreateUser) => UserApi.createSingle(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["users"]});
    },
  });
  return { mutateAsync };
};

export const useUserUpdate = (id: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: (payload: UpdateUser) => UserApi.updateSingle(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["users"]});
    },
  });

  return { mutateAsync };
};

export const useUserDelete = (id: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: () => UserApi.deleteSingle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['users']});
    },
  });

  return { mutateAsync };
};
