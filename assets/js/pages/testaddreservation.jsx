import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import trajetsAPI from "../services/trajetsApi";
import conducteursAPI from "../services/conducteursApi";

const CreationReservation = (props) => {
    const { id = "new" } = props.match.params;
    const [Reservation, setReservation] = useState({
        etat:"",
        //voyageur:"",
        trajet:""
    });
    const [errors, setErrors] = useState({
        etat:"",
        // voyageur:"",
        trajet:""
    })

    useEffect(()=>{
        document.body.style.backgroundImage = "none";
     },[]);
     
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setReservation({ ...Reservation, [name]: value });
    };

    const handleSubmit = async event => {
        event.preventDefault();
        try {
                const response = await axios.post("http://localhost:8000/api/reservations", Reservation);
                console.log(response.data);
            } catch (error) {
            console.log(error.response);
        }
    };

    //  REMARQUE : LMOUCHKIL HENA DYAL RESERVATION MAKATZADCH 
    //  BSSBABE SECURITY.YAML ranii m5rba9 ls roles f EVENTS FILES
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">

                            <label >ETAT</label>
                            <input type="text"
                                name="etat"
                                placeholder="Entrer le ETAT"
                                className="form-control"
                                value={Reservation.etat}
                                error={errors.etat}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* <div className="col-sm-6">
                        <div className="form-group">

                            <label >Voyageur </label>
                            <input type="text"
                                name="voyageur"
                                placeholder="Entrer le voyageur"
                                className="form-control"
                                value={Reservation.voyageur}
                                onChange={handleChange}
                            />
                        </div>
                    </div> */}
                </div>
                <div className="form-group">
                    <label >trajet</label>
                    <input type="text"
                        name="trajet"
                        placeholder="Entrer trajet"
                        className="form-control"
                        value={Reservation.trajet}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                    <Link to="/trajets" className="btn btn-link">Retour</Link>

                </div>
            </form>
        </>
    );
};
export default CreationReservation;