import { useState, useCallback } from "react";
import { Spin } from "antd";
import "../UserPage/userpage.css";
import CreateUserDialog from "../../components/dialogs/user/CreateUserDialog/CreateUserDialog";
import { useAnimals } from "../../hooks/useAnimals";
import AnimalTable from "../../components/AnimalTable/AnimalTable";

const AnimalPage = () => {
  const { data: AnimalData, isLoading } = useAnimals();
  console.log(AnimalData);
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
        <h1>ANIMALS</h1>
        <button
          onClick={handleCreateDialogOpen}
          className="user-page__header__button"
        >
          Add user
        </button>
      </section>
      {AnimalData && !isLoading && <AnimalTable fetchedData={AnimalData} />}
      {isCreateDialogOpen && (
        <div className="user-page__create-dialog">
          <CreateUserDialog handleClose={handleCreateDialogClose} />
        </div>
      )}
    </main>
  );
};

export default AnimalPage;
