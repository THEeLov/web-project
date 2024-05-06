import { useState, useCallback } from "react";
import { Spin } from "antd";
import "../page.css";
import { useAnimals } from "../../hooks/useAnimals";
import AnimalTable from "../../components/AnimalTable/AnimalTable";
import CreateAnimalDialog from "../../components/dialogs/animal/CreateAnimalDialog";

const AnimalPage = () => {
  const { data: AnimalData, isLoading } = useAnimals();
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
        <h1>ANIMALS</h1>
        <button
          onClick={handleCreateDialogOpen}
          className="page__header__button"
        >
          Add Animal
        </button>
      </section>
      {AnimalData && !isLoading && <AnimalTable fetchedData={AnimalData} />}
      {isCreateDialogOpen && (
        <div className="user-page__create-dialog">
          <CreateAnimalDialog handleClose={handleCreateDialogClose} />
        </div>
      )}
    </main>
  );
};

export default AnimalPage;
