import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import swal from 'sweetalert';

function StockForm(props) {
    const [name, setName] = useState('')
    const [chemicalComposition, setChemicalComposition] = useState('')
    const [targetAilment, setTargetAilment] = useState('')
    const [expiryDate, setExpiryDate] = useState('')
    const [noOfTablets, setNoOfTablets] = useState('')

    useEffect(()=>{
        setName(props.editData?.name)
        setChemicalComposition(props.editData?.chemicalComposition)
        setTargetAilment(props.editData?.targetAilment)
        setExpiryDate(props.editData?.dateOfExpiry?.slice(0,10))
        setNoOfTablets(props.editData?.numberOfTabletsInStock)
    },[props?.editData])

    function submitForm() {
        const formObj = {
            'name': name,
            'chemicalComposition' : chemicalComposition,
            'targetAilment' : targetAilment,
            'dateOfExpiry' : expiryDate,
            'numberOfTabletsinStock': noOfTablets,
    }
    console.log(formObj)

    if(Object.keys(props?.editData).length === 0){
        console.log("method POST")
        axios.post(`https://localhost:44338/api/MedicineStock/add-medicine`,formObj).then(
            (res) => { console.log("Submitted",res)
            props.viewStockClickHandler();
            props.setShowForm(false);
            swal("Success", `${name}  added to Stock`, "success");
            setName("");
            setChemicalComposition("");
            setExpiryDate("");
            setTargetAilment("");
            setNoOfTablets("");
        
        }
    
        ).catch(err => console.log('error' , err))
    

    } else{
        console.log("method PUT")
        axios.put(`https://localhost:44338/api/MedicineStock/update-medicine-by-id/${props.editData?.id}`,formObj).then(
            (res) => { console.log("Submitted",res)
            props.viewStockClickHandler();
            props.setShowForm(false);
            setName("");
            setChemicalComposition("");
            setExpiryDate("");
            setTargetAilment("");
            setNoOfTablets("");
        
        }
    
        ).catch(err => console.log('error' , err))
    
    }

   


    }

    console.log('state is', name, chemicalComposition , targetAilment , expiryDate , noOfTablets)
    return (

        <Form onSubmit={(e) => {
            e.preventDefault();
            submitForm();
        }} style ={{border:'2px solid black' ,borderRadius:'1em', margin:'0.5em' , padding:'0.5em'}} >
  <Row>
    <Col md={6}>
      <FormGroup>
        <Label for="name">
          <b>Name</b>
        </Label>
        <Input
          id="name"
          name="name"
          placeholder="Enter Medicine Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormGroup>
    </Col>
    <Col md={6}>
      <FormGroup>
        <Label for="chemicalComposition">
          <b>Chemical Composition</b>
        </Label>
        <Input
          id="chemicalComposition"
          name="chemicalComposition"
          placeholder="Enter Chemical Composition"
          type="text"
          value={chemicalComposition}
          onChange = {(e) => setChemicalComposition(e.target.value)}
        />
      </FormGroup>
    </Col>
  </Row>
  <Row>
  <Col md={6}>
  <FormGroup>
    <Label for="targetAilment">
        <b>Target Ailment</b>
    </Label>
    <Input
      id="targetAilment"
      name="targetAilment"
      placeholder="Enter Target Ailment"
      value={targetAilment}
      onChange = {(e) => setTargetAilment(e.target.value)}
    />
  </FormGroup>
  </Col>
  <Col md={6}>
  <FormGroup>
    <Label for="expiryDate">
        <b>Expiry Date</b>
    </Label>
    <Input
      id="expiryDate"
      name="expiryDate"
      placeholder="Enter Date of Expiry"
      type ="date"
      value={expiryDate}
      onChange = {(e) => setExpiryDate(e.target.value)}
    />
  </FormGroup>
  </Col>
  
    <Col md={6}>
      <FormGroup>
        <Label for="noOfTablets">
        <b>No Of Tablets In Stock</b>
        </Label>
        <Input
          id="noOfTablets"
          name="noOfTablets"
          type="number"
          value={noOfTablets}
          onChange = {(e) => setNoOfTablets(e.target.value)}
        />
      </FormGroup>
    </Col>
  </Row>
    
  
  <Button type="submit">
    Submit
  </Button>
</Form>

    )
}

export default StockForm;