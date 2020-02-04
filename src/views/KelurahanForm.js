import React from "react"
import {
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
    Button,
    Form,
    FormInput,
    ListGroup,
    ListGroupItem
  } from "shards-react";

class KelurahanForm extends React.Component{
    render(){
        return <Col lg="6" md="12">
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">Form Kelurahan</h6>
          </CardHeader>

          <CardBody className="p-0">
            <ListGroup flush>
              <Form onSubmit={this.props.handleSubmit}>
                <ListGroupItem className="p-3">
                  <Row>
                    <Col>
                      <Row form>
                        <Col md="12" className="form-group">
                          <label htmlFor="feInputCity">Kelurahan</label>
                          <FormInput
                            id="feInputCity"
                            placeholder="Input Nama Kelurahan"
                            onChange={this.props.handleChange}
                            value={this.props.data.tmp_nama_kelurahan}
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
    }
}

export default KelurahanForm;