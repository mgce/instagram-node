import React from "react";

export default class LoginPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: "",
      password: ""
    };
    this.onEmailAddressHandler = this.onEmailAddressHandler.bind(this);
    this.onPasswordHandler = this.onPasswordHandler.bind(this);
  }
  onEmailAddressHandler = event => {
    this.setState({
      emailAddress: event.target.value
    });
  };
  onPasswordHandler = event => {
    this.setState({
      password: event.target.value
    });
  };
  onSubmitForm = event => {
    if (event !== undefined && event.preventDefault) event.preventDefault();
    const credentials = {
        emailAddress: this.state.emailAddress,
        password: this.state.password
    }
    this.props.lognUser(credentials);
  };
  render() {
    return (
      <form onSubmit={this.onSubmitForm}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={this.state.emailAddress}
            onChange={this.onEmailAddressHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onPasswordHandler}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}
