import React, {Component} from 'react';
import ModulesSideBar from '../modules-side-bar/ModulesSideBar';
import Search from "./Search";
import SlideDetail from "./SlideDetail"
import AddVideo from '../AddVideo/AddVideo';
import AddCode from '../AddCode/AddCode';
import AddPhoto from '../AddPhoto/AddPhoto';
import AddMeetup from '../AddMeetup/AddMeetup';
import AdminNavigation from './AdminNavigation';
import { Button, Alert } from 'reactstrap';
import axios from 'axios';
import AddAnnouncement from '../AddAnnouncement/AddAnnouncement';
import AddGithub from '../AddGithub/AddGithub';

const style = {
  alert: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  }
};
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentSlide: 0,
      searchData: "",
      alert: false,
      //showExpired: false

    }
  }

  componentDidMount() {
    const domain = process.env.REACT_APP_DOMAIN || "http://localhost";
    const port = process.env.REACT_APP_BACKENDPORT || 4000;
    fetch(`${domain}:${port}`)
    .then(resp => resp.json())
    .then((data) => {
        this.setState({data: data, currentSlide: data[0]
      })
    })
  }

  alertFunc = (title, type) => {
    //here we check if it is the Alert closing click. We dont pass anything in that case. So the title will be the default event
    if(typeof(title) === "object"){
      this.setState({alert: false})
      return;
    }

    this.setState({alert: {title: title, type: type}});
    setTimeout(() => this.setState({alert: false}), 5000);
  }

  sendInfo = (e, slide) => {
    console.log(e);
    console.log(slide);
    e.preventDefault()
    const form = {};
    for (let i = 0; i < e.target.elements.length; i++) {
      if (e.target.elements[i].value !== "") {
        form[e.target.elements[i].id] = e.target.elements[i].value
      }
    }
    form["type"] = this.state.currentSlide.type;
    console.log(form);

    //TODO POST method is sending the object not correctly
    this.setState({form: form})

    if(slide.state.form._id){
      axios.put(`http://localhost:4000/admin/edit/${slide.state.form._id}`, form)
      .then(response => {
        console.log(response.data.message);
        if(response.data.message === "Slide updated successfully!"){
          this.alertFunc("Slide edited successful", "primary")
        } else {
          this.alertFunc("Error: " + response.data.message, "danger")
          console.log("Error: ", response);
        }
      })
      .catch(function (error) {
        console.log("Error: ", error);
      })
    } else {
    
      axios.post('http://localhost:4000/admin/add', form)
      .then(function (response) {
        console.log("Slide added successful: ", response);
      })
      .catch(function (error) {
        console.log("Error: ", error);
      })
    }
  }
  slideHandler(slide) {
    this.setState({currentSlide: slide})
  }
  newSlide(type) {
    this.setState({currentSlide: {
      "type": type,
    }})
  }

   handleSearchInput = (e) => {
    const searchData = e.currentTarget.value;
    this.setState({searchData});
  }

  // handleSearchCheckbox = (e) => {
  //   const expiryCheckbox = e.currentTarget.checked;
  //   this.setState({showExpired: expiryCheckbox});
  // }

  // checkSlideExpired = (slide) => {
  //   const expiryDate = new Date(slide.expiryDate);
  //   const expiryDateMS = expiryDate.getTime();
  //   return (Date.now() < expiryDateMS);
  // }


  render() {
    let content;
    if(this.state.currentSlide.type){
      if ( this.state.currentSlide.type === "video") {
         content = <AddVideo data={this.state.currentSlide} sendChildInfo={this.sendInfo.bind(this)}/>
      } else if (this.state.currentSlide.type === "announcement") {
         content = <AddAnnouncement data={this.state.currentSlide} sendChildInfo={this.sendInfo.bind(this)}/>
      } else if (this.state.currentSlide.type === "code") {
         content = <AddCode data={this.state.currentSlide} sendChildInfo={this.sendInfo.bind(this)}/>
      } else if (this.state.currentSlide.type === "repo") {
         content = <AddGithub data={this.state.currentSlide} sendChildInfo={this.sendInfo.bind(this)}/>
      } else if (this.state.currentSlide.type === "photos") {
         content = <AddPhoto data={this.state.currentSlide} sendChildInfo={this.sendInfo.bind(this)}/>
      } else if (this.state.currentSlide.type === "meetup") {
         content = <AddMeetup data={this.state.currentSlide} sendChildInfo={this.sendInfo.bind(this)}/>
      }
    }
    var data = this.state.data
    if(this.state.data.length > 0 && this.state.searchData){
      data = this.state.data.filter(slide => slide.title.toLowerCase().includes(this.state.searchData.toLowerCase()) )
        //.filter(slide => (this.state.showExpired ? true : this.checkSlideExpired(slide)))
    }

    return (
      <div className="section backend">
        <AdminNavigation newSlide={this.newSlide.bind(this)}/>
         <Alert style={style.alert} color={this.state.alert.type} toggle={this.alertFunc} isOpen={this.state.alert}>
          {this.state.alert.title}
        </Alert>
        <div className="d-flex">
          <div className="w-50" >
            <ul className="list-group m-3">
               <Search
                handleSearchInput={this.handleSearchInput}
                //handleSearchCheckbox={this.handleSearchCheckbox}
                searchData={this.state.searchData}
              />
                {data.map((item, value) => (
                  <li className="list-group-item mb-2">
                    <ModulesSideBar
                      current={this.state.currentSlide}
                      handleToggleClick={() => this.slideHandler(item)}
                      key={value}
                      data={item}/>
                  </li>)
                )}
            </ul>
          </div>
          <div className="card w-100 m-3">
            <div className="card-body" >
              {content}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Admin;
