import { useState, useEffect } from "react";
import "../../styles/FilterableTable.module.css";

const FilterableTable = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(1);
  const [sortedData, setSortedData] = useState([]);


  useEffect(() => {
    fetch("/api/data")
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (sortColumn !== null) {
      const sorted = [...data].sort((a, b) => {
        const valA = a[sortColumn].toString().toLowerCase();
        const valB = b[sortColumn].toString().toLowerCase();
        if (valA < valB) return -1 * sortDirection;
        if (valA > valB) return 1 * sortDirection;
        return 0;
      });

      setSortedData(sorted);
    }
  }, [data, sortDirection, sortColumn]);


  const toggleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 1 ? -1 : 1);
    } else {
      setSortColumn(column);
      setSortDirection(1);
    }
  };


  const filterData = () => {
    return data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(filter.toLowerCase())
      )
    );
  };

  const sortData = (dataToSort) => {
    return dataToSort.sort((a, b) => {
      const valA = a[sortColumn].toString().toLowerCase();
      const valB = b[sortColumn].toString().toLowerCase();
      if (valA < valB) return -1 * sortDirection;
      if (valA > valB) return 1 * sortDirection;
      return 0;
    });
  };


  const filteredData = sortColumn ? sortData(filterData()) : filterData();

  const tableHeaders = Object.keys(data[0] || {});

  return (
    <div>
    

      {
        data.length == 0 &&
        <div className="flex justify-center items-center mt-24 col-span-3">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-gray-200">
          </div>
        </div>
      }
      {data.length !=0 &&
        <div className="filterable-table grid place-items-center justify-center">
          {/* <input
          type="text"
          className="filter-input m-10 rounded-xl p-1 w-100 h-30 text-3xl "
          placeholder="   Filter by any column"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        /> */}
          <table className="table m- backdrop-blur border-2 rounded-lg">
            <thead className="m-5">
              <tr>
                {tableHeaders.map((header, index) => (
                  <th
                    key={index}
                    className="table-header text-5xl p-2 m-2 border-b-2 w-100 sm:text-[1.1rem]"
                  >
                    <button
                      className="sort-button"
                      onClick={() => toggleSort(header)}
                    >
                      {" "}
                      {header}
                      {sortColumn === header ? (sortDirection === 1 ? "" : "") : ""}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  {tableHeaders.map((header, index) => (
                    <td
                      key={index}
                      className="table-cell border-b-2 text-1xl sm:p-5 sm:text-[1rem]"
                    >
                      {item[header]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>}
    </div>

  );
};

export default FilterableTable;
