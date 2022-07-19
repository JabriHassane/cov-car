import axios from "axios";
import ConducteursApi from "./conducteursApi";
import jwtDecode from "jwt-decode";
import usersApi from "./usersApi";


function logout(){
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
    ConducteursApi.findAll().then(console.log);
}

function authenticate(credentials){
      return axios
                .post("http://localhost:8000/api/login_check", credentials)
                .then(response => response.data.token)
                .then(token => {
                   
                  // je stoke le token dans mon localstorage
                  window.localStorage.setItem("authToken", token);

                  // on previen axios qu on a un headers par defaut sur toutes nod future requette http
                 setAxiosToken(token);
                 ConducteursApi.findAll().then(console.log);
                });
              
}


function setAxiosToken(token){
    axios.defaults.headers["Authorization"] = "Bearer "+ token;
}

function setup(){
    //1. voir si on a un token

    const token = window.localStorage.getItem("authToken");

    //2.si le token est encore valide
    if(token){
        const {exp: expiration} = jwtDecode(token);
        if(expiration * 1000 > new Date().getTime()){
            setAxiosToken(token);
        }
    }
   
    //3.donner le token a axios
}

function isAuthenticated(){
     //1. voir si on a un token
     const token = window.localStorage.getItem("authToken");
       //2.si le token est encore valide
     if(token){
        const {exp: expiration} = jwtDecode(token);
        if(expiration * 1000 > new Date().getTime()){
           return true;
        }
        return false;
    }
    return false;
}
function TokenValue(){
    const token = window.localStorage.getItem("authToken");
    if(token){
        const Data=jwtDecode(token);
        return Data;
    }
}
function localStorageValue(){
    const Value= window.sessionStorage.getItem("RechercheValue");
        const Data=JSON.parse(Value);
        return Data;
}
export default {
    authenticate,
    logout,
    setup,
    isAuthenticated,
    TokenValue,
    localStorageValue
     
}