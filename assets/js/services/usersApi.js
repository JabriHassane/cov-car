import axios from "axios";

function register(user){
    return axios.post("http://localhost:8000/api/comptes", user),
           axios.post("http://localhost:8000/api/comptes", user);
}

function EditAccount(idcompte,usercompte){
    return axios.put("http://localhost:8000/api/comptes/"+idcompte,usercompte)
}
function EditAccount2(idcorv,user,Roles){
    return axios.put("http://localhost:8000/api/"+Roles+"/"+idcorv,user)
}
function findByMail(mail){
    return axios.get("http://localhost:8000/api/comptes", mail);
}
function registerinConducteur(user){
    return axios.post("http://localhost:8000/api/conducteurs", user);
}
function FindAll(){
    return axios.get("http://localhost:8000/api/login_check")
    .then(Response =>Response.data["hydra:member"])
}


export default {
    register,
    EditAccount,
    EditAccount2,
    FindAll,
    registerinConducteur
};