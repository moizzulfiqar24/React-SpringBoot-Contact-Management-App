import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaStar, FaRegStar } from 'react-icons/fa';

const AddContactPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState(null);
    const [isFavourite, setIsFavourite] = useState(false);

    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('address', address);
        formData.append('isFavourite', isFavourite);
        if (image) {
            formData.append('image', image);
        }

        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('User is not authenticated. Please log in.');
            }

            const response = await fetch('http://localhost:8080/contact', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                toast.success('Contact added successfully!', {
                    // position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                navigate('/contacts');
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add contact');
            }
        } catch (error) {
            console.error('Error adding contact:', error);
            toast.error(error.message);
        }
    };

    return (
        <section className='bg-indigo-50'>
            <div className='container m-auto max-w-2xl py-24'>
                <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
                    <form onSubmit={submitForm} encType="multipart/form-data">
                        <h2 className='text-3xl text-center font-semibold mb-6'>Add Contact</h2>

                        <div className='mb-4'>
                            <label className='block text-gray-700 font-bold mb-2'>Name</label>
                            <input
                                type='text'
                                className='border rounded w-full py-2 px-3 mb-2'
                                placeholder='Contact Name'
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className='mb-4'>
                            <label className='block text-gray-700 font-bold mb-2'>Email</label>
                            <input
                                type='email'
                                className='border rounded w-full py-2 px-3 mb-2'
                                placeholder='Contact Email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className='mb-4'>
                            <label className='block text-gray-700 font-bold mb-2'>Phone</label>
                            <input
                                type='tel'
                                className='border rounded w-full py-2 px-3 mb-2'
                                placeholder='Contact Phone'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        <div className='mb-4'>
                            <label className='block text-gray-700 font-bold mb-2'>Address</label>
                            <textarea
                                className='border rounded w-full py-2 px-3'
                                placeholder='Contact Address'
                                rows='3'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            ></textarea>
                        </div>

                        <div className='mb-4'>
                            <label className='block text-gray-700 font-bold mb-2'>Upload Image</label>
                            <input
                                type='file'
                                accept='image/*'
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>

                        <div className='mb-4 flex items-center'>
                            <button
                                type='button'
                                className='text-2xl mr-2'
                                onClick={() => setIsFavourite(!isFavourite)}
                            >
                                {isFavourite ? <FaStar className='text-red-500' /> : <FaRegStar className='text-gray-400' />}
                            </button>
                            <span className='text-gray-700 font-bold'>Mark as Favourite</span>
                        </div>

                        <div>
                            <button
                                className='bg-black hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-xl w-full focus:outline-none focus:shadow-outline'
                                type='submit'
                            >
                                Add Contact
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AddContactPage;
