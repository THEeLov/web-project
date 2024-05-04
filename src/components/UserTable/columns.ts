import { Column } from 'react-table';
import { User } from '../../api/types';
import ColumnFilter from '../../utilities/Filter/ColumnFilter';

type CustomColumn<T extends object> = Column<T> & {
  Filter?: any;
};

export const USER_COLUMNS: CustomColumn<User>[] = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: 'Name',
    accessor: 'name',
    Filter: ColumnFilter,
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Banned",
    accessor: "banned",
    Cell: ({ value }) => (value? "Yes" : "No"),
  },
  {
    Header: 'Actions',
    id: 'actions', // Unique identifier for this column
  }
];
