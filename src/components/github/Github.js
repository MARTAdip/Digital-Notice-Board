import React from 'react';
import Spinner from '../Spinner/Spinner';
import './style.css';
import { Media, ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { DATACACHE } from "../../constants/misc.js";
const moment = require('moment');

class Github extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      commits: {},
      issues: {},
      loading: true
    }
  }

  componentDidMount() {
    if (localStorage.getItem('github-data') && JSON.parse(localStorage.getItem('github-data')).timestamp + DATACACHE > Date.now()){
      console.log("github data from local database");
      this.setState({timestamp: Date.now(), commits: JSON.parse(localStorage.getItem('github-data')).commits, issues: JSON.parse(localStorage.getItem('github-data')).issues, loading: false})
      let newtime = JSON.parse(localStorage.getItem('github-data'))
      newtime.timestamp = Date.now()
      localStorage.setItem('github-data', JSON.stringify(newtime))
    }
    fetch(`https://api.github.com/repos/${this.props.data.content}/commits`).then(resp => resp.json()).then((commits) => {
      commits = commits.filter(f => !f.commit.message.includes("Merge"))
      fetch(`https://api.github.com/repos/${this.props.data.content}/issues`).then(resp => resp.json()).then((issues) => {
        this.setState({commits: commits, issues: issues, loading: false})
        localStorage.setItem('github-data', JSON.stringify({timestamp: Date.now(), commits: commits, issues: issues}))
      })
      .catch(err => {
        console.log("Error: ", err)
      });
    })
    .catch(err => {
      console.log("Error: ", err)
    });
  }

  render() {
  let commits = ""
  let issues = ""
    if (this.state.commits.length > 0) {
      console.log(this.state.commits);
      commits = this.state.commits.map((item, value) => (
        <ListGroupItem className="py-1" color={item.state === "closed" ? "success" : ""}>
            <Media>
              <Media left href="#">
                <Media object className="mr-1 mt-1 w-3 rounded-circle" src={item.author.avatar_url} alt="Generic placeholder image" />
              </Media>
              <Media body>
                <Media heading>
                <span>{ item.author.login}
                <small className="text-muted"> - {moment( item.commit.author.date , "YYYYMMDD").fromNow() }</small>
                </span>
                </Media>
                <span  className="">{item.commit.message} - </span>

              </Media>
            </Media>

        </ListGroupItem>
      ))
    }
    if (this.state.issues.length > 0) {
      console.log(this.state.issues);
      issues = this.state.issues.map((item, value) => (
        <ListGroupItem className="py-1" color={item.state === "closed" ? "success" : ""}>
            <Media>

            <Media left href="#">
            <Media object className="mr-1 mt-1 w-3 rounded-circle" src={item.assignee !== null ? item.assignee.avatar_url : "https://api.adorable.io/avatars/285/abott@adorable"} alt="Generic placeholder image" />
            </Media>
              <Media body>
                <Media heading>
                <span>{item.title}
                <small className="text-muted"> - {moment( item.created_at , "YYYYMMDD").fromNow() + " - " + item.assignees.map(a =>  a.login ).join(", ") }</small>
                </span>
                </Media>
                {item.body}
              </Media>
            </Media>

        </ListGroupItem>

      ))
    }
    return (
      <div className="h-100">
        {this.state.loading
          ? <Spinner />
           : <div className="d-flex flex-column h-100">
           <h2>Commits:</h2>
             <div className="h-50 overflowy-scroll">
               <ListGroup className="p-3">
                  {commits}
                </ListGroup>
                </div>
                <h2>Issues:</h2>
              <div className="h-50 overflowy-scroll">
                <ListGroup className="p-3">
                  {issues}
                </ListGroup>
              </div>
            </div>
        }
      </div>
    );
  }

}

export default Github;
