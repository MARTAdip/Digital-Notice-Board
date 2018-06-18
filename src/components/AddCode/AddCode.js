import React from "react";
import { Form, FormGroup, Label, Input, FormFeedback, FormText } from "reactstrap";

class AddCode extends React.Component {
  constructor(props) {
    super(props);
    var props = this.props.data;
    props.displayDate = props.displayDate ? props.displayDate.slice(0, -14) : props.displayDate;
    props.expiryDate = props.expiryDate ? props.expiryDate.slice(0, -14) : props.expiryDate;
    this.state = {
      form: this.props.data,
      fields: {},
      errors: {}
    };
  }

  // new lifecycle method. Called when receiving new props.
  // here: updates state with formdata if new props are different from previous state
  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (nextProps.data === prevState.data) return null;
    else return { form: nextProps.data };
  };

  //TODO optimize this validation and make it work for the other fields
  //https://waffle.io/devugees/digital-notice-board/cards/5ac2807897f9dd00256b555a
  onChange(field, value) {
    let data = { ...this.state.form };
    data[field] = value;
    this.setState({ form: data });
  }

  render() {
    return (
      <Form onSubmit={e => this.props.sendChildInfo(e, this)}>
        <h1>{this.props.data._id ? "Edit Slide" : "Add Slide"}</h1>
        <FormGroup>
          <Label for="examplePassword">Title</Label>
          <Input id="title" value={this.state.form.title} onChange={(e) => this.onChange(e.target.id, e.target.value)} />
        </FormGroup>
        <FormGroup>
          <label>Description</label>
          <input
            className="form-control"
            id="description"
            type="text"
            value={this.state.form.description}
            onChange={(e) => this.onChange(e.target.id, e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label>Display Date</label>
          <input
            className="form-control"
            id="displayDate"
            type="date"
            value={this.state.form.displayDate}
            onChange={(e) => this.onChange(e.target.id, e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label>Expiry Date</label>
          <input
            className="form-control"
            id="expiryDate"
            type="date"
            value={this.state.form.expiryDate}
            onChange={(e) => this.onChange(e.target.id, e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Code Snippet</Label>
          <Input id="content" type="textarea" value={this.state.form.content} onChange={(e) => this.onChange(e.target.id, e.target.value)}/>
        </FormGroup>
        <div className="d-flex justify-content-between">
          <a className="text-muted" href="#">
            Delete this Slide
          </a>
          <button type="submit" className="btn btn-primary">
            {this.props.data._id ? "Edit" : "Add"}
          </button>
        </div>
      </Form>
    );
  }
}

export default AddCode;
