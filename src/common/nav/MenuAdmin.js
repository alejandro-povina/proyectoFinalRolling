import React from 'react';
import { withRouter } from "react-router-dom";
import { Nav, DropdownButton, Dropdown, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faNewspaper, faListAlt, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import "../../App.css"
import { deleteToken } from "../../helpers/helpers";

const MenuAdmin = (props) => {
    const {tok}= props
    const cerrarSesion = (e) => {
      /*Swal */
        let timerInterval;
        Swal.fire({
          title: "Cerrando sesion",
          html: "",
          timer: 1000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => {
              const content = Swal.getContent();
              if (content) {
                const b = content.querySelector("b");
                if (b) {
                  b.textContent = Swal.getTimerLeft();
                }
              }
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            deleteToken()
            props.history.push("/");
          }
        });
      };

    return (
        <Nav>
            <DropdownButton
              className="me-2"
              menuAlign="right"
              title='Menu Admin'
              id="dropdown-menu-align-right"
              variant="outline-light"
            >
              <Dropdown.Item href={`/menu-noticias/${(tok)}`} eventKey="1"><FontAwesomeIcon icon={faNewspaper} className="me-2 text-primary" size="2x"></FontAwesomeIcon>Noticias </Dropdown.Item>
              <Dropdown.Item href={`/menu-categorias/${(tok)}`} eventKey="2"><FontAwesomeIcon icon={faListAlt} className="me-2 text-primary" size="2x"></FontAwesomeIcon>Categorías</Dropdown.Item>
              <Dropdown.Item href={`/menu-suscriptos/${(tok)}`} eventKey="3"><FontAwesomeIcon icon={faUserFriends} className="me-2 text-primary" size="2x"></FontAwesomeIcon>Clientes</Dropdown.Item>
            </DropdownButton>
           <Button variant="botones-navbar" onClick={cerrarSesion} className="btn btn-outline-light" ><FontAwesomeIcon icon={faSignInAlt} className="me-2"></FontAwesomeIcon>Salir</Button>
          </Nav>
    );
};

export default withRouter (MenuAdmin);