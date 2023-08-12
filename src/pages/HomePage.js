import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./mystyle.css";
import "../App.css";
import { Button, CardBody, CardGroup, Col, Container, Form, FormGroup, Label, Input, InputGroup, Navbar, NavbarBrand, NavItem, Row, Table , Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import "bootstrap/dist/css/bootstrap.min.css";

import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import TextField from '@material-ui/core/TextField';
import swal from "sweetalert";
import StockForm from "./StockForm";






function HomePage() {

  const [date, setDate] = useState("")
  const [stockData, setStockData] = useState([])

  const [medicineName, setMedicineName] = useState('')
  const [demandCount, setdemandCount] = useState('')

  const[showForm , setShowForm] = useState(false);

  const [editData, setEditData] = useState({});

  const [medSupplyList, setMedSupplyList] = useState([])

  const [scheduleList, setScheduleList] = useState([])

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const today = new Date();


  
  
  

  // const token = localStorage.getItem(localStorage.key(0))
  // console.log(token)

  //Logout Button 

  const history=useHistory();
  function logOut() {
    localStorage.clear();
    history.push('/');
    window.location.reload();
  }


  const clearStock = () => {
    setStockData([]);
  }

  const clearSupply = () => {
    setMedSupplyList([]);
  }
  

    


    
  
    // Generating Schdeule 
  
    const createScheduleClickHandler = () => {
      const formatttedDate =  moment(date).add(1,'d').toISOString()
      console.log(formatttedDate)
      axios.get(`http://localhost:5001/api/RepSchedule?startDate=${formatttedDate}`)
      .then((res) => {
        console.log("sed list",res.data)
        console.log(formatttedDate)
        setScheduleList(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    }


    // Viewing Stock 

    const viewStockClickHandler = () => {
      axios.get(`https://localhost:44338/api/MedicineStock`)
      .then((res) => {
        // console.log(res.data)
        setStockData(res?.data)
      })
      .catch((err) => console.log(err))
    }

    // Medicine Supply 

    const handleMedicineSupply = () => {
      console.log("med name", medicineName)
      console.log("count", demandCount)
      const obj = [{
        "medicine": medicineName,
        "demandCount": demandCount
      }]
      axios.post(`http://localhost:5002/api/PharmacySupply`, obj )
      .then((response)=> {

        
        if(response.status === 500)
        {
          alert("Please enter a valid medicine name and demand, ok ck")
          console.log('500 error')
          
        }

        else if(setdemandCount() === 0)
        {
          alert("Enter valid number")
          
        }

        else
        {
          console.log(response.data)
          setMedSupplyList(response.data)
        }
        
      })
      .catch((err) => swal('Error', 'Please enter a valid medicine name and demand' ,'error'))
    }

    function deleteMed(medId, medName){
      console.log("Delete ", medId)
      swal({
        title: "Are you sure?",
        text: `Once deleted, ${medName} will be removed from stock`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          axios.delete(`https://localhost:44338/api/MedicineStock/delete-medicine-by-id/${medId}`)
          .then((res)=>{
            console.log('deleted',res);
            viewStockClickHandler();
          })
          .catch((err)=>{
            console.log(err)
          })
          swal(`${medName} has been deleted from Stock`  , {
            icon: "success",
          });
        } else {
          // swal("Cancelled");
        }
      });
     
    }

    function editMed(item){
      setShowForm(true)
      console.log('edit data', item)
      setEditData(item)
    }

    useEffect(()=>{window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}, [showForm])

console.log('stock data state', stockData )
console.log('med supplu list state', medSupplyList)
    
  
    return (
      <div className="HomePage">
        <Navbar light expand="md">
          <NavbarBrand style={{display: 'flex', justifyContent: 'flex-end'}}><h1 class="dashboard">Dashboard</h1></NavbarBrand>
        </Navbar>
        <Navbar light expand="md">
          <NavbarBrand color="#B9FFF8"><img alt = "logo" src="https://static2.bigstockphoto.com/5/6/3/large2/365322934.jpg" style={{
          height: 150,
          width: 150
        }} /></NavbarBrand>
        <NavbarBrand><h1 class="title">Pharmacy Medicine Supply Management System</h1></NavbarBrand>
          <NavbarBrand color="#B9FFF8"><Button id="btn3" style={{display: 'flex', justifyContent: 'top'}} type="button" color="success" onClick={() => {toggle(); viewStockClickHandler();}} >View Medicine Stock</Button></NavbarBrand>
            <Button style={{display: 'flex', justifyContent: 'flex-end'}} color="danger" onClick={logOut}>Log Out</Button>
          
        </Navbar>
        
        
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
          {/* <Button id="btn3" style={{display: 'flex', justifyContent: 'top'}} type="button" color="success" onClick={viewStockClickHandler} >View Medicine Stock</Button> */}
          <br /><br />

          
          <InputGroup className="mb-3">
          <Input type="text" id="" name="" placeholder="Enter Medicine Name" class="form-control" value={medicineName} onChange={(e) => {setMedicineName(e.target.value)}}/>
          </InputGroup>
          <InputGroup className="mb-3">
          <Input type="number" id="" name="u" placeholder="Enter Demand Count" class="form-control" value={demandCount} onChange={(e) => {setdemandCount(e.target.value)}}/>
          </InputGroup>
          <Button className="btn1" color="success" onClick={handleMedicineSupply}> Medicine Supply</Button>
          <br />
          <br/>
          
          
          
          </Form>
          
          
          
          <p></p><br />
          <p></p><br />

          <p></p><br />
          <p></p><br />
          <p></p>

          </CardBody>
          
          
          
          </CardGroup>
          </Col>
          </Row>
        <Container>

        <h1  ><span class="badge rounded-pill bg-secondary">Medical Representative Schedule</span></h1>
      <input min={new Date().toISOString().split('T')[0]}
        id="date"
        label="Create Schedule"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />

<Button type="button"  color="success" onClick={createScheduleClickHandler}>Create Schedule</Button><br />
          {scheduleList.length > 0 && <h3>Schedule List</h3>}
          {scheduleList.length > 0 && <Button  color="danger" onClick={()=>setScheduleList([])}>Close</Button>}
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

            </Container>
            

            <Container>

          
          

          
          {medSupplyList.length> 0 &&
          <h3>Medicine Supply List</h3>}
          {medSupplyList.length> 0 &&
          <Button color="danger" onClick={()=>setMedSupplyList([])}>Close</Button>} 

          {medSupplyList.length> 0 &&<Table striped bordered>
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
            


            <div>
      
      <Modal isOpen={modal} toggle={toggle} fullscreen>
        <ModalHeader toggle={toggle}>Medicine Stock</ModalHeader>
        <ModalBody>
        {/* {stockData.length> 0 &&
          <h3>Medicine Stock</h3>} */}
          {/* {stockData.length> 0 &&
          <Button   color="danger" onClick={()=>setStockData([])}>Close</Button>} */}
          <Button color= "primary" onClick={() => {setShowForm(value => !value); setEditData({})}}> Add Medicine in Stock </Button>
          {showForm && <StockForm  setShowForm = {setShowForm}  viewStockClickHandler = {viewStockClickHandler} editData={editData} />}

          {<Table dark striped bordered>
            <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Chemical Composition</th>
            <th>Target Ailment</th>
            <th>Expiry Date</th>
            <th>No. in stock</th>
            <th>Actions</th>
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
            <td>
              <Button style={{marginRight:2}} onClick={()=>{deleteMed(item.id,item.name)}} color="danger">Delete</Button>
              <Button color="warning" onClick={() => {editMed(item)}}>Edit</Button>
            </td>       
          </tr>
          ))}
        
          
        </tbody>
            </Table>}
        </ModalBody>
        <ModalFooter>
          {/* <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{' '} */}
          <Button color="primary" onClick={() => {toggle(true); clearStock();}}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
            

          {/* {stockData.length> 0 &&
          <h3>Medicine Stock</h3>}
          {stockData.length> 0 &&
          <Button   color="danger" onClick={()=>setStockData([])}>Close</Button>}
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
            </Table>} */}

            </Container>
         
          </Container>
          
          
      </div>
      
    );
  }

  

  export default HomePage;
