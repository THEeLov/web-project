import { useState, useCallback } from "react";
import { useUsers } from "../../hooks/useUsers";
import { Spin } from "antd";
import UserTable from "../../components/UserTable/UserTable";
import "./userpage.css";
import CreateUserDialog from "../../components/dialogs/user/CreateUserDialog/CreateUserDialog";

const UserPage = () => {
  const { data: UserData, isLoading } = useUsers();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);

  const handleCreateDialogOpen = () => setIsCreateDialogOpen(true);
  const handleCreateDialogClose = useCallback(
    () => setIsCreateDialogOpen(false),
    []
  );

  if (isLoading) {
    return <Spin />;
  }

  return (
    <main className="user-page-container">
      <section className="user-page__header">
        <h1>USERS</h1>
        <button
          onClick={handleCreateDialogOpen}
          className="user-page__header__button"
        >
          Add user
        </button>
      </section>
      {UserData && !isLoading && <UserTable fetchedData={UserData} />}
      {isCreateDialogOpen && (
        <div className="user-page__create-dialog">
          <CreateUserDialog handleClose={handleCreateDialogClose} />
        </div>
      )}
    </main>
  );
};

export default UserPage;
