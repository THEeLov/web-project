import { Column } from 'react-table';
import { User } from '../../api/types';

export const USER_COLUMNS: Column<User>[] = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Banned",
    accessor: "banned",
  },
];
