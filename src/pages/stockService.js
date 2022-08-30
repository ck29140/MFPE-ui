import axios from "axios";
import React from "react";

const baseURL = "https://localhost:44338/api/MedicineStock";

export const StockService = { getAllMedicine };

function getAllMedicine() {
    return axios.get(baseURL);
}


export default StockService;


  

