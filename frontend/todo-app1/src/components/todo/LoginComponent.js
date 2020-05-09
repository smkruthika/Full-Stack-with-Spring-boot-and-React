import React, {Component} from 'react';
import AuthenticationService from './AuthenticationService';

class LoginComponent extends Component {
    constructor(props) {
          super(props);
          this.state = {
              userName: '',
              password: '',
              success: false,
              failed: false
          }
          this.changeValues = this.changeValues.bind(this);
          this.submitForm = this.submitForm.bind(this);
      }
  
      changeValues(event) {
          this.setState({
              [event.target.name]: event.target.value
          })
      }
  
      submitForm() {
        /// JWT auth service
        console.log(this.state.userName, this.state.password)
        AuthenticationService.executeJWTAuthenticationService(this.state.userName, this.state.password)
        .then(response => {
            AuthenticationService.registerSuccessfulLoginForJWT(this.state.userName, response.data.token)
            this.props.history.push(`/welcome/${this.state.userName}`);
        })
        .catch(() =>{
            this.setState({failed: true, success: false});
        })


        // baasic auth service
        //   AuthenticationService.executeBasicAuthenticationService(this.state.userName, this.state.password)
        //   .then(response => {
        //     AuthenticationService.registerSuccessfulLogin(this.state.userName, this.state.password);
        //     this.props.history.push(`/welcome/${this.state.userName}`);
        //   })
        //   .catch(() =>{
        //     this.setState({failed: true, success: false});
        //   })





        //   if (this.state.userName === 'kru' && this.state.password === 'kruthika') {
        //       AuthenticationService.registerSuccessfulLogin(this.state.userName, this.state.password);
        //       this.props.history.push(`/welcome/${this.state.userName}`);
        //   } else {
        //       this.setState({failed: true, success: false});
        //   }
      }
  
      render(){
          return (
              <div>
                  <h1>Login</h1>
                  <div className="container">
                      {this.state.success && "Successfull"}
                      {this.state.failed && <div className="alert">  "Invalid credentials"</div>}
                      UserName : <input type="text" value={this.state.userName} name="userName" onChange={this.changeValues} />
                      Password: <input type="password" value={this.state.password} name="password" onChange={this.changeValues} />
                      <button onClick={this.submitForm}>Login</button>
                  </div>
              </div>
          )
    }
}
export default LoginComponent;