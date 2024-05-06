import { Column } from 'react-table';
import { Animal } from '../../../api/types';
import ColumnFilter from '../../../utilities/Filter/ColumnFilter';

type CustomColumn<T extends object> = Column<T> & {
  Filter?: any;
};

export const ANIMAL_COLUMN: CustomColumn<Animal>[] = [
  // Is this supposed to be shown ?? If yes, just uncomment.
  // {
  //   Header: "ID",
  //   accessor: "id",
  // },
  {
    Header: 'Name',
    accessor: 'name',
    Filter: ColumnFilter,
  },
  {
    Header: "Type",
    accessor: "type",
  },
  {
    Header: "Age",
    accessor: "age",
  },
  {
    Header: 'Actions',
    id: 'actions',
  }
];