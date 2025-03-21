import { useEffect } from "react";
import { useState } from "react"



function SearchFilterPaginationApi() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch data 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://dummyjson.com/users');
        const result = await res.json();
        setData(result.users);
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [])

  // Filter data based on search query
  const filteredData = data.filter((item) =>
    item.firstName.toLowerCase().includes(searchQuery.toLowerCase()));

  // Determine paginated data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);


  return (
    <>
      <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      {loading && <p>Loading...</p>}
      {error && <p>There was an error loading the user</p>}
      {!loading && !error && data.length === 0 ? <p>No users found</p> :
        <ul>
          {currentData.map((item) => (
            <li key={item.id}>{item.firstName}</li>
          ))}
        </ul>}


      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      > Previous
      </button>
      <button
        onClick={() =>
          setCurrentPage(currentPage + 1)}
        disabled={currentPage >= Math.ceil(filteredData.length / itemsPerPage)}
      >Next</button>
    </>
  )
}

export default SearchFilterPaginationApi
