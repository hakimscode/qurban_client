import { Component } from "react";
import { withRouter } from "react-router-dom";
import Axios from "axios";

export class AuthenticatedComponent extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        id: "",
        nama_lengkap: "",
        username: ""
      },
      username: null,
      password: null
    };
  }

  componentDidMount() {
    const jwt = localStorage.getItem("jwt-token");
    if (!jwt) {
      this.props.history.push("/login");
    } else {
      Axios.get(
        "https://api.fawwazlab.com/qurban/api/get_user_by_token/" + jwt
      ).then(res => {
        this.setState({ user: res.data });
        // console.log(this.state.user);
      });
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(AuthenticatedComponent);
