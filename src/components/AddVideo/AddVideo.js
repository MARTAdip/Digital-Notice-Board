import React from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText
} from 'reactstrap';

class AddVideo extends React.Component {
  
  constructor(props) {
    super(props);

    var props = this.props.data
    props.content = "https://www.youtube.com/watch?v=" + props.content
    this.state = {
      form: props,
      fields: {},
      errors: {}
    }
  }
  //TODO optimize this validation and make it work for the other fields
  //https://waffle.io/devugees/digital-notice-board/cards/5ac2807897f9dd00256b555a
  onChange(field, value) {
    let data = {
      ...this.state.form
    };

    

    if ((field == "title") || (field == "description")){
      var regExp = /[a-zA-Z0-9_]+$/;
      var match = value.match(regExp);
      
      if (match) {
        this.setState({errors: { [field]: "Nice" }, fields: {[field]: false}})
      } else {
        this.setState({errors: { [field]: "No special characters" }, fields: {[field]: true}})
      }
      

     }
      if((field == "displayDate") ||  (field == "expiryDate")){
         var displayDate1 =document.getElementById("displayDate").value;
          
         
         var dis = Date.parse(displayDate1);
         console.log(dis);
          var expiryDate1 = document.getElementById("expiryDate").value;
          var exp = Date.parse(expiryDate1)   
         console.log(exp)
         if(dis > exp){

         this.setState({errors: { [field]: "please put a valid Expiry Date" }, fields: {[field]: true}})
         } else{
          this.setState({errors: { [field]: "right" }, fields: {[field]: false}})
         }
       }


    if (field == "content") {
      var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      var match = value.match(regExp);
      if (match && match[2].length == 11) {
        this.setState({errors: { [field]: "Nice" }, fields: {[field]: false}})
      } else {
        this.setState({errors: { [field]: "Doesnt look like a valid youtube link" }, fields: {[field]: true}})
      }
    }
   
    
    data[field] = value
    data[`validation_${field}`] = value
    this.setState({form: data})
  }

  render() {
    var check = undefined
    return (
      <React.Fragment>

    
     
      <FormGroup>
        <Label for="title">Title</Label>
        <Input onChange={(e) => this.onChange(e.target.id, e.target.value)} id="title" invalid={this.state.fields["title"]} valid={!this.state.fields["title"]} value={this.state.form.title}/>
          <FormFeedback>{this.state.errors["title"]}</FormFeedback>
          <FormFeedback valid>{this.state.errors["title"]}</FormFeedback>
        </FormGroup>
        
        <FormGroup>
          <Label for="description">Description</Label>
          <Input onChange={(e) => this.onChange(e.target.id, e.target.value)} id="description" invalid={this.state.fields["description"]} valid={!this.state.fields["description"]} value={this.state.form.description}/>
          <FormFeedback>{this.state.errors["description"]}</FormFeedback>
          <FormFeedback valid>{this.state.errors["description"]}</FormFeedback>
        </FormGroup>
        
        <FormGroup>
        <Label for ="displayDate">Display Date</Label>
        <Input onChange={(e) => this.onChange(e.target.id, e.target.value)} className="form-control" id="displayDate" type="date" invalid={this.state.fields["displayDate"]} valid={!this.state.fields["displayDate"]}  />
        <FormFeedback>{this.state.errors["displayDate"]}</FormFeedback>
          <FormFeedback valid>{this.state.errors["displayDate"]}</FormFeedback>
        </FormGroup>

        <FormGroup>

        <Label for= "expiryDate">Expiry Date</Label>
        <Input onChange={(e) => this.onChange(e.target.id, e.target.value)} className="form-control" id="expiryDate" type="date" value={this.state.form.expiryDate}  invalid={this.state.fields["expiryDate"]} valid={!this.state.fields["expiryDate"]}/>
        <FormFeedback>{this.state.errors["expiryDate"]}</FormFeedback>
          <FormFeedback valid>{this.state.errors["expiryDate"]}</FormFeedback>
        </FormGroup>
        
        <FormGroup>
          <Label for="content">Youtube-Link</Label>
          <Input onChange={(e) => this.onChange(e.target.id, e.target.value)} id="content" invalid={this.state.fields["content"]} valid={!this.state.fields["content"]} value={this.state.form.content}/>
          <FormFeedback>{this.state.errors["content"]}</FormFeedback>
          <FormFeedback valid>{this.state.errors["content"]}</FormFeedback>
        </FormGroup>
        
        
      </React.Fragment>
     
    );
  }
}

export default AddVideo;
