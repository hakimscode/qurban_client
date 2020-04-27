/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button
} from "shards-react";
import axios from "axios";

import PageTitle from "../components/common/PageTitle";
import KelurahanForm from "./KelurahanForm";

class Kelurahan extends React.Component {
  constructor(props) {
    super(props);

    this.API_URL = process.env.REACT_APP_API_URL + "/kelurahan";

    this.state = {
      kelurahan: [
        {
          id: "",
          nama_kelurahan: "",
          user_kelurahan: "",
          pass_kelurahan: "",
        }
      ],
      tmp_nama_kelurahan: "",
      tmp_user_kelurahan: "",
      tmp_pass_kelurahan: "",
      tmp_id: "",

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
      tmp_nama_kelurahan: e.target.value
    });
  };

  editClick = id_kelurahan => {
    axios.get(this.API_URL + "/" + id_kelurahan).then(res => {
      this.setState({
        tmp_id: id_kelurahan,
        tmp_nama_kelurahan: res.data.nama_kelurahan,
        value_simpan: "Edit"
      });
    });
  };

  hapusClick = id_kelurahan => {
    if (window.confirm("Anda yakin ingin menghapus data ini?")) {
      axios.get(this.API_URL + "/delete/" + id_kelurahan).then(res => {
        this.setState({
          kelurahan: [
            ...this.state.kelurahan.filter(
              kelurahan => kelurahan.id !== res.data.id
            )
          ]
        });
      });
    }
  };

  cancelClick = () => {
    this.setState({
      tmp_id: "",
      tmp_nama_kelurahan: "",
      value_simpan: "Simpan"
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.tmp_id === "") {
      axios
        .post(this.API_URL + "/insert", {
          nama_kelurahan: this.state.tmp_nama_kelurahan
        })
        .then(res => {
          if (res.status === 201) {
            this.setState({ kelurahan: [...this.state.kelurahan, res.data] });
            this.cancelClick();
          } else {
            console.log("error");
          }
        });
    } else {
      axios
        .put(this.API_URL + "/edit", {
          id: this.state.tmp_id,
          nama_kelurahan: this.state.tmp_nama_kelurahan
        })
        .then(res => {
          if (res.status === 200) {
            this.setState({
              kelurahan: this.state.kelurahan.map(row_kel => {
                if (row_kel.id === res.data.id) {
                  row_kel.nama_kelurahan = res.data.nama_kelurahan;
                }
                return row_kel;
              })
            });
            this.cancelClick();
          } else {
            console.log("error");
          }
        });
    }
  };

  form = () => {
    const session_admin = localStorage.getItem("session-qurban");
    if(session_admin !== "kecamatan"){
      return "";
    }

    return <KelurahanForm 
            data={this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            cancelClick={this.cancelClick}
          >
          </KelurahanForm>
  }

  actionData = (id=0, tag='head') => {
    const session_admin = localStorage.getItem("session-qurban");

    if(session_admin !== "kecamatan"){
      return ""
    }

    if(tag === 'head'){
      return <th scope="col" className="border-0">
        Controls
      </th>
    }else{
      return <td>
            <Button
              size="sm"
              theme="danger"
              className="mb-2 mr-1"
              id_pemberi_qurban={id}
              onClick={this.hapusClick.bind(this, id)}
            >
              Hapus
            </Button>
            <Button
              size="sm"
              theme="success"
              className="mb-2 mr-1"
              id_pemberi_qurban={id}
              onClick={this.editClick.bind(this, id)}
            >
              Edit
            </Button>
          </td>
    }
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Kelurahan"
            subtitle="Data Kelurahan"
            className="text-sm-left"
          />
        </Row>

        <Row>
          <Col lg="6" md="12">
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Data Kelurahan</h6>
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
                      {this.actionData()}
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.kelurahan.map((row, index) => (
                      <tr key={row.id}>
                        <td>{index + 1}</td>
                        <td>{row.nama_kelurahan}</td>
                        {this.actionData(row.id, 'body')}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>

          {this.form()}

        </Row>
      </Container>
    );
  }
}

export default Kelurahan;
