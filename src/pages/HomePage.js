import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import "./mystyle.css";
import "../App.css";
import { Button, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, Row } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";

import MedicineStock from "./MedicineStock";
import StockService from "./StockService";
import { useHistory } from "react-router-dom";



function HomePage() {

    

  
  
  const baseURL = "https://localhost:44338/api/MedicineStock";
  
  
 
    const [post, setPost] = React.useState(null);
  
    React.useEffect(() => {
      axios.get(baseURL).then((response) => {
        setPost(response.data);
      });
    }, []);

    alert("Hi");
    console.log(post);
    
  
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
          <Button className="btn1">Medicine Supply</Button><br />
          <InputGroup className="mb-3">
          <Input type="text" id="" name="" placeholder="" class="form-control" />
          </InputGroup>
          <InputGroup className="mb-3">
          <Input type="text" id="" name="u" placeholder="" class="form-control"/>
          </InputGroup><Button type="button">View Medicine Stock</Button><br />
          <br/>
          <Button className="btn2">Medical Representative Schedule</Button>
          <InputGroup className="mb-3">
          <Input type="text" id="" name="u" placeholder="" class="form-control"/>
          </InputGroup>
          
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
          </Container>
  
          
      </div>
    );
  }

  export default HomePage;
