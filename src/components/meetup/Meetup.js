  import React, { Component } from 'react';
  import { Card, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import Spinner from '../Spinner/Spinner';
import { DATACACHE } from "../../constants/misc.js";
import "./meetup.css";
const moment = require('moment');

class Meetup extends Component {
    state = {
      data: this.props.data,
      events: {},
      loading: true
    }
  fetchData = (nextProps) => {
    const cachedUntil = (JSON.parse(localStorage.getItem(`meetup-data-${nextProps.data.content}`))) ? JSON.parse(localStorage.getItem(`meetup-data-${nextProps.data.content}`)).timestamp + DATACACHE : false;
    const now = Date.now();
    const locStorage = localStorage.getItem(`meetup-data-${nextProps.data.content}`);

    if (locStorage && cachedUntil > now) {
      this.setState({ events: JSON.parse(locStorage).events, loading: false })
    } else {
      fetch(`https://cors-anywhere.herokuapp.com/https://api.meetup.com/${nextProps.data.content}/events?&sign=true&photo-host=public&page=20`)
        .then(resp => resp.json())
        .then((data) => {
          this.setState({ timestamp: Date.now(), events: data, loading: false })
          localStorage.setItem(`meetup-data-${nextProps.data.content}`, JSON.stringify({ timestamp: Date.now(), events: data }))
        });
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.fetchData(nextProps) 
  }

  componentDidMount= () => {
    this.fetchData(this.state) 
  }

  render() {
    if(this.state.events.length > 0) {
      var content = this.state.events.map((event, i) =>{
         if(i > 0 && this.state.events[i - 1].name == event.name)
          return <Card className="splinter w-100 d-inline-block" key={i}>
           <CardBody className=" py-1 pr-0">

           <CardTitle>{event.name} - <small>{moment( event.local_date).format("DD.MM.YYYY")} - {event.local_time}</small></CardTitle>
           </CardBody>
          </Card>

         return <Card className="splinter w-100 d-inline-block" key={i}>
           <CardBody className=" py-1 pr-0">
             <div className="w-25 float-right">
             <img  src={`https://api.mapbox.com/v4/mapbox.outdoors/pin-s-rocket+285A98(${event.venue.lon},${event.venue.lat})/${event.venue.lon},${event.venue.lat},16/300x300@2x.png?access_token=${process.env.REACT_APP_MAPKEY}`} alt="Mapbox Map of -73.7638,42.6564" className="w-100" />
             {event.venue.address_1}   {event.venue.city}
           </div>

           <CardTitle>{event.name} - <small>{moment( event.local_date).format("DD.MM.YYYY")} - {event.local_time}</small></CardTitle>
           <CardSubtitle></CardSubtitle>
            <CardText>
            <div dangerouslySetInnerHTML={{ __html: event.description }} />
           </CardText>
           </CardBody>
          </Card>
       }
     );
  }
    return(
      <div className="meetup overflowy-scroll h-100 p-3">
        {this.state.loading
          ? <Spinner />
           : <div>
              <h2>{this.props.data.content}</h2>
             {content}
             </div>
         }
     </div>
    );
  }
}
export default Meetup;
