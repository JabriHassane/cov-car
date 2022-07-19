import Axios from "axios";

function findAll(){
    return Axios
    .get("http://localhost:8000/api/conducteurs")
    .then(Response =>Response.data["hydra:member"])
}

function deleteConducteur(id){
    return Axios
    .delete("http://localhost:8000/api/conducteurs/"+id)
    
}
export default{
    findAll,
    delete:deleteConducteur
}