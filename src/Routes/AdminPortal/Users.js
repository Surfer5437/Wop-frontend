import React, { useState, useEffect } from 'react';
import WopApi from '../api.js';
import GridComponent from '../../Helpers/GridComponent.jsx'
import { NavLink } from 'react-router-dom';

function Users() {
const [gridData, setGridData] = useState(null);

useEffect(() => {
  async function usersLoad() {
    try {
      const result = await WopApi.getUsers();
      setGridData(result.users);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }
  usersLoad(); // Invoke the async function immediately
}, []);  



  return (
          <div className="container">
            <p className='display-4'>Users</p>
            <NavLink to='/AddNewInvoice'>
            <button className="btn btn-primary btn-block my-3">Add New User</button>
            </NavLink>
            {gridData? 
                <>
      <div>
      <GridComponent rowData={gridData} />
    </div></>: <tr><td><div className='display-4'>Loading..........</div></td></tr>}
            
    </div>
  );
}

export default Users;
