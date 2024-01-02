import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ImApi from '../api.js';
import GridExample from '../../Helpers/GridComponent.js'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
var AgGrid = require('ag-grid-community');

function Companies() {
  const [companies, setCompanies] = useState(null);
  const navigate = useNavigate();

  function loadGrid() {
    // Your grid loading logic here...
    if (companies !== null) {
      const colArray = Object.keys(companies[0]);
      console.log(colArray);
      let newObj = [];
      for (const [key, value] of Object.entries(colArray)) {
        newObj.push({field : value});
      }
      
      console.log(newObj);
      const gridOptions = {
        // Row Data: The data to be displayed.
  rowData: companies,
  // Column Definitions: Defines & controls grid columns.
  columnDefs: newObj
      };
      const myGridElement = document.querySelector('#myGrid');
      AgGrid.createGrid(myGridElement, gridOptions);
    }
  }
  useEffect(() => {
    async function companiesLoad() {
      try {
        const result = await ImApi.getCompanies();
        setCompanies(result.companies);
        console.log(result);
      } catch (error) {
        console.error('Error loading companies:', error);
      }
    }

    companiesLoad(); // Invoke the async function immediately
  }, []);

  // Use a separate useEffect to handle grid loading
  useEffect(() => {
    loadGrid();
  }, [companies]);

  return (


          <div className="container">
            <p className='display-4'>Companies</p>
            <div className=".center-block"></div> 
      <div id="myGrid" className="ag-theme-balham" style={{ height: '500px' }}  />
     
      {/* <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              autoSizeStrategy={autoSizeStrategy}
              onGridReady={onGridReady}
              onColumnResized={onColumnResized}
            /> */}
    </div>
  );
}

export default Companies;
