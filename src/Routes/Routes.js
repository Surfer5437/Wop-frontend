import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Companies from './AdminPortal/Companies';
import Users from './AdminPortal/Users';
import AllWorkOrders from './AdminPortal/WorkOrders';

const Router = () => {
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
            <Route path="companies" element={<Companies />} />
            <Route path="users" element={<Users />} />
            <Route path="workorders" element={<AllWorkOrders />} />
          </Route>
        </Routes>
      </BrowserRouter>
        )};
export default Router;