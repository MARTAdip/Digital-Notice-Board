import React from 'react';
import '../login/style.css';
import {Button, Form, FormGroup, Input, Label, Nav, NavItem, NavLink} from 'reactstrap';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    }

    render() {
      const loginLink = "/admin/login";
      const forgotLink = "/admin/reset";
      const registerLink = "/admin/Register";
      const loginString = "Log In";
      const forgotString = "Forgot Password?";
      const registerString = "Register";

      if (this.props.navigation[0] == "forgot"  && this.props.navigation[1] == "register") {
      this.setLink1 = forgotLink;
      this.setString1 = forgotString;
      this.setLink2 = registerLink;
      this.setString2 = registerString;

      } else if (this.props.navigation[0] == "login"  && this.props.navigation[1] == "register"){
      this.setLink1 = loginLink;
      this.setString1 = loginString;
      this.setLink2 = registerLink;
      this.setString2 = registerString;

      } else if (this.props.navigation[0] == "login"  && this.props.navigation[1] == "forgot"){
      this.setLink1 = loginLink;
      this.setString1 = loginString;
      this.setLink2 = forgotLink;
      this.setString2 = forgotString;
      }

    return(
    <Nav className="justify-content-center">
            <NavItem>
              <NavLink href={this.setLink1}>{this.setString1}</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={this.setLink2}>{this.setString2}</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">Frontend</NavLink>
            </NavItem>
        </Nav>
    )
  }
}

export default Navigation;
