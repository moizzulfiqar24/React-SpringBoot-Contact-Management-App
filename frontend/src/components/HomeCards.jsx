import { Link } from 'react-router-dom';
import Card from './Card';

const HomeCards = () => {
    return (
        <section className='py-4'>
            <div className='container-xl lg:container m-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg'>
                    <Card>
                        <h2 className='text-2xl font-bold'>Browse Contacts</h2>
                        <p className='mt-2 mb-4'>
                            Easily explore and manage your saved contacts in one place.
                        </p>
                        <Link
                            to='/contacts'
                            className='inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-indigo-600'
                        >
                            View Contacts
                        </Link>
                    </Card>
                    <Card bg='bg-slate-400'>
                        <h2 className='text-2xl font-bold'>Add Contacts</h2>
                        <p className='mt-2 mb-4'>
                            Quickly add new contacts to keep your network up-to-date.
                        </p>
                        <Link
                            to='/add-contact'
                            className='inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-indigo-600'
                        >
                            Add New Contact
                        </Link>
                    </Card>
                </div>
            </div>
        </section>
    );
};
export default HomeCards;