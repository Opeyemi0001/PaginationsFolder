import DataTable from "react-data-table-component";
import { data } from "./assets/data"
import './App.css';
import { useState } from "react";

const columns = [
  {
    name: "Title",
    selector: (row) => row.title,

  },
  {
    name: "Director",
    selector: (row) => row.director,

  },
  {
    name: "Year",
    selector: (row) => row.year,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
]


const customStyles = {

  headCells: {
    style: {
      fontSize: "1.2rem",
      fontWeight: "bolder",
      color: "#fff",
      backgroundColor: "#000",
    },
  }

}



function App() {

  const [records, setRecords] = useState(data);

  const handleChange = (e) => {
    let query = e.target.value;
    const newrecords = data.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
    setRecords(newrecords);
  };

  return (
    <div className="homeDiv">
      <div className="search">
        <h2>Movie List</h2>
        <input type="text" placeholder="Search By Title" onChange={handleChange} />
      </div>
      <DataTable
        columns={columns}
        data={records}
        customStyles={customStyles}
        pagination
      ></DataTable>
    </div>
  )
}

export default App
