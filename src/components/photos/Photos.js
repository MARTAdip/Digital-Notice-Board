import React from 'react';
import './Photos.css';
import '../../../node_modules/animate.css/animate.min.css'
import {PROGRESS_BAR_SPEED} from "../../constants/misc.js";

class Photos extends React.Component {
  state = {
    images: this.props.data.content.split(','),
    active: this.props.data.content.split(',')[0]
  }
  componentWillReceiveProps(nextProps) {
  if (this.props.data !== nextProps.data) {
    this.setState({
      images: nextProps.data.content.split(','),
      active: nextProps.data.content.split(',')[0]

    });
  }
  }
  componentDidMount() {
    console.log(PROGRESS_BAR_SPEED / this.state.images.length);
    clearInterval(this.timerID);
    // when slide is video, wait for videoEndinghandler instead
    // if (this.state.currentSlide.type === "video") return;
    let i = 0;
    this.timerID = setInterval(() => {
      i++;
      if(this.state.images[i] === undefined){
        i = 0;
      }
      this.setState({active: this.state.images[i]})
    }, PROGRESS_BAR_SPEED / this.state.images.length * 1000);
  }
  componentWillUnmount() {
    console.log("out!!!!");
    clearInterval(this.timerID);
  }

  render() {
    var images = this.props.data.content.split(',');
    return (<div className="splinter h-100">
      <div className=" d-flex flex-column h-100">
      <div className="h-75">
        <img className="w-100" src={this.state.active} alt=""/>
      </div>
      <div className="d-flex h-25 pt-2 pb-4 align-items-end ">
        {
          images.map((slide, index) => <div className={"p-2 splinter " + (
              this.state.active === slide
              ? " blue"
              : "")}>
                <img width="150" className="  " key={index} id={index} src={slide} alt={this.state.active}/>
          </div>)
        }

      </div>
      </div>

    </div>);
  }
}

export default Photos;
