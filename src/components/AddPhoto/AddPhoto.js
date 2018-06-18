import React from 'react';
import { Form, FormGroup, Label, Input, FormFeedback, FormText} from 'reactstrap';



class AddPhoto extends React.Component {
        constructor(props) {
            super(props);

            var props = this.props.data
            console.log(props.content.split(','));
            this.state = {
              form: props,
              fields: {},
              errors: {},
              setOfImages : props.content.split(',')
            }
        }

        onChange(field, value) {
            const form = {...this.state.form};
            console.log(field, value);
            form[field] = value;
            this.setState({form: form});
        }
        setOfImages(event){
            event.preventDefault();
            const setOfImagesCopy = {...this.state.setOfImages};
            this.setState({
                setOfImages: ["hello", "hi"]
            })

        }
        submitLocalForm(e){
          e.preventDefault()
            const form = {...this.state.form};
            console.log(form);
            // this.props.sendChildInfo(e, this)
        }

        render(props){
            return(
              <Form onSubmit={e => this.submitLocalForm(e, this)}>
                    <h1>Add Photos</h1>

                    <FormGroup >
                        <Label for="exampleText">Title</Label>
                        <Input type="text" onChange={(e) => this.onChange(e.target.id, e.target.value)} id="title" invalid={this.state.fields["title"]} valid={!this.state.fields["title"]} defaultValue={this.state.form.title} />
                        <FormFeedback>{this.state.errors["title"]}</FormFeedback>
                        <FormFeedback valid>{this.state.errors["title"]}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleText">Description</Label>
                        <Input type="text" onChange={(e) => this.onChange(e.target.id, e.target.value)} className="form-control" id="description" type="text" defaultValue={this.state.form.description} id="description" />
                    </FormGroup>
                    <FormGroup>
                            <label>Display Date</label>
                            <input onChange={(e) => this.onChange(e.target.id, e.target.value)} className="form-control" id="displayDate" type="date" defaultValue={this.state.form.displayDate}/>
                    </FormGroup>
                    <FormGroup >
                            <label>Expiry Date</label>
                            <input onChange={(e) => this.onChange(e.target.id, e.target.value)} className="form-control" id="expiryDate" type="date" defaultValue={this.state.form.expiryDate}/>
                    </FormGroup>
                    <FormGroup>
                    {this.state.setOfImages.map((item, index) => (
                      <div>
                      <Label for="examplePassword"></Label>
                      <Input className="photoarraypiece" onChange={(e) => this.onChange(e.target.id, e.target.value)} id={`photo_${index}`}  defaultValue={item}/>
                      </div>

                    ))}
                    </FormGroup>
                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-info">Save Changes</button>
                        <a href="#">Delete this Slide</a>
                        <br/>
                    </div>
                </Form>


            );
        }
}


export default AddPhoto;
