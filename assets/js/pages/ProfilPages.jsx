import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/Forms/Field';
import usersApi from '../services/usersApi';
import authApi from '../services/authApi';
const ProfilPages = ({history})=> {

    const [userCompte, setUserCompte] = useState({
        nom:"",
        prenom: "",email: "", adresse:"",password: "",
        passwordconfirm: "",
    });
    const [user, setUser] = useState({
        cin: "",tel:""
    });
    const[idCompte, setidCompte]=useState([]);
    const[idcorv, setidcorv]=useState([]);
    const[roles, setRoles]=useState([]);

    const [errors, setErrors] = useState({
        nom: "le nom est obligatoire",
        prenom: "le prenom est obligatoire",
        email: "l'adresse email est obligatoire",
        password: "le password est obligatoire",
        passwordconfirm: "Confirmation obligatoire"
    });
  
    const fetchVoyageur = async ()=>{
        try{ 
            const dataauth = authApi.TokenValue(); 
            console.log("=>"+dataauth.roles);
            if(dataauth.roles=="voyageur"){
                const data = await axios.get("http://localhost:8000/api/voyageurs/"+ dataauth.idv).then(response => response.data);
                console.log(JSON.stringify(data));
                const {id,cin,tel,type}=data;
                const {nom,prenom,email,password,adresse}=data.compte;
                setidCompte(dataauth.id);
                console.log("=>"+dataauth.id);
                setRoles(dataauth.roles);
                console.log("=>"+dataauth.roles);
                setidcorv(dataauth.idv)
                console.log("=>"+dataauth.idv);
                setUser({id,cin,tel,type});
                setUserCompte({nom,prenom,email,adresse,password});   
            }
            else if(dataauth.roles=="conducteur"){
                const data = await axios.get("http://localhost:8000/api/conducteurs/"+ dataauth.idc).then(response => response.data);
                console.log(JSON.stringify(data));
                const {id,cin,tel,type}=data;
                const {nom,prenom,email,password,adresse}=data.compte;
                setidCompte(dataauth.id);
                console.log("=>"+dataauth.id);
                setRoles(dataauth.roles);
                console.log("=>"+dataauth.roles);
                setidcorv(dataauth.idc)
                console.log("=>"+dataauth.idc);
                setUser({id,cin,tel,type});
                setUserCompte({nom,prenom,email,adresse,password});   
            }
           
        }catch(error){console.log(error.response)}
    }


    useEffect(() =>{
        document.body.style.backgroundImage = "none";
        fetchVoyageur();
    },[]);

    const handleChangeUser = ({ currentTarget }) => {
        const { value, name } = currentTarget;
        setUser({...user, [name]: value });
    };
    const handleChangeUserCompte = ({ currentTarget }) => {
        const { value, name } = currentTarget;
        setUserCompte({...userCompte, [name]: value });
    };
   

    const handleSubmit = async event => {
        event.preventDefault();
        const apiErrors = {};
        if(userCompte.password !== userCompte.passwordconfirm){
            apiErrors.passwordconfirm=`Votre confirmation de mot de passe
             n'est pas comforme avec le vrai mot de passe`;
            setErrors(apiErrors);
            return;
        }

        try{
            const response = usersApi.EditAccount(idCompte,userCompte);
            const response2 = usersApi.EditAccount2(idcorv,user,roles);
            //TODO : flash success
            setErrors([]);
            history.replace("/login");
        }catch (error) {
            const { violations } = error.response.data;
            if (violations) {
                violations.forEach(violations => {
                    apiErrors[violation.propertyPath]=violations.message
                });
                setErrors(apiErrors);
            }
        } console.log(user); 
    };


    return (<>
        <h1>Modification Profil</h1>

        <form action="" onSubmit={handleSubmit}>
            <Field name="cin"
                label="cin"
                value={user.cin}
                onChange={handleChangeUser}
            />
            <Field name="nom"
                label="nom"
                value={userCompte.nom}
                onChange={handleChangeUserCompte}
            />
            <Field name="prenom"
                label="prenom"
                value={userCompte.prenom}
                onChange={handleChangeUserCompte}
            />
            <Field name="email"
                label="email"
                type="email"
                value={userCompte.email}
                onChange={handleChangeUserCompte}
            />
            <Field name="adresse"
                label="adresse"
                type="adresse"
                value={userCompte.adresse}
                onChange={handleChangeUserCompte}
            />
            <Field name="tel"
                label="tel"
                type="tel"
                value={user.tel}
                onChange={handleChangeUser}
            />
            <Field name="passwordconfirm"
                label="passwordconfirm"
                type="password"
                error={errors.passwordconfirm}
                value={userCompte.passwordconfirm}
                onChange={handleChangeUserCompte}
            />
            <div className="form-group">
                <button type="submit" className="btn btn-success">Modifier</button>
            </div>
        </form>
    </>);
};
export default ProfilPages;