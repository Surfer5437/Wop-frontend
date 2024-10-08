import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Companies from './AdminPortal/Companies';
import Users from './AdminPortal/Users';
import AllWorkOrders from './AdminPortal/WorkOrders';
import AddNewCompany from './AdminPortal/AddNewCompany';
import AddNewService from './AdminPortal/AddNewService';
import UpdateCompany from './AdminPortal/UpdateCompany';
import RegisterUser from './CustomerPortal/RegisterUser';

const Router = () => {
    return (
        <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
            <Route path="companies" element={<Companies />} />
            <Route path="users" element={<Users />} />
            <Route path="workorders" element={<AllWorkOrders />} />
            <Route path="addNewService" element={<AddNewService />} />
            <Route path="addNewCompany" element={<AddNewCompany />} />
            <Route path="updatecompany/:id" element={<UpdateCompany />} />
            <Route path="users/register/:registerLink" element={<RegisterUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
        )};
export default Router;