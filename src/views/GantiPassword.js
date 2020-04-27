/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
  Form,
  FormInput,
  ListGroup,
  ListGroupItem
} from "shards-react";
import axios from "axios";

import PageTitle from "../components/common/PageTitle";

class GantiPassword extends React.Component {
  constructor(props) {
    super(props);

    this.API_URL = process.env.REACT_APP_API_URL + "/ganti_password";

    this.state = {
      tmp_old_password: "",
      tmp_new_password: "",
      tmp_confirm_new_password: "",
      tmp_token: localStorage.getItem('jwt-token'),

      value_simpan: "Simpan"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
  }

  componentDidMount() {
    axios.get(this.API_URL).then(res => {
      this.setState({ kelurahan: res.data });
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  cancelClick = () => {
    this.setState({
      tmp_old_password: "",
      tmp_user_kelurahan: "",
      tmp_pass_kelurahan: "",
      value_simpan: "Simpan"
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if(this.state.tmp_new_password !== this.state.tmp_confirm_new_password){
        alert('Konfirmasi Password Baru Tidak Cocok');
        return false;
    }
    axios
    .post(this.API_URL, {
        token: this.state.tmp_token,
        old_password: this.state.tmp_old_password,
        new_password: this.state.tmp_new_password
    })
    .then(res => {
        if (res.status === 200) {
            alert(res.data.message);
            if(res.data.status){
                localStorage.removeItem("jwt-token");
                localStorage.removeItem("session-qurban");
                localStorage.removeItem("session-name");
                localStorage.removeItem("id-kelurahan");
                this.props.history.push("/login");
            }
        } else {
            console.log("error");
        }
    });
  };

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Ganti Password"
            subtitle="Ganti Password Login"
            className="text-sm-left"
          />
        </Row>

        <Row>

        <Col lg="6" md="12">
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">Form Ganti Password</h6>
          </CardHeader>

          <CardBody className="p-0">
            <ListGroup flush>
              <Form onSubmit={this.handleSubmit}>
                <ListGroupItem className="p-3">
                  <Row>
                    <Col>
                      <Row form>
                        <Col md="12" className="form-group">
                          <label htmlFor="feInputCity">Password Lama</label>
                          <FormInput
                            id="feInputCity"
                            placeholder="Input Password Lama"
                            onChange={this.handleChange}
                            name="tmp_old_password"
                            value={this.state.tmp_old_password}
                            type="password"
                            required
                          />
                        </Col>
                      </Row>
                      <Row form>
                        <Col md="12" className="form-group">
                          <label htmlFor="feInputCity">Password Baru</label>
                          <FormInput
                            id="feInputCity"
                            placeholder="Input Password Baru"
                            onChange={this.handleChange}
                            name="tmp_new_password"
                            value={this.state.tmp_new_password}
                            type="password"
                            required
                          />
                        </Col>
                      </Row>
                      <Row form>
                        <Col md="12" className="form-group">
                          <label htmlFor="feInputCity">Konfirmasi Password Baru</label>
                          <FormInput
                            id="feInputCity"
                            placeholder="Input Konfirmasi Password Baru"
                            onChange={this.handleChange}
                            name="tmp_confirm_new_password"
                            value={this.state.tmp_confirm_new_password}
                            type="password"
                            required
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem className="d-flex px-3 border-0">
                  <Button
                    outline
                    theme="accent"
                    size="sm"
                    onClick={this.cancelClick}
                  >
                    <i className="material-icons">cancel</i> Cancel
                  </Button>
                  <Button
                    type="submit"
                    theme="accent"
                    size="sm"
                    className="ml-auto"
                  >
                    <i className="material-icons">save</i>{" "}
                    {this.state.value_simpan}
                  </Button>
                </ListGroupItem>
              </Form>
            </ListGroup>
          </CardBody>
        </Card>
      </Col>

        </Row>
      </Container>
    );
  }
}

export default GantiPassword;
