import { FaMapMarker } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ContactListing = ({ contact }) => {
    const imageSrc = contact.image
        ? contact.image
        : 'https://via.placeholder.com/200?text=No+Image';

    return (
        <div className="bg-white rounded-xl shadow-md relative p-6 mt-12">
            {/* Contact Image */}
            <div className="absolute left-1/2 -top-16 transform -translate-x-1/2">
                <img
                    src={imageSrc}
                    alt={`${contact.name}'s profile`}
                    className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
                />
            </div>

            <div className="mt-20 text-center">
                <h3 className="text-xl font-bold mb-2">{contact.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{contact.email}</p>
                <h4 className="text-orange-700 mb-2">📞 {contact.phone}</h4>
                <div className="mb-4">
                    <p>{contact.address}</p>
                </div>

                <div className="mt-4">
                    <span
                        className={`px-3 py-1 rounded-full text-white ${contact.isFavourite ? 'bg-yellow-500' : 'bg-gray-400'
                            }`}
                    >
                        {contact.isFavourite ? '⭐ Favourite' : 'Not Favourite'}
                    </span>
                </div>

                {/* Open Contact Button */}
                <div className="mt-6">
                    <Link
                        to={`/contact/${contact.id}`}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm"
                    >
                        Open Contact
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ContactListing;
