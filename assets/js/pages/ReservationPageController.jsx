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
const ReservationPageController = (props) => {

    const [dataRes, setDataRes] = useState([]);
    const [etatres, setEtatres] = useState({
        etat:"validé"        
    });
    const [etatresannuler, setEtatresannuler] = useState({
        etat:"Annulé"        
    });
    const [reservations, setreservations] = useState([])
    const [voyageur, setVoyageur] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPagedetails, setCurrentPagedetails] = useState(1);
    const [search, setSearch] = useState("");
    const itemsPerPage = 5;
    const itemsPerPagedetails = 1;
    const formatDate = (str) => moment(str).format("DD/MM/YYYY");
    const formatTime = (str) => moment(str).format('hh:mm:ss');


    useEffect(() => {
        document.body.style.backgroundImage = "none";
        fetchreservations();
    }, []);

    //récupération des reservations aupres de l'api construit /reservations
      const fetchreservations = async () => {
        try {
            const result = await axios({
                method: "get",
                url: "http://127.0.0.1:8000/reservations"
         });
            console.log("reservationDistinct=>"+result.data);
            setreservations(result.data);
        } catch (error) {
            console.log(error.Response);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handlePageChangedetails = (pages) => {
          setCurrentPagedetails(pages);
    };
    const handleSearch = ({ currentTarget }) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    };
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

    const filteredreservations = reservations.filter(
        i => i.villedepart.toLowerCase().includes(search.toLowerCase())
    );
    const paginatedreservations = Pagination.getData(
          filteredreservations,
          currentPage,
          itemsPerPage
    );
    const paginatedreservationsdetails = Pagination.getData(
          dataRes,
          currentPagedetails,
          itemsPerPagedetails
    );

    // B9aa Hena Mouchkill Dyal Les Participant 
    // Rah yjibb bzzf 7itch rah y7ssb b DataRes.length lii jaya men result.data
    // flewal ana kunt khdam b controller dyalii Distinct... mine darlii mouchkil dyal auth reja3tt /api/reservations
    //mais daba ba9ii prob dyal pagination ... tobecontinued
    const handleSubmitReservation = async (IDTrajet) => {
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


    const handleSubmitValider = async (IDRes) => {
        try {
         const result = await axios.put("http://localhost:8000/api/reservations/"+IDRes,etatres)
         console.log(result.data);
         fetchreservations();
        } catch (error) {console.log(error.response);}
    };

    const handleSubmitAnnuler = async (IDRes) => {
        try {
         const result = await axios.put("http://localhost:8000/api/reservations/"+IDRes,etatresannuler)
         console.log(result.data);
         fetchreservations();
        } catch (error) {console.log(error.response);}
    };

    
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
                    {paginatedreservations.map(reservation => (
                        <tr>
                            <td>{reservation.ID}</td>
                            <td>{reservation.villedepart}</td>
                            <td>{reservation.villedestination}</td>
                            <td>{reservation.jour}</td>
                            <td>{reservation.datedepart}</td>
                            <td>{reservation.datearrive}</td>
                            <td>{reservation.heuredepart}</td>
                            <td>{reservation.heurearrive}</td>
                            <td>{reservation.typetrajet}</td>
                            <td>
                                <button className="btn btn-sm mr-1  btn-success"
                                 onClick={() => handleSubmitValider(reservation.ID)}
                                 >Validé</button>
                                <button className="btn btn-sm mr-1  btn-danger"
                                 onClick={() => handleSubmitAnnuler(reservation.ID)}
                                >Rejecté</button>
                                <button type="button" className="btn  btn-sm mr-1 btn-primary"
                                    data-toggle="modal" data-target="#exampleModalCenter"
                                    onClick={() => handleSubmitReservation(reservation.ID)}>Détails</button>
                                {paginatedreservationsdetails.map(reservation => (
                                <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog"
                                    aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLongTitle">Information sur les Participants</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <label>Nombre de Participant : <span id="count">{dataRes.length}</span></label>
                                            <ul>
                                            <li><span className="sp">Nom Complet :</span><br />
                                                {reservation.nom}&nbsp;
                                                {reservation.prenom}
                                                </li>
                                                <li> <span className="sp">CIN :</span><br />{reservation.cin}</li>
                                                <li><span className="sp">Telephone :</span><br />{reservation.tel}</li>
                                            </ul>
                                            <Pagination
                                                    currentPage={currentPagedetails}
                                                    itemsPerPage={itemsPerPagedetails}
                                                    length={dataRes.length}
                                                    onPageChanged={handlePageChangedetails}/>
                                            </div>
                                            <div className="modal-footer">
                                            </div>
                                        </div>
                                    </div>

                                </div>
                             ))} 
                            </td>
                        </tr>))}
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
export default ReservationPageController;