import { useTable, useFilters } from "react-table";
import { Animal } from "../../api/types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMemo } from "react";
import { useState } from "react";
import DeleteUserDialog from "../dialogs/user/DeleteUserDialog/DeleteUserDialog";
import EditUserDialog from "../dialogs/user/EditUserDialog/EditUserDialog";
import { ANIMAL_COLUMN } from "./columns";
import '../UserTable/usertable.css'

interface AnimalTableProps {
  fetchedData: Animal[];
}

const AnimalTable = ({ fetchedData }: AnimalTableProps) => {
  const [animalId, setAnimalId] = useState("");

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);

  const handleDeleteDialogOpen = (animalId: string) => {
    setIsDeleteDialogOpen(true);
    setAnimalId(animalId);
  };
  const handleDeleteDialogClose = () => setIsDeleteDialogOpen(false);

  const handleEditDialogOpen = (animalId: string) => {
    setIsEditDialogOpen(true);
    setAnimalId(animalId);
  };
  const handleEditDialogClose = () => setIsEditDialogOpen(false);

  const columns = useMemo(() => ANIMAL_COLUMN, []);
  const data = useMemo(() => fetchedData, [fetchedData]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useFilters
    );

  // canFilter not working and i dont know why :(
  return (
    <>
      <table {...getTableProps()} className="table">
        <thead className="table-head">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="table-h">
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="table-header"
                  key={column.id}
                >
                  {column.render("Header")}
                  <div>
                    {"Filter" in column && column.Filter
                      ? column.render("Filter")
                      : null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="table-body">
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.column.id === "actions" ? (
                        <div className="table-action-buttons">
                          <button
                            className="table-action-button--edit"
                            onClick={() =>
                              handleEditDialogOpen(cell.row.original.id)
                            }
                            title="Edit User"
                          >
                            <EditOutlined />
                          </button>
                          <button
                            className="table-action-button--delete"
                            onClick={() =>
                              handleDeleteDialogOpen(cell.row.original.id)
                            }
                            title="Delete User"
                          >
                            <DeleteOutlined />
                          </button>
                        </div>
                      ) : (
                        cell.render("Cell")
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {isDeleteDialogOpen && (
        <DeleteUserDialog
          handleCloseDelete={handleDeleteDialogClose}
          userId={animalId}
        />
      )}
      {isEditDialogOpen && (
        <EditUserDialog handleClose={handleEditDialogClose} userId={animalId} />
      )}
    </>
  );
};

export default AnimalTable;
