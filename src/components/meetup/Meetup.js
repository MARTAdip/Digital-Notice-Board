  import React, { Component } from 'react';
  import { Card, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import Spinner from '../Spinner/Spinner';
import { DATACACHE } from "../../constants/misc.js";
import "./meetup.css";
const moment = require('moment');

  class Meetup extends Component {
    constructor(props) {
      super(props);
      this.state = {
        events: {},
        loading: true
      }
  }
   componentDidMount() {
    if (localStorage.getItem('meetup-data') && JSON.parse(localStorage.getItem('meetup-data')).timestamp + DATACACHE > Date.now()){
      this.setState({timestamp: Date.now(), events: JSON.parse(localStorage.getItem('meetup-data')).events, loading: false})
      let newtime = JSON.parse(localStorage.getItem('meetup-data'))
      newtime.timestamp = Date.now()
      localStorage.setItem('meetup-data', JSON.stringify(newtime))
    } else {
      fetch(`https://cors-anywhere.herokuapp.com/https://api.meetup.com/How-to-become-a-Web-Developer/events?photo-host=public&page=20&sig_id=${process.env.REACT_APP_MEETUPAPIKEY}`)
      .then(resp => resp.json())
      .then((data) => {
        this.setState({timestamp: Date.now(), events: data, loading: false})
        localStorage.setItem('meetup-data', JSON.stringify({timestamp: Date.now(), events: data}))

      });

    }
  }


  render(props) {
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
