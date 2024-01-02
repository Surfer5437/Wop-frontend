import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Companies from './AdminPortal/Companies';

const Router = () => {
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
            <Route path="companies" element={<Companies />} />
          </Route>
        </Routes>
      </BrowserRouter>
        )};
export default Router;