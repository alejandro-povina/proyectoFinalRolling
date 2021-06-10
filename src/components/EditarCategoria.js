import React, { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom'
import { ListGroup, Button, Form, Row, Col, Container } from 'react-bootstrap';
import { useParams, withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import { campoRequerido } from '../helpers/helpers'
import MsjError from "./MsjError";

const EditarCategoria = (props) => {
    const { id } = useParams();
    const {tok} = props
    
    /* State */
    const [nombreCategoria, setNombreCat] = useState({});
    const [err, setErr] = useState(false)

    //variables useRef para precio y nombre producto
    const nombreCategoriaRef = useRef("");
    const URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const consultarCategorias = async () => {
            try {
                const res = await fetch(process.env.REACT_APP_API_URL + "/categorias/categoria/" + id)
                if (res.status === 200) {
                    const resp = await res.json();
                    setNombreCat(resp);
                }
            } catch (error) {
                console.log(error)
            }
        }
        consultarCategorias();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (campoRequerido(nombreCategoriaRef.current.value)) {
            setErr(false);
            try {
                const categoriaModificada = {
                    nombreCategoria: nombreCategoriaRef.current.value
                }

                const respuesta = await fetch(URL + "/categorias/updateCategoria/" + id, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(categoriaModificada)
                })
                console.log(respuesta);

                if (respuesta.status === 200) {

                    Swal.fire(
                        'Categoria modificada',
                        'La categoria fue modificada correctamente',
                        'success'
                    )

                    props.setConsultarCat(!props.consultarCat);

                    props.history.push(`/menu-categorias/${(tok)}`);
                };
            } catch (error) {
                console.log(error)
            }
        } else {
            setErr(true)
            setTimeout(() => {
                setErr(false)
            }, 2000);

            console.log("ingrese datos");
        }
    };

    return (
        <Container>
            <Row className="d-flex justify-content-between">
                <Col sm={12} lg={6}>
                    <h1 className="mt-4"><i className="backcolor badge text-color">Editar Categoria</i></h1>
                    <Form onSubmit={handleSubmit} className="my-3 p-3 border border-secondary rounded">
                        <Form.Group>
                            <Form.Label><i>Nombre Categoria</i></Form.Label>
                        </Form.Group>
                        <Form.Control type="text" ref={nombreCategoriaRef} defaultValue={nombreCategoria.nombreCategoria}  />
                        <Form.Group className="d-flex justify-content-end">
                            <Button className="my-3 mx-2 text-dark" variant="warning" type="submit">
                                Editar
                        </Button>
                            <Link className="my-3 btn btn-primary" variant="primary" to={`/menu-categorias/${tok}`}>
                                Volver
                            </Link>
                        </Form.Group>
                        {
                            (err) ? (<MsjError text1="Datos incorrectos" text2="Intentelo nuevamente." />) : (null)}
                    </Form>
                </Col>
                <Col sm={12} lg={6}>
                    <h1 className="mt-4"><i className="backcolor badge text-color">Categorías existentes</i></h1>
                    <ListGroup className="my-3">
                        {
                            props.categorias.map((cat) => <ListGroup.Item className="d-flex justify-content-between align-items-center border border-secondary"
                            cat={cat} key={cat._id} setConsultarCat={props.setConsultarCat}>
                            <h5 className="text-dark"><i>{cat.nombreCategoria}</i></h5>
                            </ListGroup.Item>)
                        }
                    </ListGroup>
                </Col>
            </Row>
        </Container>

    );
};
export default withRouter(EditarCategoria);