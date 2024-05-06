import { useUserDelete } from "../../../hooks/useUsers";
import { useState } from "react";
import '../deletedialog.css'

const DeleteUserDialog = ({
  handleCloseDelete,
  userId
}: {
  handleCloseDelete: () => void;
  userId: string;
}) => {

  const [user, _] = useState(userId);
  const { mutateAsync } = useUserDelete(user);

  const handleAccept = () => {
    mutateAsync();
    handleCloseDelete();
  };

  return (
    <div className="dialog-container">
      <b>Are you sure you want to delete the user ? </b>
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

export default DeleteUserDialog;
