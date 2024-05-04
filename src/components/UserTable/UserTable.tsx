import { useTable } from "react-table";
import { USER_COLUMNS } from "./columns";
import { User } from "../../api/types";
import "./usertable.css";
import { useMemo } from "react";

interface UserTableProps {
  fetchedData: User[];
}

const UserTable = ({ fetchedData }: UserTableProps) => {
  const columns = useMemo(() => USER_COLUMNS, []);
  const data = useMemo(() => fetchedData, []);

  const tableInstance = useTable({
    columns,
    data,
  });

  console.log("This is table data");
  console.log(data);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <table {...getTableProps()} className="table-container">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                console.log(cell);
                return (
                  <td {...cell.getCellProps()}>
                    {typeof cell.value === "boolean"
                      ? cell.value
                        ? "Yes"
                        : "No"
                      : cell.render("Cell")}
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
