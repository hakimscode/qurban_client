import React from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    ListGroup,
    ListGroupItem,
    Form,
    FormInput,
    Button
  } from "shards-react";

  import PageTitle from "../components/common/PageTitle";
import Axios from "axios";

class PengambilanQurban extends React.Component {

    constructor(props) {
        super(props);

        this.API_URL = process.env.REACT_APP_API_URL + "/penerima_qurban";

        this.state = {
            penerima_qurban: {},
            txt_no_kupon: '',

            btnProses: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.cekKupon = this.cekKupon.bind(this);
        this.proses = this.proses.bind(this);
    }

    handleChange = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
      };

    cekKupon = () => {
        const no_kupon = this.state.txt_no_kupon;

        if(no_kupon === ''){
            alert('No Kupon harus diisi');
            return false;
        }

        Axios.get(this.API_URL + '/kupon/' + no_kupon).then(res => {
            if (res.data.error){
                this.setState({penerima_qurban: {}, btnProses: ''});
                alert('Data tidak ada');
            }else{
                this.setState({penerima_qurban: res.data});
                
                const session_qurban = localStorage.getItem("session-qurban");
                const id_kelurahan = localStorage.getItem("id-kelurahan");

                if(session_qurban === "kelurahan" && 
                    this.state.penerima_qurban.id_kelurahan === parseInt(id_kelurahan) &&
                    this.state.penerima_qurban.status === 'Belum diambil')
                {
                    this.setState({btnProses: this.btnProsesComponent()})
                }else{
                    this.setState({btnProses: ''})
                }
            }
        })
    }

    proses = () => {
        Axios.get(this.API_URL + '/proses-kupon/' + this.state.penerima_qurban.id).then(res => {
            if(res.data.success){
                alert('Proses pengambilan qurban berhasil');
                let penerima_qurban_copy = Object.assign({}, this.state.penerima_qurban);
                penerima_qurban_copy.status = 'Sudah diambil';
                this.setState({penerima_qurban: penerima_qurban_copy, btnProses: ''});
            }
        });
    }

    btnProsesComponent = () => {
        return (
            <Button theme="success"
                onClick={this.proses.bind(this, this.state.penerima_qurban.id)}
            > Proses
            </Button>
        )
    }

    render(){
        return (
            <Container fluid className="main-content-container px-4">
                {/* Page Header */}
                <Row noGutters className="page-header py-4">
                <PageTitle
                    sm="4"
                    title="Pengambilan Qurban"
                    subtitle="Menu Pengambilan Qurban"
                    className="text-sm-left"
                />
                </Row>

                <Row>
                    <Col lg="4" md="12">
                        <Card small className="mb-4">
                            <CardHeader className="border-bottom">
                                <h6 className="m-0">Input No Kupon</h6>
                            </CardHeader>
                            <CardBody className="p-0">
                                <ListGroup flush>
                                    <ListGroupItem className="p-3">
                                        <Row>
                                            <Col>
                                                <Row form>
                                                <Col className="form-group">
                                                    <label htmlFor="feInputCity">No Kupon</label>
                                                    <FormInput
                                                    id="feInputCity"
                                                    placeholder="Input No Kupon"
                                                    name="txt_no_kupon"
                                                    onChange={this.handleChange.bind()}
                                                    value={this.state.txt_no_kupon}
                                                    required
                                                    />
                                                </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem className="d-flex px-3 border-0">
                                        <Button
                                        theme="accent"
                                        size="sm"
                                        className="ml-auto"
                                        onClick={this.cekKupon.bind()}
                                        >
                                        <i className="material-icons">search</i>{" "}
                                        Cek Kupon
                                        </Button>
                                    </ListGroupItem>
                                </ListGroup>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="8" md="12">
                        <Card small className="mb-8">
                            <CardHeader className="border-bottom">
                                <h6 className="m-0">Data Kupon</h6>
                            </CardHeader>
                            <CardBody className="p-0 pb-3">
                            <ListGroup flush>
                                <ListGroupItem className="p-3">
                                    <Row>
                                        <Col md="6">
                                            <label htmlFor="feInputCity">No Kupon</label>
                                            <h6 className="m-0">{this.state.penerima_qurban.no_kupon}</h6>
                                        </Col>
                                        <Col md="6">
                                            <label htmlFor="feInputCity">No KK</label>
                                            <h6 className="m-0">{this.state.penerima_qurban.no_kk}</h6>
                                        </Col>
                                    </Row>
                                    <hr></hr>
                                    <Row>
                                        <Col md="6">
                                            <label htmlFor="feInputCity">Kelurahan</label>
                                            <h6 className="m-0">{this.state.penerima_qurban.nama_kelurahan}</h6>
                                        </Col>
                                        <Col md="6">
                                            <label htmlFor="feInputCity">Tahun</label>
                                            <h6 className="m-0">{this.state.penerima_qurban.tahun}</h6>
                                        </Col>
                                    </Row>
                                    <hr></hr>
                                    <Row>
                                        <Col md="6">
                                            <label htmlFor="feInputCity">Kepala Keluarga</label>
                                            <h6 className="m-0">{this.state.penerima_qurban.kepala_kk}</h6>
                                        </Col>
                                        <Col md="6">
                                            <label htmlFor="feInputCity">Jumlah Anggota</label>
                                            <h6 className="m-0">{this.state.penerima_qurban.jumlah_anggota}</h6>
                                        </Col>
                                    </Row>
                                    <hr></hr>
                                    <Row>
                                        <Col md="6">
                                            <label htmlFor="feInputCity">Status Kupon</label>
                                            <h6 className="m-0">{this.state.penerima_qurban.status}</h6>
                                        </Col>
                                        <Col md="6">
                                            {this.state.btnProses}
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            </ListGroup>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }

}

export default PengambilanQurban;