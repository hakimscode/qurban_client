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
  FormSelect,
  ListGroup,
  ListGroupItem
} from "shards-react";
import axios from "axios";

import PageTitle from "../components/common/PageTitle";

class UserKelurahan extends React.Component {
  constructor(state) {
    super(state);

    this.API_URL = process.env.REACT_APP_API_URL + "/user_kelurahan";
    this.API_URL_KEL = process.env.REACT_APP_API_URL + "/kelurahan";

    this.state = {
      user_kelurahan: [
        {
          id: "",
          nama_lengkap: "",
          username: "",
          id_kelurahan: "",
          nama_kelurahan: "",
        }
      ],

      kelurahan: [
        {
          id: "",
          nama_kelurahan: ""
        }
      ],

      txt_nama_lengkap: "",
      txt_username: "",
      txt_id_kelurahan: "",
      txt_password: "",
      txt_id: "",

      value_simpan: "Simpan"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
  }

  componentDidMount() {
    axios.get(this.API_URL).then(res => {
      this.setState({ user_kelurahan: res.data });
    });

    axios.get(this.API_URL_KEL).then(res => {
      this.setState({ kelurahan: res.data });
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  editClick = id_user_kelurahan => {
    axios.get(this.API_URL + "/" + id_user_kelurahan).then(res => {
      this.setState({
        txt_id: id_user_kelurahan,
        txt_no_ktp: res.data.no_ktp,
        txt_nama: res.data.nama,
        txt_alamat: res.data.alamat,
        txt_id_kelurahan: res.data.id_kelurahan,
        txt_jumlah_qurban: res.data.jumlah_qurban,
        txt_keterangan: res.data.keterangan,
        value_simpan: "Edit"
      });
    });
  };

  hapusClick = id_user_kelurahan => {
    if (window.confirm("Anda yakin ingin menghapus data ini?")) {
      axios.get(this.API_URL + "/delete/" + id_user_kelurahan).then(res => {
        this.setState({
          user_kelurahan: [
            ...this.state.user_kelurahan.filter(
              user_kelurahan => user_kelurahan.id !== res.data.id
            )
          ]
        });
      });
    }
  };

  cancelClick = () => {
    this.setState({
      txt_id: "",
      txt_nama_lengkap: "",
      txt_username: "",
      txt_id_kelurahan: "",
      txt_password: "",
      value_simpan: "Simpan"
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.txt_id === "") {
      // console.log(this.state);

      axios
        .post(this.API_URL, {
          nama_lengkap: this.state.txt_nama_lengkap,
          username: this.state.txt_username,
          password: this.state.txt_password,
          id_kelurahan: this.state.txt_id_kelurahan
        })
        .then(res => {
          if (res.status === 200) {
            this.setState({
              user_kelurahan: [...this.state.user_kelurahan, res.data]
            });
            this.cancelClick();
          } else {
            console.log("error");
          }
        });
    } else {
      axios
        .put(this.API_URL + "/edit", {
          id: this.state.txt_id,
          no_ktp: this.state.txt_no_ktp,
          nama: this.state.txt_nama,
          alamat: this.state.txt_alamat,
          id_kelurahan: this.state.txt_id_kelurahan,
          jumlah_qurban: this.state.txt_jumlah_qurban,
          keterangan: this.state.txt_keterangan
        })
        .then(res => {
          if (res.status === 200) {
            this.setState({
              user_kelurahan: this.state.user_kelurahan.map(row => {
                if (row.id === res.data.id) {
                  row.no_ktp = res.data.no_ktp;
                  row.nama = res.data.nama;
                  row.alamat = res.data.alamat;
                  row.id_kelurahan = res.data.id_kelurahan;
                  row.nama_kelurahan = res.data.nama_kelurahan;
                  row.jumlah_qurban = res.data.jumlah_qurban;
                  row.keterangan = res.data.keterangan;
                }
                return row;
              })
            });
            this.cancelClick();
          } else {
            console.log("error");
          }
        });
    }
  };

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Data User Kelurahan"
            subtitle="User Kelurahan"
            className="text-sm-left"
          />
        </Row>

        <Row>
            <Col>
            <Card small className="mb-4">
                <CardHeader className="border-bottom">
                <h6 className="m-0">Form User Kelurahan</h6>
                </CardHeader>

                <CardBody className="p-0">
                <ListGroup flush>
                    <Form onSubmit={this.handleSubmit}>
                    <ListGroupItem className="p-3">
                        <Row>
                        <Col>
                            <Row form>
                            <Col md="6" className="form-group">
                                <label htmlFor="feInputCity">Kelurahan</label>
                                <FormSelect
                                id="feInputState"
                                placeholder="Pilih Kelurahan"
                                name="txt_id_kelurahan"
                                onChange={this.handleChange}
                                value={this.state.txt_id_kelurahan}
                                required
                                >
                                <option value="">-- pilih kelurahan --</option>
                                {this.state.kelurahan.map(row_kel => (
                                    <option key={row_kel.id} value={row_kel.id}>
                                    {row_kel.nama_kelurahan}
                                    </option>
                                ))}
                                </FormSelect>
                            </Col>
                            <Col md="6" className="form-group">
                                <label htmlFor="feInputCity">Nama Lengkap</label>
                                <FormInput
                                id="feInputCity"
                                placeholder="Input Nama Lengkap User"
                                name="txt_nama_lengkap"
                                onChange={this.handleChange}
                                value={this.state.txt_nama_lengkap}
                                required
                                />
                            </Col>
                            </Row>
                            <Row form>
                            <Col md="6" className="form-group">
                                <label htmlFor="feInputCity">Username</label>
                                <FormInput
                                id="feInputCity"
                                placeholder="Input Username Login"
                                name="txt_username"
                                onChange={this.handleChange}
                                value={this.state.txt_username}
                                required
                                />
                            </Col>
                            <Col md="6" className="form-group">
                                <label htmlFor="feInputCity">
                                Password
                                </label>
                                <FormInput
                                type="password"
                                id="feInputCity"
                                placeholder="Input Password Login"
                                name="txt_password"
                                onChange={this.handleChange}
                                value={this.state.txt_password}
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
                        onClick={this.state.cancelClick}
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

        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Data Pemberi Qurban</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        #
                      </th>
                      <th scope="col" className="border-0">
                        Kelurahan
                      </th>
                      <th scope="col" className="border-0">
                        Nama Lengkap
                      </th>
                      <th scope="col" className="border-0">
                        Username
                      </th>
                      <th scope="col" className="border-0">
                          Controls
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.user_kelurahan.map((row, index) => (
                      <tr key={row.id}>
                        <td>{index + 1}</td>
                        <td>{row.nama_kelurahan}</td>
                        <td>{row.nama_lengkap}</td>
                        <td>{row.username}</td>
                        <td>
                            <Button
                            size="sm"
                            theme="danger"
                            className="mb-2 mr-1"
                            id_user_kelurahan={row.id}
                            onClick={this.hapusClick.bind(this, row.id)}
                            >
                            Hapus
                            </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default UserKelurahan;
