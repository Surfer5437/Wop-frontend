import React, { useState, useEffect } from 'react';
import WopApi from '../api.js';
import GridComponent from '../../Helpers/GridComponent.jsx'

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
            {gridData? 
                <>
      <div>
      <GridComponent rowData={gridData} />
    </div></>: <tr><td><div className='display-4'>Loading..........</div></td></tr>}
            
    </div>
  );
}

export default Users;
