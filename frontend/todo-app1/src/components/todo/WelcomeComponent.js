import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import HelloWorldService from '../../api/todo/HelloWorldService';

class WelcomeComponent extends Component {
    constructor(props) {
        super(props);
        this.getWElcomeMsg = this.getWElcomeMsg.bind(this);
        this.handleSuccessMsg = this.handleSuccessMsg.bind(this);
        this.handleErrorMsg = this.handleErrorMsg.bind(this);
        this.state= {
            welcomeMsg: ''
        }
    }

    getWElcomeMsg() {
        HelloWorldService.executeHelloWorldPathService(this.props.match.params.name)
        .then(response => this.handleSuccessMsg(response))
        .catch(error => this.handleErrorMsg(error))
    }

    handleSuccessMsg(response) {
        this.setState({
            welcomeMsg: response.data.message
        })
    }

    handleErrorMsg(error) {
        let errMsg = error.message ? error.message : '';
        if (error.response && error.response.data && error.response.data.message) {
            errMsg += error.response.data.message;
        }
        this.setState({
            welcomeMsg: errMsg
        })
    }

    render () {
      return (
          <div>
              <h1>Welcome!!</h1>
              <div className="container">
                   Welcome {this.props.match.params.name}. You can manage your <Link to="/todos">here</Link>
              </div>
              <div className="container">
                    Click here to get customized message
                    <button className="btn btn-success" onClick={this.getWElcomeMsg}>Click</button>
              </div>
              <div className="container">
                    {this.state.welcomeMsg}
              </div>
          </div>
      )
    }
}

export default WelcomeComponent;