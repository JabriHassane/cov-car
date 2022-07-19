import React, { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Row, Col, Container, Form } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import { Switch } from "antd";
import Button from "@material-ui/core/Button";
import Select from "react-select";
import { Table } from "reactstrap";
import authApi from "../services/authApi";
import AuthContext from "../contexts/AuthContext";
import Dropdown from "react-bootstrap/Dropdown";
import { toast } from "react-toastify";
import usersApi from "../services/usersApi";
import { NavLink } from "react-router-dom";
import ReactDOM from "react-dom";
import "./recherche.css";

const useStyles = makeStyles({root: { height: 216,flexGrow: 1,maxWidth: 400},});
const Recherche = (props) => {  

  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [Users, setUsers] = useState([]);
  const classes = useStyles();
  const [toggle, setToggle] = useState(false);
  const [opt] = useState(data);
  const [date, setDate] = useState(new Date());
  const [dataa, setData] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [ID, setID] = useState([]);
  const [Reservation, setReservation] = useState({
    etat:"none",
    trajet:"/api/trajets/"+ID
  });
  const [errors, setErrors] = useState({
    etat: "none",
    trajet:"/api/trajets/"+ID,
  });

  const handleLogout = () => {
    authApi.logout();
    setIsAuthenticated(false);
    toast.error("vous étes déconnecter");
    history.push("/login");
  };

  const fetchUsers = async () => {
    try{
        const data = authApi.localStorageValue();
        setUsers(data);
       }catch (error) {console.log(error.Response);}
   };

  useEffect(() => {
    document.body.style = "backgroundImage:url('blabla2.png')";
    window.sessionStorage.setItem("RechercheValue","[]");
    fetchUsers();
  }, []);

  const toggler = () => {toggle ? setToggle(false) : setToggle(true);};
  const options = [
    { value: "Lundi", label: "Lundi" },
    { value: "Mardi", label: "Mardi" },
    { value: "Mercredi", label: "Mercredi" },
    { value: "Jeudi", label: "Jeudi" },
    { value: "Vendredi", label: "Vendredi" },
    { value: "Samedi", label: "Samedi" },
    { value: "Dimanche", label: "Dimanche" },
  ];
  const data = [
    { id: "1", Country: "Lundi" },
    { id: "2", Country: "Mardi" },
    { id: "3", Country: "Mercredi" },
    { id: "4", Country: "Mercredi" },
    { id: "5", Country: "Vendredi" },
    { id: "6", Country: "Samedi" },
    { id: "7", Country: "Dimanche" },
  ];

  const onChange = (date) => {
    setDate(date);
  };

  var jours = "Lundi,Mardi,Mercredi,Jeudi,Vendredi,Samedi,Dimanche";
  const jourChanged = useCallback((selectedJour) => {
    jours = selectedJour.map((arg) => arg.value).toString();
    console.log(jours);
  });

  const sendRequest = useCallback(async () => {
    const result = await axios({
      method: "post",
      url: "http://127.0.0.1:8000/trajet",
      data:
      {
        villedepart: document.getElementById("villedepart").value,
        villedestination: document.getElementById("villedestination").value,
        type:
          document.getElementById("type").ariaChecked == "false" ? "Ponctuel" : "Regulier",
          jours: jours,
      },
    });
      console.log("votre data" + JSON.stringify(result.data));
      window.sessionStorage.setItem(
        "RechercheValue",
        JSON.stringify(result.data)
      );
      setData(result.data);
      fetchUsers();
  }, [isSending]);

  const handleSubmitReservation =(IDTrajet) => {
    axios.post("http://localhost:8000/api/reservations", 
    {
      etat:"none",
      trajet:"/api/trajets/"+IDTrajet
    })
    .then(response => console.log("idT=>"+IDTrajet,response.data))
    .catch(error => {
      console.log(error.response)
    });
};
  return(
    <div>
      <Container>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Row className="justify-content-md-center">
          <Col xs lg="2"></Col>
          <Col md="auto">
            <h1 className='quotes'>Déplacer-vous Autrement</h1>
          </Col>
          <Col xs lg="2"></Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="2"></Col>
          <Col md="auto">
            <br></br>
            <h3 className='quotes'>Vous Atendez quoi?</h3>
          </Col>
          <Col xs lg="2"></Col>
        </Row>
        <br />
        <br />
        <br />
        <br />
        <Row md={4}>
          <Col>
            <Form.Group>
              <Form.Label>Ville De Départ :</Form.Label>
              <Form.Control as="select" id="villedepart">
                <option value="" disabled selected>
                  Selectionner Une Ville
                </option>
                <option>Berkane</option>
                <option>Oujda</option>
                <option>Rabat</option>
                <option>Fes</option>
                <option>Tetouan</option>
                <option>Housiema</option>
                <option>Marrakesh</option>
                <option>Tanger</option>
                <option>Laayoun</option>
                <option>Dakhla</option>
                <option>Casablanca</option>
                <option>Essaouira</option>
                <option>Kenitra</option>
                <option>Yousoufia</option>
                <option>Taza</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col xs={4}>
            <Form.Group>
              <Form.Label>Ville d'Arrivé :</Form.Label>
              <Form.Control as="select" id="villedestination">
                <option value="" disabled selected>
                  Selectionner Une Ville
                </option>
                <option>Berkane</option>
                <option>Oujda</option>
                <option>Rabat</option>
                <option>Berkane</option>
                <option>Fes</option>
                <option>Housiema</option>
                <option>Marrakesh</option>
                <option>Tanger</option>
                <option>Laayoun</option>
                <option>Dakhla</option>
                <option>Casablanca</option>
                <option>Essaouira</option>
                <option>Kenitra</option>
                <option>Yousoufia</option>
                <option>Taza</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Label>Types Trajets :</Form.Label> <br />
            Ponctuel <Switch onClick={toggler} id="type" /> Regulier
          </Col>
          <Col>
            {toggle ? (
              <Col>
                {" "}
                <Col>
                  <Form.Label>Choisi Un/jours :</Form.Label>
                  <Select
                    options={options}
                    isMulti
                    id="jour"
                    onChange={jourChanged}
                  />
                </Col>
              </Col>
            ) : (
              <Col></Col>
            )}
          </Col>

          <Col sm="12" md={{ size: 6, offset: 5 }}>
            <Button
              size="large"
              className={classes.margin}
              variant="contained"
              color="primary"
              onClick={sendRequest}
            >
              Rchercher
            </Button>
          </Col>
          <br />
        </Row>
        <br />
        <br />
        <br />
        <Row>
          {(!isAuthenticated && (
            <>
              <Table hover>
                <thead>
                  <tr>
                    <th>Ville de Départ</th>
                    <th>Ville Déstination</th>
                    <th>Date Départ</th>
                    <th>Date d'Arrive</th>

                    <th>Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {dataa.map((item) => (
                    <tr>
                      <th>{item.villedepart}</th>
                      <th>{item.villedestination}</th>
                      <th>{item.datedepart}</th>
                      <th>{item.datearrive}</th>

                      <th>
                        <li className="nav-item">
                          <NavLink className="nav-link" to="/Login">
                            <button to className="btn btn-info">
                              Détails
                            </button>
                          </NavLink>
                        </li>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )) || (
            <Table hover>
              <thead>
                <tr>
                  <th>Ville de Départ</th>
                  <th>Ville Déstination</th>
                  <th>Date Départ</th>
                  <th>Date d'Arrive</th>

                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                {Users.map((item) => (
                  <tr>
                    <th>{item.villedepart}</th>
                    <th>{item.villedestination}</th>
                    <th>{item.datedepart}</th>
                    <th>{item.datearrive}</th>

                    <th>
                      <ul>
                        <li>ID :{item.IDTrajet}</li>
                        <li>
                          Conducteur :{item.nom} {item.prenom}
                        </li>
                        <li>Telephone : {item.tel}</li>
                        <li>Condition : {item.Condition}</li>
                        <li none>La marque de voiture : {item.marque}</li>
                        <li>Nombre des places disponible : {item.NPD}</li>
                        <li>Heure de Départ : {item.heuredepart}</li>
                        <li>Heure d'Arrive : {item.heurearrive}</li>
                        <li>Jour : {item.jours}</li>
                      </ul>
             
                      <NavLink className="nav-link" to="">
                        <button
                          className="btn btn-success"
                          id="btn_reserver"
                          onClick={() => handleSubmitReservation(item.IDTrajet)}>
                          Réserver
                        </button>
                        </NavLink>
                      <NavLink className="nav-link" to="">
                        <button
                          className="btn btn-warning"
                          id="btn_reserver">
                          &nbsp;Annuler&nbsp;
                        </button>
                      </NavLink>
                    </th>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Row>
      </Container>
    </div>
  );
}
export default Recherche;
