import React, { useState, useEffect } from 'react';
import WopApi from '../api.js';
import GridComponent from '../../Helpers/GridComponent.jsx'
import Background from '../../Helpers/Background.js';
import { NavLink } from 'react-router-dom';

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
    <>
      <Background />
      <div className="container">
        <p className='display-4'>All Work Orders</p>
        <NavLink to='/AddNewService'>
          <button className="btn btn-primary btn-block my-3">Add New Service</button>
        </NavLink>
        {gridData ?
          <>
            <div>
              <GridComponent rowData={gridData} />
            </div></> : <div className='display-4'>Loading..........</div>}
      </div>
    </>
  );
}

export default AllWorkOrders;
