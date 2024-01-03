import React, { useState, useEffect } from 'react';
import WopApi from '../api.js';
import GridComponent from '../../Helpers/GridComponent.jsx'

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
            {gridData? 
                <>
      <div>
      <GridComponent rowData={gridData} />
    </div></>: <tr><td><div className='display-4'>Loading..........</div></td></tr>}
            
    </div>
  );
}

export default Companies;
