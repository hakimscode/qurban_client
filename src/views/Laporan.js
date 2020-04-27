import React from "react";
import { 
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    ListGroup,
    Form,
    ListGroupItem,
    FormSelect,
    FormInput,
    FormCheckbox,
    Button
} from "shards-react";
import PageTitle from "../components/common/PageTitle";
import axios from "axios";

import PemberiQurban from "../views/LaporanPemberiQurban";
import PenerimaQurban from "../views/LaporanPenerimaQurban";

class Laporan extends React.Component {
    constructor(props) {
        super(props);
        
        // this.API_URL = "http://qurban.local/api/laporan";
        this.API_URL = "https://api.fawwazlab.com/qurban/api/laporan";

        // this.API_URL_KEL = "http://qurban.local/api/kelurahan";
        this.API_URL_KEL = "https://api.fawwazlab.com/qurban/api/kelurahan";

        this.state = {

            kelurahan: [
                {
                    id: "",
                    nama_kelurahan: ""
                }
            ],

            data: [],

            txt_laporan: "pemberi_qurban",
            txt_id_kelurahan: "all_kelurahan",
            txt_tanggal_awal: "",
            txt_tanggal_akhir: "",
            disabled: true,
            chk_all_periode: true,
            tables: PemberiQurban,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.clickCheck = this.clickCheck.bind(this);
    }

    componentDidMount() {
        axios.get(this.API_URL_KEL).then(res => {
            this.setState({ kelurahan: res.data });
        });
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
        if(e.target.type === 'select-one'){
            this.setState({
                data: [],
            })   
        }
    };

    clickCheck = e => {
        let dis = !this.state.disabled;
        this.setState({
            [e.target.name]: e.target.checked,
            disabled: dis,
            txt_tanggal_awal: "",
            txt_tanggal_akhir: "",
        });  
    };
    
    handleSubmit = e => {
        e.preventDefault();
        let kelurahan = this.txt_id_kelurahan === "" ? "all_kelurahan" : this.state.txt_id_kelurahan;
        let tanggal_awal = this.state.disabled ? "all_tanggal" : this.state.txt_tanggal_awal;
        let tanggal_akhir = this.state.disabled ? "all_tanggal" : this.state.txt_tanggal_akhir;

        if(!this.state.disabled && (tanggal_awal === "" || tanggal_akhir === "")){
            alert('Periode awal dan akhir harus diisi');
            return false;
        }

        if(!this.state.disabled && (isNaN(Date.parse(tanggal_awal)) || isNaN(Date.parse(tanggal_akhir)))){
            alert('Format tanggal salah !');
            return false;
        }

        axios
        .post(this.API_URL, {
            laporan: this.state.txt_laporan,
            id_kelurahan: kelurahan,
            tanggal_awal: tanggal_awal,
            tanggal_akhir: tanggal_akhir,
        })
        .then(res => {
            if (res.status === 200) {
                this.setState({
                    data: res.data.result,
                });
            } else {
                console.log("error");
            }
        });
    };

    dataTable = () => {
        if(this.state.txt_laporan === "pemberi_qurban"){
            return <PemberiQurban data={this.state.data}></PemberiQurban>
        }else{
            return <PenerimaQurban data={this.state.data}></PenerimaQurban>;
        }
    }

    render() {
        return(
            <Container fuild className="main-content-container px-4">
                <Row noGutters className="page-header py-4">
                    <PageTitle
                        sm="4"
                        title="Laporan"
                        subtitle="Data Laporan"
                        className="text-sm-left"
                    />
                </Row>

                <Row>
                    <Col>
                        <Card small className="mb-4">
                            <CardHeader className="border-bottom">
                                <h6 className="m-0">Form Laporan</h6>
                            </CardHeader>
                            <CardBody className="p-0">
                                <ListGroup flush>
                                    <Form onSubmit={this.handleSubmit}>
                                        <ListGroupItem className="p-3">
                                            <Row>
                                                <Col>
                                                    <Row form>
                                                        <Col md="6" className="form-group">
                                                            <label htmlFor="feInputCity">Laporan</label>
                                                            <FormSelect
                                                                id="feInputState"
                                                                placeholder="Pilih Laporan"
                                                                name="txt_laporan"
                                                                onChange={this.handleChange}
                                                                value={this.state.txt_laporan}
                                                                required
                                                            >
                                                                <option value="pemberi_qurban">Pemberi Qurban</option>
                                                                <option value="penerima_qurban">Penerima Qurban</option>
                                                            </FormSelect>
                                                        </Col>
                                                        <Col md="6" className="form-group">
                                                            <label htmlFor="feInputCity">Kelurahan</label>
                                                            <FormSelect
                                                                id="feInputState"
                                                                placeholder="Pilih Kelurahan"
                                                                name="txt_id_kelurahan"
                                                                onChange={this.handleChange}
                                                                value={this.state.txt_id_kelurahan}
                                                            >
                                                                <option value="all_kelurahan">-- seluruh kelurahan --</option>
                                                                {this.state.kelurahan.map(row_kel => (
                                                                <option key={row_kel.id} value={row_kel.id}>
                                                                    {row_kel.nama_kelurahan}
                                                                </option>
                                                                ))}
                                                            </FormSelect>
                                                        </Col>
                                                    </Row>
                                                    <Row form>
                                                        <Col md="3" className="form-group">
                                                            <label htmlFor="feInputCity">Periode Awal</label>
                                                            <FormInput
                                                                id="feInputCity"
                                                                placeholder="(yyyy-mm-dd) ex: 2020-01-20"
                                                                name="txt_tanggal_awal"
                                                                onChange={this.handleChange}
                                                                value={this.state.txt_tanggal_awal}
                                                                disabled = {this.state.disabled}
                                                            />
                                                        </Col>
                                                        <Col md="3" className="form-group">
                                                        <label htmlFor="feInputCity">Periode Akhir</label>
                                                            <FormInput
                                                                id="feInputCity"
                                                                placeholder="(yyyy-mm-dd) ex: 2020-01-20"
                                                                name="txt_tanggal_akhir"
                                                                onChange={this.handleChange}
                                                                value={this.state.txt_tanggal_akhir}
                                                                disabled = {this.state.disabled}
                                                            />
                                                        </Col>
                                                        <Col md="3" className="form-group">
                                                        <label htmlFor="feInputCity">Seluruh Periode</label>
                                                            <FormCheckbox
                                                                onChange={this.clickCheck}
                                                                name="chk_all_periode"
                                                                checked={this.state.chk_all_periode}
                                                            >Seluruh Periode Laporan</FormCheckbox>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md="3" className="form-group">
                                                            <Button
                                                                type="submit"
                                                                theme="accent"
                                                                size="md"
                                                                className="ml-auto"
                                                                alignContent="center"
                                                            >
                                                                <i className="material-icons">save</i>{" "}
                                                                Proses
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    </Form>
                                </ListGroup>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {this.dataTable()}
            </Container>
        );
    }
}

export default Laporan;