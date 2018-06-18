import React from 'react';
import {Form, FormGroup, Label, Input, FormFeedback} from 'reactstrap';

class AddMeetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: this.props.data,
      fields: {},
      errors: {}
    }
  }
  onChange(field, value) {
    let data = {
      ...this.state.form
    };

    data[field] = value
    this.setState({form: data})
  }

  render() {
    return (
      <Form onSubmit={e => this.props.sendChildInfo(e, this)}>

      <h1>{this.props.data._id ? "Edit" : "Add"} Meetup</h1>
      <FormGroup>
        <Label for="examplePassword">Title</Label>
        <Input onChange={(e) => this.onChange(e.target.id, e.target.value)} id="title" invalid={this.state.fields["title"]} value={this.state.form.title}/>
        <FormFeedback>{this.state.errors["title"]}</FormFeedback>
        <FormFeedback valid="valid">{this.state.errors["title"]}</FormFeedback>
      </FormGroup>

      <label>Description</label>
      <input onChange={(e) => this.onChange(e.target.id, e.target.value)} className="form-control" id="description" type="text" value={this.state.form.description}/>


      <label>Link</label>
      <input onChange={(e) => this.onChange(e.target.id, e.target.value)} className="form-control" id="description" type="text" value={this.state.form.link}/>

      <label>Display Date</label>
      <input onChange={(e) => this.onChange(e.target.id, e.target.value)} className="form-control" id="displayDate" type="date" value={this.state.form.displayDate}/>

      <label>Expiry Date</label>
      <input onChange={(e) => this.onChange(e.target.id, e.target.value)} className="form-control" id="expiryDate" type="date" value={this.state.form.expiryDate}/>

      <FormGroup>
        <Label for="examplePassword"></Label>
        <Input onChange={(e) => this.onChange(e.target.id, e.target.value)} id="content" invalid={this.state.fields["content"]} value={this.state.form.content}/>
        <FormFeedback>{this.state.errors["content"]}</FormFeedback>
        <FormFeedback valid="valid">{this.state.errors["content"]}</FormFeedback>
      </FormGroup>

      <div className="d-flex justify-content-between">
        <a href="">Delete this slide</a>
        <button type="submit" className="btn btn-primary">{this.props.data._id ? "Edit" : "Add"}</button>
      </div>
    </Form>);
  }
}
export default AddMeetup;
