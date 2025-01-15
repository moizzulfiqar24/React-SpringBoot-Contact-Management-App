import { FaMapMarker, FaEnvelope, FaPhoneAlt, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ContactListing = ({ contact }) => {
    const imageSrc = contact.image
        ? contact.image
        : 'https://via.placeholder.com/200?text=No+Image';

    return (
        <div className="bg-gray-50 border border-gray-200 rounded-2xl shadow-lg p-8 max-w-3xl">
            <div className="flex items-start">
                <img
                    src={imageSrc}
                    alt={`${contact.name}'s profile`}
                    className="w-32 h-32 rounded-full border-4 border-gray-100 shadow-lg object-cover"
                />
                <div className="ml-6 flex-1">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-semibold text-gray-800">{contact.name}</h3>
                        <div className="flex items-center">
                            {contact.isFavourite ? (
                                <FaStar className="text-red-500 text-xl" />
                            ) : (
                                <FaStar className="text-gray-300 text-xl line-through" />
                            )}
                        </div>
                    </div>

                    <hr className="border-gray-300 my-4" />

                    {/* Contact Details */}
                    <div className="space-y-3 text-gray-700">
                        <div className="flex items-center">
                            <FaEnvelope className="text-indigo-500 mr-3" />
                            <p className="text-base">{contact.email}</p>
                        </div>

                        <div className="flex items-center">
                            <FaPhoneAlt className="text-teal-500 mr-3" />
                            <p className="text-base">{contact.phone}</p>
                        </div>

                        <div className="flex items-center">
                            <FaMapMarker className="text-red-500 mr-3" />
                            <p className="text-base">{contact.address}</p>
                        </div>
                    </div>
                    <div className="mt-6">
                        <Link
                            to={`/contact/${contact.id}`}
                            className="block w-4/5 mx-auto text-center bg-black border border-gray border-2 hover:bg-indigo-600 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
                        >
                            Open Contact
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactListing;
