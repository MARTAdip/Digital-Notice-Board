import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardLink, CardTitle, CardSubtitle } from 'reactstrap';
import "./Announcement.css";

class Announcement extends Component {
  render(props) {
    return (<div className="flex-grow splinter p-5">
      <CardBody className="p-0">
        <h2>{this.props.data.title}</h2>
        <span className="subtitle">{this.props.data.location}</span>
        <CardText className="text">{this.props.data.description}</CardText>
      </CardBody>
    </div>);
  }
}
export default Announcement;
