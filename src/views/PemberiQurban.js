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
} from "shards-react";
import axios from "axios";

import PageTitle from "../components/common/PageTitle";
import PemberiQurbanForm from "./PemberiQurbanForm";

class PemberiQurban extends React.Component {
  constructor(props) {
    super(props);

    this.API_URL = "https://api.fawwazlab.com/qurban/api/pemberi_qurban";

    this.state = {
      pemberi_qurban: [
        {
          id: "",
          no_ktp: "",
          nama: "",
          alamat: "",
          id_kelurahan: "",
          nama_kelurahan: "",
          jumlah_qurban: "",
          keterangan: ""
        }
      ],

      kelurahan: [
        {
          id: "",
          nama_kelurahan: ""
        }
      ],

      txt_no_ktp: "",
      txt_nama: "",
      txt_alamat: "",
      txt_id_kelurahan: "",
      txt_jumlah_qurban: "",
      txt_keterangan: "",
      txt_id: "",

      value_simpan: "Simpan"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
  }

  componentDidMount() {
    axios.get(this.API_URL).then(res => {
      this.setState({ pemberi_qurban: res.data });
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

  editClick = id_pemberi_qurban => {
    axios.get(this.API_URL + "/" + id_pemberi_qurban).then(res => {
      this.setState({
        txt_id: id_pemberi_qurban,
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

  hapusClick = id_pemberi_qurban => {
    if (window.confirm("Anda yakin ingin menghapus data ini?")) {
      axios.get(this.API_URL + "/delete/" + id_pemberi_qurban).then(res => {
        this.setState({
          pemberi_qurban: [
            ...this.state.pemberi_qurban.filter(
              pemberi_qurban => pemberi_qurban.id !== res.data.id
            )
          ]
        });
      });
    }
  };

  cancelClick = () => {
    this.setState({
      txt_id: "",
      txt_no_ktp: "",
      txt_nama: "",
      txt_alamat: "",
      txt_id_kelurahan: "",
      txt_jumlah_qurban: "",
      txt_keterangan: "",
      value_simpan: "Simpan"
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.txt_id === "") {
      // console.log(this.state);

      axios
        .post(this.API_URL + "/insert", {
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
              pemberi_qurban: [...this.state.pemberi_qurban, res.data]
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
              pemberi_qurban: this.state.pemberi_qurban.map(row => {
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

  form = () => {
    const session_admin = localStorage.getItem("session-qurban");
    if(session_admin !== "admin"){
      return "";
    }

    return <PemberiQurbanForm 
            data={this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            cancelClick={this.cancelClick}
          >
          </PemberiQurbanForm>
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
            title="Pemberi Qurban"
            subtitle="Data Pemberi Qurban"
            className="text-sm-left"
          />
        </Row>

        {this.form()}

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
                        No KTP
                      </th>
                      <th scope="col" className="border-0">
                        Nama
                      </th>
                      <th scope="col" className="border-0">
                        Alamat
                      </th>
                      <th scope="col" className="border-0">
                        Kelurahan
                      </th>
                      <th scope="col" className="border-0">
                        Jumlah Qurban (kg)
                      </th>
                      <th scope="col" className="border-0">
                        Keterangan
                      </th>
                      {this.actionData()}
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.pemberi_qurban.map((row, index) => (
                      <tr key={row.id}>
                        <td>{index + 1}</td>
                        <td>{row.no_ktp}</td>
                        <td>{row.nama}</td>
                        <td>{row.alamat}</td>
                        <td>{row.nama_kelurahan}</td>
                        <td>{row.jumlah_qurban}</td>
                        <td>{row.keterangan}</td>
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

export default PemberiQurban;
