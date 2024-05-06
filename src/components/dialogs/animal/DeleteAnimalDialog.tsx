import { useAnimalDelete } from "../../../hooks/useAnimals";
import { useState } from "react";
import "../deletedialog.css";

const DeleteAnimalDialog = ({
  handleCloseDelete,
  animalId,
}: {
  handleCloseDelete: () => void;
  animalId: string;
}) => {
  const [user, _] = useState(animalId);
  const { mutateAsync: animalDelete } = useAnimalDelete(user);

  const handleAccept = () => {
    animalDelete();
    handleCloseDelete();
  };

  return (
    <div className="dialog-container">
      <b>Do you really want to delete the animal ? </b>
      <div className="delete-dialog__buttons">
        <button
          onClick={handleCloseDelete}
          className="delete-button delete-button--no"
        >
          {" "}
          NO{" "}
        </button>
        <button
          onClick={handleAccept}
          className="delete-button delete-button--yes"
        >
          {" "}
          YES{" "}
        </button>
      </div>
    </div>
  );
};

export default DeleteAnimalDialog;
