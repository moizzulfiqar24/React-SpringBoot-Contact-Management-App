// import Hero from '../components/Hero';
// import HomeCards from '../components/HomeCards';
// import ContactListings from '../components/ContactListings';
// import ViewAllContacts from '../components/ViewAllContacts';

// const HomePage = () => {
//     return (
//         <>
//             <Hero />
//             <HomeCards />
//             <ContactListings isHome={true} />
//             <ViewAllContacts />
//         </>
//     );
// };
// export default HomePage;

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import HomeCards from '../components/HomeCards';
import ContactListings from '../components/ContactListings';
import ViewAllContacts from '../components/ViewAllContacts';

const HomePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const authToken = localStorage.getItem('authToken'); // Get the auth token
        if (!authToken) {
            // Redirect to login if token is not present
            navigate('/login', { replace: true });
        }
    }, [navigate]);

    return (
        <>
            <Hero />
            <HomeCards />
            <ContactListings isHome={true} />
            <ViewAllContacts />
        </>
    );
};

export default HomePage;
