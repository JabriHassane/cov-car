import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import reservationsAPI from "../services/reservationsApi";
import conducteursAPI from "../services/conducteursApi";



const CreationReservations = (props) => {
    const { id = "new" } = props.match.params;
    const [reservation, setReservation] = useState({

        villedepart: "",
        villedestination: "",
        jour: "",
        datedepart: "",
        datearrive: "",
        heuredepart: "",
        heurearrive: "",
        typereservation: ""
    });
    const [errors, setErrors] = useState({
        villedepart: "",
        villedestination: "",
        jour: "",
        datedepart: "",
        datearrive: "",
        heuredepart: "",
        heurearrive: "",
        typereservation: ""
    })



    //////////////////// Modification Reservations ///////////////////
    const [editing, setEditing] = useState(false);
    const fetchReservation = async id => {
        try {
            const data = await axios.get("http://localhost:8000/api/reservations/" + id)
                .then(response => response.data);
            const { villedepart, villedestination, jour, datedepart, datearrive, heuredepart, heurearrive, typereservation, statut, conducteur } = data;
            setReservation({ villedepart, villedestination, jour, datedepart, datearrive, heuredepart, heurearrive, typereservation, statut, conducteur });

        } catch (error) {
            console.log(error.response)
        }
    }

    useEffect(() => {
        if (id !== "new") setEditing(true);
        fetchReservation(id);

    }, [id]);
    ////////////kkk
    // Gestion des dates et time


    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setReservation({ ...reservation, [name]: value });
    };

    //Insertion reservation
    const handleSubmit = async event => {
        event.preventDefault();
        try {
            if (editing) {
                const response = await axios.put("http://localhost:8000/api/reservations/" + id, reservation)
                console.log(response.data);
            } else {
                const response = await axios.post("http://localhost:8000/api/reservations", reservation);
                console.log(response.data);
            }

        } catch (error) {
            console.log(error.response);

        }
    };
    // Gestion des dates et time
    const formatDate = (str) => moment(str).format('YYYY-MM-DD');
    const formatTime = (str) => moment(str).format('hh:mm:ss');
    return (
        <>

            {!editing && <h1> Creation un Reservation </h1> || <h1> Modification Reservation</h1>}
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">

                            <label >villedepart</label>
                            <input type="text"
                                name="villedepart"
                                placeholder="Entrer le nom de ville de départ"
                                className="form-control"
                                value={reservation.villedepart}
                                error={errors.villedepart}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="form-group">

                            <label >villedestination </label>
                            <input type="text"
                                name="villedestination"
                                placeholder="Entrer le nom de ville de déstination"
                                className="form-control"
                                value={reservation.villedestination}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label >Jour</label>
                    <input type="text"
                        name="jour"
                        placeholder="Entrer la date de jour"
                        className="form-control"
                        value={reservation.jour}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>datedepart </label>
                    <input type="date"
                        name="datedepart"
                        className="form-control"
                        value={formatDate(reservation.datedepart)}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>datearrive </label>
                    <input type="date"
                        name="datearrive"
                        className="form-control"
                        value={formatDate(reservation.datearrive)}
                        onChange={handleChange}
                    />
                </div>
                {(editing)&&
                <div className="form-group">
                    <label>heuredepart </label>
                    <input type="time"
                        step="1"
                        name="heuredepart"
                        className="form-control"
                        value={formatTime(reservation.heuredepart)}
                        onChange={handleChange}
                    />
                </div>
                ||
                <div className="form-group">
                <label>heuredepart </label>
                <input type="time"
                    name="heuredepart"
                    className="form-control"
                    value={reservation.heuredepart}
                    onChange={handleChange}
                />
            </div>
                }   
                {(editing)&&

                <div className="form-group">
                <label>heurearrive </label>
                <input type="time"
                    step="1"
                    name="heurearrive"
                    className="form-control"
                    value={formatTime(reservation.heurearrive)}
                    onChange={handleChange}

                />
                </div>
                ||
                <div className="form-group">
                <label>heurearrive </label>
                <input type="time"
                    name="heurearrive"
                    className="form-control"
                    value={reservation.heurearrive}
                    onChange={handleChange}

                />
                </div>
                }
                
                <div className="form-group">
                    <label>Type de reservation :</label>
                    <br />
                    <select name="typereservation" id="typereservation" value={reservation.typereservation} onChange={handleChange} className="form-control">
                        <option value="regulier">regulier</option>
                        <option value="Ponctiel">Ponctuel</option>
                    </select>

                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                    <Link to="/reservations" className="btn btn-link">Retour</Link>

                </div>



            </form>

        </>
    );
};
export default CreationReservations;
