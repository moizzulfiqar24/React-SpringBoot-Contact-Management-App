import Hero from '../components/Hero';
import HomeCards from '../components/HomeCards';
import ContactListings from '../components/ContactListings';
import ViewAllContacts from '../components/ViewAllContacts';

const HomePage = () => {
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