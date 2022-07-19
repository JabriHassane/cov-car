import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import trajetsAPI from "../services/trajetsApi";
import conducteursAPI from "../services/conducteursApi";

const CreationTrajets = (props) => {
    const { id = "new" } = props.match.params;
    const [editing, setEditing] = useState(false);
    
    const [trajet, setTrajet] = useState({
        villedepart: "",
        villedestination: "",
        jour: "",
        datedepart: "",
        datearrive: "",
        heuredepart: "",
        heurearrive: "",
        typetrajet: ""
    });
    const [errors, setErrors] = useState({
        villedepart: "",
        villedestination: "",
        jour: "",
        datedepart: "",
        datearrive: "",
        heuredepart: "",
        heurearrive: "",
        typetrajet: ""
    });
    const fetchTrajet = async id=>{
        try{
            const data = await axios.get("http://localhost:8000/api/trajets/"+id).then(response => response.data);
            const {villedepart,villedestination,jour,datedepart,datearrive,heuredepart,heurearrive,typetrajet,statut,conducteur}=data;
            setTrajet({villedepart,villedestination,jour,datedepart,datearrive,heuredepart,heurearrive,typetrajet,statut,conducteur});
        }catch(error){console.log(error.response)}
    }

    useEffect(() =>{
        document.body.style.backgroundImage = "none";
        if (id !== "new") setEditing(true);
        fetchTrajet(id) }, [id]);

    const handleChange = ({ currentTarget }) =>{
        const { name, value } = currentTarget;
        setTrajet({ ...trajet, [name]: value });
    };

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            if (editing) {
                const response = await axios.put("http://localhost:8000/api/trajets/" + id, trajet)
                console.log(response.data);
            } else {
                const response = await axios.post("http://localhost:8000/api/trajets", trajet);
                console.log(response.data);
            }
        }catch(error){console.log(error.response);}
    };

    const formatDate = (str) => moment(str).format('YYYY-MM-DD');
    const formatTime = (str) => moment(str).format('hh:mm:ss');
    return (
        <>
            {!editing && <h1> Creation un Trajet </h1> || <h1> Modification Trajet</h1>}
            <form onSubmit={handleSubmit}>
        
                <div className="row">
                    <div className="col-sm-6">
                        {(editing)&&
                            <div className="form-group">
                                <label >villedepart</label>
                                <input type="text"
                                    name="villedepart"
                                    placeholder="Entrer le nom de ville de départ"
                                    className="form-control"
                                    disabled="true"
                                    value={trajet.villedepart}
                                    error={errors.villedepart}
                                    onChange={handleChange}
                                />
                            </div>
                        
                        ||
                        
                        <div className="form-group">
                        <label >villedepart</label>
                        <input type="text"
                            name="villedepart"
                            placeholder="Entrer le nom de ville de départ"
                            className="form-control"
                            value={trajet.villedepart}
                            error={errors.villedepart}
                            onChange={handleChange}
                        />
                    </div>  
                        }   
                    </div>
                    <div className="col-sm-6">
                        {(editing)&&
                            <div className="form-group">
                                <label >villedestination </label>
                                <input type="text"
                                    name="villedestination"
                                    placeholder="Entrer le nom de ville de déstination"
                                    className="form-control"
                                    disabled="true"
                                    value={trajet.villedestination}
                                    onChange={handleChange}/>
                            </div>
                        ||
                            <div className="form-group">
                                <label >villedestination </label>
                                <input type="text"
                                    name="villedestination"
                                    placeholder="Entrer le nom de ville de déstination"
                                    className="form-control"
                                    value={trajet.villedestination}
                                    onChange={handleChange}/>
                            </div>
                        }
                    </div>
                </div>
                {(editing)&&       
                <div className="form-group">
                    <label >Jour</label>
                    <input type="text"
                        name="jour"
                        placeholder="Entrer la date de jour"
                        className="form-control"
                        disabled="true"
                        value={trajet.jour}
                        onChange={handleChange}
                    />
                </div>
                ||
                <div className="form-group">
                <label >Jour</label>
                <input type="text"
                    name="jour"
                    placeholder="Entrer la date de jour"
                    className="form-control"
                    value={trajet.jour}
                    onChange={handleChange}
                />
                </div>
                }
                {(editing)&&       
                <div className="form-group">
                    <label>datedepart </label>
                    <input type="date"
                        name="datedepart"
                        className="form-control"
                        disabled="true"
                        value={formatDate(trajet.datedepart)}
                        onChange={handleChange}
                    />
                </div>
                ||
                <div className="form-group">
                <label>datedepart </label>
                <input type="date"
                    name="datedepart"
                    className="form-control"
                    value={formatDate(trajet.datedepart)}
                    onChange={handleChange}
                />
                </div>
                }
                {(editing)&&   
                <div className="form-group">
                    <label>datearrive </label>
                    <input type="date"
                        name="datearrive"
                        className="form-control"
                        disabled="true"
                        value={formatDate(trajet.datearrive)}
                        onChange={handleChange}
                    />
                </div>
                ||
                <div className="form-group">
                    <label>datearrive </label>
                    <input type="date"
                        name="datearrive"
                        className="form-control"
                        value={formatDate(trajet.datearrive)}
                        onChange={handleChange}
                    />
                </div>
                }
                {(editing)&&
                <div className="form-group">
                    <label>heuredepart </label>
                    <input type="time"
                        step="1"
                        name="heuredepart"
                        className="form-control"
                        value={formatTime(trajet.heuredepart)}
                        onChange={handleChange}
                    />
                </div>
                ||
                <div className="form-group">
                    <label>heuredepart </label>
                    <input type="time"
                        name="heuredepart"
                        className="form-control"
                        value={trajet.heuredepart}
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
                        value={formatTime(trajet.heurearrive)}
                        onChange={handleChange}/>
                </div>
                ||
                <div className="form-group">
                    <label>heurearrive </label>
                    <input type="time"
                        name="heurearrive"
                        className="form-control"
                        value={trajet.heurearrive}
                        onChange={handleChange}
                    />
                </div>
                }
                {(editing)&&
                <div className="form-group">
                    <label>Type de trajet :</label>
                    <br />
                    <select name="typetrajet" id="typetrajet" value={trajet.typetrajet}
                    onChange={handleChange} className="form-control" disabled="true">
                        <option value="Regulier">Regulier</option>
                        <option value="Ponctuel">Ponctuel</option>
                    </select>
                </div>
                ||
                <div className="form-group">
                    <label>Type de trajet :</label>
                    <br />
                    <select name="typetrajet" id="typetrajet" value={trajet.typetrajet} onChange={handleChange} className="form-control">
                        <option value="Regulier">Regulier</option>
                        <option value="Ponctuel">Ponctuel</option>
                    </select>
                </div>
                }
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                    <Link to="/Listetrajets" className="btn btn-link">Retour</Link>
                </div>
            </form>
        </>
    );
};
export default CreationTrajets;
