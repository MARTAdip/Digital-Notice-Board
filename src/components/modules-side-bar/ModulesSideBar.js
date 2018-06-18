import React, { Component } from 'react';
import getIcons from '../../constants/icons.js';
import { ListGroup, ListGroupItem} from 'reactstrap';
import "./ModulesSideBar.css";



class ModulesSideBar extends Component {

  render() {
    const iconType = getIcons(this.props.data.type);

    // the active indicator for the current sidebar module slide
    var classes = (this.props.current && this.props.current._id === this.props.data._id ) ? " blue" : ""
    return (
        <ListGroupItem className={ `splinter mr-3 type_${this.props.data.type.toLowerCase()} card mb-4  ${classes}`} onClick={(e)=>this.props.handleToggleClick(this)}>
          <div action className="d-flex flex-column flex-md-row align-items-center">
            <div className="mr-md-3">
              <i className={`fa fa-3x ${iconType}`}></i>
            </div>
            <div className="text">
              <h4>{this.props.data.title}</h4>
            </div>
          </div>
        </ListGroupItem>
    );
  }
}

export default ModulesSideBar;
