import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import trajetsAPI from "../services/trajetsApi";
import conducteursAPI from "../services/conducteursApi";
import moment from "moment"
import Pagination from "../components/Pagination";
import Swal from 'sweetalert2'
const STATUS_ClASSES =
{
    VALIDE:"success",
    ENCOURS:"primary",
    CANCELLED:"danger"
}
const STATUD_LABELS =
{
    VALIDE:"validé",
    ENCOURS:"Encours",
    CANCELLED:"Annulée"
}
const InterfaceAdmine = ({ props }) => {
    const [trajets, setTrajets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);


    const [etatres, setEtatres] = useState({
        statut:"validé"        
    });
    const [etatresannuler, setEtatresannuler] = useState({
        statut:"Annulé"        
    });
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
      
  
      

    const itemsPerPage = 2;

    const fetchTrajects = async () => {
        try {
            const data = await trajetsAPI.findAllNone()
            setTrajets(data);
        } catch (error) {
            console.log(error.response)
        }
    }

    useEffect(() => {
        document.body.style.backgroundImage = "none";
        fetchTrajects();
    },[]);

    const handleDelete = async id => {
        console.log(id);
        const orignalTrajet = [...trajets];
        setTrajets(trajets.filter(trajet => trajet.id !== id))
        try {
        await trajetsAPI.deleteTrajet(id)
        }catch (error) {
        setTrajets(orignalTrajet);
        console.log(error.response);
        }
    };
    
    const handleSubmitValider = async (IDRes) => {
        try {
         const result = await axios.put("http://localhost:8000/api/trajets/"+IDRes,etatres)
         console.log(result.data);
         fetchTrajects();
         Toast.fire({
            icon: 'success',
            title: 'validé avec succès'
          })
        } catch (error) {console.log(error.response);}
    };

    const handleSubmitAnnuler = async (IDRes) => {
        try {
         const result = await axios.put("http://localhost:8000/api/trajets/"+IDRes,etatresannuler)
         console.log(result.data);
         fetchTrajects();
         Toast.fire({
            icon: 'success',
            title: 'Rejecté avec succès'
          })
        } catch (error) {console.log(error.response);}
    };

    const formatDate = (str) => moment(str).format('DD/MM/YYYY');
    const formatDatetime = (str) => moment(str).format('hh:mm:ss');

    const handleChangePage = (page) => {
        setCurrentPage(page);
    }

    const paginatedTrajets = Pagination.getData(trajets, currentPage, itemsPerPage);
    return (
        <>
            <div className="justify-content-between align-items-center">
                <Link to="/Add" className="btn btn-primary">Gestion des Comptes</Link>
            </div>
            <br></br>
            <div>
                <h1 className="text"> Liste des Trajets</h1>
            </div>
            <div className="container-fluid">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Numéro</th>
                            <th>VilleDépart</th>
                            <th>VilleDéstination</th>
                            <th>Jour</th>
                            <th className="text-center">Date départ</th>
                            <th className="text-center">Date Arriver</th>
                            <th className="text-center">Heure Départ</th>
                            <th className="text-center">Heure Arriver</th>
                            <th className="text-center">Type Trajet</th>
                            <th className="text-center">Statut</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedTrajets.map(trajet =>
                               <tr key={trajet.id}>
                               <td>{trajet.id}</td>
                               <td>{trajet.villedepart}</td>
                               <td>{trajet.villedestination}</td>
                               <td className="text-center">{trajet.jour}</td>
                               <td className="text-center">{formatDate(trajet.datedepart)}</td>
                               <td className="text-center">{formatDate(trajet.datearrive)}</td>
                               <td className="text-center">{formatDatetime(trajet.heuredepart)}</td>
                               <td className="text-center">{formatDatetime(trajet.heurearrive)}</td>
                               <td className="text-center">{trajet.typetrajet}</td>
                               <td className="text-center"> 
                                   <span className={"badge badge-"+STATUS_ClASSES[trajet.statut]}>{STATUD_LABELS[trajet.statut]}</span>
                               </td>
                               <td>
                               <button className="btn btn-sm mr-1  btn-success"
                                onClick={() => handleSubmitValider(trajet.id)}
                                >Validé</button>
                                <button className="btn btn-sm mr-1  btn-danger"
                                onClick={() => handleSubmitAnnuler(trajet.id)}
                                >Rejecté</button>
                               </td>
                           </tr>
                        )}
                    </tbody>
                </table>
                <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={trajets.length}
                    onPageChanged={handleChangePage} />
            </div>
        </>
    )
}
export default InterfaceAdmine;
