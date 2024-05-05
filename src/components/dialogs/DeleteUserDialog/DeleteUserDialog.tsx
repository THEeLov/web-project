import './deleteuserdialog.css'

const DeleteUserDialog = ({
  handleDeclineDelete,
  handleAcceptDelete,
}: {
  handleDeclineDelete: () => void;
  handleAcceptDelete: () => void;
}) => {
  return (
    <div className="delete-dialog-container">
      <b>Are you sure you want to delete the user ? </b>
      <div className="delete-dialog__buttons">
        <button onClick={handleDeclineDelete} className="delete-button delete-button--no"> NO </button>
        <button onClick={handleAcceptDelete} className="delete-button delete-button--yes"> YES </button>
      </div>
    </div>
  );
};

export default DeleteUserDialog;
