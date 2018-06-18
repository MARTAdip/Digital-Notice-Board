import React from 'react';
import '../login/style.css';
import {Row, Col, Button, Form, FormGroup, Input, Label, Nav, NavItem, NavLink} from 'reactstrap';
import Navigation from "../Navigation/Navigation.js"

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    //alert('email for resetting password sent');

  };

  handleChange(e) {
    console.log(this.state.data)
    const dataCopy = {
      ...this.state.data
    };
    dataCopy[e.target.name] = e.target.value;
    this.setState({data: dataCopy});
  };

  validateEmail(value) {
    if (!value)
      return true;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(value);
  };

  render() {
    return (
    <Row >
      <Col sm={{ size: 10, order: 2, offset: 1 }} md={{ size: 4, order: 2, offset: 4 }}>
        <Form className="border border-primary bg-white rounded mt-5 p-5">
          <h1>Forgot your password?</h1>
          <FormGroup onSubmit={this.handleSubmit}>
            <div className="inputGroup inputGroup1">
              <Label for="email1">Email</Label>
              <Input type="text" id="email" type="text" name="email" value={this.state.data.email} onChange={this.handleChange} onSubmit={this.validateEmail} className="email form-control" placeholder="Enter Email" maxlength="256"/>
              <div>{!this.validateEmail(this.state.data.email)
                ? <div>Invalid Email</div>
                : null}
              </div>
              <span className="indicator"></span>
            </div>
            <div className="inputGroup inputGroup3 pt-3">
              <Button color="primary" block onClick={(e) => this.handleChange(e)} className="resetpassbutton" type="submit">Send</Button>
            </div>
            <br/>
            <Navigation navigation={["login", "register"]} />
          </FormGroup>
        </Form>
      </Col>
    </Row>
    );
  }
}

export default ResetPassword;
