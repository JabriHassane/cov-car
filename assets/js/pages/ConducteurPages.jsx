import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import conducteursApi from '../services/conducteursApi';
const ConducteursPage = (props) => {

    const [Conducteurs, setConducteurs]=useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch]=useState("");
    const itemsPerPage = 5;
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    const fetchConducteurs = async()=>
    {
     try{
        const data = await conducteursApi.findAll()
        setConducteurs(data);
        }catch(error){console.log(error.Response)}
    }
    useEffect(()=>{
        document.body.style.backgroundImage = "none";
        fetchConducteurs()
    },[]);

    const handleDelete = async id=>
    {
    const originalConducteurs = [...Conducteurs];
          setConducteurs(Conducteurs.filter(conducteur => conducteur.id !== id));
      try{await conducteursApi.delete(id)}catch(error){
          setConducteurs(originalConducteurs);}     
    };
    const handlePageChange=(page)=>{
        setCurrentPage(page);
    }
    const handleSearch = ({currentTarget}) =>{
        setSearch(currentTarget.value);
        setCurrentPage(1);
    };

    const filteredConducteurs = Conducteurs.filter(
        c => c.cin.toLowerCase().includes(search.toLowerCase())||
        c.tel.toLowerCase().includes(search.toLowerCase())||
        c.compte.nom.toLowerCase().includes(search.toLowerCase())||
        c.compte.prenom.toLowerCase().includes(search.toLowerCase())
    );

    const paginatedConducteurs = Pagination.getData(
        filteredConducteurs,
        currentPage,
        itemsPerPage
    );
    return (
    <>
        <h1>Liste des Conducteurs </h1>
        <div className="form-group">
            <input type="text"
             onChange={handleSearch}
             value={search}
             className="form-control"
             placeholder="Rechercher ..."
             />
        </div>
        <table className="table table-hover">
            <thead>
                <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Prenom</th>
                <th>Email</th>
                <th>Cin</th>
                <th>Tel</th>
                <th>Photo</th>
                <th>Sexe</th>
                <th className="text-center">Condition</th>
                <th/>
                </tr>
            </thead>

            <tbody>
                {paginatedConducteurs.map(conducteur => (
                  <tr key={conducteur.id}>
                    <td>{conducteur.id}</td>
                    <td>
                        <a href="#">{conducteur.compte.nom}</a>
                    </td>
                    <td>
                        <a href="#">{conducteur.compte.prenom}</a>
                    </td>
                    <td>{conducteur.compte.mail}</td>
                    <td>{conducteur.cin}</td>
                    <td className="text-center">
                        <span className="badge badge-primary">{conducteur.tel}</span></td>
                    <td className="text-center">{conducteur.photo}</td>
                    <td className="text-center">{conducteur.sexe}</td>
                    <td >
                        <button onClick={() => handleDelete(conducteur.id)} className="btn btn-sm btn-danger"> 
                        Supprimer
                        </button>
                    </td>
                </tr>))}   
            </tbody>
        </table>
        {itemsPerPage < filteredConducteurs.length && (
            <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage} 
            length={filteredConducteurs.length}
            onPageChanged={handlePageChange}/>
        )}
    </>);
}
 
export default ConducteursPage;