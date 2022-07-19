import Axios from "axios";

function findAll(){
    return Axios
    .get("http://localhost:8000/api/reservations")
    .then(Response =>Response.data["hydra:member"])
}
function findAllnone(){
    return Axios
    .get("http://localhost:8000/api/reservations?etat=none")
    .then(Response =>Response.data["hydra:member"])
}

function findreservationbyvoyageur(IDVoyageur){
    return Axios
    .get("http://127.0.0.1:8000/api/reservations?etat=none&voyageur="+IDVoyageur)
    .then(Response =>Response.data["hydra:member"])
}
function findAllBYID(ID){
    return Axios
    .get("http://localhost:8000/api/reservations/"+ID)
    .then(Response =>Response.data["hydra:member"])
}
function deletereservation(id){
    return Axios
    .delete("http://localhost:8000/api/reservations/"+id)
    
}
export default{
    findAll,
    findAllBYID,
    findreservationbyvoyageur,
    findAllnone,
    delete:deletereservation    
}