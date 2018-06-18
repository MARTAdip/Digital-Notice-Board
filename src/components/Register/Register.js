import React from 'react';
import '../login/style.css';
import {Row, Col, Button, Form, FormGroup, Input, Label, Nav, NavItem, NavLink} from 'reactstrap';
import Navigation from "../Navigation/Navigation.js"


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registerData: {
        email: "",
        password: "",
        confirmPassword: null
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateEmail = this.validateEmail.bind(this);

  }
  handleChange(e) {
    const registerDataCopy = {
      ...this.state.registerData
    };
    registerDataCopy[e.target.name] = e.target.value;
    this.setState({registerData: registerDataCopy});
  }
  handleSubmit(e) {
    e.preventDefault();
  }
  validateEmail(value) {
    if (!value)
      return true;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(value);
  }

  render() {
    return (
    <Row >
      <Col sm={{ size: 10, order: 2, offset: 1 }} md={{ size: 4, order: 2, offset: 4 }}>
        <Form onSubmit={this.handleSubmit} action="/login" method="post" id="loginform" className="border border-primary rounded mt-5 p-5 bg-white">
          <h1>Register</h1>
          <FormGroup>
            <div className="inputGroup inputGroup1">
              <Label for="email1">Email</Label>
              <Input type="text" id="email" className="email" type="text" name="email" required value={this.state.registerData.email} onChange={this.handleChange} onSubmit={this.validateEmail} maxlength="256" placeholder="Enter Email"/>
              <div>{!this.validateEmail(this.state.registerData.email)
                  ? <div>Invalid Email</div>
                  : null}
              </div>
            </div>

            <div className="inputGroup inputGroup2 pt-3">
              <Label for="password">Password</Label>
              <Input type="password" id="password" className="password" name="password" required value={this.state.registerData.password} onChange={this.handleChange} placeholder="Enter Password"/>
            </div>
            <div className="inputGroup inputGroup2 pt-3">
              <Label for="password">Password repeat</Label>
              <Input type="password" id="passwortrepeat" className="passwortrepeat" name="passwortrepeat" required value={this.state.registerData.passwortrepeat} onChange={this.handleChange} placeholder="Enter Password again"/>
            </div>
            <div className="inputGroup inputGroup3 pt-3">
              <Button color="primary" block id="login">Register</Button>
            </div>
            <br/>
            <Navigation navigation={["login", "forgot"]}/>
          </FormGroup>
        </Form>
      </Col>
    </Row>

    );
  }
}

export default Register;
