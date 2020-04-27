import React, { Component } from "react";
import Axios from "axios";

import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
  FormGroup,
  FormInput
} from "shards-react";

export class Login extends Component {
  constructor() {
    super();

    // this.API_URL = "http://qurban.local/api/login";
    this.API_URL = "https://api.fawwazlab.com/qurban/api/login";

    this.state = {
      txt_username: "",
      txt_password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    Axios.post(this.API_URL, {
      username: this.state.txt_username,
      password: this.state.txt_password
    }).then(res => {
      alert(res.data.message);
      if (res.status === 200 && res.data.status && res.data.token) {
        localStorage.setItem("jwt-token", res.data.token);
        localStorage.setItem("session-qurban", res.data.user.jenis_user);
        localStorage.setItem("session-name", res.data.user.nama_lengkap);
        localStorage.setItem("id-kelurahan", res.data.user.id_kelurahan);
        this.props.history.push("/");
      }
    });
  };

  componentDidMount() {
    const jwt = localStorage.getItem("jwt-token");
    if (jwt) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <Col className="auth-form mx-auto my-auto" lg="3" md="6">
            <Card>
              <CardHeader className="border-bottom">
                <h4 className="text-center">LOGIN</h4>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Row>
                      <Col>
                        <Row form>
                          <Col md="12" className="form-group">
                            <label htmlFor="feInputCity">Username</label>
                            <FormInput
                              type="text"
                              name="txt_username"
                              onChange={this.handleChange}
                              value={this.state.txt_username}
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Row>
                      <Col>
                        <Row form>
                          <Col md="12" className="form-group">
                            <label htmlFor="feInputCity">Password</label>
                            <FormInput
                              type="password"
                              name="txt_password"
                              onChange={this.handleChange}
                              value={this.state.txt_password}
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Row>
                      <Col>
                        <Row form>
                          <Col md="12" className="form-group text-center">
                            <Button type="submit" className="btn btn-accent">
                              Login
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
