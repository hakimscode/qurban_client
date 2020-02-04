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
import PenerimaQurbanForm from "./PenerimaQurbanForm";

class PenerimaQurban extends React.Component {
  constructor(props) {
    super(props);

    this.API_URL = "https://api.fawwazlab.com/qurban/api/penerima_qurban";

    this.state = {
      penerima_qurban: [
        {
          id: "",
          no_kk: "",
          kepala_kk: "",
          id_kelurahan: "",
          nama_kelurahan: "",
          alamat: "",
          jumlah_anggota: ""
        }
      ],

      kelurahan: [
        {
          id: "",
          nama_kelurahan: ""
        }
      ],

      txt_no_kk: "",
      txt_kepala_kk: "",
      txt_id_kelurahan: "",
      txt_alamat: "",
      txt_jumlah_anggota: "",
      txt_id: "",

      value_simpan: "Simpan"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
  }

  componentDidMount() {
    axios.get(this.API_URL).then(res => {
      this.setState({ penerima_qurban: res.data });
    });

    axios.get("https://api.fawwazlab.com/qurban/api/kelurahan").then(res => {
      this.setState({ kelurahan: res.data });
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  editClick = id_penerima_qurban => {
    axios.get(this.API_URL + "/" + id_penerima_qurban).then(res => {
      this.setState({
        txt_id: id_penerima_qurban,
        txt_no_kk: res.data.no_kk,
        txt_kepala_kk: res.data.kepala_kk,
        txt_id_kelurahan: res.data.id_kelurahan,
        txt_alamat: res.data.alamat,
        txt_jumlah_anggota: res.data.jumlah_anggota,
        value_simpan: "Edit"
      });
    });
  };

  hapusClick = id_penerima_qurban => {
    if (window.confirm("Anda yakin ingin menghapus data ini?")) {
      axios.get(this.API_URL + "/delete/" + id_penerima_qurban).then(res => {
        this.setState({
          penerima_qurban: [
            ...this.state.penerima_qurban.filter(
              penerima_qurban => penerima_qurban.id !== res.data.id
            )
          ]
        });
      });
    }
  };

  cancelClick = () => {
    this.setState({
      txt_id: "",
      txt_no_kk: "",
      txt_kepala_kk: "",
      txt_id_kelurahan: "",
      txt_alamat: "",
      txt_jumlah_anggota: "",
      value_simpan: "Simpan"
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.txt_id === "") {
      // console.log(this.state);

      axios
        .post(this.API_URL + "/insert", {
          no_kk: this.state.txt_no_kk,
          kepala_kk: this.state.txt_kepala_kk,
          id_kelurahan: this.state.txt_id_kelurahan,
          alamat: this.state.txt_alamat,
          jumlah_anggota: this.state.txt_jumlah_anggota
        })
        .then(res => {
          if (res.status === 200) {
            this.setState({
              penerima_qurban: [...this.state.penerima_qurban, res.data]
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
          no_kk: this.state.txt_no_kk,
          kepala_kk: this.state.txt_kepala_kk,
          id_kelurahan: this.state.txt_id_kelurahan,
          alamat: this.state.txt_alamat,
          jumlah_anggota: this.state.txt_jumlah_anggota
        })
        .then(res => {
          if (res.status === 200) {
            this.setState({
              penerima_qurban: this.state.penerima_qurban.map(row => {
                if (row.id === res.data.id) {
                  row.no_kk = res.data.no_kk;
                  row.kepala_kk = res.data.kepala_kk;
                  row.id_kelurahan = res.data.id_kelurahan;
                  row.nama_kelurahan = res.data.nama_kelurahan;
                  row.alamat = res.data.alamat;
                  row.jumlah_anggota = res.data.jumlah_anggota;
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

  form = () => {
    const session_admin = localStorage.getItem("session-qurban");
    if(session_admin !== "admin"){
      return "";
    }

    return <PenerimaQurbanForm 
            data={this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            cancelClick={this.cancelClick}
          >
          </PenerimaQurbanForm>
  }

  actionData = (id=0, tag='head') => {
    const session_admin = localStorage.getItem("session-qurban");

    if(session_admin !== "admin"){
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
            title="Penerima Qurban"
            subtitle="Data Penerima Qurban"
            className="text-sm-left"
          />
        </Row>

        {this.form()}

        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Data Penerima Qurban</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        #
                      </th>
                      <th scope="col" className="border-0">
                        No KK
                      </th>
                      <th scope="col" className="border-0">
                        Kepala Keluarga
                      </th>
                      <th scope="col" className="border-0">
                        Kelurahan
                      </th>
                      <th scope="col" className="border-0">
                        Alamat
                      </th>
                      <th scope="col" className="border-0">
                        Jumlah Anggota
                      </th>
                      {this.actionData()}
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.penerima_qurban.map((row, index) => (
                      <tr key={row.id}>
                        <td>{index + 1}</td>
                        <td>{row.no_kk}</td>
                        <td>{row.kepala_kk}</td>
                        <td>{row.nama_kelurahan}</td>
                        <td>{row.alamat}</td>
                        <td>{row.jumlah_anggota}</td>
                        {this.actionData(row.id, 'body')}
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

export default PenerimaQurban;
