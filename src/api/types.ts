export type User = {
  id: string;
  name: string;
  gender: string;
  banned: boolean;
};

export type CreateUser = Omit<User, "id">;

export type UpdateUser = {
  name?: string;
  gender?: string;
  banned?: boolean;
};

export type Animal = {
  id: string;
  name: string;
  type: string;
  age: number;
};

export type CreateAnimal = Omit<Animal, "id">;

export type UpdateAnimal = {
  name?: string;
  type?: string;
  age?: number;
};
