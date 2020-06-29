import React from "react";
import {
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
    Button,
  } from "shards-react";

class LaporanPenerimaQurban extends React.Component{
    render(){
        return(
            <Row>
                <Col>
                    <Card small className="mb-4">
                    <CardHeader className="border-bottom">
                        <h4 className="m-6 text-center">Data Penerima Qurban</h4>
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
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.data.map((row, index) => (
                            <tr key={row.id}>
                                <td>{index + 1}</td>
                                <td>{row.no_kk}</td>
                                <td>{row.kepala_kk}</td>
                                <td>{row.nama_kelurahan}</td>
                                <td>{row.tahun}</td>
                                <td>{row.alamat}</td>
                                <td>{row.jumlah_anggota}</td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </CardBody>
                    </Card>
                </Col>
                </Row>
        )
    }
}

export default LaporanPenerimaQurban