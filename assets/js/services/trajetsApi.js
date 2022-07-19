import Axios from "axios";

function findAll(){
    return Axios
    .get("http://localhost:8000/api/trajets")
    .then(Response =>Response.data["hydra:member"])
}

function findAllNone(){
    return Axios
    .get("http://localhost:8000/api/trajets?statut=Encours")
    .then(Response =>Response.data["hydra:member"])
}

function findAllbyName(Data){
    return Axios
    .post("http://localhost:8000/api/trajets",{
         data:{
        "villedepart":Data}
    }
    )
    .then(Response =>Response.data["hydra:member"])
}
function deletetrajet(id){
    return Axios
    .delete("http://localhost:8000/api/trajets/"+id)
    
}
export default{
    findAll,
    findAllNone,    
    findAllbyName,
    delete:deletetrajet    
}