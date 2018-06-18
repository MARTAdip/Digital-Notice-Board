import React from 'react';
import './style.css';
import {Row, Col, Button, Form, FormGroup, Input, Label, Nav, NavItem, NavLink} from 'reactstrap';
import axios from 'axios';
import Navigation from "../Navigation/Navigation.js"


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginData: {
        email: "",
        password: "",
        isActive: true
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  handleChange(event) {
    const loginDataCopy = {
      ...this.state.loginData
    };
    loginDataCopy[event.target.name] = event.target.value;
    this.setState({loginData: loginDataCopy});

  };

  handleSubmit(e) {
    e.preventDefault();
    const data = {
      email: this.state.loginData.email,
      password: this.state.loginData.password
    };

    // here happens the login post request which still fails because of missing auth
    axios.post('http://localhost:4000/login', data).then(function(response) {
      console.log(response.data);
      localStorage.setItem('token', response.data.token)
    }).catch(function(error) {
      console.log("Error: ", error);
    });
  };

  validateEmail(value) {
    if (!value)
      return true;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(value);
  };

  render() {

    const style = {
      display: 'none'
    }
    return (
    <Row >
      <Col sm={{ size: 10, order: 2, offset: 1 }} md={{ size: 4, order: 2, offset: 4 }}>
      <Form onSubmit={this.handleSubmit} action="/login" method="post" id="loginform" className="border border-primary rounded mt-5 p-5 bg-white">
      <h1>Login</h1>
        <FormGroup >
          <div className="svgContainer">
            <div></div>
          </div>

          <div className="inputGroup inputGroup1">
            <Label>Email</Label>
            <Input type="text" id="email" name="email" className="email" maxLength="256" placeholder="Enter Email" value={this.state.loginData.email} onChange={this.handleChange} onSubmit={this.validateEmail}/>
            <div>{ !this.validateEmail(this.state.loginData.email) ? <div>Invalid Email</div> : null } </div>
          </div>
          <div className="inputGroup inputGroup2 pt-3">
            <Label>Password</Label>
            <Input type="password" id="password" className="password" value={this.state.loginData.password} onChange={this.handleChange} name="password" placeholder="Enter Password"/>
          </div>
          <div className="inputGroup inputGroup3 pt-3">
            <Button color="primary" type="submit" block="block" onClick={(e) => this.handleChange(e)} id="login">Log in</Button>
          </div>
          <br/>
          <Navigation navigation={["forgot", "register"]}/>
        </FormGroup>
      </Form>
    </Col>
    </Row>
    );
  }
}

export default Login;
