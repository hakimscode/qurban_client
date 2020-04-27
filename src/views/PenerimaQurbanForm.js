import React from "react";
import {
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

class PenerimaQurbanForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      kelurahan: {
        id_kelurahan: "",
        nama_kelurahan: ""
      }
    }
    const id_kelurahan = localStorage.getItem("id-kelurahan");
    this.API_URL_KEL_BY_ID = "https://api.fawwazlab.com/qurban/api/kelurahan/" + id_kelurahan;
    // this.API_URL_KEL_BY_ID = "http://qurban.local/api/kelurahan/" + id_kelurahan;
  }

  componentDidMount() {
    axios.get(this.API_URL_KEL_BY_ID).then(res => {
      this.setState({kelurahan: res.data})
      this.props.data.txt_id_kelurahan = res.data.id
    })
  }

  selectKelurahan = () => {
    const session_qurban = localStorage.getItem("session-qurban");
    if(this.id_kelurahan !== 0 && session_qurban === 'kelurahan'){
      return <FormSelect
        id="feInputState"
        placeholder="Pilih Kelurahan"
        name="txt_id_kelurahan"
        onChange={this.props.handleChange}
        value={this.props.data.txt_id_kelurahan}
        required
        disabled
      >
        <option value={this.state.kelurahan.id_kelurahan}>{this.state.kelurahan.nama_kelurahan}</option>
      </FormSelect>
    }

    return <FormSelect
      id="feInputState"
      placeholder="Pilih Kelurahan"
      name="txt_id_kelurahan"
      onChange={this.props.handleChange}
      value={this.props.data.txt_id_kelurahan}
      required
    >
      <option value="">-- pilih kelurahan --</option>
      {this.props.data.kelurahan.map(row_kel => (
        <option key={row_kel.id} value={row_kel.id}>
          {row_kel.nama_kelurahan}
        </option>
      ))}
    </FormSelect>
  }
    render(){
        return <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Form Penerima Qurban</h6>
            </CardHeader>

            <CardBody className="p-0">
              <ListGroup flush>
                <Form onSubmit={this.props.handleSubmit}>
                  <ListGroupItem className="p-3">
                    <Row>
                      <Col>
                        <Row form>
                          <Col md="6" className="form-group">
                            <label htmlFor="feInputCity">No KK</label>
                            <FormInput
                              id="feInputCity"
                              placeholder="Input No KK"
                              name="txt_no_kk"
                              onChange={this.props.handleChange}
                              value={this.props.data.txt_no_kk}
                              required
                            />
                          </Col>
                          <Col md="6" className="form-group">
                            <label htmlFor="feInputCity">Alamat</label>
                            <FormInput
                              id="feInputCity"
                              placeholder="Input Alamat"
                              name="txt_alamat"
                              onChange={this.props.handleChange}
                              value={this.props.data.txt_alamat}
                              required
                            />
                          </Col>
                        </Row>
                        <Row form>
                          <Col md="6" className="form-group">
                            <label htmlFor="feInputCity">Kepala KK</label>
                            <FormInput
                              id="feInputCity"
                              placeholder="Input Kepala KK"
                              name="txt_kepala_kk"
                              onChange={this.props.handleChange}
                              value={this.props.data.txt_kepala_kk}
                              required
                            />
                          </Col>
                          <Col md="6" className="form-group">
                            <label htmlFor="feInputCity">
                              Jumlah Anggota
                            </label>
                            <FormInput
                              id="feInputCity"
                              placeholder="Input Jumlah Anggota"
                              name="txt_jumlah_anggota"
                              onChange={this.props.handleChange}
                              value={this.props.data.txt_jumlah_anggota}
                              required
                            />
                          </Col>
                        </Row>
                        <Row form>
                          <Col md="6" className="form-group">
                            <label htmlFor="feInputCity">Kelurahan</label>
                            {this.selectKelurahan()}
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
                      onClick={this.props.cancelClick}
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
                      {this.props.data.value_simpan}
                    </Button>
                  </ListGroupItem>
                </Form>
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
    }
}

export default PenerimaQurbanForm;