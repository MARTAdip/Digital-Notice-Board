import React, { Component } from 'react';


 const style = {
  //display: 'inline-block',
  //padding: '10rem',
  //textAlign: 'center',
  //margin: '3px',
  //border: '1px solid black',
  //position:"absolute",
  //right:"1.2rem",
  //top:"1.2rem"

    };

  const style2={
    border:'1px solid black'
  };

  const style3={
   //position:"absolute",
   //right:"0",
   //top:"0"
  }

class SildeDetail extends Component {
    render(props) {
        return (
          <div>
          <a style={style3} href="#" >Logout</a>
            <div style={style}>
              <h1>Silde Details</h1><br/>
              <p><strong>Title</strong></p>
              <input type="text" className="form-control" value={this.props.type}/>
              <p><strong>Description</strong></p>
              <input type="text" className="form-control" value={this.props.description}/>
              <p><strong>DisplayDate</strong></p>
              <input type="text" className="form-control" value={this.props.displayDate}/>
              <p><strong>ExpiryDate</strong></p>
              <input type="text" className="form-control" value={this.props.expiryDate}/>
              <p><strong>YoutubeCode</strong></p>
              <input className="form-control" value={this.props.youtubeCode} />
              <a href="#"> Delete this Silde</a><br/>
              <button className="btn btn-primary"> save changeas</button>
            </div>
          </div>
        );
    }
}
export default SildeDetail;
