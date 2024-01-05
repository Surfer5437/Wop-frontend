import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const MyAgGridComponent = ({ rowData, page }) => {
  const navigate = useNavigate();
  const [gridApi, setGridApi] = useState(null);
  let gridColumnArray = [];
  if (rowData !== null && rowData.length > 0) {
    const colArray = Object.keys(rowData[0]);

    for (const value of colArray) {
      gridColumnArray.push({ field: value });
    }
  }

  const defaultColDef = {
    resizable: true, // Allow columns to be resized by the user
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const onRowDoubleClicked = (event) => {
    // Access the data of the double-clicked row
    const rowData = event.data;
    switch (page) {
      case 'companies':
        navigate(`/updatecompany/${rowData.id}`);
    console.log('Double-clicked row data:', rowData)
        break;
    
      default:
        break;
    }


    
    
    
    

    // Add your logic to handle the double-clicked row data
    // For example, you can open a modal or navigate to another page
  };
  useEffect(() => {
    if (gridApi) {
      gridApi.sizeColumnsToFit();
    }
  }, [gridApi, rowData]);

  return (
    <div className="ag-theme-alpine" style={{ height: '300px', width: '100%' }}>
      <AgGridReact
        columnDefs={gridColumnArray}
        defaultColDef={defaultColDef}
        rowData={rowData}
        domLayout='autoHeight' // Auto-height for rows
        rowSelection={'single'}
        onRowDoubleClicked={onRowDoubleClicked} // Set the double-click event handler
        onGridReady={onGridReady}
      />
    </div>
  );
};

export default MyAgGridComponent;
