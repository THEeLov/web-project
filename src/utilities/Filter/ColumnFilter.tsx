import "./columnfilter.css";
import { ClearOutlined } from "@ant-design/icons";

const ColumnFilter = ({ column }: any) => {
  const { filterValue, setFilter } = column;

  const handleClearFilter = () => {
    setFilter("");
  };

  return (
    <span className="filter">
      <input
        type="text"
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
        className="filter__input"
      />
      <button className="filter__button" onClick={handleClearFilter}>
        <ClearOutlined />
      </button>
    </span>
  );
};

export default ColumnFilter;
