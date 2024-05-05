import { useTable, useFilters } from "react-table";
import { USER_COLUMNS } from "./columns";
import { User } from "../../api/types";
import "./usertable.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMemo } from "react";
import { useState } from "react";
import DeleteUserDialog from "../dialogs/user/DeleteUserDialog/DeleteUserDialog";
import EditUserDialog from "../dialogs/user/EditUserDialog/EditUserDialog";

interface UserTableProps {
  fetchedData: User[];
}

const UserTable = ({ fetchedData }: UserTableProps) => {
  const [userId, setUserId] = useState("");

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);

  const handleDeleteDialogOpen = (userId: string) => {
    setIsDeleteDialogOpen(true);
    setUserId(userId);
  };
  const handleDeleteDialogClose = () => setIsDeleteDialogOpen(false);

  const handleEditDialogOpen = (userId: string) => {
    setIsEditDialogOpen(true);
    setUserId(userId);
  };
  const handleEditDialogClose = () => setIsEditDialogOpen(false);

  const columns = useMemo(() => USER_COLUMNS, []);
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
                          >
                            <EditOutlined />
                          </button>
                          <button
                            className="table-action-button--delete"
                            onClick={() =>
                              handleDeleteDialogOpen(cell.row.original.id)
                            }
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
          userId={userId}
        />
      )}
      {isEditDialogOpen && (
        <EditUserDialog handleClose={handleEditDialogClose} userId={userId} />
      )}
    </>
  );
};

export default UserTable;
