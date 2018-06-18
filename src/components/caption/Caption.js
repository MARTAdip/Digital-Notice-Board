import React, { Component } from 'react';



class Caption extends Component {

	render(){

		return(
			<div className="p-3">
			<h3>{this.props.data.title}</h3>
			<p>{this.props.data.desc}</p>
			</div>
		);
	}	
}

export default Caption;