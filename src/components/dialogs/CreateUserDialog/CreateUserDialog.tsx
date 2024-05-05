import { SubmitHandler, useForm } from "react-hook-form";
import { useUserCreate } from "../../../hooks/useUsers";
import { CreateUser } from "../../../api/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "./createuserdialog.css";

const schema = z.object({
  name: z.string().min(1),
  gender: z.enum(["male", "female"]),
  banned: z.string().min(1),
});

type FormFields = z.infer<typeof schema>;

const CreateUserDialog = ({ handleClose }: { handleClose: () => void }) => {
  const { mutateAsync: createUser } = useUserCreate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const isBanned = data.banned === "true";
    const userData: CreateUser = { ...data, banned: isBanned };
    console.log(userData);

    createUser(userData);
    handleClose();
  };

  return (
    <div className="dialog-container">
      <div className="dialog__header">
        <h1>Create User</h1>
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

        <label htmlFor="banned">Banned</label>
        <div className="form-radio-container">
          <div>
            <input
              {...register("banned")}
              type="radio"
              id="banned-yes"
              value="true"
              name="banned"
            />
            <label htmlFor="banned-yes">Yes</label>
          </div>
          <div>
            <input
              {...register("banned")}
              type="radio"
              id="banned-no"
              value="false"
              name="banned"
            />
            <label htmlFor="banned-no">No</label>
          </div>
        </div>
        {errors.banned && (
          <span className="error-message"> Please choose one </span>
        )}

        <button type="submit" className="form-button" disabled={isSubmitting}>
          {" "}
          Create User{" "}
        </button>
      </form>
    </div>
  );
};

export default CreateUserDialog;
