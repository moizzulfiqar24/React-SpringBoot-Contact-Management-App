import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Remove token from localStorage
        navigate('/login'); // Redirect to login page
    };

    const linkClass = ({ isActive }) =>
        isActive
            ? 'bg-white text-black hover:bg-gray-400 hover:text-white rounded-md px-3 py-2'
            : 'text-white hover:bg-gray-400 hover:text-white rounded-md px-3 py-2';

    return (
        <nav className='bg-black border-b border-indigo-500'>
            <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
                <div className='flex h-20 items-center justify-between'>
                    <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
                        <NavLink className='flex flex-shrink-0 items-center mr-4' to='/'>
                            <img className='h-10 w-auto' src={logo} alt='React Jobs' />
                            <span className='hidden md:block text-white text-2xl font-bold ml-2'>
                                React Jobs
                            </span>
                        </NavLink>
                        <div className='md:ml-auto'>
                            <div className='flex space-x-2'>
                                <NavLink to='/' className={linkClass}>
                                    Home
                                </NavLink>
                                <NavLink to='/jobs' className={linkClass}>
                                    All Contacts
                                </NavLink>
                                <NavLink to='/add-job' className={linkClass}>
                                    Add Contact
                                </NavLink>
                                <button
                                    onClick={handleLogout}
                                    className='text-white bg-red-500 hover:bg-red-600 rounded-md px-3 py-2'
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
