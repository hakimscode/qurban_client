import { Component } from "react";
import { withRouter } from "react-router-dom";
import Axios from "axios";

export class AuthenticatedComponent extends Component {
  constructor() {
    super();
    this.API_URL = process.env.REACT_APP_API_URL + "/get_user_by_token";
    this.state = {
      user: {
        id: "",
        nama_lengkap: "",
        username: "",
        jenis_user: ""
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
        this.API_URL + "/" + jwt
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
