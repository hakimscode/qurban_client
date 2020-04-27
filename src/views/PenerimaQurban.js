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

    this.URL_KUPON = process.env.REACT_APP_BASE_URL + "/kupon.html";
    this.API_URL = process.env.REACT_APP_API_URL + "/penerima_qurban";
    this.API_URL_KEL = process.env.REACT_APP_API_URL + "/kelurahan";

    this.state = {
      penerima_qurban: [
        {
          id: "",
          no_kk: "",
          kepala_kk: "",
          id_kelurahan: "",
          nama_kelurahan: "",
          alamat: "",
          jumlah_anggota: "",
          tahun: "",
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
      txt_tahun: "",
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

    axios.get(this.API_URL_KEL).then(res => {
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
        txt_tahun: res.data.tahun,
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
      txt_tahun: "",
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
          jumlah_anggota: this.state.txt_jumlah_anggota,
          tahun: this.state.txt_tahun
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
          jumlah_anggota: this.state.txt_jumlah_anggota,
          tahun: this.state.txt_tahun
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
    const session_qurban = localStorage.getItem("session-qurban");
    if(session_qurban === "umum"){
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

  kupon = (row) => {
    const session_qurban = localStorage.getItem("session-qurban");
    const id_kelurahan = localStorage.getItem("id-kelurahan");

    if(session_qurban === "kelurahan" && row.id_kelurahan == parseInt(id_kelurahan)){
      const url = `${this.URL_KUPON}?kelurahan=${row.nama_kelurahan}&no_kk_penerima=${row.no_kk}&nama_penerima=${row.kepala_kk}`;
      return <td>
          <a href={url}
            target="_blank"
            title="Klik untuk mencetak Kupon"
          >
            {row.no_kk}
          </a>
        </td>
    }
    
    return <td>{row.no_kk}</td>
  }

  actionData = (id=0, id_kel=0, tag='head') => {
    const session_qurban = localStorage.getItem("session-qurban");
    const id_kelurahan = localStorage.getItem("id-kelurahan");

    if(tag === 'head'){
      if(session_qurban === "umum") return "";
      return <th scope="col" className="border-0">
        Controls
      </th>
    }else{
      if(session_qurban === "umum") return "";
      if(session_qurban === "kelurahan" && id_kel != parseInt(id_kelurahan)) return <td></td>;
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
                        Tahun
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
                        {this.kupon(row)}
                        <td>{row.kepala_kk}</td>
                        <td>{row.nama_kelurahan}</td>
                        <td>{row.tahun}</td>
                        <td>{row.alamat}</td>
                        <td>{row.jumlah_anggota}</td>
                        {this.actionData(row.id, row.id_kelurahan, 'body')}
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
