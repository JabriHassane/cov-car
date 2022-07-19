import React, { useContext, useState,useEffect } from 'react';
import ReactDOM from "react-dom";
import { HashRouter, Redirect, Route, Switch, withRouter, useLocation } from "react-router-dom";
import './bootstrap';
import Navbar from './js/components/navbar';
import AuthContext from "./js/contexts/AuthContext";
import ConducteurPages from './js/pages/ConducteurPages';
import HomePage from './js/pages/HomePage';
import Recherche from './js/pages/Recherche';
import RechercheH from './js/pages/RechercherH';
import LoginPage from './js/pages/Loginpage';
import RegisterPageForConducteurs from "./js/pages/RegisterPageForConducteurs";
import RegisterPageForVoyageurs from "./js/pages/RegisterPageForVoyageurs";
import TrajetsPages from './js/pages/TrajetsPages';
import authApi from './js/services/authApi';
import './styles/app.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReservationPage from './js/pages/ReservationPage';
import CreationTrajets from './js/pages/CreationTrajets'
import testreservation from './js/pages/testaddreservation'
import TrajetsPage_ from './js/pages/TrajetsPages_'
import InterfaceAdmine from './js/pages/InterfaceAdmine'
import ProfilPages from './js/pages/ProfilPages'

import { createBrowserHistory } from "history";
import { yellow } from '@material-ui/core/colors';
import {Helmet} from 'react-helmet';
import ReservationPageController from './js/pages/ReservationPageController';
import ReservationFinal from './js/pages/ReservationFinalversion';
import ReservationFinalversion from './js/pages/ReservationFinalversion';
import Footer from './js/pages/Footer'

authApi.setup();
const PrivateRoute=({path, component})=>{
const {isAuthenticated}=useContext(AuthContext);
return isAuthenticated ?( <Route path={path} component={component}/>):(<Redirect to="/login"/>);}
const App=()=>
{
    const [isAuthenticated, setIsAuthenticated]= useState(authApi.isAuthenticated());
    const NavbarWithRouter = withRouter(Navbar);
    const contextValue={isAuthenticated,setIsAuthenticated}
    return(
            <AuthContext.Provider value={contextValue}> 
                <HashRouter>
                    <NavbarWithRouter/>
                    <main className="container pt-5">
                        <Switch>
                            <Route path="/Login" component={LoginPage}/>
                            <Route path="/registerConducteur" component={RegisterPageForConducteurs}/>
                            <Route path="/registerVoyageur" component={RegisterPageForVoyageurs}/>
                            <PrivateRoute path="/trajets" component={TrajetsPages}/>
                            <PrivateRoute path="/Listetrajets" component={TrajetsPage_}/>
                            <Route path="/Add" component={CreationTrajets}/>
                            {/* <Route path="/Recherche" component={Recherche}/> */}
                            <Route path="/Recherche" component={RechercheH}/>
                            <Route path="/Addtrajet/:id" component={CreationTrajets}/>
                            <Route path="/testreservation" component={testreservation}/>
                            <PrivateRoute path="/conducteurs" component={ConducteurPages}/>
                            {/* <PrivateRoute path="/reservations" component={ReservationPageController}/> */}
                            <PrivateRoute path="/reservations" component={ReservationFinalversion}/>
                            {/* <PrivateRoute path="/reservationsC" component={ReservationPageController}/> */}
                            <PrivateRoute path="/admine" component={InterfaceAdmine}/>
                            <PrivateRoute path="/Profile" component={ProfilPages}/>
                            <Route path="/" component={Recherche}/>
                        </Switch>
                    </main>

                </HashRouter>
                <ToastContainer position={toast.POSITION.BOTTOM_LEFT}></ToastContainer>
            </AuthContext.Provider>
            
        );
};
const rootElement =document.querySelector("#app");
ReactDOM.render(<App/>,rootElement);

