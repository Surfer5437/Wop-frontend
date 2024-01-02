import React, { useState, useEffect } from 'react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
var AgGrid = require('ag-grid-community');

function GridComponent(rowData, columnDefs) {
  const [companies, setCompanies] = useState(null);

  function loadGrid() {
      const gridOptions = {
        // Row Data: The data to be displayed.
  rowData: rowData,
  // Column Definitions: Defines & controls grid columns.
  columnDefs: columnDefs
      };
      const myGridElement = document.querySelector('#myGrid');
      AgGrid.createGrid(myGridElement, gridOptions);
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

    <>
      <div id="myGrid" className="ag-theme-balham" style={{ height: '500px' }}  />
    
    </>
  );
}

export default GridComponent;
