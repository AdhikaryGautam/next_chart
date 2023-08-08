"use client";

const TableHead = ({
  title,
  filterKey,
  searchData,
  sortData,
  setCurrentFilter,
  currentFilter,
}) => {
  const handleSearchChange = (value) => {
    setCurrentFilter(filterKey);
    searchData(value);
  };

  const handleSortChange = (value) => {
    setCurrentFilter(filterKey);
    sortData(value);
  };

  return (
    <th className="px-6 py-4">
      {title}
      <input
        type="text"
        id={filterKey}
        className={`bg-background my-2 border-2 ${
          currentFilter === filterKey ? "border-blue" : "border-neutral-200"
        } font-semibold text-sm rounded-sm focus:ring-blue-500 text-blue focus:border-blue-500 block w-full py-1 px-2`}
        placeholder="Search..."
        onChange={(e) => handleSearchChange(e.target.value)}
      />
      <select
        onChange={(e) => handleSortChange(e.target.value)}
        className={`bg-background my-2 ${
          currentFilter === filterKey ? "text-blue" : "text-neutral-700"
        } font-semibold text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-1 px-2`}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </th>
  );
};

export default TableHead;
