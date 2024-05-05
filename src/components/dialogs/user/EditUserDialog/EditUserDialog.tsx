import { useUserUpdate } from "../../../../hooks/useUsers";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  gender: z.enum(["male", "female"]),
});

type FormFields = z.infer<typeof schema>;

const EditUserDialog = ({
  handleClose,
  userId,
}: {
  handleClose: () => void;
  userId: string;
}) => {
  const { mutateAsync: updateUser } = useUserUpdate(userId);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    updateUser(data);
    handleClose();
  };

  return (
    <div className="dialog-container">
      <div className="dialog__header">
        <h1>Update User</h1>
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

        <label htmlFor="gender">Gender</label>
        <input
          {...register("gender")}
          type="text"
          id="gender"
          className="form__input"
        />
        {errors.gender && (
          <span className="error-message">
            {" "}
            Please fill out gender correctly (male / female){" "}
          </span>
        )}
        <button type="submit" className="form-button" disabled={isSubmitting}>
          {" "}
          Update User{" "}
        </button>
      </form>
    </div>
  );
};

export default EditUserDialog;
