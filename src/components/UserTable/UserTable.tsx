import { useTable, useFilters } from "react-table";
import { USER_COLUMNS } from "./columns";
import { User } from "../../api/types";
import "./usertable.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMemo } from "react";
import { useUserDelete } from "../../hooks/useUsers";
import { useState } from "react";
import DeleteUserDialog from "../dialogs/DeleteUserDialog/DeleteUserDialog";

interface UserTableProps {
  fetchedData: User[];
}

const UserTable = ({ fetchedData }: UserTableProps) => {
  const [userId, setUserId] = useState("");
  const { mutateAsync } = useUserDelete(userId);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const handleDeleteDialogOpen = (userId: string) => {
    setIsDeleteDialogOpen(true);
    setUserId(userId);
  };
  const handleAcceptDelete = () => {
    mutateAsync();
    setIsDeleteDialogOpen(false);
  };
  const handleDeclineDelete = () => setIsDeleteDialogOpen(false);

  const columns = useMemo(() => USER_COLUMNS, []);
  const data = useMemo(() => fetchedData, [fetchedData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useFilters
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  // canFilter not working and i dont know why :(
  return (
    <div>
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
                          <button className="table-action-button--edit">
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
        <div className="user-page__delete-dialog">
          <DeleteUserDialog
            handleDeclineDelete={handleDeclineDelete}
            handleAcceptDelete={handleAcceptDelete}
          />
        </div>
      )}
    </div>
  );
};

export default UserTable;
