// import { FaMapMarker } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// const ContactListing = ({ contact }) => {
//     const imageSrc = contact.image
//         ? contact.image
//         : 'https://via.placeholder.com/200?text=No+Image';

//     return (
//         <div className="bg-white rounded-xl shadow-md relative p-6 mt-12">
//             {/* Contact Image */}
//             <div className="absolute left-1/2 -top-16 transform -translate-x-1/2">
//                 <img
//                     src={imageSrc}
//                     alt={`${contact.name}'s profile`}
//                     className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
//                 />
//             </div>

//             <div className="mt-20 text-center">
//                 <h3 className="text-xl font-bold mb-2">{contact.name}</h3>
//                 <p className="text-sm text-gray-600 mb-4">{contact.email}</p>
//                 <h4 className="text-orange-700 mb-2">📞 {contact.phone}</h4>
//                 <div className="mb-4">
//                     <p>{contact.address}</p>
//                 </div>

//                 <div className="mt-4">
//                     <span
//                         className={`px-3 py-1 rounded-full text-white ${contact.isFavourite ? 'bg-yellow-500' : 'bg-gray-400'
//                             }`}
//                     >
//                         {contact.isFavourite ? '⭐ Favourite' : 'Not Favourite'}
//                     </span>
//                 </div>

//                 {/* Open Contact Button */}
//                 <div className="mt-6">
//                     <Link
//                         to={`/contact/${contact.id}`}
//                         className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm"
//                     >
//                         Open Contact
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ContactListing;

import { FaMapMarker, FaEnvelope, FaPhoneAlt, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ContactListing = ({ contact }) => {
    const imageSrc = contact.image
        ? contact.image
        : 'https://via.placeholder.com/200?text=No+Image';

    return (
        <div className="bg-gray-50 border border-gray-200 rounded-2xl shadow-lg p-8 max-w-3xl">
            {/* Contact Image and Name */}
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

                    {/* Open Contact Button */}
                    {/* <div className="mt-6">
                        <Link
                            to={`/contact/${contact.id}`}
                            // className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
                            className='block w-4/5 justify-center bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 ease-in-out shadow-md hover:shadow-lg'
                        >
                            Open Contact
                        </Link>
                    </div> */}
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
