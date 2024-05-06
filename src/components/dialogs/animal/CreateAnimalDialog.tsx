import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAnimalCreate } from "../../../hooks/useAnimals";

const schema = z.object({
  name: z.string().min(1),
  type: z.enum(["cat", "dog", "other"]),
  age: z.coerce.number().positive(),
});

type FormFields = z.infer<typeof schema>;

const CreateAnimalDialog = ({ handleClose }: { handleClose: () => void }) => {
  const { mutateAsync: createAnimal } = useAnimalCreate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    createAnimal(data);
    handleClose();
  };

  return (
    <div className="dialog-container">
      <div className="dialog__header">
        <h1>Create Animal</h1>
        <button onClick={handleClose} className="dialog__header__button">
          {" "}
          X{" "}
        </button>
      </div>
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input
          {...register("name")}
          type="text"
          id="name"
          className="form__input"
        />
        {errors.name && (
          <span className="error-message"> Please fill out the name </span>
        )}

        <label htmlFor="type">Type</label>
        <input
          {...register("type")}
          type="text"
          id="gender"
          className="form__input"
        />
        {errors.type && (
          <span className="error-message">
            {" "}
            Please fill out type correctly (dog / cat / other){" "}
          </span>
        )}

        <label htmlFor="age">Age</label>
        <input
          {...register("age")}
          type="number"
          id="age"
          className="form__input"
          min="0"
        />
        {errors.age && (
          <span className="error-message"> Please select number. </span>
        )}

        <button type="submit" className="form-button" disabled={isSubmitting}>
          {" "}
          Create Animal{" "}
        </button>
      </form>
    </div>
  );
};

export default CreateAnimalDialog;
