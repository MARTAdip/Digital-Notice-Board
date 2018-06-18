import React, {Component} from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class AdminNavigation extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="primary" dark expand="md">
          <NavbarBrand href="/">Digital-Notice-Board Admin</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Frontend</NavLink>
              </NavItem>
              <NavItem>
                <NavLink target="_blank"  href="https://github.com/devugees/digital-notice-board">GitHub</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Add Slide
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={e => this.props.newSlide('video')}><i className="fa fa-plus mr-2"></i> Video</DropdownItem>
                  <DropdownItem onClick={e => this.props.newSlide('code')}><i className="fa fa-plus mr-2"></i> Code</DropdownItem>
                  <DropdownItem onClick={e => this.props.newSlide('announcement')}><i className="fa fa-plus mr-2"></i> Announcement</DropdownItem>
                  <DropdownItem onClick={e => this.props.newSlide('photos')}><i className="fa fa-plus mr-2"></i> Photos</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
export default AdminNavigation;
