import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/Forms/Field';
import usersApi from '../services/usersApi';
const RegisterPage = ({history}) => {

    const [user, setUser] = useState({
        nom: "",
        prenom: "",
        email: "",
        adresse:"null",         
        password: "",
        passwordconfirm: "",
        roles:["voyageur"]
    });
    const [errors, setErrors] = useState({
        nom: "le nom est obligatoire",
        prenom: "le prenom est obligatoire",
        email: "l'adresse email est obligatoire",
        password: "le password est obligatoire",
        passwordconfirm: "Confirmation obligatoire"
    });

     useEffect(()=>{
        document.body.style.backgroundImage = "none";
     },[]);

    const handleChange = ({ currentTarget }) => {
        const { value, name } = currentTarget;
        setUser({...user, [name]: value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        const apiErrors = {};
        if(user.password !== user.passwordconfirm){
            apiErrors.passwordconfirm=`Votre confirmation de mot de passe
            n'est pas comforme avec le vrai mot de passe`;
            setErrors(apiErrors);
            return;}
        try{const response = usersApi.register(user);
            //TODO : flash success
            setErrors([]);
            history.replace("/login");
            console.log(response);
        }catch(error){
            const {violations} = error.response.data;
            if (violations){
                violations.forEach(violations => {
                apiErrors[violation.propertyPath]=violations.message
                });
                setErrors(apiErrors);}
        }console.log(user);
    };

    return (<>
        <h1>Inscription</h1>

        <form action="" onSubmit={handleSubmit}>
            <Field name="nom"
                label="prénom"
                placeholder="votre nom de famille"
                error={errors.nom}
                value={user.nom}
                onChange={handleChange}
            />
            <Field name="prenom"
                label="nom"
                placeholder="votre propre nom"
                error={errors.prenom}
                value={user.prenom}
                onChange={handleChange}
            />

            <Field name="email"
                label="email"
                placeholder="Votre Adresse Email"
                type="email"
                error={errors.email}
                value={user.email}
                onChange={handleChange}
            />
            <Field name="password"
                label="password"
                type="password"
                placeholder="Votre mot de passe"
                error={errors.password}
                value={user.password}
                onChange={handleChange}
            />
            <Field name="passwordconfirm"
                label="passwordconfirm"
                type="password"
                placeholder="Confirmation du mot de passe"
                error={errors.passwordconfirm}
                value={user.passwordconfirm}
                onChange={handleChange}
            />
            <div className="form-group"><button type="submit" className="btn btn-success">Enregistrer</button>
                <Link to="/login" className="btn btn-link">Se connecter</Link>
            </div>
        </form>
    </>);
};
export default RegisterPage;