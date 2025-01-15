import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMapMarker } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ContactPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const contact = useLoaderData(); // Fetching contact data using the original loader

    const onDeleteClick = async (contactId) => {
        const confirm = window.confirm('Are you sure you want to delete this contact?');

        if (!confirm) return;

        const token = localStorage.getItem('authToken'); // Authorization token
        try {
            const res = await fetch(`http://localhost:8080/contact/${contactId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                throw new Error('Failed to delete contact. Please try again.');
            }

            toast.success('Contact deleted successfully');
            navigate('/jobs');
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

    return (
        <>
            <section>
                <div className="container m-auto py-6 px-6">
                    <Link
                        to="/jobs"
                        className="text-indigo-500 hover:text-indigo-600 flex items-center"
                    >
                        <FaArrowLeft className="mr-2" /> Back to Contact Listings
                    </Link>
                </div>
            </section>

            <section className="bg-indigo-50">
                <div className="container m-auto py-10 px-6">
                    <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                        <main>
                            <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                                <div className="text-gray-500 mb-4">Contact Info</div>
                                <h1 className="text-3xl font-bold mb-4">{contact.name}</h1>
                                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                                    <FaMapMarker className="text-orange-700 mr-1" />
                                    <p className="text-orange-700">{contact.address}</p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                                    Contact Details
                                </h3>

                                <h3 className="text-xl font-bold mb-2">Email</h3>
                                <p className="my-2 bg-indigo-100 p-2 font-bold">{contact.email}</p>

                                <h3 className="text-xl font-bold mb-2">Phone</h3>
                                <p className="my-2 bg-indigo-100 p-2 font-bold">{contact.phone}</p>
                            </div>
                        </main>

                        {/* Sidebar */}
                        <aside>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold mb-6">Additional Info</h3>

                                <p className="text-lg">
                                    {contact.isFavourite ? '⭐ Favourite Contact' : 'Not a Favourite'}
                                </p>

                                <hr className="my-4" />

                                <h3 className="text-xl font-bold">Profile Image</h3>
                                <div className="mt-4 flex justify-center">
                                    <img
                                        src={contact.image || 'https://via.placeholder.com/200?text=No+Image'}
                                        alt={`${contact.name}'s profile`}
                                        className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
                                    />
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                                <h3 className="text-xl font-bold mb-6">Manage Contact</h3>
                                <Link
                                    to={`/edit-contact/${contact.id}`}
                                    className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                                >
                                    Edit Contact
                                </Link>
                                <button
                                    onClick={() => onDeleteClick(contact.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                                >
                                    Delete Contact
                                </button>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </>
    );
};

const jobLoader = async ({ params }) => {
    const token = localStorage.getItem('authToken'); // Authorization token
    const res = await fetch(`http://localhost:8080/contact/${params.id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error('Failed to load contact data');
    }

    const data = await res.json();
    return data;
};

export { ContactPage as default, jobLoader };
