import React, { useContext,useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Field from "../components/Forms/Field";
import AuthContext from '../contexts/AuthContext';
import authApi from '../services/authApi';
import usersApi from '../services/usersApi';

const LoginPage = ({history}) => {

    const{setIsAuthenticated}= useContext(AuthContext);
    const [Users, setUsers]=useState([]);
    const [error, setError]= useState("");
    const [credentials, setcredentials]=useState({
        username:"",
        password:""
    });
    const [Roles, setRoles]=useState([]);

    const fetchUsers = async ()=>{
        try{const data = await usersApi.FindAll()
            setUsers(data);
            console.log("data is"+data);    
            console.log("users is"+Users);    
        }catch(error){console.log(error.Response)}};

    const handleSubmit = async event => { 
                 event.preventDefault();
             try{await authApi.authenticate(credentials);
                 setError("");
                 setIsAuthenticated(true);
                 toast.success("vous étes connecté!")
                 const dataauth = authApi.TokenValue(); 
                 console.log("=>"+dataauth.roles);
                 if(dataauth.roles=="voyageur"){
                 history.replace("/Recherche");
                 }
                 else if(dataauth.roles=="conducteur"){
                    history.replace("/Reservations"); 
                 }
                 else if(dataauth.roles=="ROLE_ADMIN"){
                    history.replace("/admine"); 
                 }
                }catch(error){
                setError("Aucun Compte ne possede cette adresse ou les informations incorrect ");};
                console.log(credentials);      
    };
    useEffect(()=>{document.body.style.backgroundImage = "none",fetchUsers()},[]);
        const handleChange =({currentTarget})=>{
            const {value,name}=currentTarget;
            setcredentials ({...credentials, [name]: value});
        };
    return ( <>
    <h1>Connexion à l'application</h1>
    <form  onSubmit={handleSubmit}>
        <Field 
        label="Adresse email" 
        name="username" 
        value={credentials.username} 
        onChange={handleChange} 
        placeholder="Adresse email de connexion" 
        error={error} />
        
        <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input type="password"
             placeholder="Mot de passe"
             name="password"
             id="password"
             className="form-control"
             value={credentials.password} onChange={handleChange}/>
        </div>
        <div className="form-group">
            <button type="submit" className="btn btn-success">Je me connecte</button>
        </div>
    </form>
    </> );
}
 
export default LoginPage;