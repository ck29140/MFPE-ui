import React , {useState, useEffect} from 'react';
import Table  from 'react-bootstrap/Table';
import axios from "axios";
import { useHistory } from "react-router-dom";
import StockService from "./stockService";

function ViewMedicineStock() {
    // const[data , getData] = useState([]);
    // let history = useHistory();
    // useEffect(() =>{
    //     const GetData = async () => {
    //         StockService.getAllMedicine().then((result) => {
    //             getData(result.data);
    //         });

    //     };

    //     GetData();

    // }, []);

    const [post, setPost] = useState(null);
  
    React.useEffect(() => {
      axios.get("https://localhost:44338/api/MedicineStock").then((response) => {
        setPost(response.data);
      });
    }, []);

    console.log(post);


    
    
    return (
        <div>
      
      <center>
        <h1>Student Details </h1>
      </center>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Chemical Composition</th>
            <th>Target Ailment</th>
            <th>Date Of Expiry</th>
            <th>Number Of Tablets In Stock</th>
            
          </tr>
        </thead>
        <tbody>
          {post &&
            post.length > 0 &&
            post.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td>{item.chemicalComposition}</td>
                  <td>{item.targetAilment}</td>
                  <td>{item.dateOfExpiry}</td>
                  <td>{item.numberOfTabletsInStock}</td>
                  

                  </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
    );
}

export default ViewMedicineStock;





















