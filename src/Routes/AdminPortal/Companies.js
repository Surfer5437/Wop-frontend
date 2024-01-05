import React, { useState, useEffect } from 'react';
import WopApi from '../api.js';
import GridComponent from '../../Helpers/GridComponent.jsx'
import { NavLink } from 'react-router-dom';

function Companies() {

const [gridData, setGridData] = useState(null);

useEffect(() => {
  async function companiesLoad() {
    try {
      const result = await WopApi.getCompanies();
      setGridData(result.companies);
    } catch (error) {
      console.error('Error loading companies:', error);
    }
  }

  companiesLoad(); // Invoke the async function immediately

}, []);  

  return (

          <div className="container">
            <p className='display-4'>Companies</p>
            <NavLink to='/AddNewCompany'>
            <button className="btn btn-primary btn-block my-3">Add New Company</button>
            </NavLink>
            {gridData? 
                <>
      <div>
      <GridComponent rowData={gridData} page={'companies'} />
    </div></>: <div className='display-4'>Loading..........</div>}
            
    </div>
  );
}

export default Companies;
