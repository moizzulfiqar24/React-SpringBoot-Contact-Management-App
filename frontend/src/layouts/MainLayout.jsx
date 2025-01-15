import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';

const MainLayout = () => {
    const location = useLocation();

    const hideNavbarPaths = ['/login', '/sign-up', '/verify'];

    const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

    return (
        <>
            {shouldShowNavbar && <Navbar />}
            <Outlet />
            <ToastContainer />
        </>
    );
};
export default MainLayout;
