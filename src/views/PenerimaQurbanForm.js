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

class PenerimaQurbanForm extends React.Component{
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
                            <FormSelect
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