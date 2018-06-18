import React, { Component } from 'react';
import { Form, Button, FormGroup, Label, Input} from 'reactstrap';


class Search extends Component {

  render() {
    return (
      <Form inline className="mt-4 mb-2 mx-auto"> 
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label check className="mb-2 mr-sm-2">
            <Input type="checkbox" onChange={this.props.handleSearchCheckbox}/> Show also expired sildes
          </Label>
        <Input 
        type="search" 
        name="search" 
        id="exampleSearch" 
        placeholder="" 
        value={this.props.searchData} 
        onChange={this.props.handleSearchInput} 
        />
        </FormGroup>
          <Button color="primary">Search</Button>
        </Form>
    );   
  }
}

export default Search;
