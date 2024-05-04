import { useState, useCallback } from "react";
import { useUsers, useUserCreate } from "../../hooks/useUsers";
import { Spin } from "antd";
import UserTable from "../../components/UserTable/UserTable";
import "./userpage.css";
import CreateUserDialog from "../../components/dialogs/CreateUserDialog";

const UserPage = () => {
  const { data: UserData, isLoading } = useUsers();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);

  const handleDialogOpen = () => setIsCreateDialogOpen(true);
  const handleDialogClose = useCallback(() => setIsCreateDialogOpen(false), []);

  return (
    <main className="user-page-container">
      <section className="user-page__header">
        <h1>USERS</h1>
        <button
          onClick={handleDialogOpen}
          className="user-page__header__button"
        >
          Add user
        </button>
      </section>
      {UserData && !isLoading ? <UserTable fetchedData={UserData} /> : <Spin />}
      {isCreateDialogOpen && (
        <div className="user-page__create-dialog">
          <CreateUserDialog handleClose={handleDialogClose} />
        </div>
      )}
    </main>
  );
};

export default UserPage;
