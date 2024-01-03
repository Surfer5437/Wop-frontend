import React, { useState, useEffect } from 'react';
import WopApi from '../api.js';
import GridComponent from '../../Helpers/GridComponent.jsx'

function AllWorkOrders() {
const [gridData, setGridData] = useState(null);

useEffect(() => {
  async function AllWorkOrdersLoad() {
    try {
      const result = await WopApi.getAllWorkOrders();
      setGridData(result.allWorkOrders);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }
  AllWorkOrdersLoad(); // Invoke the async function immediately
}, []);  

  return (
          <div className="container">
            <p className='display-4'>All Work Orders</p>
            {gridData? 
                <>
      <div>
      <GridComponent rowData={gridData} />
    </div></>: <tr><td><div className='display-4'>Loading..........</div></td></tr>}
    </div>
  );
}

export default AllWorkOrders;
