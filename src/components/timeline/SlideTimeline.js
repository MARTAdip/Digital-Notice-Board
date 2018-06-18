import React from "react";
import { Progress } from "reactstrap";
import "./SlideTimeline.css";

class SlideTimeline extends React.Component {
  state = {
    progress: 0
  };

  componentWillReceiveProps(nextProps) {
    clearInterval(this.interval);
    this.setState({ progress: 0 });
    this.interval = setInterval(this.progressTimer, this.convertSecondsToProgress(nextProps.time));
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  convertSecondsToProgress(time) {
    return time * 1000 / 100;
  }

  progressTimer = () => {
    this.setState(prevState => ({ progress: prevState.progress + 1 }));
  };

  render() {
    if (this.state.progress >= 100) {
      clearInterval(this.interval);
    }
    return (
      <Progress value={this.state.progress} />
    );
  }
}

export default SlideTimeline;
