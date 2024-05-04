import { useTable, useFilters } from "react-table";
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
    <table {...getTableProps()} className="table">
      <thead className="table-head">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
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
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserTable;
