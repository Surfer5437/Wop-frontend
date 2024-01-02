import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const MyAgGridComponent = ({ rowData }) => {
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
        onGridReady={onGridReady}
      />
    </div>
  );
};

export default MyAgGridComponent;
