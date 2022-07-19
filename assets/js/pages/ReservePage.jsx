import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import reservationsApi from '../services/reservationApi';
import { NavLink } from "react-router-dom";

import axios from "axios";
const STATUS_ClASSES =
{
    VALIDE: "success",
    ENCOURS: "primary",
    CANCELLED: "danger"
}
const STATUD_LABELS =
{
    VALIDE: "validé",
    ENCOURS: "Encours",
    CANCELLED: "Annulée"
}

const ReservePage = (props) => {
    const [reservations, setreservations] = useState([]);
    const [voyageur, setVoyageur] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [datareserv,setDatareserv] = useState([]);
    const itemsPerPage = 5;

    //Gestion du date 
    const formatDate = (str) => moment(str).format("DD/MM/YYYY");
    const formatTime = (str) => moment(str).format('hh:mm:ss');

    //récupération des reservations aupres de l'api
    const fetchreservations = async () => {
        try {
            const data = await reservationsApi.findAll();
            setreservations(data);
        } catch (error) {
            console.log(error.Response);
        }
    };
    //charger les reservations au chargement du composant
    useEffect(() => {
        // fetchreservations(),
        handleSubmitReservation(10)
    }, []);


    //njiboo ls data dyal Voyageur

    const handleSubmitVoyageurs = async (event) => {
        try {
            const data = await reservationsApi.findAll();
            setVoyageur(data);
        } catch (error) {
            console.log(error.Response);
        }
    };


    //Gestion du changement du page
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    //Gestion de la recherche
    const handleSearch = ({ currentTarget }) => {
        setSearch(currentTarget.value);
        setCurrentPage(1); //filtrer la pagination avec la recherche
    };

    // la gestion suppression
    const handleDelete = async id => {
        const originalreservations = [...reservations];
        setreservations(reservations.filter(reservation => reservation.id !== id));
        try {
            await reservationsApi.delete(id);
        } catch (error) {
            console.log(error.Response);
            setreservations(originalreservations);
        }
    };
    //filtrage des reservations en fonction de la recherche
    const filteredreservations = reservations.filter(
        i =>
            i.etat.toLowerCase().includes(search.toLowerCase())
    );
    //pagination des donnes
    const paginatedreservations = Pagination.getData(
        filteredreservations,
        currentPage,
        itemsPerPage
    );
    
    // const handleSubmitReservation = async () => {

    //     const data = await axios.get("http://localhost:8000/api/reservations")
    //         .then(response => console.log("idTs=>" + IDTrajet, response.data))
    //         .catch(error => {console.log(error.response)});
    //         setDatareserv(data);
           
    // };


    const handleSubmitReservation = async (ID) => {
        try {
        const item = await reservationsApi.findAllBYID(ID);
        setDatareserv(item);
        } catch (error) {
        console.log(error.Response);     
    }
    };
    console.log("data est"+datareserv);
    return (
        <>
            <h1>Liste des reservations</h1>
            <div className="form-group">
                <input type="text"
                    onChange={handleSearch}
                    value={search}
                    className="form-control"
                    placeholder="Rechercher ..."
                />
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>N°</th>
                        <th>villedepart</th>
                        <th>villedest</th>
                        <th>Jour</th>
                        <th>Datedepart</th>
                        <th>Datearriver</th>
                        <th>heuredepart</th>
                        <th>heurearrive</th>
                        <th>typetrajet</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {datareserv.map(reservation => (
                        <tr key={reservation.id}>
                            <td>{reservation.trajet.id}</td>
                            <td>{reservation.trajet.villedepart}</td>
                            <td>{reservation.trajet.villedestination}</td>
                            <td>{reservation.trajet.jour}</td>
                            <td>{formatDate(reservation.trajet.datedepart)}</td>
                            <td>{formatDate(reservation.trajet.datearrive)}</td>
                            <td>{formatTime(reservation.trajet.heuredepart)}</td>
                            <td>{formatTime(reservation.trajet.heurearrive)}</td>
                            <td>{reservation.trajet.typetrajet}</td>
                            <td>

                                <button className="btn btn-sm mr-1  btn-info">Validé</button>
                                <button className="btn btn-sm mr-1  btn-danger">Rejecté</button>
                                <p>
                                    <NavLink className="nav-link" to={"/Reservations?" + reservation.id}>
                                        
                                    <button type="button" class="btn  btn-sm mr-1 btn-primary" 
                                    data-toggle="modal" data-target="#exampleModalCenter"
                                    onClick={()=>handleSubmitReservation(reservation.id)}>
                                           Détails
                                    </button>

                                    </NavLink>
                                </p>
                                </td>
                            </tr>))};
                                {/* <div className="collapse" id="collapseExample">
                                    <ul id="carousel">
                                        <li><span className="sp">Nom Complet :</span><br />
                                            {reservation.voyageur.compte.nom}&nbsp;
                                    {reservation.voyageur.compte.prenom}</li>
                                        <li> <span className="sp">CIN :</span><br />{reservation.voyageur.cin}</li>
                                        <li><span className="sp">Telephone :</span><br />{reservation.voyageur.tel}</li>
                                        <li><span className="sp">Telephone :</span><br />{reservation.voyageur.sexe}</li>
                                    </ul>
                                </div> */}
{/* 
                            {datareserv.map((item) =>(
                                <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
                                aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLongTitle">Information sur les Participants</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                   

                                    <div class="modal-body">
                                        <ul>
                                            <li><span className="sp">Nom Complet :</span><br />
                                                {item.voyageur.compte.nom}&nbsp;
                                                {item.voyageur.compte.prenom}</li>
                                            <li><span className="sp">CIN :</span><br />{item.voyageur.cin}</li>
                                            <li><span className="sp">Telephone :</span><br />{item.voyageur.tel}</li>
                                            <li><span className="sp">Telephone :</span><br />{item.voyageur.sexe}</li>
                                        </ul>
                                    </div>



                                 
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary">Save changes</button>
                                    </div>

                                    </div>
                                    </div>
                                </div>
                                ))}; */}
                       
            </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={filteredreservations.length}
                onPageChanged={handlePageChange} />
        </>
    );
}
export default ReservePage;