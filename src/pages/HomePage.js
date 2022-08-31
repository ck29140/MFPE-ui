import React, { useEffect, useState } from "react";
import axios from "axios";

import "./mystyle.css";
import "../App.css";
import { Button, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, Row, Table } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";

import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import TextField from '@material-ui/core/TextField';





function HomePage() {

  const [date, setDate] = useState("")
  const [stockData, setStockData] = useState([])

  const [medicineName, setMedicineName] = useState('')
  const [demandCount, setdemandCount] = useState('')

  const [medSupplyList, setMedSupplyList] = useState([])

  const [scheduleList, setScheduleList] = useState([])

    

  
  
  const baseURL = "http://localhost:59839/api/MedicineStockInformation";
  
  
 
    const [post, setPost] = React.useState(null);
    
  
    React.useEffect(() => {
      axios.get(baseURL).then((response) => {
        setPost(response.data);
      });
    }, []);

    //alert("Hi");
    //console.log(post);

    // const Date = () => {
    //   const [startDate,setStartDate] = useState(new Date());
    //   return (
    //     <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
    //   );
    // };

    const createScheduleClickHandler = () => {
      const formatttedDate =  moment(date).toISOString()
      axios.get(`http://localhost:5001/api/RepSchedule?startDate=${formatttedDate}`)
      .then((res) => {
        console.log("sed list",res.data)
        setScheduleList(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    }

    const viewStockClickHandler = () => {
      axios.get(`http://localhost:59839/api/MedicineStockInformation`)
      .then((res) => {
        // console.log(res.data)
        setStockData(res?.data)
      })
      .catch((err) => console.log(err))
    }

    const handleMedicineSupply = () => {
      console.log("med name", medicineName)
      console.log("count", demandCount)
      const obj = [{
        "medicine": medicineName,
        "demandCount": demandCount
      }]
      axios.post(`http://localhost:5002/api/PharmacySupply`, obj )
      .then((res)=> {
        console.log(res.data)
        setMedSupplyList(res.data)
      })
      .catch((err) => console.log(err))
    }

console.log('stock data state', stockData )
console.log('med supplu list state', medSupplyList)
    
  
    return (
      <div className="HomePage">
        <h1 ><span class="badge rounded-pill bg-primary">Dashboard</span></h1>
          <Container>
            <Row className="justify-content-center">
              <Col md="9" lg="7" xl="6">
              <CardGroup>
              <CardBody>
                  
          <Form
      >
          <div className="row mb-2 pageheading">
          <div className="col-sm-12"></div>
          </div>
          <Button type="button" onClick={viewStockClickHandler} >View Medicine Stock</Button>
          <br /><br />
          <InputGroup className="mb-3">
          <Input type="text" id="" name="" placeholder="Enter Medicine Name" class="form-control" value={medicineName} onChange={(e) => {setMedicineName(e.target.value)}}/>
          </InputGroup>
          <InputGroup className="mb-3">
          <Input type="number" id="" name="u" placeholder="Enter Demand Count" class="form-control" value={demandCount} onChange={(e) => {setdemandCount(e.target.value)}}/>
          </InputGroup>
          <Button className="btn1" onClick={handleMedicineSupply}>Medicine Supply</Button>
          <br />
          <br/>
          <h1 ><span class="badge rounded-pill bg-secondary">Medical Representative Schedule</span></h1>
      <TextField
        id="date"
        label="Create Schedule"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />

<Button type="button" onClick={createScheduleClickHandler}>Create Schedule</Button><br />
          
          
          
          
          <p></p><br />
          <p></p><br />

          <p></p><br />
          <p></p><br />
          <p></p>
          
          
          </Form>
          
          </CardBody>
          </CardGroup>
          </Col>
          </Row>

          {scheduleList.length > 0 && <h3>Schedule List</h3>}
          {scheduleList.length > 0 && <Button onClick={()=>setScheduleList([])}>Close</Button>}
          {scheduleList.length > 0 && <Table striped bordered >
            <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Doctor's Name</th>
            <th>Meeting Slot</th>
            <th>Date of Meeting</th>
            <th>Contact Number</th>
            <th>Treating Alignment</th>
            <th>Medicine</th>
          </tr>
        </thead>
        <tbody>
          {scheduleList.map((item, index) => (
            <tr>
            <th scope="row">{index+1}</th>
            <td>{item.name}</td>
            <td>{item.doctorname}</td>
            <td>{item.meetingSlot}</td> 
            <td>{moment(item.dateofmeeting).format('MMMM Do YYYY')}</td>
            <td>{item.doctorContactnumber}</td>
            <td>{item.treatingAlignment}</td>
            <td>{item.medicine.join(', ')}</td>          
          </tr>
          ))}
        
          
        </tbody>
            </Table>}


          {medSupplyList.length> 0 &&
          <h3>Medicine Supply List</h3>}
          {medSupplyList.length> 0 &&
          <Button onClick={()=>setMedSupplyList([])}>Close</Button>}

          {medSupplyList.length> 0 && <Table striped bordered>
            <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Pharmacy Name</th>
            <th>Supply Count</th>
          </tr>
        </thead>
        <tbody>
          {medSupplyList.map((item, index) => (
            <tr>
            <th scope="row">{index+1}</th>
            <td>{item.medicinename}</td>
            <td>{item.pharmacyname}</td>
            <td>{item.supplycount}</td>           
          </tr>
          ))}
        
          
        </tbody>
            </Table>}

          {stockData.length> 0 &&
          <h3>Medicine Stock</h3>}
          {stockData.length> 0 &&
          <Button onClick={()=>setStockData([])}>Close</Button>}
          {stockData.length> 0 && <Table striped bordered>
            <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Chemical Composition</th>
            <th>Target Ailment</th>
            <th>Expiry Date</th>
            <th>No. in stock</th>
          </tr>


        </thead>
        <tbody>
          {stockData.map((item, index) => (
            <tr>
            <th scope="row">{index+1}</th>
            <td>{item.name}</td>
            <td>{item.chemicalComposition}</td>
            <td>{item.targetAilment}</td>
            <td>{moment(item.dateOfExpiry).format('MMMM Do YYYY')}</td>
            <td>{item.numberOfTabletsInStock}</td>            
          </tr>
          ))}
        
          
        </tbody>
            </Table>}
         
          </Container>
          
          
      </div>
      
    );
  }

  

  export default HomePage;
