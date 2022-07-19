import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import trajetsApi from '../services/trajetsApi';
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
const TrajetsPages = (props) => {
    const [ trajets, setTrajets]=useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch]=useState("");
    const itemsPerPage = 2;
    const formatDate=(str) => moment(str).format("DD/MM/YYYY");
    const formatDatetime=(str) =>moment(str).format('LTS');

    const fetchconducteurs =async ()=>{
       try{
        const data=await trajetsApi.findAll();
         setTrajets(data);
       }catch(error){
           console.log(error.Response);
       }
    };
    useEffect(()=>{
        document.body.style.backgroundImage = "none";
        fetchconducteurs();
    },[]);
    
    const handlePageChange=(page)=>{
        setCurrentPage(page);
    };
    const handleSearch = ({currentTarget}) =>{
        setSearch(currentTarget.value);
        setCurrentPage(1);
    };
    const handleDelete = async id => {
        const originaltrajets = [...trajets];
        setTrajets(trajets.filter(trajet => trajet.id !== id));
        try{
           await trajetsApi.delete(id);
        }catch(error){
            console.log(error.Response);
            setTrajets(originaltrajets);
        }
    };
    const filteredtrajets = trajets.filter(
        i=>i.villedepart.toLowerCase().includes(search.toLowerCase())||
           i.villedestination.toLowerCase().includes(search.toLowerCase())||
           STATUD_LABELS[i.status].toLowerCase().includes(search.toLowerCase()));

    const paginatedtrajets = Pagination.getData(
        filteredtrajets,
        currentPage,
        itemsPerPage
    );
    return ( 
    <>
    <h1>Liste des Trajets</h1>
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
        {paginatedtrajets.map(trajet =>(
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
                <button className="btn btn-sm btn-primary mr-1">Editer</button>
                <button className="btn btn-sm btn-danger"
                 onClick={() => handleDelete(trajet.id)}>Supprimer
                </button>
            </td>
        </tr>))};
    </tbody>
    </table>
    <Pagination 
     currentPage={currentPage}
     itemsPerPage={itemsPerPage}
     length={filteredtrajets.length}
     onPageChanged={handlePageChange}/> 
    </>
     );}   
export default TrajetsPages; 