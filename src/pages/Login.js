import React from "react";
import axios from "axios";
import { setAuthToken } from "../helpers/setAuthToken";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css"
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, Row } from 'reactstrap';
import './mystyle.css'
import { useState } from "react";
import swal from "sweetalert";



function Login() {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')


  const handleSubmit = (username, password) => {
    //reqres registered sample user
    // const loginPayload = {
    //   username: 'test',
    //   password: 'Pass'
    // }

    console.log("Username", username)
    console.log("Password", password)
  
    
    
    axios.get(` https://authapi3107.azurewebsites.net/api/Authentication?Username=${username}&Password=${password}`)
      .then(response => {
        //get token from response
        const token = response.data;

        //alert("Login Success");

        swal({
          title: "Login Success",
          text: "User authorised",
          icon: "success",
          timer: 60000
        });

        //set JWT token to local
        localStorage.setItem("token", token);

        //set token to axios common header
        setAuthToken(token);

        //redirect user to home page
        window.location.href = '/'

      })
      .catch(err => console.log(err));
  };

  return (
    <div className="login">
      <div className="flex-row align-items-center">
        <Container>
        <Row className="justify-content-center">
      <Col md="9" lg="7" xl="6">
        <CardGroup>
        <Card className="p-2">
          <CardBody >
    <Form 
      onSubmit={(event) => {
        event.preventDefault()
        handleSubmit(userName, password)
      }}
    >
      <div className="row mb-2 pageheading">
      <div className="col-sm-12"></div>
      </div>
      <h1><span class="badge rounded-pill bg-primary">Welcome</span></h1><br />
      <h2><span class="badge bg-info">Pharmacy Medicine Supply Management System</span></h2>
      <h3><span class="badge bg-success">Login</span></h3>
      <InputGroup className="mb-3">
      <Input type="text" id="username" name="username" placeholder="Enter Username" value={userName} onChange={(e) => setUserName(e.target.value)} />
      </InputGroup>
      <InputGroup className="mb-4">
      <Input type="password" id="password" name="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </InputGroup>
      <Button type="submit" value="Submit">Submit</Button>
      <p></p>
    </Form>
    </CardBody>
    </Card>
    </CardGroup>
    </Col>
    </Row>
    </Container>
    </div>
    </div>
  );
}
export default Login;