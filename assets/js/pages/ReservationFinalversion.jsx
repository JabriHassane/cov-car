import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import reservationsApi from '../services/reservationApi';
import {useHistory } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
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
const ReservationFinalversion = (props) => {
    const history = useHistory();
    const [dataRes, setDataRes] = useState([]);
    const [etatres, setEtatres] = useState({
        etat:"validé"        
    });
    const [etatresannuler, setEtatresannuler] = useState({
        etat:"Annulé"        
    });
    const [reservations, setreservations] = useState([])

    const [ReservationId, setReservationid] = useState([])

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      

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
        handleSubmitValider();
    }, []);

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

    const handleSubmitValider = async (IDVoyageur) => {
        try {
         const result = await reservationsApi.findreservationbyvoyageur(IDVoyageur);
         setReservationid(result[0].id);
         console.log("id de reservation est"+ReservationId);
         const result1 = await axios.put("http://localhost:8000/api/reservations/"+ReservationId,etatres);
         fetchreservations();
         Toast.fire({
            icon: 'success',
            title: 'validé avec succès'
          })
         console.log(result1.data);
        //  history.push("/Reservations");
         //window.location.reload();
        $('#exampleModalCenter').modal('hide');
       
        } catch (error) {console.log(error.response);}
    };

    const handleSubmitAnnuler = async (IDVoyageur) => {
        try {
            const result = await reservationsApi.findreservationbyvoyageur(IDVoyageur);
            setReservationid(result[0].id);
            console.log("id de reservation est"+ReservationId);
            const result1 = await axios.put("http://localhost:8000/api/reservations/"+ReservationId,etatresannuler);
            fetchreservations();
            Toast.fire({
               icon: 'success',
               title: 'Rejeté avec succès'
             })
            console.log(result1.data);
           //  history.push("/Reservations");
            //window.location.reload();
           $('#exampleModalCenter').modal('hide');
          
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
                                {/*<button className="btn btn-sm mr-1  btn-success">Validé</button>
                                <button className="btn btn-sm mr-1  btn-danger">Rejecté</button> */}
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
                                            <li><span className="sp">Nom Complet :</span><br/>
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
                                            <button className="btn btn-sm mr-1  btn-success"
                                             onClick={() => handleSubmitValider(reservation.voyageurid)}
                                            >Validé</button>
                                            <button className="btn btn-sm mr-1  btn-danger"
                                             onClick={() => handleSubmitAnnuler(reservation.voyageurid)}
                                            >Rejecté</button>
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
export default ReservationFinalversion;