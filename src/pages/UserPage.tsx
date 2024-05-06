import { useState, useCallback, Suspense, lazy } from "react";
import { useUsers } from "../hooks/useUsers";
import { Spin } from "antd";
import UserTable from "../components/Table/User/UserTable";
import "./page.css";

const CreateUserDialog = lazy(
  () => import("../components/dialogs/user/CreateUserDialog")
);

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
    <main className="page-container">
      <section className="page__header">
        <h1>USERS</h1>
        <button
          onClick={handleCreateDialogOpen}
          className="page__header__button"
        >
          Add user
        </button>
      </section>
      {UserData && !isLoading && <UserTable fetchedData={UserData} />}
      {isCreateDialogOpen && (
        <div className="user-page__create-dialog">
          <Suspense fallback={<Spin />}>
            <CreateUserDialog handleClose={handleCreateDialogClose} />
          </Suspense>
        </div>
      )}
    </main>
  );
};

export default UserPage;
