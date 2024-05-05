import { useTable, useFilters } from "react-table";
import { USER_COLUMNS } from "./columns";
import { User } from "../../api/types";
import "./usertable.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMemo } from "react";
import { useUserDelete } from "../../hooks/useUsers";
import { useState } from "react";

interface UserTableProps {
  fetchedData: User[];
}

const UserTable = ({ fetchedData }: UserTableProps) => {
  const columns = useMemo(() => USER_COLUMNS, []);
  const data = useMemo(() => fetchedData, [fetchedData]);
  const [userId, setUserId] = useState("");
  const { mutateAsync } = useUserDelete(userId);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useFilters
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const handleDelete = (userId: string) => {
    setUserId(userId);
    mutateAsync();
  };

  // canFilter not working and i dont know why :(
  return (
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
                          onClick={() => handleDelete(cell.row.original.id)}
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
  );
};

export default UserTable;
