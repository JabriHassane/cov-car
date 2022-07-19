import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import authApi from '../services/authApi';
import AuthContext from '../contexts/AuthContext';
import Dropdown from 'react-bootstrap/Dropdown';
import { toast } from 'react-toastify';
import usersApi from '../services/usersApi';
import reservationApi from '../services/reservationApi';
import {FontAwesomeIcon  } from "@fortawesome/react-fontawesome";

const Navbar = ({ history }) => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [Roles, setRoles]=useState([]);
  const [RolesIns, setRolesIns]=useState([]);
  const [Users, setUsers]=useState([]);

  const handleLogout = () => {
    authApi.logout();
    setIsAuthenticated(false);
    toast.error("vous étes déconnecter");
    window.sessionStorage.removeItem("RechercheValue");
    window.sessionStorage.setItem("RechercheValue","[]");
    history.push("/login");
  }
    const fetchRoles = async ()=>{
      try{
        const data = authApi.TokenValue(); 
          setRoles(data.roles); 
          setUsers(data);   
        }catch(error){
          console.log(error.Response)
         }};

  useEffect(()=>{
    fetchRoles()
    },[]);
    console.log("votre roles est"+ Roles); 

  const handleSubmitRolesInsc = async (IDTrajet) => {
    try {
        const result = await axios({
            method: "post",
            url: "http://127.0.0.1:8000/reservation",
            data: {
              idtrajet:IDTrajet
            },
     });

     console.log("Your Data is"+JSON.stringify(result.data));
     setDataRes(result.data);
    } catch (error) {
        console.log(error.response);
    }
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <NavLink className="navbar-brand" to="/">Cov-Car
      <i className="fas fa-car"></i>
      {/* <FontAwesomeIcon icon={faFacebook} size="3x" /> */}
      {/* <FontAwesomeIcon icon="fa-solid fa-car" /> */}
      </NavLink>
      <button
       className="navbar-toggler" type="button" data-toggle="collapse"
       data-target="#navbarColor01" aria-controls="navbarColor01"
       aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">Home
                <span className="sr-only">(current)</span>
            </a>
          </li>
          {Roles=="conducteur" && <>
          <li className="nav-item">
            <NavLink className="nav-link" to="Profile">Mon Profile</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/Listetrajets">Liste Trajet</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/Reservations">Mes Trajets</NavLink>
          </li>
          </>
          }
          {Roles=="voyageur" && <>
          <li className="nav-item">
            <NavLink className="nav-link" to="/Profile">Mon Profile</NavLink>
          </li>
          {/* <li className="nav-item">
            <NavLink className="nav-link" to="/">Mes Reservations</NavLink>
          </li> */}
          <li className="nav-item">
            <NavLink className="nav-link" to="/Recherche">Rechercher</NavLink>
          </li>
          </>
          }
           {Roles=="ROLE_ADMIN" && <>
           <li className="nav-item">
            <NavLink className="nav-link" to="/conducteurs">Liste des Conducteurs</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admine">Liste Trajets</NavLink>
          </li>
          
           </>
           }
           {!isAuthenticated && <>
            <li className="nav-item">
            <NavLink className="nav-link" to="/Recherche">Rechercher</NavLink>
            </li>
           </>
           }
        </ul>
        <ul className="navbar-nav ml-auto">
          {!isAuthenticated && <>
            <Dropdown>
              <Dropdown.Toggle  id="dropdown-basic">
                Inscription
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/registerVoyageur" >Voyageur</Dropdown.Item>
                <Dropdown.Item href="#/registerConducteur">Conducteur</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <li className="nav-item">
              <NavLink className="btn btn-success" to="/login">Connexion !</NavLink>
            </li>
          </> ||
            <li className="nav-item">
              <span id="user">{Roles}</span>&nbsp;<br/>
             <NavLink to="/Profile"><span id="nom">{Users.nom}&nbsp;{Users.prenom}&nbsp;&nbsp;&nbsp;</span></NavLink>
              <button className="btn btn-danger" onClick={handleLogout}>Déconnexion</button>
            </li>
          }
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;