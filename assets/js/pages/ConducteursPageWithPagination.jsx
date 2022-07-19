import Axios from 'axios';
import React, { useEffect, useState} from 'react';
import Pagination from '../components/Pagination';
const CustomersPageWithPagination = (props) => {
    const [customers, setCustomers]=useState([]);
    const [totalItems, setTotalItems]=useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [loading , setloading]=useState(true);
    const itemsPerPage = 10;

    useEffect(()=>{
        Axios
        .get(`http://localhost:8000/api/customers?pagination=true&count=${itemsPerPage}&page=${currentPage}`)
        .then(Response =>
            {setCustomers(Response.data["hydra:member"]);
            setTotalItems(Response.data["hydra:totalItems"]);
            setloading(false);}) .catch(error => console.log(error.Response));},[currentPage]);

    const handleDelete = (id)=>{
        console.log(id);
        const originalCustomers = [...customers];
        setCustomers(customers.filter(customer => customer.id !== id));
        Axios
        .delete("http://localhost:8000/api/customers/"+id)
           .then(Response => console.log("ok"))
           .catch(error =>{ 
                setCustomers(originalCustomers); 
                console.log(error.Response)});
    };

    const handlePageChange=(page)=>{setCurrentPage(page) setloading(true);}
    const paginatedCustomers = Pagination.getData(customers, currentPage, itemsPerPage);
    
    return (
        <>
        <h1>Liste des Clients (pagination) </h1>
        <table className="table table-hover">
            <thead>
                <tr>
                <th>ID</th>
                <th>client</th>
                <th>Email</th>
                <th>Entreprise</th>
                <th className="text-center">Factures</th>
                <th className="text-center">Montant Total</th>
                <th/>
                </tr>
            </thead>

            <tbody>
                {loading   && <tr><td>chargement ...</td></tr>}

                {!loading &&customers.map(customer => (
                  <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>
                        <a href="#">{customer.firstname}</a>
                    </td>
                    <td>{customer.email}</td>
                    <td>{customer.company}</td>
                    <td className="text-center">
                        <span className="badge badge-primary">{customer.invoices.length}</span></td>
                    <td className="text-center">{customer.totalAmount.toLocaleString()}$</td>
                    <td >
                        <button onClick={() => handleDelete(customer.id)} disabled={customer.invoices.length>0} 
                        className="btn btn-sm btn-danger">
                            
                            
                        Supprimer</button>
                    </td>
                </tr>))}
                
            </tbody>
        </table>

        <Pagination 
        currentPage={currentPage}
        itemsPerPage={itemsPerPage} 
        length={totalItems} 
        onPageChanged={handlePageChange}/> 
        
        </>
        );
}
 
export default CustomersPageWithPagination;