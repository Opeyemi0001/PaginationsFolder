import { use } from "react";
import { useState } from "react"

const mockData = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Alice Wood" },
  { id: 4, name: "Aice cook" },
  { id: 5, name: "lice food" },
  { id: 6, name: "Alie Wold" },
  { id: 7, name: "Love Jesus" },
  { id: 8, name: "Fish water" },
  { id: 9, name: "Gift Treasure" },
  { id: 10, name: "Life Goodness" },
]

function SearchFilterPagination() {
  const [data, setData] = useState(mockData);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter data based on search query
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // Determine paginated data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);


  return (
    <>
      <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      <ul>
        {currentData.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      > Previous
      </button>
      <button
        onClick={() =>
          setCurrentPage((prev) =>
            Math.min(prev + 1, Math.ceil(filteredData.length / itemsPerPage))

          )}
        disabled={currentPage >= Math.ceil(filteredData.length / itemsPerPage)}
      >Next</button>
    </>
  )
}

export default SearchFilterPagination
