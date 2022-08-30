import axios from 'axios';

export const stockServices= {
    getAllMedicine,
};


function getAllMedicine(){  
    return axios.get("https://localhost:44338/api/MedicineStock");

}