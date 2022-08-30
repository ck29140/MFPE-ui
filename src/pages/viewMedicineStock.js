import React, { useState, useEffect } from "react";
import axios from 'axios';






const ViewMedicineStock = () => {
    const url = 'https://localhost:44338/api/MedicineStock'
  
    const [data, setData] = useState([])
  
    useEffect(() => {
      axios.get(url).then(json => setData(json.data))
    }, [])
  
    const renderTable = () => {
      return data.map(user => {
        return (
          <tr>
            <td>{user.name}</td>
            <td>{user.chemicalComposition}</td>
            <td>{user.targetAilment}</td> 
            <td>{user.dateOfExpiry}</td> 
            <td>{user.numberOfTabletsInStock}</td>
          </tr>
        )
      })
    }
  
    return (
      <div>
        <h1 id="title">Medicine Stock Table</h1>
        <table id="users">
          <thead>
            <tr>
              <th>Name</th>
              <th>Chemical Composition</th>
              <th>Target Ailment</th>
              <th>Date of Expiry</th>
              <th>Number of Tablets In Stock</th>
            </tr>
          </thead>
          <tbody>{renderTable()}</tbody>
        </table>
      </div>
    )
}

export default ViewMedicineStock;
