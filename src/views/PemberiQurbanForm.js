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

class PemberiQurbanForm extends React.Component{
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
    }

    render(){
        return (
            <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Form Pemberi Qurban</h6>
              </CardHeader>

              <CardBody className="p-0">
                <ListGroup flush>
                  <Form onSubmit={this.props.handleSubmit}>
                    <ListGroupItem className="p-3">
                      <Row>
                        <Col>
                          <Row form>
                            <Col md="6" className="form-group">
                              <label htmlFor="feInputCity">No KTP</label>
                              <FormInput
                                id="feInputCity"
                                placeholder="Input No KTP"
                                name="txt_no_ktp"
                                onChange={this.props.handleChange}
                                value={this.props.data.txt_no_ktp}
                                required
                              />
                            </Col>
                            <Col md="6" className="form-group">
                              <label htmlFor="feInputCity">Nama</label>
                              <FormInput
                                id="feInputCity"
                                placeholder="Input Nama"
                                name="txt_nama"
                                onChange={this.props.handleChange}
                                value={this.props.data.txt_nama}
                                required
                              />
                            </Col>
                          </Row>
                          <Row form>
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
                          <Row form>
                            <Col md="6" className="form-group">
                              <label htmlFor="feInputCity">
                                Jumlah Qurban (kg)
                              </label>
                              <FormInput
                                id="feInputCity"
                                placeholder="Input Jumlah Qurban"
                                name="txt_jumlah_qurban"
                                onChange={this.props.handleChange}
                                value={this.props.data.txt_jumlah_qurban}
                                required
                              />
                            </Col>
                            <Col md="6" className="form-group">
                              <label htmlFor="feInputCity">Keterangan</label>
                              <FormInput
                                id="feInputCity"
                                placeholder="Input Keterangan"
                                name="txt_keterangan"
                                onChange={this.props.handleChange}
                                value={this.props.data.txt_keterangan}
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
        )
    }
}

export default PemberiQurbanForm;