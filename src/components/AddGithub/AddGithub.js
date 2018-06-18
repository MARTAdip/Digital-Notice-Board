import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText
} from 'reactstrap';

class AddGithub extends React.Component {
	 state = {
    	form: this.props.data,
    	fields: {},
    	errors: {}
  }
  onChange(field, value) {
    let data = {...this.state.form};
    data[field] = value
    this.setState({form: data})
  }

  render(){
		return(
			<form onSubmit={this.props.sendChildInfo} className="AddVideo">
        		<h1>devugees-digital-notice-board</h1>
    			<FormGroup>
		          <Label for="examplePassword">Title</Label>
		          <Input
		          onChange={(e) => this.onChange(e.target.id, e.target.value)}
		          id="title" invalid={this.state.fields["title"]}
		          valid={!this.state.fields["title"]} value={this.state.form.title}/>
		          <FormFeedback>{this.state.errors["title"]}</FormFeedback>
		          <FormFeedback valid>{this.state.errors["title"]}</FormFeedback>
		        </FormGroup>

		        <label>Description</label>
		        <input
				onChange={(e) => this.onChange(e.target.id, e.target.value)}
				className="form-control" id="description"
				type="text"
				value={this.state.form.description}/>

		        <label>Display Date</label>
		        <input
		        onChange={(e) => this.onChange(e.target.id, e.target.value)}
		        className="form-control" id="displayDate"
		        type="date"
				value={this.state.form.displayDate}/>

		        <label>Expiry Date</label>
		        <input
		        onChange={(e) => this.onChange(e.target.id, e.target.value)}
		        className="form-control" id="expiryDate"
		        type="date"
		        value={this.state.form.expiryDate}/>

		        <FormGroup>
		          <Label for="examplePassword">Content</Label>
		          <Input
		          onChange={(e) => this.onChange(e.target.id, e.target.value)}
		          id="content" invalid={this.state.fields["content"]}
		          valid={!this.state.fields["content"]} value={this.state.form.content}/>
		          <FormFeedback>{this.state.errors["content"]}</FormFeedback>
		          <FormFeedback valid>{this.state.errors["content"]}</FormFeedback>
		        </FormGroup>

		        	<div className="d-flex justify-content-between">
		        		<a href="#">Delete this Link</a>
		        		<button type="submit" className="btn btn-primary">Add Github Link</button>
		        	</div>
		    </form>
		);
	}
}
export default AddGithub;
